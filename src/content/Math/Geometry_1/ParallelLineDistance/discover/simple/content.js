// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      'Math/Geometry_1/PointLineDistance/base',
      'Math/Geometry_1/AnglesAtIntersections/base',
      'Math/Geometry_1/RectanglesAndSquares/base/',
    ]);
  }

  setContent() {
    this.sections = [
      <div key={0}>
      <div className="markdown" dangerouslySetInnerHTML={ { __html: content } }/>
      </div>,
    ];
  }
}

export default Content;
