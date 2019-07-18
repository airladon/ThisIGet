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
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      'Math/Geometry_1/IntersectionAngles/base',
      'Math/Geometry_1/ParallelLineDistance/base',
      'Math/Geometry_1/AreaTriangle/base',
      'Math/Geometry_1/RightAngleTriangles/base',
      'Math/Geometry_1/ParallelLines/base',
      // 'Math/Geometry_1/Triangles/base',
      // 'Math/Geometry_1/CongruentTriangles/base',

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
