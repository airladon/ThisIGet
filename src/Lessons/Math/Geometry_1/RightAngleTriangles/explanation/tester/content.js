// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    window.lessonFunctions = {
      tester: () => { console.log('asdf'); },
    };
    this.sections = [
      <div key={0} className="simple_lesson__container">
      <div className="markdown" dangerouslySetInnerHTML={ { __html: content } }/>
        <div>
          hello
        </div>
      </div>,
    ];
  }
}

export default Content;
