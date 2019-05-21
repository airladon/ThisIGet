// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import LinksTable from '../../../../../../js/components/linksTable';
import version from './version';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.sections = [
      <div key={0} className="simple_lesson__container">
        <LinksTable links={version.details.links} />
      </div>,
    ];
  }
}

export default Content;
