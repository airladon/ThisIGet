// @flow
import SimpleFormatContent from '../../../../../../js/TopicFormat/SimpleFormatContent';
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
