// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
import StaticQR from './staticQR';
import PresentationQR from './presentationQR';
import '../../css/simpleLesson.scss';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
};

function align(elementId: string, containerId: string, linkId: string) {
  const element = document.getElementById(elementId);
  const container = document.getElementById(containerId);
  const link = document.getElementById(linkId);
  if (element == null || container == null || link == null) {
    return;
  }
  element.classList.remove('lesson__hide');
  const containerRect = container.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  if (windowWidth < containerRect.width) {
    element.style.left = '20px';
    return;
  }
  const linkLeft = linkRect.left - containerRect.left;
  element.style.left = '0';
  const newRect = element.getBoundingClientRect();
  const proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  const overFlow = containerRect.width - (proposedLeft + newRect.width);
  element.style.float = '';
  if (proposedLeft <= 20) {
    element.style.left = '20px';
  } else if (overFlow > 20) {
    element.style.left = `${proposedLeft}px`;
  } else {
    element.style.left = '';
    element.style.right = '20px';
  }
  const windowHeight = window.innerheight;
  if (windowHeight < containerRect.height) {
    element.style.top = '10px';
    return;
  }
  const linkTop = linkRect.top - containerRect.top;
  element.style.top = '0';
  const proposedTop = linkTop + linkRect.height;
  element.style.top = `${proposedTop}px`;
}

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

  showStaticQR(id: string, parameters: string) {
    this.setState({ qr: window.quickReference[parameters] });
    const presQR = document.getElementById('id_lesson__qr__content_pres');
    if (presQR != null) {
      presQR.classList.add('lesson__hide');
    }
    // const element = document.getElementById('id_lesson__qr__content_static');
    align('id_lesson__qr__content_static', 'lesson__content', id);
    // if (element != null) {
    //   element.classList.toggle('lesson__hide');
    //   const container = document.getElementById('lesson__content');
    //   const link = document.getElementById(id);
    //   if (container != null && link != null && element != null) {
    //     const containerRect = container.getBoundingClientRect();
    //     const linkRect = link.getBoundingClientRect();
    //     alignLeft(element, linkRect, containerRect);
    //     alignTop(element, linkRect, containerRect);
    //   }
    // }
  }

  showPresQR(id: string, parameters: string) {
    const container = document.getElementById('lesson__content');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width - 40, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--lesson__qr__content_width', `calc(${width}px - 1em)`);
        doc.style.setProperty('--lesson__qr__content_height', `calc((${width}px - 1em) / 1.5)`);
      }
    }
    const staticQR = document.getElementById('id_lesson__qr__content_static');
    if (staticQR != null) {
      staticQR.classList.add('lesson__hide');
    }
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.lesson.content.showQR(path, qrid);
    align('id_lesson__qr__content_pres', 'lesson__content', id);
  }

  componentDidMount() {
    this.lesson.initialize();
    window.lessonFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    let element = document.getElementById('id_lesson__qr__content_static');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
    element = document.getElementById('id_lesson__qr__content_pres');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
  }

  render() {
    return <div
      id={this.lesson.content.htmlId}
      className="simple_lesson__container"
      // onClick={this.close.bind(this)}
    >
      {this.lesson.content.sections}
      {this.state.qr}
      <PresentationQR id="id_lesson__qr__content_pres__overlay"/>
    </div>;
  }
}
