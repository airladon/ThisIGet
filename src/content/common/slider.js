// @flow
import Fig from 'figureone';

const {
  DiagramElementCollection, DiagramElementPrimitive, Point, Transform,
} = Fig;

export type sliderType = {
  _value: DiagramElementPrimitive;
  _negValue: DiagramElementPrimitive;
  _circle: DiagramElementPrimitive;
  travel: number;
  start: number;
  setValue: (number) => void;
  getValue: () => number;
  setCallback: (mixed => mixed) => void;
} & DiagramElementCollection;

export type sliderOptions = {
  position: Point;
  length: number;
  width: number;
  circleWidth: number;
  colorPos: Array<number>;
  colorNeg: Array<number>;
  circleSides: number;
};

export default function makeSlider(
  shapes: Object,
  options: sliderOptions,
  // position: Point,
  // length: number,
  // width: number,
  // circleWidth: number,
  // colorPos: Array<number>,
  // colorNeg: Array<number>,
  // circleSides: number,
) {
  const slider = shapes.collection(new Transform()
    .scale(1, 1).rotate(0).translate(options.position));
  const travel = options.length - options.circleWidth;
  const start = options.circleWidth / 2;
  slider.travel = travel;
  slider.start = start;

  // const y = -layout.slide.circleWidth / 2;
  const value = shapes.horizontalLine(
    new Point(0, 0), options.length, options.width,
    0, options.colorPos, new Transform().scale(1, 1).rotate(0).translate(0, 0),
  );

  const negValue = shapes.horizontalLine(
    new Point(0, 0), options.length, options.width,
    0, options.colorNeg, new Transform().rotate(Math.PI).scale(1, 1).translate(options.length, 0),
  );

  const circle = shapes.polygon({
    fill: true,
    sides: options.circleSides,
    radius: options.circleWidth,
    color: options.colorPos,
    point: new Point(0, 0),
  });

  circle.isTouchable = true;
  circle.isMovable = true;
  circle.move.bounds = { translation: new Rect(start, 0, travel, 0) };
  // circle.move.minTransform.updateTranslation(start, 0);
  // circle.move.maxTransform.updateTranslation(start + travel, 0);
  circle.move.bounce = false;
  circle.move.canBeMovedAfterLosingTouch = true;
  slider.hasTouchableElements = true;

  slider.add('value', value);
  slider.add('negValue', negValue);
  slider.add('circle', circle);

  slider.getValue = () => {
    const t = slider._circle.transform.t();
    if (t) {
      return (t.x - slider.start) / slider.travel;
    }
    return 0;
  };
  slider.setValue = (percent: number) => {
    slider._circle.transform.updateTranslation(percent * travel + start, 0);
    slider._negValue.transform.updateScale(1 - percent, 1);
  };
  slider.setCallback = (callback: mixed => mixed) => {
    slider.externalCallback = callback;
  };
  slider.update = () => {
    const percent = slider.getValue();
    slider._negValue.transform.updateScale(1 - percent, 1);
    slider.externalCallback();
  };
  slider._circle.setTransformCallback = slider.update;
  return slider;
}
