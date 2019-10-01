import * as index from './topicIndex.json';
import TopicDescription from '../js/TopicFormat/topicDescription';

export default function getTopicIndex() {
  const topicIndex = index.default;
  Object.keys(topicIndex).forEach((topicUID) => {
    const topic = topicIndex[topicUID];
    [topic.uid] = topicUID.split('/').slice(-1);
    topic.path = `/content/${topicUID.split('/').slice(0, -1).join('/')}`;
    topicIndex[topicUID] = new TopicDescription(topic);
  });
  return topicIndex;
}
