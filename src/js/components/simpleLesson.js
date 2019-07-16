// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
import StaticQR from './staticQR';
import PresentationQR from './presentationQR';
// import '../../css/simpleLesson.scss';

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
  // element.classList.remove('lesson__hide');
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

// const getRadioButtonSelected = (button) => {
//   if (button.parentElement == null || button.parentElement.parentElement == null) {
//     return null;
//   }
//   const inputs = button.parentElement.parentElement.querySelectorAll('input');
//   for (let i = 0; i < inputs.length; i += 1) {
//     const input = inputs[i];
//     if (input.checked === true) {
//       return input.value;
//     }
//   }
//   return null;
// };

const checkRatioButton = (button) => {
  if (button.parentElement == null || button.parentElement.parentElement == null) {
    return;
  }
  const inputs = button.parentElement.parentElement.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const submitMark = input.parentElement.parentElement.querySelector('.lesson__quiz__radio_mark');
    submitMark.classList.remove('lesson__quiz__result_correct');
    submitMark.classList.remove('lesson__quiz__result_incorrect');
    if (input.checked === true) {
      if (input.value === 'correct') {
        submitMark.classList.add('lesson__quiz__result_correct');
      } else {
        submitMark.classList.add('lesson__quiz__result_incorrect');
      }
    }
  }
};

// Use classes:
//   lesson__quiz__answer__type_<number> - for round to number decimals
//   lesson__quiz__answer__type_string - for trimmed string
//   lesson__quiz__answer__type_integer - for integer
//   lesson__quiz__answer__type_number - for number/float/scientific
const checkEntry = (button) => {
  if (button.parentElement == null || button.parentElement.parentElement == null) {
    return;
  }
  const parent = button.parentElement.parentElement;
  const entryInput = parent.querySelector('input');
  const answerElement = parent.querySelector('.lesson__quiz__answer');
  const submitMark = parent.querySelector('.lesson__quiz__mark');
  if (answerElement == null || entryInput == null || submitMark == null) {
    return;
  }
  let answer = answerElement.innerHTML.trim().toLowerCase();
  const classes = answerElement.className.split(' ');
  let type = 'string';
  for (let i = 0; i < classes.length; i += 1) {
    const c = classes[i];
    if (c.startsWith('lesson__quiz__answer__type_')) {
      type = c.replace('lesson__quiz__answer__type_', '');
    }
  }

  // $FlowFixMe
  let { value } = entryInput;
  if (type === 'string') {
    value = value.trim().toLowerCase();
    answer = answer.trim().toLowerCase();
  }
  if (type === 'integer') {
    value = parseInt(value, 10);
    answer = parseInt(answer, 10);
  }
  if (type === 'number') {
    value = parseFloat(value);
    answer = parseFloat(answer);
  }

  const decimals = parseInt(type, 10);
  if (!Number.isNaN(decimals)) {
    value = parseFloat(value);
    answer = parseFloat(answer);
    value = Math.round(value * 10 ** decimals) / 10 ** decimals;
    answer = Math.round(answer * 10 ** decimals) / 10 ** decimals;
  }

  let correct = false;

  if (answer === value) {
    correct = true;
  }
  submitMark.classList.remove('lesson__quiz__result_correct');
  submitMark.classList.remove('lesson__quiz__result_incorrect');
  if (correct) {
    submitMark.classList.add('lesson__quiz__result_correct');
  } else {
    submitMark.classList.add('lesson__quiz__result_incorrect');
  }
};

export default class SimpleLessonComponent extends React.Component
                                    <Props, State> {
  lesson: SimpleLesson;
  key: number;
  afterUpdate: ?() => void;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
    this.state = { qr: <StaticQR content="Loading Reference" link="" title=""/> };
    this.afterUpdate = null;
  }

  showStaticQR(id: string, parameters: string) {
    this.setState({ qr: window.quickReference[parameters] });
    const presQR = document.getElementById('id_lesson__qr__pres_container');
    if (presQR != null) {
      presQR.classList.add('lesson__hide');
    }
    const element = document.getElementById('id_lesson__qr__static_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }
    align('id_lesson__qr__static_container', 'lesson__content', id);
    this.afterUpdate = () => {
      align('id_lesson__qr__static_container', 'lesson__content', id);
    };
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
    const staticQR = document.getElementById('id_lesson__qr__static_container');
    if (staticQR != null) {
      staticQR.classList.add('lesson__hide');
    }
    const element = document.getElementById('id_lesson__qr__pres_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.lesson.content.showQR(path, qrid);
    align('id_lesson__qr__pres_container', 'lesson__content', id);
    this.lesson.content.qrDiagram.resize();
    this.lesson.content.qrDiagram.animateNextFrame();
  }


  componentDidUpdate() {
    if (this.afterUpdate != null) {
      this.afterUpdate();
      this.afterUpdate = null;
    }
    const multichoiceButtons =
      document.getElementsByClassName('lesson__quiz__multichoice_submit_button');
    for (let i = 0; i < multichoiceButtons.length; i += 1) {
      const element = multichoiceButtons[i];
      element.onclick = () => {
        checkRatioButton(element);
      };
    }
    const entryButtons =
      document.getElementsByClassName('lesson__quiz__entry_submit_button');
    for (let i = 0; i < entryButtons.length; i += 1) {
      const element = entryButtons[i];
      element.onclick = () => {
        checkEntry(element);
      };
    }
  }

  componentDidMount() {
    window.lessonFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
    this.lesson.initialize();
    // console.log(elements);
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    let element = document.getElementById('id_lesson__qr__static_container');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
    element = document.getElementById('id_lesson__qr__pres_container');
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
      <div id="id_lesson__qr__static_container" className="lesson__qr__container lesson__hide">
        {this.state.qr}
      </div>
      <div id="id_lesson__qr__pres_container" className="lesson__qr__container lesson__hide">
        <PresentationQR id="id_lesson__qr__content_pres__overlay"/>
      </div>
    </div>;
  }
}
