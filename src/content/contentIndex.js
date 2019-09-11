import index from './contentIndexObj';
import TopicDescription from '../js/Lesson/topicDescription';

export default function getContentIndex() {
  const li = index();
  Object.keys(li).forEach((lessonUid) => {
    li[lessonUid] = new TopicDescription(li[lessonUid]);
  });
  return li;
}
