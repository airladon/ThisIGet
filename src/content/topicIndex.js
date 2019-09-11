import index from './topicIndexObj';
import TopicDescription from '../js/Lesson/topicDescription';

export default function getTopicIndex() {
  const topicIndex = index();
  Object.keys(topicIndex).forEach((topicUID) => {
    topicIndex[topicUID] = new TopicDescription(topicIndex[topicUID]);
  });
  return topicIndex;
}
