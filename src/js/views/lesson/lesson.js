// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import { LessonContent } from '../../Lesson/LessonContent';
import ViewLesson from '../../components/viewLesson';
import withLoginManager from '../../components/view';
// import '../../../css/style.scss';

function renderLesson(
  lesson: Object,
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
  //   fullContent?: boolean,
  //   type: 'presentation' | 'singlePage' | 'generic',
  //   references?: Array<string>,
  // },
) {
  const lessonId: HTMLElement | null = document.getElementById('single-page-content');
  const LessonView = withLoginManager(ViewLesson);

  if (lessonId instanceof HTMLElement) {
    ReactDOM.render(
      <LessonView
        lesson={lesson}
        // lessonUID={lessonUID}
        // topicName={topicName}
        // versionUID={versionUID}
        // lessonDetails={lessonDetails}
        // versionDetails={versionDetails}
      />,
      lessonId,
    );
  }
}

export default renderLesson;
