// @flow
import Fig from 'figureone';

const {
  Diagram, Transform, Point, DiagramElementCollection, DiagramElementPrimative,
} = Fig;

const { parsePoint } = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

export type TypeMessages = {
  _correct: DiagramElementPrimative;
  _incorrect: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeButton = {
  enable: () => void;
  disable: () => void;
} & DiagramElementPrimative;

// $FlowFixMe
const CommonQuizMixin = superclass => class extends superclass {
  _check: TypeButton;
  _newProblem: TypeButton;
  _showAnotherAnswer: TypeButton;
  +_messages: TypeMessages;
  answers: any;
  answer: any;
  answerIndex: number;

  tryAgain() {
    this._messages.hideAll();
    if (this._check != null) {
      this._check.show();
      this._check.enable();
    }
    if (this._choice != null) {
      this._choice.show();
      this._choice.enable();
      this.selectMultipleChoice(this._choice.id, -1);
    }
    this.hasTouchableElements = true;
    if (this._input != null) {
      this._input.show();
      this._input.enable();
      this._input.setValue('');
    }
    this.diagram.animateNextFrame();
    this.diagram.lesson.enableInteractiveItems();
  }

  // eslint-disable-next-line class-methods-use-this
  setupNewProblem() {}

  newProblem() {
    if (this._question) {
      this._question.show();
    }
    this._messages.hideAll();
    this._newProblem.hide();
    this._showAnotherAnswer.hide();
    if (this._input != null) {
      this._input.show();
      this._input.enable();
      this._input.setValue('');
    }
    if (this._check != null) {
      this._check.show();
      this._check.enable();
    }
    if (this._choice != null) {
      this._choice.show();
      this._choice.enable();
      this.selectMultipleChoice(this._choice.id, -1);
    }
    this.hasTouchableElements = true;
    this.answerIndex = -1;
    this.setupNewProblem();
    this.diagram.lesson.updateInteractiveItems();
    this.diagram.animateNextFrame();
  }

  transitionToNewProblem(optionsIn: Object = {}) {
    const defaultOptionsIn = {
      target: 'quiz',
      duration: 1,
    };
    const options = joinObjects({}, defaultOptionsIn, optionsIn);
    if (this._input != null) {
      this._input.disable();
      this._input.setValue('');
    }
    if (this._check != null) {
      this._check.disable();
    }
    if (this._choice != null) {
      this._choice.disable();
      this.selectMultipleChoice(this._choice.id, -1);
    }
    this.animations.new()
      .scenarios(options)
      .whenFinished(this.afterTransitionToNewProblem.bind(this))
      .start();
    this.diagram.animateNextFrame();
  }

  afterTransitionToNewProblem() {
    if (this._input != null) {
      this._input.enable();
      this._input.setValue('');
    }
    if (this._check != null) {
      this._check.show();
      this._check.enable();
    }
    if (this._choice != null) {
      this._choice.show();
      this._choice.enable();
      this.selectMultipleChoice(this._choice.id, -1);
    }
    this.diagram.lesson.enableInteractiveItems();
  }

  showCheck() {
    if (this._check != null) {
      this._check.show();
      this._check.enable();
    }
  }

  checkAnswer() {
    if (this._check != null) {
      this._check.disable();
    }
    if (this._choice != null) {
      this._choice.disable();
    }
    this.diagram.lesson.disableInteractiveItems();
    this.hasTouchableElements = false;
    const answer = this.findAnswer();
    if (answer === 'correct') {
      this._messages.hideAll();
      this._messages._correct.show();
    } else if (answer === 'incorrect') {
      this._messages.hideAll();
      this._messages._incorrect.show();
    } else {
      this._messages.hideAll();
      this._messages[`_${answer}`].show();
    }
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  findAnswer() {
    return 'incorrect';
  }

  // eslint-disable-next-line class-methods-use-this
  showAnswer() {
    this.hasTouchableElements = false;
    this._messages.hideAll();
    this._newProblem.show();
    if (this._input != null) {
      this._input.disable();
      this._input.setValue(this.answer);
    }
    if (this._check != null) {
      this._check.hide();
      this._check.disable();
    }
    if (this._choice != null) {
      this._choice.disable();
    }
    this.answerIndex = (this.answerIndex + 1) % this.answers.length;
    if (this.answers.length > 1) {
      this._showAnotherAnswer.show();
    }
  }

  constructor(
    diagram: Diagram,
    layout: Object = { colors: {} },
    id: string = Math.round(Math.random() * 10000).toString(),
    messages: Object = {},
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
    // this.add('check', this.makeCheckButton(id));
    this.add('newProblem', this.makeNewProblemButton(id));
    this.add('messages', this.makeQuizAnswerMessages(id, messages));
    this.add('showAnotherAnswer', this.makeShowAnotherAnswerButton(id));
    this._messages.hideAll();
    this.answers = [];
    this.answer = '';
    this.id = id;
    // this.answerIndex = -1;
  }

  addCheck(
    id: string = this.id,
  ) {
    this.add('check', this.makeCheckButton(id));
  }

  addMultipleChoice(
    id: string = this.id,
    choices: Array<string>,
  ) {
    this.add('choice', this.makeMultipleChoice(id, choices));
    this._choice.setPosition(this.layout.quiz.choice);
  }

  addQuestion(optionsIn: {
    size?: number,
    style?: 'normal' | 'italics',
    family?: string,
    hAlign?: 'left' | 'right' | 'center',
    vAlign?: 'bottom' | 'top' | 'middle' | 'baseline',
    text?: string,
    color?: Array<number>,
    position?: Point | [number, number],
  } = {}) {
    const defaultOptions = {
      size: 0.18,
      style: 'normal',
      family: 'helvetica',
      hAlign: 'left',
      vAlign: 'baseline',
      text: '',
      color: this.layout.colors.diagram.text.base,
      position: new Point(-2.7, 1.5),
    };
    const options = joinObjects({}, defaultOptions, optionsIn);
    options.position = parsePoint(options.position);
    const question = this.diagram.shapes.text(options);
    this.add('question', question);
  }

  makeAnswerBox(
    id: string,
    answerText: string,
    detailsText: string = '',
    incorrectBox: boolean = true,
  ) {
    const container = document.createElement('div');
    container.classList.add('approach__quiz__answer_container');
    if (incorrectBox) {
      container.classList.add('approach__quiz__answer_incorrect');
    } else {
      container.classList.add('approach__quiz__answer_correct');
    }

    const answer = document.createElement('div');
    answer.classList.add('approach__quiz__answer_text');
    answer.innerHTML = answerText;
    container.appendChild(answer);

    if (detailsText) {
      const details = document.createElement('div');
      details.classList.add('approach__quiz__answer_details_text');
      details.innerHTML = detailsText;
      container.appendChild(details);
    }

    const nextSteps = document.createElement('div');
    nextSteps.classList.add('approach__quiz__next_steps');
    container.appendChild(nextSteps);

    if (incorrectBox) {
      const tryAgain = document.createElement('div');
      tryAgain.classList.add('approach__quiz__button');
      tryAgain.classList.add('approach__quiz__button_fixed_size');
      tryAgain.innerHTML = 'Try Again';
      tryAgain.onclick = this.tryAgain.bind(this);
      nextSteps.appendChild(tryAgain);

      const showAnswer = document.createElement('div');
      showAnswer.classList.add('approach__quiz__button');
      showAnswer.classList.add('approach__quiz__button_fixed_size');
      showAnswer.innerHTML = 'Show Answer';
      showAnswer.onclick = this.showAnswer.bind(this);
      nextSteps.appendChild(showAnswer);
    }

    const newProblem = document.createElement('div');
    newProblem.classList.add('approach__quiz__button');
    newProblem.classList.add('approach__quiz__button_fixed_size');
    newProblem.innerHTML = 'Try New Problem';
    newProblem.onclick = this.newProblem.bind(this);
    nextSteps.appendChild(newProblem);


    const html = this.diagram.shapes.htmlElement(
      container,
      `id__quiz_answer_box__${id}`,
      '',
      new Point(0, 0),
      'middle',
      'center',
    );
    return html;
  }

  makeQuizAnswerMessages(id: string, incorrectMessages: Object = {}) {
    const collection = this.diagram.shapes.collection(new Transform().translate(0, 0));
    collection.add('correct', this.makeAnswerBox(`correct_${id}`, 'Correct!', '', false));
    collection.add('incorrect', this.makeAnswerBox(`incorrect_${id}`, 'Incorrect!'));

    Object.keys(incorrectMessages).forEach((key) => {
      const message = incorrectMessages[key].answer;
      const subMessage = incorrectMessages[key].details;
      collection.add(key, this.makeAnswerBox(`${key}_${id}`, message, subMessage));
    });
    return collection;
  }

  makeButton(id: string, label: string, callback: Function, position: Point) {
    const button = document.createElement('div');
    button.classList.add('approach__quiz__button');
    button.innerHTML = label;
    button.onclick = callback;
    const html = this.diagram.shapes.htmlElement(
      button,
      `id__lesson_quiz_button_${id}`,
      '',
      position,
      'middle',
      'center',
    );
    html.isInteractive = true;

    html.disable = () => {
      html.isInteractive = false;
      button.classList.add('approach__quiz__button_disabled');
    };
    html.enable = () => {
      html.isInteractive = true;
      button.classList.remove('approach__quiz__button_disabled');
    };
    return html;
  }

  makeCheckButton(id: string) {
    const button = this.makeButton(
      `check__${id}`, 'Check', this.checkAnswer.bind(this), this.layout.quiz.check,
    );
    button.interactiveLocation = 'topRight';
    // button.interactiveLocation = new Point(0.26, 0.12);
    return button;
  }

  makeNewProblemButton(id: string) {
    const button = this.makeButton(
      `new_problem__${id}`, 'New Problem', this.newProblem.bind(this),
      this.layout.quiz.newProblem,
    );
    button.interactiveLocation = 'topRight';
    return button;
  }

  makeShowAnotherAnswerButton(id: string) {
    const button = this.makeButton(
      `show_another_answer__${id}`, 'Show Another Answer', this.showAnswer.bind(this),
      this.layout.quiz.showAnotherAnswer,
    );
    button.interactiveLocation = 'topRight';
    return button;
  }

  addInput(
    id: string,
    defaultText: string = '',
    numDigits: number = 10,
    decimalPlaces: number = 0,
  ) {
    this.add('input', this.makeEntryBox(id, defaultText, numDigits, decimalPlaces));
    this._input.interactiveLocation = 'topRight';
    if (this.layout.quiz) {
      if (this.layout.quiz.input) {
        this._input.setPosition(this.layout.quiz.input);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  makeEntryBox(
    id: string,
    placeholder: string = '',
    numDigits: number = 10,
    decimalPlaces: number = 0,
  ) {
    const container = document.createElement('div');
    container.classList.add('approach__quiz_input_container');
    // const form = document.createElement('form');
    // container.appendChild(form);
    const input = document.createElement('input');
    input.classList.add('approach__quiz_input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);
    input.onkeypress = (event) => {
      if (event.keyCode === 13) {
        this.checkAnswer();
      }
    };
    input.oninput = () => {
      const str = input.value.slice();
      let validStr = '';
      let decimalCount = 0;
      let decimal = false;
      for (let i = 0; i < str.length; i += 1) {
        if (validStr.length >= numDigits) {
          i = str.length;
        } else {
          const char = str.charAt(i);
          if (
            (char >= '0' && char <= '9')
            || (char === '.' && decimalPlaces > 0)) {
            let valid = true;
            if (decimal === false && char === '.') {
              decimal = true;
            } else if (decimal === true && char === '.') {
              valid = false;
            } else if (decimal === true) {
              decimalCount += 1;
              if (decimalCount > decimalPlaces) {
                valid = false;
              }
            }
            if (valid) {
              validStr = `${validStr}${char}`;
            }
          }
        }
      }
      input.value = `${validStr}`;
    };
    container.appendChild(input);
    const html = this.diagram.shapes.htmlElement(
      container,
      `id__quiz_input__${id}`,
      '',
      new Point(0, 0),
      'middle',
      'center',
    );
    html.isInteractive = true;
    html.getValue = () => input.value;
    html.setValue = (value: number | string) => {
      if (typeof value === 'number') {
        input.value = value.toString();
      } else {
        input.value = value;
      }
    };
    html.disable = () => {
      input.disabled = true;
      html.isInteractive = false;
      input.classList.add('approach__quiz_input_disabled');
    };
    html.enable = () => {
      input.disabled = false;
      html.isInteractive = true;
      input.classList.remove('approach__quiz_input_disabled');
    };
    return html;
  }

  // eslint-disable-next-line class-methods-use-this
  selectMultipleChoice(id: string, index: number = -1) {
    const indexStr = 'id_approach__quiz_multiple_choice_box_';
    const answerSelected = 'approach__quiz_multiple_choice_box_answer__selected';
    const circleSelected = 'approach__quiz_multiple_choice_box_circle__selected';
    const elementSelected = 'approach__quiz_multiple_choice_box__selected';

    const selected = document.getElementsByClassName(elementSelected);
    const selectedLength = selected.length;
    if (selected) {
      for (let i = 0; i < selectedLength; i += 1) {
        const element = selected[0];
        element.classList.remove(answerSelected);
        element.classList.remove(circleSelected);
        element.classList.remove(elementSelected);
      }
    }
    if (index > -1) {
      const circle = document.getElementById(`${indexStr}circle__${id}_${index}`);
      const answer = document.getElementById(`${indexStr}answer__${id}_${index}`);
      if (circle instanceof HTMLElement && answer instanceof HTMLElement) {
        circle.classList.add(circleSelected);
        circle.classList.add(elementSelected);
        answer.classList.add(answerSelected);
        answer.classList.add(elementSelected);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getMultipleChoiceSelection(id: string) {
    const elementSelected = 'approach__quiz_multiple_choice_box__selected';
    const selected = document.getElementsByClassName(elementSelected);
    for (let i = 0; i < selected.length; i += 1) {
      const idIndex = selected[i].id.replace('id_approach__quiz_multiple_choice_box_circle__', '');
      const idString = idIndex.replace(/_[0-9]*$/, '');
      if (idString === id) {
        return parseInt(idIndex.replace(`${idString}_`, ''), 10);
      }
    }
    return -1;
  }


  makeMultipleChoice(
    id: string,
    answers: Array<string>,
  ) {
    const table = document.createElement('table');
    table.classList.add('approach__quiz_multiple_choice_box_table');
    answers.forEach((answer, index) => {
      const row = document.createElement('tr');
      row.classList.add('approach__quiz_multiple_choice_box_row');
      row.onclick = this.selectMultipleChoice.bind(this, id, index);
      const col1 = document.createElement('td');
      col1.classList.add('approach__quiz_multiple_choice_box_col1');
      const col2 = document.createElement('td');
      col2.classList.add('approach__quiz_multiple_choice_box_col2');
      const circle = document.createElement('div');
      circle.classList.add('approach__quiz_multiple_choice_box_circle');
      circle.id = `id_approach__quiz_multiple_choice_box_circle__${id}_${index}`;
      const answerText = document.createElement('div');
      answerText.classList.add('approach__quiz_multiple_choice_box_answer');
      answerText.id = `id_approach__quiz_multiple_choice_box_answer__${id}_${index}`;
      answerText.innerHTML = answer;
      row.appendChild(col1);
      row.appendChild(col2);
      col1.appendChild(circle);
      col2.appendChild(answerText);
      table.appendChild(row);
    });
    const html = this.diagram.shapes.htmlElement(
      table,
      `id__quiz_multiple_choice_box__${id}`,
      '',
      new Point(0, 0),
      'left',
      'top',
    );
    html.enable = (doEnable: boolean = true) => {
      const { element } = html.drawingObject;
      const classStr = 'approach__quiz_multiple_choice_box_answer__disable';
      if (doEnable) {
        element.classList.remove(classStr);
      } else {
        element.classList.add(classStr);
      }
    };
    html.disable = () => { html.enable(false); };
    return html;
  }
};

export default CommonQuizMixin;
