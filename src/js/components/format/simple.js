// @flow

import * as React from 'react';
import SimpleFormat from '../../Lesson/SimpleFormat';
import StaticQR from '../staticQR';
import PresentationQR from '../presentationQR';
// import '../../css/simpleLesson.scss';

type Props = {
  lesson: SimpleFormat;
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

// Can also use html options like id="ID_TO_USE":
//   <quiz multichoice id="ID_TO_USE">
//     - option 1
//     + option 2
//     - option 1
//   </quiz>
const checkRatioButton = (button) => {
  if (button.parentElement == null || button.parentElement.parentElement == null) {
    return;
  }
  const inputs = button.parentElement.parentElement.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    // $FlowFixMe
    const submitMark = input.parentElement.parentElement.querySelector('.lesson__quiz__radio_mark');
    if (submitMark != null) {
      submitMark.classList.remove('lesson__quiz__result_correct');
      submitMark.classList.remove('lesson__quiz__result_incorrect');
      // $FlowFixMe
      if (input.checked === true) {
        // $FlowFixMe
        if (input.value === 'correct') {
          submitMark.classList.add('lesson__quiz__result_correct');
        } else {
          submitMark.classList.add('lesson__quiz__result_incorrect');
        }
      }
    }
  }
};

const toggleHint = (hint) => {
  const parent = hint.parentElement;
  if (parent == null) {
    return;
  }
  let hintContent = parent.querySelector('.lesson__hint_contents');
  if (hintContent == null) {
    hintContent = parent.querySelector('.lesson__hint_contents_low');
  }
  if (hintContent == null) {
    return;
  }
  hintContent.classList.toggle('lesson__hint_hidden');
};

// Use classes:
//   entryNumber - for number/float/scientific
//   entry<number> - for round to number decimals
//     e.g. entry2 - for 2 decimal places
//   entryString - for trimmed string
//   entry - defaults to string
//
// Can also use html options like id="ID_TO_USE":
//   <quiz entry2 id="ID_TO_USE">2.11</quiz>
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
  if (answerElement.children.length > 0) {
    answer = answerElement.children[0].innerHTML.trim().toLowerCase();
  }
  const classes = answerElement.className.split(' ');
  let type = 'string';
  for (let i = 0; i < classes.length; i += 1) {
    const c = classes[i];
    if (c.startsWith('lesson__quiz__answer__type_')) {
      type = c.replace('lesson__quiz__answer__type_', '');
    }
  }

  let correct = false;
  // $FlowFixMe
  let { value } = entryInput;
  if (type === 'string') {
    value = value.trim().toLowerCase();
    answer = answer.trim().toLowerCase();
    if (value.toLowerCase() === answer.toLowerCase()) {
      correct = true;
    }
  }
  if (type === 'integer') {
    value = parseInt(value, 10);
    answer = parseInt(answer, 10);
    if (Math.round((answer - value) * 1e8) / 1e8 === 0) {
      correct = true;
    }
  }
  if (type === 'number') {
    value = parseFloat(value);
    answer = parseFloat(answer);
    if (Math.round((answer - value) * 1e8) / 1e8 === 0) {
      correct = true;
    }
  }

  const decimals = parseInt(type, 10);
  if (!Number.isNaN(decimals)) {
    value = parseFloat(value);
    answer = parseFloat(answer);
    value = Math.round(value * 10 ** decimals) / 10 ** decimals;
    answer = Math.round(answer * 10 ** decimals) / 10 ** decimals;
    if (Math.round((answer - value) * 10 ** (decimals + 1)) / 10 ** (decimals + 1) === 0) {
      correct = true;
    }
  }

  submitMark.classList.remove('lesson__quiz__result_correct');
  submitMark.classList.remove('lesson__quiz__result_incorrect');
  if (correct) {
    submitMark.classList.add('lesson__quiz__result_correct');
  } else {
    submitMark.classList.add('lesson__quiz__result_incorrect');
  }
};

export default class SimpleFormatComponent extends React.Component
                                    <Props, State> {
  lesson: SimpleFormat;
  key: number;
  afterUpdate: ?() => void;
  firstUpdate: boolean;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
    this.state = { qr: <StaticQR content="Loading Reference" link="" title=""/> };
    this.afterUpdate = null;
    this.firstUpdate = true;
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

  showVariables() {
    Object.keys(this.lesson.content.variables).forEach((variableName) => {
      const element =
        document.getElementById(`id_lesson__variable_${variableName}`);
      if (element == null) {
        return;
      }
      element.innerHTML = `${this.lesson.content.variables[variableName]}`;
    });
  }

  setVariables() {
    // Object.keys(this.lesson.content.setVariables).forEach((variableName) => {
    //   this.lesson.content.variables[variableName] =
    //     this.lesson.content.setVariables[variableName]();
    // });
    this.lesson.content.variables = this.lesson.content.setVariables();
  }

  componentDidUpdate() {
    if (this.afterUpdate != null) {
      this.afterUpdate();
      this.afterUpdate = null;
    }
    if (this.firstUpdate) {
      this.showVariables();
      this.firstUpdate = false;
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

    const hints = document.getElementsByClassName('lesson__hint_label');
    for (let i = 0; i < hints.length; i += 1) {
      const hint = hints[i];
      hint.onclick = () => {
        toggleHint(hint);
      };
    }

    const lowHints = document.getElementsByClassName('lesson__hint_label_low');
    for (let i = 0; i < lowHints.length; i += 1) {
      const hint = lowHints[i];
      hint.onclick = () => {
        toggleHint(hint);
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
    this.setVariables();
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
