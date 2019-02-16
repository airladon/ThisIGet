// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;
// const textureFile = `/static/dist/${textureMap}`;
export default class CommonCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Circle').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.diagram.addElements(this, [
    //   ['', 'abc', 'collection', {}, {}, [
    //     ['', 'wheel1', 'shapes/polygon', [{
    //       fill: true,
    //       sides: 10,
    //       radius: 1,
    //       color: [1, 1, 0, 1],
    //       point: new Point(-2, -1),
    //       textureLocation: textureFile,
    //       textureCoords: new Rect(0.3333, 0.3333, 0.3333, 0.3333),
    //     }]]]],
    // ]);
    this.hasTouchableElements = true;
  }
}
