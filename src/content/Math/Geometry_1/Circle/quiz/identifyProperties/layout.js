// @flow
import Fig from 'figureone';
import commonLessonLayout from '../../explanation/base/layout';

const { Point } = Fig.tools.g2;
const { joinObjects } = Fig.tools.misc;
// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;
  const radius = 0.6;
  const width = 0.06;

  const radiusElement = {
    name: 'radius',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.property,
      vertexSpaceStart: 'start',
    },
  };
  const diameterElement = {
    name: 'diameter',
    method: 'line',
    options: {
      length: radius * 2,
      width,
      color: colors.property,
      vertexSpaceStart: 'center',
    },
  };
  const circumferenceElement = {
    name: 'circumference',
    method: 'polygon',
    options: {
      sides: 100,
      color: colors.property,
      width,
      radius,
    },
  };

  const centerElement = {
    name: 'center',
    method: 'polygon',
    options: {
      sides: 30,
      fill: true,
      color: colors.property,
      radius: radius * 0.1,
    },
  };

  const fill = {
    name: 'fill',
    method: 'polygon',
    options: {
      radius,
      fill: true,
      color: layout.colors.circleFill,
      sides: 100,
    },
    mods: {
      isTouchable: true,
    },
  };

  const cover = {
    name: 'cover',
    method: 'polygon',
    options: {
      fill: true,
      radius,
      color: [0, 0, 0, 0.6],
      sides: 100,
    },
  };

  const quizCircle = {
    method: 'collection',
    mods: {
      scenarios: {
        topLeft: { position: new Point(-1, 0.5) },
        topRight: { position: new Point(1, 0.5) },
        bottomLeft: { position: new Point(-1, -1) },
        bottomRight: { position: new Point(1, -1) },
      },
      hasTouchableElements: true,
    },
    addElements: [
      fill,
      radiusElement,
      diameterElement,
      circumferenceElement,
      centerElement,
      cover,
    ],
  };

  const questionText = {
    method: 'text',
    options: {
      size: 0.2,
      style: 'normal',
      family: 'helvetica',
      hAlign: 'left',
      vAlign: 'baseline',
    },
  };

  layout.question = joinObjects({}, questionText, {
    name: 'question',
    options: {
      text: 'Select the circle that shows a:',
      color: colors.diagram.text.base,
      position: new Point(-2, 1.5),
    },
  });

  layout.answer = joinObjects({}, questionText, {
    name: 'answer',
    options: {
      text: '',
      color: colors.property,
      position: new Point(0.85, 1.5),
      weight: 800,
    },
  });

  layout.quizCircle1 = joinObjects({}, quizCircle, {
    name: 'circle1',
    scenario: 'topLeft',
  });
  layout.quizCircle2 = joinObjects({}, quizCircle, {
    name: 'circle2',
    scenario: 'topRight',
  });
  layout.quizCircle3 = joinObjects({}, quizCircle, {
    name: 'circle3',
    scenario: 'bottomLeft',
  });
  layout.quizCircle4 = joinObjects({}, quizCircle, {
    name: 'circle4',
    scenario: 'bottomRight',
  });


  layout.addQuizElements = [
    layout.quizCircle1,
    layout.quizCircle2,
    layout.quizCircle3,
    layout.quizCircle4,
    layout.question,
    layout.answer,
  ];

  return layout;
}
