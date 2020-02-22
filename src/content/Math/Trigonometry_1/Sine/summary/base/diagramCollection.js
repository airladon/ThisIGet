// @flow
import Fig from 'figureone';

import diagramLayout from './layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform, Equation, DiagramElementPrimitive } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _eqn: {
    _oppContainer: DiagramElementPrimitive;
    _hypContainer: DiagramElementPrimitive;
    _sinContainer: DiagramElementPrimitive;
  } & Equation;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;

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
