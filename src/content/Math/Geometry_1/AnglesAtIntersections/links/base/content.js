// @flow
// import Fig from 'figureone';
// import * as React from 'react';
import SimpleFormatContent from '../../../../../../js/Lesson/SimpleFormatContent';
import linkTable from '../../../../../common/linkTable';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';

import version from './version';

class Content extends SimpleFormatContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.sections = linkTable(version.links);
  }
}

export default Content;
