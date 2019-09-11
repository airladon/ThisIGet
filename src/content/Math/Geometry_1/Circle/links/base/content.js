// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// import LinksTable from '../../../../../../js/components/linksTable';
import version from './version';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.sections = [
      <div key="0" className="lesson__links_table__disclaimer">
        <p style={{ marginBottom: '3em' }}>
          {'A selection of external links that describe the same topic in different ways is below. If you visit a link, then you can rate the link for your own future reference, and for others that haven\'t yet visited it. If the link is broken or the content has changed and is no longer appropriate, then please let us know at '}
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
      { links: version.links },
      <div key="1" className="lesson__links_table__disclaimer">
        <p style={{ marginTop: '3em' }}>
          {'Please note, these websites are not administered by This I Get. We don\'t control their availability, accuracy or policies.'}
        </p>
      </div>,
    ];
  }
}

export default Content;
