import index from './contentIndexObj';
import ContentDescription from '../js/Lesson/contentDescription';

export default function getContentIndex() {
  const li = index();
  Object.keys(li).forEach((lessonUid) => {
    li[lessonUid] = new ContentDescription(li[lessonUid]);
  });
  return li;
}
