// @flow
// import Fig from 'figureone';
import './style.scss';
import commonLessonLayout from '../common/layout';
// import { Point } from '../../../../../../js/diagram/tools/g2';

// const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = commonLessonLayout();

  layout.angleA.options.label.scale = 1.2;
  layout.angleB.options.label.scale = 1.2;
  layout.angleC.options.label.scale = 1.2;

  return layout;
}
