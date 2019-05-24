// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import Markdown from '../../../../../../js/components/markdown';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import content from './content.md';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.loadStaticQRs([
      'Math/Geometry_1/Isosceles/base',
      'Math/Geometry_1/RightAngleTriangles/static',
    ]);

    this.sections = [
      <Markdown key={0} content={content}/>,
    ];
  }
}

export default Content;
