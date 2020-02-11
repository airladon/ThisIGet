// @flow
// import Fig from 'figureone';
import QuizCollection from '../common/diagramCollectionQuiz';

export default class BaseQuizCollection extends QuizCollection {
  // eslint-disable-next-line class-methods-use-this
  showAnglesAndSides() {
    const tri = this._tri;
    tri.makeValidTriangle();
    tri.exec('showAll', ['line', 'angle2']);
    tri._angle2.setLabel('');
    // this.scenarioUnknownSine0();
    this.scenarioUnknownCosine();
    // this.scenarioUnknownHypotenuse();
    this._choice.show();
    this.diagram.animateNextFrame();
  }
}
