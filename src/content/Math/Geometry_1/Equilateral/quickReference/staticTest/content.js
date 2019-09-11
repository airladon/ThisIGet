// @flow
import * as React from 'react';
import SimpleFormatContent from '../../../../../../js/Lesson/SimpleFormatContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import version from '../base/version';

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
// CHANGE THIS IF NECESSARY
const versionToTest = 'base';
// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

const path = window.location.pathname.split('/');
const [topicUID] = path.slice(-3, -2);
const qrids = version.references;

class Content extends SimpleFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      `${details.path}/${topicUID}/${versionToTest}`,
    ]);
  }

  setContent() {
    const out = [<div key="0" id="main_title">{'Quick Reference Popups'}</div>];
    qrids.forEach((qrid, index) => {
      out.push(<div key={index + 1}>
        <div
          id={`link_${index}`}
          className="lesson__qr_action_word"
          onClick={window.lessonFunctions.qr.bind(
            window.lessonFunctions,
            `link_${index}`,
            `${details.path}/${topicUID}/${versionToTest}/${qrid}`,
          )}>
        {qrid}</div>
      </div>);
    });
    out.push(<div key={1000} style={{
      width: '80%',
      height: '1000px',
    }}/>);
    this.sections = out;
  }
}

export default Content;
