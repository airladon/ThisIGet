// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
// import textureMap from '../../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;
// const textureFile = `/static/dist/${textureMap}`;
export default class CommonCollection extends CommonDiagramCollection {
  _circle: DiagramElementPrimative;
  _wheel: DiagramElementPrimative;

  // appearCircleAndMoveWheel(done: () => {}) {
  //   this._circle.stop(true, true);
  //   this._wheel.stop(true, true);

  //   this._circle.hide();
  //   this._circle.setScenario('center');
  //   this._wheel.setScenario('center');

  //   const move = (cancelled: boolean) => {
  //     if (!cancelled) {
  //       this._circle.moveToScenario('right', null, done);
  //       this._wheel.moveToScenario('left');
  //     } else {
  //       this._circle.setScenario('right');
  //       this._circle.setScenario('left');
  //       done();
  //     }
  //   };

  //   this._circle.disolveIn(1, move);
  //   this.diagram.animateNextFrame(); 
  // }

  appearCircleAndMoveWheel(done: () => {}) {
    this._circle.animations.cancelAll();
    this._wheel.animations.cancelAll();

    this._circle.hide();
    this._circle.setScenario('center');
    this._wheel.setScenario('center');

    this._circle.animations.new()
      .dissolveIn(1)
      .moveTo(2, 0)
      .start();
    this._wheel.animations.new()
      .delay(1)
      .moveTo(-2, 0)
      .start();
    // const move = (cancelled: boolean) => {
    //   if (!cancelled) {
    //     this._circle.moveToScenario('right', null, done);
    //     this._wheel.moveToScenario('left');
    //   } else {
    //     this._circle.setScenario('right');
    //     this._circle.setScenario('left');
    //     done();
    //   }
    // };

    // this._circle.disolveIn(1, move);
    this.diagram.animateNextFrame(); 
  }

  

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Circle').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }
}
