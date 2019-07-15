import index from './index';
import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const li = index();
  // console.log('asdfasdf')
  // console.log(li)
  Object.keys(li).forEach((lessonUid) => {
    li[lessonUid] = new LessonDescription(li[lessonUid]);
  });
  // console.log('asdfasdf')
  return li;
}
