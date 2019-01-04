// @flow
import getLessonIndex from '../../Lessons/index';
import type { TypeLessonDescription } from './lessonDescription';
// first array of arrays: all uids with no dependencies
// second array of arrays: all uids with dependencies alreay in the done list

function splitIndexIntoLearningPaths(
  lessonIndex: { [uid: string]: TypeLessonDescription },
  pathDepth: number = 3,
) {
  const learningPaths = {};
  Object.values(lessonIndex).forEach((lesson) => {
    let learningPath = lesson.path;
    let lessonName = lesson.path;
    for (let i = 0; i < pathDepth; i += 1) {
      lessonName = lessonName.replace(/\/[^/]*/, '');
    }
    const topicPath = lesson.path.replace(lessonName, '');
    learningPath = topicPath;
    for (let i = 0; i < pathDepth - 1; i += 1) {
      learningPath = learningPath.replace(/\/[^/]*/, '');
    }
    learningPath = learningPath.slice(1);
    if (!(learningPath in learningPaths)) {
      learningPaths[learningPath] = {
        path: topicPath,
        lessons: [],
        name: learningPath.replace(/_/, ' '),
      };
    }
    learningPaths[learningPath].lessons.push(lesson);
  });

  return learningPaths;
}

export default function makeLessonTree() {
  const lessonIndex = getLessonIndex();
  const lessonLearningPaths = splitIndexIntoLearningPaths(lessonIndex);
  const lessonTrees = {};
  Object.keys(lessonLearningPaths).forEach((learningPath) => {
    const topicIndex = lessonLearningPaths[learningPath].lessons;
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
    lessonTrees[learningPath] = {
      tree: lessonTree,
      name: lessonLearningPaths[learningPath].name,
      path: lessonLearningPaths[learningPath].path,
    };
  });

  return lessonTrees;
}
