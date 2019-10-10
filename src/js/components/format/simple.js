// @flow

import * as React from 'react';
import SimpleFormat from '../../TopicFormat/SimpleFormat';
import StaticQR from '../staticQR';
import PresentationQR from '../presentationQR';
// import '../../css/simpleFormat.scss';

type Props = {
  version: SimpleFormat;
};

type State = {
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
};

function align(qrId: string, topicId: string, linkId: string) {
  const qr = document.getElementById(qrId);
  const topic = document.getElementById(topicId);
  const link = document.getElementById(linkId);
  if (qr == null || topic == null || link == null) {
    return;
  }
  // element.classList.remove('topic__hide');
  const topicRect = topic.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  // const windowWidth = window.innerWidth;
  // if (windowWidth < topicRect.width) {
  //   qr.style.left = '20px';
  //   return;
  // }
  const linkLeft = linkRect.left - topicRect.left;
  qr.style.left = '0';
  const newRect = qr.getBoundingClientRect();
  const proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  const overFlow = topicRect.width - (proposedLeft + newRect.width);
  // console.log(proposedLeft)
  qr.style.float = '';
  if (proposedLeft <= 20) {
    qr.style.left = '20px';
  } else if (overFlow > 20) {
    qr.style.left = `${proposedLeft}px`;
  } else {
    qr.style.left = '';
    qr.style.right = '20px';
  }
  const windowHeight = window.innerheight;
  if (windowHeight < topicRect.height) {
    qr.style.top = '10px';
    return;
  }
  const linkTop = linkRect.top - topicRect.top;
  qr.style.top = '0';
  const proposedTop = linkTop + linkRect.height;
  qr.style.top = `${proposedTop}px`;
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
    const submitMark = input.parentElement.parentElement.querySelector('.approach__quiz__radio_mark');
    if (submitMark != null) {
      submitMark.classList.remove('approach__quiz__result_correct');
      submitMark.classList.remove('approach__quiz__result_incorrect');
      // $FlowFixMe
      if (input.checked === true) {
        // $FlowFixMe
        if (input.value === 'correct') {
          submitMark.classList.add('approach__quiz__result_correct');
        } else {
          submitMark.classList.add('approach__quiz__result_incorrect');
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
  let hintContent = parent.querySelector('.simple__hint_contents');
  if (hintContent == null) {
    hintContent = parent.querySelector('.simple__hint_contents_low');
  }
  if (hintContent == null) {
    return;
  }
  hintContent.classList.toggle('simple__hint_hidden');
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
  const answerElement = parent.querySelector('.approach__quiz__answer');
  const submitMark = parent.querySelector('.approach__quiz__mark');
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
    if (c.startsWith('approach__quiz__answer__type_')) {
      type = c.replace('approach__quiz__answer__type_', '');
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

  submitMark.classList.remove('approach__quiz__result_correct');
  submitMark.classList.remove('approach__quiz__result_incorrect');
  if (correct) {
    submitMark.classList.add('approach__quiz__result_correct');
  } else {
    submitMark.classList.add('approach__quiz__result_incorrect');
  }
};

export default class SimpleFormatComponent extends React.Component
                                    <Props, State> {
  version: SimpleFormat;
  key: number;
  afterUpdate: ?() => void;
  firstUpdate: boolean;

  constructor(props: Props) {
    super(props);
    this.version = props.version;
    this.key = 0;
    this.state = { qr: <StaticQR content="Loading Reference" link="" title=""/> };
    this.afterUpdate = null;
    this.firstUpdate = true;
  }

  showStaticQR(id: string, parameters: string) {
    this.setState({ qr: window.quickReference[parameters] });
    const presQR = document.getElementById('id_topic__qr__pres_container');
    if (presQR != null) {
      presQR.classList.add('topic__hide');
    }
    const element = document.getElementById('id_topic__qr__static_container');
    if (element != null) {
      element.classList.remove('topic__hide');
    }
    align('id_topic__qr__static_container', 'topic__content', id);
    this.afterUpdate = () => {
      align('id_topic__qr__static_container', 'topic__content', id);
    };
  }

  showPresQR(id: string, parameters: string) {
    const container = document.getElementById('topic__content');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width - 40, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--topic__qr__content_width', `calc(${width}px - 1em)`);
        doc.style.setProperty('--topic__qr__content_height', `calc((${width}px - 1em) / 1.5)`);
      }
    }
    const staticQR = document.getElementById('id_topic__qr__static_container');
    if (staticQR != null) {
      staticQR.classList.add('topic__hide');
    }
    const element = document.getElementById('id_topic__qr__pres_container');
    if (element != null) {
      element.classList.remove('topic__hide');
    }
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.version.content.showQR(path, qrid);
    align('id_topic__qr__pres_container', 'topic__content', id);
    this.version.content.qrDiagram.resize();
    this.version.content.qrDiagram.animateNextFrame();
  }

  showVariables() {
    Object.keys(this.version.content.variables).forEach((variableName) => {
      const element =
        document.getElementById(`id_topic__variable_${variableName}`);
      if (element == null) {
        return;
      }
      element.innerHTML = `${this.version.content.variables[variableName]}`;
    });
  }

  setVariables() {
    // Object.keys(this.version.content.setVariables).forEach((variableName) => {
    //   this.version.content.variables[variableName] =
    //     this.version.content.setVariables[variableName]();
    // });
    this.version.content.variables = this.version.content.setVariables();
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
      document.getElementsByClassName('approach__quiz__multichoice_submit_button');
    for (let i = 0; i < multichoiceButtons.length; i += 1) {
      const element = multichoiceButtons[i];
      element.onclick = () => {
        checkRatioButton(element);
      };
    }
    const entryButtons =
      document.getElementsByClassName('approach__quiz__entry_submit_button');
    for (let i = 0; i < entryButtons.length; i += 1) {
      const element = entryButtons[i];
      element.onclick = () => {
        checkEntry(element);
      };
    }

    const hints = document.getElementsByClassName('simple__hint_label');
    for (let i = 0; i < hints.length; i += 1) {
      const hint = hints[i];
      hint.onclick = () => {
        toggleHint(hint);
      };
    }

    const lowHints = document.getElementsByClassName('simple__hint_label_low');
    for (let i = 0; i < lowHints.length; i += 1) {
      const hint = lowHints[i];
      hint.onclick = () => {
        toggleHint(hint);
      };
    }
  }

  componentDidMount() {
    window.topicFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };

    this.version.initialize();
    // console.log(elements);
    this.setVariables();
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    let element = document.getElementById('id_topic__qr__static_container');
    if (element != null) {
      element.classList.add('topic__hide');
    }
    element = document.getElementById('id_topic__qr__pres_container');
    if (element != null) {
      element.classList.add('topic__hide');
    }
  }

  render() {
    return <div
      id={this.version.content.htmlId}
      className="simple_topic__container"
      // onClick={this.close.bind(this)}
    >
      <div className="simple_topic__inner_container">
        {this.version.content.sections}
        <div id="id_topic__qr__static_container" className="topic__qr__container topic__hide">
          {this.state.qr}
        </div>
        <div id="id_topic__qr__pres_container" className="topic__qr__container topic__hide">
          <PresentationQR id="id_topic__qr__content_pres__overlay"/>
        </div>
      </div>
    </div>;
  }
}
