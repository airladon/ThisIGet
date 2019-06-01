// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import version from '../base/version';

const path = window.location.pathname.split('/');
const [lessonUID] = path.slice(-3, -2);

const qrids = version.references;


class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      `${details.path}/${lessonUID}/${'base'}`,
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
            'main_title',
            `${details.path}/${lessonUID}/${'base'}/${qrid}`,
          )}>
        {qrid}</div>
      </div>);
    });
    out.push(<div key={1000} style={{
      width: '80%',
      height: '500px',
    }}/>);
    this.sections = out;
  }
}

export default Content;
