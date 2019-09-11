// @flow
import getContentIndex from '../../content/contentIndex';
import type { TypeTopicDescription } from './topicDescription';
// first array of arrays: all uids with no dependencies
// second array of arrays: all uids with dependencies alreay in the done list

function splitIndexIntoLearningPaths(
  contentIndex: { [uid: string]: TypeTopicDescription },
  pathDepth: number = 3,
) {
  const learningPaths = {};
  Object.keys(contentIndex).forEach((key) => {
    const content = contentIndex[key];
    const fullPath = content.path.split('/');
    const name = fullPath[pathDepth];
    const path = fullPath.slice(0, pathDepth + 1).join('/');
    if (!(name in learningPaths)) {
      learningPaths[name] = {
        path,
        topics: [],
        name: name.replace(/_/, ' '),
      };
    }
    learningPaths[name].topics.push(content);
  });
  return learningPaths;
}

export default function makeTopicTree() {
  const contentIndex = getContentIndex();
  const learningPaths = splitIndexIntoLearningPaths(contentIndex);
  const topicTrees = {};
  Object.keys(learningPaths).forEach((learningPath) => {
    const { topics } = learningPaths[learningPath];
    const topicTree = [];
    const remainingUIDs = {};
    let existingUIDs = {};
    const allUIDs = [];
    topics.forEach((topic) => {
      remainingUIDs[topic.uid] = topic;
      allUIDs.push(topic.uid);
    });
    let index = 0;
    const max = topics.length;
    while (Object.keys(remainingUIDs).length > 0 && index < max) {
      const topicTreeNode = [];
      const newExisting = {};
      // eslint-disable-next-line no-loop-func
      Object.keys(remainingUIDs).forEach((uid) => {
        const topic = remainingUIDs[uid];
        let canAddToExisting = true;
        topic.dependencies.forEach((dependency) => {
          if (!(dependency in existingUIDs) && (allUIDs.indexOf(dependency) > -1)) {
            canAddToExisting = false;
          }
        });
        if (canAddToExisting) {
          newExisting[uid] = uid;
          topicTreeNode.push(topic);
          delete remainingUIDs[uid];
        }
      });
      existingUIDs = Object.assign(newExisting, existingUIDs);
      topicTree.push(topicTreeNode);
      index += 1;
    }
    topicTrees[learningPath] = {
      tree: topicTree,
      name: learningPaths[learningPath].name,
      path: learningPaths[learningPath].path,
    };
  });
  return topicTrees;
}
