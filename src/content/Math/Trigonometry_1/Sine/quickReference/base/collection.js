// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
// import diagramLayout from './layout';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _eqn: {
    _oppContainer: DiagramElementPrimitive;
    _hypContainer: DiagramElementPrimitive;
    _sinContainer: DiagramElementPrimitive;
    _sin: DiagramElementPrimitive;
    _lb: DiagramElementPrimitive;
    _rb: DiagramElementPrimitive;
    _angle: DiagramElementPrimitive;
    _opposite: DiagramElementPrimitive;
    _hypotenuse: DiagramElementPrimitive;
  } & Equation;

  _tri: {
    _opp: { _label: Equation } & DiagramObjectLine;
    _hyp: { _label: Equation } & DiagramObjectLine;
    _angle: { _label: Equation } & DiagramObjectAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform(),
  ) {
    // console.log(transform)
    // const layout = diagramLayout();
    super(diagram, layout, transform);

    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
  }

  makeInteractive() {
    const eqn = this._eqn;
    eqn._oppContainer.makeTouchable();
    // eqn._oppContainer.interactiveLocation = new Point(0.3, 0.15);
    eqn._oppContainer.onClick = () => {
      const form = eqn.getCurrentForm().name;
      let name = 'oppFromSine';
      if (form.slice(0, 3) === 'hyp') {
        name = 'oppFromHyp';
      }
      eqn.goToForm({
        name, duration: 2, animate: 'move', ifAnimating: { cancelGoTo: false, skipToTarget: false },
      });
      this.diagram.animateNextFrame();
    };
    eqn._hypContainer.makeTouchable();
    eqn._hypContainer.onClick = () => {
      const form = eqn.getCurrentForm().name;
      let name = 'hypFromSine';
      if (form.slice(0, 3) === 'opp') {
        name = 'hypFromOpp';
      }
      eqn.goToForm({
        name, duration: 2, animate: 'move', ifAnimating: { cancelGoTo: false, skipToTarget: false },
      });
      this.diagram.animateNextFrame();
    };
    eqn._sinContainer.makeTouchable();
    eqn._sinContainer.onClick = () => {
      const form = eqn.getCurrentForm().name;
      let name = 'sineFromOpp';
      if (form.slice(0, 3) === 'hyp') {
        name = 'sineFromHyp';
      }
      eqn.goToForm({
        name, duration: 2, animate: 'move', ifAnimating: { cancelGoTo: false, skipToTarget: false },
      });
      this.diagram.animateNextFrame();
    };
  }
}
