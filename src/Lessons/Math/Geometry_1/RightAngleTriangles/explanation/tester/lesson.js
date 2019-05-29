// // @flow
// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import renderLesson from '../../../../../../js/views/lesson/lesson';
import SimpleLesson from '../../../../../../js/Lesson/SimpleLesson';
import Markdown from '../../../../../../js/components/markdown';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import markdownContent from './content.md';
// import './style.scss';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.loadQRs([
      'Math/Geometry_1/RightAngleTriangles/base',
      'Math/Geometry_1/RightAngleTriangles/static',
    ]);

    this.sections = [
      <Markdown key={0} content={markdownContent}/>,
    ];
  }
}

const lesson = new SimpleLesson(new Content());
renderLesson(lesson);
