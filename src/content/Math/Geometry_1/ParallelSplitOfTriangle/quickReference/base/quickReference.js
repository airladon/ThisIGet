// @flow
import React from 'react';
import Fig from 'figureone';
import StaticQR from '../../../../../../js/components/staticQR';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import triangle from './triangle.md';
import lines from './lines.md';
import './style.scss';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
} = Fig.tools.html;


export class QRTriangle extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      triangle: click(coll.pulseTriangle, [coll], colors.qrParallelSplitOfTriangleSides),
      parallel: click(
        coll.pulseSplit,
        [coll],
        colors.qrParallelSplitOfTriangleHighlight,
      ),
      smaller_triangle: click(
        coll.pulseSmallerTriangle,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
      same_proportion: click(
        coll.pulseEqn,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
      original_triangle: click(
        coll.pulseTriangle,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
    };
    this.setTitle('Parallel Split of a Triangle');
    this.setDescription([
      'Any |triangle| split with a line |parallel| to one of its sides will form a |smaller_triangle| whose sides all of the |same_proportion| of their corresponding sides on the |original_triangle|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.hideAll();
    // console.log(coll)
    coll._fig.showAll();
    coll._eqn.showForm('0');
    coll._eqn.setScenario('default');
    this.setDiagramSpace({ location: 'top', size: 0.7 });
    this.transformToQRWindow(coll, new Rect(-1.15, -1.2, 3.75, 2.8));
    this.diagram.animateNextFrame();
  }
}

export class QRLines extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      lines: click(
        coll.pulseLines,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
      parallel_lines: click(
        coll.pulseFig2ParallelLines,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
      third_parallel_line: click(
        coll.pulseFig2Split,
        [coll],
        colors.qrParallelSplitOfTriangleHighlight,
      ),
      equal_proportion: click(
        coll.pulseEqn,
        [coll],
        colors.qrParallelSplitOfTriangleSides,
      ),
    };
    this.setTitle('Right Angle Triangle');
    this.setDescription([
      'Any |lines| between |parallel_lines| will be split in |equal_proportion| by a |third_parallel_line|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll._fig2.showAll();
    coll._eqn.showForm('0');
    coll._eqn.setScenario('top');
    this.setDiagramSpace({ location: 'top', size: 0.7 });
    this.transformToQRWindow(coll, new Rect(-2, -2.3, 4, 3.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  TrianglePres: QRTriangle,
  LinesPres: QRLines,
  Triangle: <StaticQR
      title="Triangle Split by Parallel Line"
      content={triangle}
      link={`${details.path}/${details.uid}/summary/base?page=3`}
  />,
  Lines: <StaticQR
      title="Lines Split by Parallel Lines"
      content={lines}
      link={`${details.path}/${details.uid}/summary/base?page=3`}
  />,
});
