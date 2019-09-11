// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import { LessonContent } from '../../Lesson/LessonContent';
import ViewTopic from '../../components/viewTopic';
import withLoginManager from '../../components/view';
// import '../../../css/style.scss';

function renderTopic(
  version: Object,
  // lessonUID: string,
  // topicName: string,
  // versionUID: string,
  // lessonDetails: {
  //   uid: string,
  //   title: string,
  //   dependencies: Array<string>,
  //   enabled?: boolean,
  // },
  // versionDetails: {
  //   uid: string,
  //   topic: string,
  //   title?: string,
  //   description?: string,
  //   fullTopic?: boolean,
  //   type: 'presentation' | 'singlePage' | 'generic',
  //   references?: Array<string>,
  // },
) {
  const topicId: HTMLElement | null = document.getElementById('single-page-content');
  const ViewTopicWithLoginState = withLoginManager(ViewTopic);

  if (topicId instanceof HTMLElement) {
    ReactDOM.render(
      <ViewTopicWithLoginState
        version={version}
        // lessonUID={lessonUID}
        // topicName={topicName}
        // versionUID={versionUID}
        // lessonDetails={lessonDetails}
        // versionDetails={versionDetails}
      />,
      topicId,
    );
  }
}

export default renderTopic;
