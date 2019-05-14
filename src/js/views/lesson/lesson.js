// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import { LessonContent } from '../../Lesson/LessonContent';
import ViewLesson from '../../components/viewLesson';
import withLoginManager from '../../components/view';

function renderLesson(
  lesson: Object,
  lessonUID: string,
  topicName: string,
  versionUID: string,
  lessonDetails: {
    title: string,
    dependencies: Array<string>,
    enabled?: boolean,
  },
  versionDetails: {
    title?: string,
    description?: string,
    fullLesson?: boolean,
    type: 'presentation' | 'singlePage' | 'generic',
    references?: Array<string>,
  },
) {
  const lessonId: HTMLElement | null = document.getElementById('single-page-lesson');
  const LessonView = withLoginManager(ViewLesson);

  if (lessonId instanceof HTMLElement) {
    ReactDOM.render(
      <LessonView
        lesson={lesson}
        lessonUID={lessonUID}
        topicName={topicName}
        versionUID={versionUID}
        lessonDetails={lessonDetails}
        versionDetails={versionDetails}
      />,
      lessonId,
    );
  }
}

export default renderLesson;
