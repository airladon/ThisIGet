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
      <div key="0" className="lesson__links_table__disclaimer">
        <p>
          {'The web sites at these links are not administered by This I Get, and so we can\'t control their availability, accuracy or actions taken when you visit.'}
        </p>
        <p>
          {'If you visit a link, then you can rate the link for your own future reference, and for others that haven\'t yet visited it. If the link is broken or the content has changed and is no longer appropriate, then please let us know at '}
          <a
            href="mailto:feedback@thisiget.com?Subject=Feedback"
            className="lesson__links_table__disclaimer_email"
            >
            feedback@thisiget.com
          </a>
          {'.'}
        </p>
        <p>
        </p>
      </div>,
      { links: version.details.links },
    ];
  }
}

export default Content;
