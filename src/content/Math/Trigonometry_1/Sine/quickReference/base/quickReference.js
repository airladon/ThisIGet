// @flow
import Fig from 'figureone';
import React from 'react';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import StaticQR from '../../../../../../js/components/staticQR';
import external from './tableOfSines.md';
import './style.scss';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
} = Fig.tools.html;

export default class QRMainPres extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);
    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      sine_function: click(() => {
        const p = coll._eqn._angle.getPositionInBounds('diagram', 'center', 'middle');
        coll._eqn._sin.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._eqn._lb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._eqn._rb.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        this.diagram.animateNextFrame();
      }, [this], colors.diagram.action),
      opposite_side: click(() => {
        const p = coll._eqn._opposite.getPositionInBounds('diagram', 'center', 'middle');
        coll._eqn._opposite.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._tri._opp._label.pulseScaleNow(1, 1.2);
        this.diagram.animateNextFrame();
      }, [this], colors.components),
      angle: click(() => {
        const p = coll._eqn._angle.getPositionInBounds('diagram', 'center', 'middle');
        coll._eqn._angle.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._tri._angle.pulseScaleNow(1, 1.2);
        this.diagram.animateNextFrame();
      }, [this], colors.angles),
      hypotenuse: click(() => {
        const p = coll._eqn._hypotenuse.getPositionInBounds('diagram', 'center', 'middle');
        coll._eqn._hypotenuse.pulseScaleRelativeToPoint(p, 'diagram', 1, 1.3);
        coll._tri._hyp._label.pulseScaleNow(1, 1.2);
        this.diagram.animateNextFrame();
      }, [this], colors.lines),
    };
    this.setTitle('Sine Function');
    this.setDescription('In a |right angle triangle|, the |sine_function| of an |angle| is the ratio of the angle\'s |opposite_side| and the |hypotenuse|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll._eqn.showForm('sineFromOpp');
    coll.makeInteractive();
    this.setDiagramSpace({ location: 'top', size: 0.7 });
    this.transformToQRWindow(coll, new Rect(-1.5, -1.5, 3.5, 2.6));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  MainPres: QRMainPres,
  TableOfSines: <StaticQR
    title="Table of Sines"
    content={external}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
});
