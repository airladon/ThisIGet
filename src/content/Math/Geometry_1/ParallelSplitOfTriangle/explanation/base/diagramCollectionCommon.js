// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri: DiagramObjectPolyLine;
    _rightAngle: DiagramObjectAngle;
    _split: DiagramObjectLine;
    _splitRightAngle: DiagramObjectAngle;
    _splitTri: DiagramObjectPolyLine;
    _labelM: DiagramObjectLine;
    _labelN: DiagramObjectLine;
    _area1: DiagramElementPrimitive;
    _area2: DiagramElementPrimitive;
    _area3: DiagramElementPrimitive;
    _construction: DiagramObjectLine;
  } & DiagramElementCollection;

  _fig2: {
    _tri: DiagramObjectPolyLine;
    _topTri: DiagramObjectPolyLine;
    _hSplit: DiagramObjectLine;
    _vSplit: DiagramObjectLine;
    _rightAngle: DiagramObjectAngle;
    _splitRightAngle: DiagramObjectAngle;
    _labelM: DiagramObjectLine;
    _labelN: DiagramObjectLine;
    _labelB: {
      _label: DiagramElementPrimitive;
    } & DiagramObjectLine;
    _B1: DiagramElementPrimitive;
    _B2: DiagramElementPrimitive;
    _rH: DiagramElementPrimitive;
    _topLeftTri: {
      _side01: {
        _label: DiagramElementPrimitive;
      } & DiagramObjectLine;
      _side20: {
        _label: DiagramElementPrimitive;
      } & DiagramObjectLine;
    } & DiagramObjectPolyLine;
    _topRightTri: {
      _side12: {
        _label: DiagramElementPrimitive;
      } & DiagramObjectLine;
      _side20: {
        _label: DiagramElementPrimitive;
      } & DiagramObjectLine;
    } & DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _fig3: {
    _topLine: DiagramObjectLine;
    _bottomLine: DiagramObjectLine;
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _split: DiagramObjectLine;
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
    _tri3: DiagramObjectPolyLine;
    _right1: DiagramObjectAngle;
    _right2: DiagramObjectAngle;
    _right3: DiagramObjectAngle;
    _height1: DiagramObjectLine;
    _height2: DiagramObjectLine;
    _height3: DiagramObjectLine;
  } & DiagramElementCollection;


  _0Eqn: Equation;
  _1Eqn: Equation;
  _2Eqn: Equation;
  _3Eqn: Equation;
  _4Eqn: Equation;
  _5Eqn: Equation;
  _6Eqn: Equation;
  _7Eqn: Equation;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this._1Eqn.eqn.formRestart = { pulse: { element: this._0Eqn, duration: 1, scale: 1.1 } };
    this._2Eqn.eqn.formRestart = { pulse: { element: this._1Eqn, duration: 1, scale: 1.1 } };
    this._3Eqn.eqn.formRestart = { pulse: { element: this._2Eqn, duration: 1, scale: 1.1 } };
    this._6Eqn.eqn.formRestart = { pulse: { element: this._5Eqn, duration: 1, scale: 1.1 } };
    this._7Eqn.eqn.formRestart = { pulse: { element: this._6Eqn, duration: 1, scale: 1.1 } };
    this.setupFig4EqnLinks();
  }

  // pulseSplit(done: ?() => void = null) {
  //   this._fig._split.pulseWidth({ done });
  //   this.diagram.animateNextFrame();
  // }

  drawSplit(done: ?() => void = null) {
    this._fig._split.grow(0, 1.5, true, done);
    this.diagram.animateNextFrame();
  }

  pulseRightAngles(done: ?() => void = null) {
    this._fig._rightAngle.pulseScaleNow(1, 1.3);
    this._fig._splitRightAngle.pulseScaleNow(1, 1.3, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseSplitTriangle(done: ?() => void = null) {
    this._fig._splitTri.pulseScaleNow(1, 1.1, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseAreaLabels(done: ?() => void = null) {
    this._fig._area1.pulseScaleNow(1, 1.5, 0, done);
    this._fig._area2.pulseScaleNow(1, 1.5);
    this._fig._area3.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  growFig2Split(done: ?() => void = null) {
    this._fig2._hSplit.grow(0, 1.5, true, done);
    this.diagram.animateNextFrame();
  }

  growFig2VSplit(done: ?() => void = null) {
    this._fig2._vSplit.stop(false, false);
    this._fig2._rightAngle.hide();
    this._fig2._splitRightAngle.hide();
    this._fig2._vSplit.grow(0.05, 1.5, true, () => {
      this._fig2._rightAngle.showAll();
      this._fig2._splitRightAngle.showAll();
      if (done != null) {
        done();
      }
    });
    this.diagram.animateNextFrame();
  }

  toggleOriginalTriangle() {
    if (this._fig2._labelM.isShown) {
      this._fig2._labelM.hide();
      this._fig2._labelN.hide();
      this._fig2._labelB.hide();
    } else {
      this._fig2._labelM.showAll();
      this._fig2._labelN.showAll();
      this._fig2._labelB.showAll();
    }
    this.diagram.animateNextFrame();
  }

  toggleSplitTriangle() {
    if (this._fig2._topTri.isShown) {
      this._fig2._topTri.hide();
    } else {
      this._fig2._topTri.showAll();
    }
    this.diagram.animateNextFrame();
  }

  pulseB1(done: ?() => void = null) {
    this._fig2._B1.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseB2(done: ?() => void = null) {
    this._fig2._B2.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseB(done: ?() => void = null) {
    this._fig2._labelB._label.pulseScaleNow(1, 2, 0, done);
    this.diagram.animateNextFrame();
  }

  pulseTopLeft(done: ?() => void = null) {
    this._fig2._topLeftTri._side01._label.pulseScaleNow(1, 2);
    this._fig2._topLeftTri._side20._label.pulseScaleNow(1, 2, 0, done);
    this._fig2._rH.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseTopRight(done: ?() => void = null) {
    this._fig2._topRightTri._side12._label.pulseScaleNow(1, 2);
    this._fig2._topRightTri._side20._label.pulseScaleNow(1, 2, 0, done);
    this._fig2._rH.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseEqn4() {
    this._4Eqn.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseParallel() {
    this._fig3._topLine.pulseWidth();
    this._fig3._bottomLine.pulseWidth();
    this.diagram.animateNextFrame();
  }

  drawLines(done: ?() => void = null) {
    this._fig3._line1.grow(0, 1.5, true, done);
    this._fig3._line2.grow(0, 1.5);
    this._fig3._line3.grow(0, 1.5);
    this.diagram.animateNextFrame();
  }

  drawParallelSplit(done: ?() => void = null) {
    this._fig3._split.grow(0.05, 1.5, true, done);
    this.diagram.animateNextFrame();
  }

  pulseParallelTris(done: ?() => void = null) {
    this._fig3._tri1.pulseScaleNow(1, 1.1, 0, done);
    this._fig3._tri2.pulseScaleNow(1, 1.1);
    this._fig3._tri3.pulseScaleNow(1, 1.1);
    this.diagram.animateNextFrame();
  }

  pulseHeights() {
    this._fig3._height1.pulseWidth();
    this._fig3._height2.pulseWidth();
    this._fig3._height3.pulseWidth();
    this.diagram.animateNextFrame();
  }


  setupFig4EqnLinks() {
    const e1 = this._fig4._eqn1;
    const e2 = this._fig4._eqn2;
    const makeClick = (equation, name) => {
      const element = equation[`_${name}`];
      if (element != null) {
        element.onClick = this.pulseE.bind(this, name, null, null);
        element.makeTouchable();
      }
    };
    makeClick(e1, 'AB');
    makeClick(e1, 'AD');
    makeClick(e1, 'AC');
    makeClick(e1, 'AE');

    makeClick(e2, 'AB');
    makeClick(e2, 'AD');
    makeClick(e2, 'AC');
    makeClick(e2, 'AF');
  }

  pulseE(name: string | Array<string>, done: ?() => void = null, scale: ?number = null) {
    let names;
    if (typeof name === 'string') {
      names = [name];
    } else {
      names = name;
    }
    let doneToUse = done;
    const getElement = (elementPath, parent) => {
      const ep = elementPath.split('.');
      const newParent = parent[ep[0]];
      if (newParent == null) {
        return null;
      }
      if (ep.length > 1) {
        return getElement(ep.slice(1).join('.'), newParent);
      }
      return newParent;
    };
    names.forEach((n) => {
      const realName = `_${n}`;
      // const element = this._fig4[realName];
      const element = getElement(realName, this._fig4);
      if (element == null) {
        return;
      }
      if (realName.length === 3) {
        let scaleToUse = 4;
        if (scale != null && typeof scale === 'number') {
          scaleToUse = scale;
        }
        element.pulseWidth({ line: scaleToUse, done: doneToUse });
        doneToUse = null;
      } else if (realName.length === 1) {
        let scaleToUse = 2;
        if (scale != null && typeof scale === 'number') {
          scaleToUse = scale;
        }
        element.pulseScaleNow(1, scaleToUse, 0, doneToUse);
        doneToUse = null;
      } else {
        let scaleToUse = 1.4;
        if (scale != null && typeof scale === 'number') {
          scaleToUse = scale;
        }
        element.pulseScaleNow(1, scaleToUse, 0, doneToUse);
        doneToUse = null;
      }
    });
    if (done != null) {
      done();
    }
    this.diagram.animateNextFrame();
  }
}
