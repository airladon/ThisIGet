// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
import StaticQR from './staticQR';
import PresentationQR from './presentationQR';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
};

/* eslint-disable no-param-reassign */
function alignLeft(element, linkRect, containerRect, forceLeftDefine = false) {
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
  // console.log(newRect.width)
  element.style.float = '';
  if (proposedLeft < 0) {
    element.style.left = '0px';
  } else if (overFlow > 0) {
    element.style.left = `${proposedLeft}px`;
  } else if (forceLeftDefine) {
    // element.style.left = `${containerRect.right - newRect.width}px`;
    element.style.left = '';
    element.style.float = 'right';
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
    this.state = { qr: <StaticQR content="Loading Reference" link="" title=""/> };
  }

  componentDidMount() {
    this.lesson.initialize();
    window.lessonFunctions = {
      qr: (id, parameters) => {
        this.setState({ qr: window.quickReference[parameters] });
        const element = document.getElementById('id_lesson__static_qr__popup');
        if (element != null) {
          element.classList.toggle('lesson__static_qr__pop_up__hide');
          const container = document.getElementById('lesson__content');
          const link = document.getElementById(id);
          if (container != null && link != null && element != null) {
            const containerRect = container.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            alignLeft(element, linkRect, containerRect);
            alignTop(element, linkRect, containerRect);
          }
        }
      },
      showQR: (id, parameters) => {
        const path = parameters.split('/').slice(0, -1).join('/');
        const qrid = parameters.split('/').slice(-1)[0];
        this.lesson.content.showQR(path, qrid);
        const element = document.getElementById('id_lesson__pres_qr__popup');
        const container = document.getElementById('lesson__content');
        const link = document.getElementById(id);
        if (container != null && link != null && element != null) {
          const containerRect = container.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();
          alignLeft(element, linkRect, containerRect, true);
          alignTop(element, linkRect, containerRect);
        }
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    const element = document.getElementById('id_lesson__static_qr__popup');
    if (element != null) {
      element.classList.add('lesson__static_qr__pop_up__hide');
    }
    // if (this.lesson.content.qrDiagram != null) {
    //   if (this.lesson.content.qrDiagram.elements != null) {
    //     this.lesson.content.qrDiagram.elements.hideAll();
    //   }
    // }
  }

  render() {
    return <div
      id={this.lesson.content.htmlId}
      className="simple_lesson__container"
      onClick={this.close.bind(this)}
    >
      {this.lesson.content.sections}
      <div id="lesson__static_qrs">
        {this.state.qr}
      </div>
      <PresentationQR id="id_presentation_lesson__qr__overlay"/>
    </div>;
  }
}
