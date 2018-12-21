// @flow
// import { DiagramElementCollection } from '../../../../js/diagram/Element';
import ImportantAnglesCollection from './diagramCollectionCircle';
// import type { ImportantAnglesCollectionType } from './diagramCollectionCircle';
import lessonLayout from './layout';
import SinCosCircleDiagram from '../../../../LessonsCommon/SinCosCircle/diagram';
// import { Point } from '../../../../js/diagram/tools/g2';

// type typeElements = {
//   _circle: extendedCircleType;
// } & DiagramElementCollection ;

// $FlowFixMe
class LessonDiagram extends SinCosCircleDiagram {
  // elements: ImportantAnglesCollectionType;

  constructor(id: string) {
    super(id, lessonLayout(), ImportantAnglesCollection);
  }

  // touchMoveHandler(
  //   previousClientPoint: Point,
  //   currentClientPoint: Point,
  // ): boolean {
  //   if (this.elements._circle._radius.state.isBeingMoved) {
  //     this.elements.enableAutoChange = true;
  //   }
  //   return super.touchMoveHandler(previousClientPoint, currentClientPoint);
  // }
}

export default LessonDiagram;
