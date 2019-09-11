import index from './index';
import LessonDescription from '../js/Lesson/lessonDescription';

export default function getContentIndex() {
  const li = index();
  Object.keys(li).forEach((lessonUid) => {
    li[lessonUid] = new LessonDescription(li[lessonUid]);
  });
  return li;
}
