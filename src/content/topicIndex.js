import * as index from './topicIndex.json';
import TopicDescription from '../js/Lesson/topicDescription';

export default function getTopicIndex() {
  const topicIndex = index.default;
  Object.keys(topicIndex).forEach((topicUID) => {
    topicIndex[topicUID] = new TopicDescription(topicIndex[topicUID]);
  });
  return topicIndex;
}
