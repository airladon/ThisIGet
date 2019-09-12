import * as index from './topicIndex.json';
import TopicDescription from '../js/Lesson/topicDescription';

export default function getTopicIndex() {
  // const topicIndex = index();
  // const topicIndex = JSON.parse(index);
  const topicIndex = index.default;
  // console.log(topicIndex.default)
  Object.keys(topicIndex).forEach((topicUID) => {
    topicIndex[topicUID] = new TopicDescription(topicIndex[topicUID]);
  });
  return topicIndex;
}
