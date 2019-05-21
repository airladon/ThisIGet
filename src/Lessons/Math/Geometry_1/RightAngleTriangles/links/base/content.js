// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// import LinksTable from '../../../../../../js/components/linksTable';
import version from './version';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.sections = [
      { links: version.details.links },
      <div key="0">
        Test
      </div>,
    ];
  }
}

export default Content;
