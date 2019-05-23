// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
import StaticQR from './staticQR';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
};

// const maxWidth = 600;
// const maxHeight = 400;

/* eslint-disable no-param-reassign */
function alignLeft(element, linkRect, containerRect) {
  const windowWidth = window.innerWidth;
  if (windowWidth < containerRect.width) {
    element.style.left = '0px';
    return;
  }
  const linkLeft = linkRect.left - containerRect.left;
  element.style.left = '0';
  const newRect = element.getBoundingClientRect();
  const proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  const overFlow = containerRect.width - (proposedLeft + newRect.width);
  if (proposedLeft < 0) {
    element.style.left = '0px';
  } else if (overFlow > 0) {
    element.style.left = `${proposedLeft}px`;
  } else {
    element.style.left = '';
    element.style.right = '0px';
  }
}

function alignTop(element, linkRect, containerRect) {
  const windowHeight = window.innerheight;
  if (windowHeight < containerRect.height) {
    element.style.top = '10px';
    return;
  }
  const linkTop = linkRect.top - containerRect.top;
  element.style.top = '0';
  // const newRect = element.getBoundingClientRect();
  const proposedTop = linkTop + linkRect.height;
  element.style.top = `${proposedTop}px`;
  // const proposedBottom = linkTop;
  // const overFlow = windowHeight.height - (proposedTop + newRect.height);
  // if (proposedLeft < 0) {
  //   element.style.left = '0px';
  // } else if (overFlow > 0) {
  //   element.style.left = `${proposedLeft}px`;
  // } else {
  //   element.style.left = '';
  //   element.style.right = '0px';
  // }
}
/* eslint-enable no-param-reassign */

export default class SimpleLessonComponent extends React.Component
                                    <Props, State> {
  lesson: SimpleLesson;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
    this.state = { qr: <StaticQR content="loading"/> };
  }

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
    window.lessonFunctions = {
      tester: (id, parameters) => {
        // console.log(id, parameters);
        // console.log(window.quickReference[parameters])
        this.setState({ qr: window.quickReference[parameters] });
        const element = document.getElementById('id_lesson__static_qr__popup');
        if (element != null) {
          element.classList.toggle('lesson__static_qr__pop_up__hide');
          const container = document.getElementById('lesson__content');
          const link = document.getElementById(id);
          if (container != null && link != null) {
            const containerRect = container.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            alignLeft(element, linkRect, containerRect);
            alignTop(element, linkRect, containerRect);
          }
        }
      },
    };
  }

  render() {
    return <div id={this.lesson.content.htmlId} className="simple_lesson__container">
      {this.lesson.content.sections}
      <div id="lesson__static_qrs">
        {this.state.qr}
      </div>
    </div>;
  }
}
