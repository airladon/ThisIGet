// @flow
import Fig from 'figureone';
// import { DiagramElementCollection } from '../../../../js/diagram/Element';
// import SinCosCircle from './SinCosCircle';
import type { SineCollectionType } from './SinCosCircle';
// import lessonLayout from './layout';
import AngleCircleDiagram from '../AngleCircle/diagram';

const { Point } = Fig;

// type typeElements = {
//   _circle: extendedCircleType;
// } & DiagramElementCollection ;

// $FlowFixMe
class SinCosCircleDiagram extends AngleCircleDiagram {
  elements: SineCollectionType;

  // constructor(id: string, lessonLayout: Object, SinCosCircleCollection: Function) {
  //   super(id, lessonLayout, SinCosCircleCollection);
  // }

  touchMoveHandler(
    previousClientPoint: Point,
    currentClientPoint: Point,
  ): boolean {
    if (this.elements._circle._radius.state.isBeingMoved) {
      this.elements.enableAutoChange = true;
    }
    return super.touchMoveHandler(previousClientPoint, currentClientPoint);
  }
}

export default SinCosCircleDiagram;
