// @flow
import Fig from 'figureone';
import './style.scss';
import baseLayout from '../../../../../LessonsCommon/layout';

const { Point } = Fig;

export default function lessonLayout() {
  const layout: Object = baseLayout();

  layout.triPosition = new Point(0, 0.3);
  layout.triLabelOffset = 0.04;
  layout.tri2AreaEqnPosition = new Point(-0.3, 0.7);

  return layout;
}
