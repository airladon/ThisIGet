// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import ViewTopic from '../../components/viewTopic';
import withLoginManager from '../../components/view';
import buildStats from '../../../build.json';
// import '../../../css/style.scss';

function renderTopic(
  version: Object,
  // topicUID: string,
  // topicName: string,
  // versionUID: string,
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
        build={buildStats}
      />,
      topicId,
    );
  }
}

export default renderTopic;
