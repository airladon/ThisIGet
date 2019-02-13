// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { LessonContent } from '../../Lesson/LessonContent';
import ViewLesson from '../../components/viewLesson';
import withLoginManager from '../../components/view';

const renderLesson = (content: LessonContent, lessonDetails: Object, versionDetails: Object) => {
  const lessonId: HTMLElement | null = document.getElementById('single-page-lesson');
  const LessonView = withLoginManager(ViewLesson);

  if (lessonId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <LessonView
          content={content}
          lessonDetails={lessonDetails}
          versionDetails={versionDetails}
        />
      </div>,
      lessonId,
    );
  }
};

export default renderLesson;
