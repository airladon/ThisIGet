// @flow
// import getLessonIndex from '../../Lessons/LessonsCommon/lessonindex';
import type { TypeLessonDescription } from './lessonDescription';
// first array of arrays: all uids with no dependencies
// second array of arrays: all uids with dependencies alreay in the done list

// function splitIndexIntoLearningPaths(
//   lessonIndex: { [uid: string]: TypeLessonDescription },
//   pathDepth: number = 3,
// ) {
//   const learningPaths = {};
//   // console.log('qwer')
//   Object.keys(lessonIndex).forEach((key) => {
//     const lesson = lessonIndex[key];
//     const fullPath = lesson.path.split('/');
//     const name = fullPath[pathDepth];
//     const path = fullPath.slice(0, pathDepth + 1).join('/');
//     if (!(name in learningPaths)) {
//       learningPaths[name] = {
//         path,
//         lessons: [],
//         name: name.replace(/_/, ' '),
//       };
//     }
//     learningPaths[name].lessons.push(lesson);
//   });
//   return learningPaths;
// }

export default function makeLessonTree(lessons: Object) {
  // const lessonIndex = getLessonIndex();
  // console.log(lessonIndex)
  // const lessonLearningPaths = splitIndexIntoLearningPaths(lessonIndex);
  // console.log('asdf')
  // const lessonTrees = {};

  // Object.keys(lessonLearningPaths).forEach((learningPath) => {
  // const { lessons } = lessonLearningPaths[learningPath];
  const lessonTree = [];
  const remainingUIDs = {};
  let existingUIDs = {};
  const allUIDs = [];
  Object.keys(lessons).forEach((lessonUID) => {
    remainingUIDs[lessonUID] = lessons[lessonUID];
    allUIDs.push(lessonUID);
  });
  let index = 0;
  const max = Object.keys(lessons).length;
  while (Object.keys(remainingUIDs).length > 0 && index < max) {
    const lessonTreeNode = [];
    const newExisting = {};
    // eslint-disable-next-line no-loop-func
    Object.keys(remainingUIDs).forEach((uid) => {
      const lesson = remainingUIDs[uid];
      const [title, enabled, dependencies, topics] = lesson;
      let canAddToExisting = true;
      dependencies.forEach((dependency) => {
        if (!(dependency in existingUIDs) && (allUIDs.indexOf(dependency) > -1)) {
          canAddToExisting = false;
        }
      });
      if (canAddToExisting) {
        newExisting[uid] = uid;
        lessonTreeNode.push({ title, enabled, dependencies, topics });
        delete remainingUIDs[uid];
      }
    });
    existingUIDs = Object.assign(newExisting, existingUIDs);
    lessonTree.push(lessonTreeNode);
    index += 1;
  }
  // lessonTrees[learningPath] = {
  //   tree: lessonTree,
  //   name: lessonLearningPaths[learningPath].name,
  //   path: lessonLearningPaths[learningPath].path,
  // };
  // });
  return lessonTree;
}
