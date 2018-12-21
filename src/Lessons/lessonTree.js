// @flow
import getLessonIndex from './index';

// first array of arrays: all uids with no dependencies
// second array of arrays: all uids with dependencies alreay in the done list

function splitIndexIntoTopics(lessonIndex: Object, pathDepth: number = 3) {
  const topics = {};
  lessonIndex.forEach((lesson) => {
    let topic = lesson.link;
    let lessonName = lesson.link;
    for (let i = 0; i < pathDepth; i += 1) {
      lessonName = lessonName.replace(/\/[^/]*/, '');
    }
    const topicPath = lesson.link.replace(lessonName, '');
    topic = topicPath;
    for (let i = 0; i < pathDepth - 1; i += 1) {
      topic = topic.replace(/\/[^/]*/, '');
    }
    topic = topic.slice(1);
    if (!(topic in topics)) {
      topics[topic] = {
        path: topicPath,
        lessons: [],
        name: topic.replace(/_/, ' '),
      };
    }
    topics[topic].lessons.push(lesson);
  });

  return topics;
}

export default function makeLessonTree() {
  const lessonIndex = getLessonIndex();
  const lessonTopics = splitIndexIntoTopics(lessonIndex);
  const lessonTrees = {};
  Object.keys(lessonTopics).forEach((topic) => {
    const topicIndex = lessonTopics[topic].lessons;
    const lessonTree = [];
    const remainingUIDs = {};
    let existingUIDs = {};
    const allUIDs = [];
    topicIndex.forEach((lesson) => {
      remainingUIDs[lesson.uid] = lesson;
      allUIDs.push(lesson.uid);
    });

    let index = 0;
    const max = topicIndex.length;
    while (Object.keys(remainingUIDs).length > 0 && index < max) {
      const lessonTreeNode = [];
      const newExisting = {};
      // eslint-disable-next-line no-loop-func
      Object.keys(remainingUIDs).forEach((uid) => {
        const lesson = remainingUIDs[uid];
        let canAddToExisting = true;
        lesson.dependencies.forEach((dependency) => {
          if (!(dependency in existingUIDs) && (allUIDs.indexOf(dependency) > -1)) {
            canAddToExisting = false;
          }
        });
        if (canAddToExisting) {
          newExisting[uid] = uid;
          lessonTreeNode.push(lesson);
          delete remainingUIDs[uid];
        }
      });
      existingUIDs = Object.assign(newExisting, existingUIDs);
      lessonTree.push(lessonTreeNode);
      index += 1;
    }
    lessonTrees[topic] = {
      tree: lessonTree,
      name: lessonTopics[topic].name,
      path: lessonTopics[topic].path,
    };
  });

  return lessonTrees;
}
