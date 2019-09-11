// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import './style.scss';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
  style,
  highlight,
} = Fig.tools.html;

export class QRMain extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;
    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      two_equal_angles: click(coll.pulseEqualAngles, [coll, null], colors.angles),
      two_equal_sides: click(coll.pulseEqualSides, [coll], colors.sides),
      _two_equal_sides: highlight(colors.sides),
      _two_equal_angles: highlight(colors.angles),
      opposite: click(coll.pulseOpposites, [coll], colors.diagram.action),
    };
    this.setTitle('Isosceles Triangle');
    this.setDescription(style({ scale: 1 }, [
      'An |isosceles triangle| has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.',
      'If a triangle has |_two_equal_sides| or |_two_equal_angles|, then it is an |isosceles triangle|.',
    ]), modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.5 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show();
    const tri = coll._triangle;
    tri._line.show();
    tri._angle0.showAll();
    tri._angle2.showAll();
    tri._side01.showAll();
    tri._side12.showAll();
    // const iso = collection;
    // iso.show();
    coll.transform.updateScale(0.6, 0.6);
    coll.setPosition(this.layout.position);
    this.transformToQRWindow(coll, new Rect(-1.3, -1.4, 2.6, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRSplitLine extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;
    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      right_angle: click(coll.pulseLeftRightBaseAngles, [coll], colors.angles),
      line: click(coll.pulseSplit, [coll, null], colors.sides),
      equal_sides: click(coll.pulseLeftRightEqualSides, [coll, null], colors.sides),
      equal_angles: click(coll.pulseLeftRightEqualAngles, [coll], colors.angles),
    };
    this.setTitle('Split Isosceles Triangle');
    this.setDescription(style({ scale: 1 }, [
      'For an isosceles triangle, the |line| drawn from the angle between the |equal_sides| to the |midpoint| of the side between the |equal_angles| intersects the side at a |right_angle|, and splits the triangle into two equal halves.',
    ]), modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.5 });
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show();
    const left = coll._left;
    const right = coll._right;
    const correction = coll._correction;
    const split = coll._split;

    left._line.show();
    left._angleTop.showAll();
    left._sideBase.showAll();
    left._angleEqual.showAll();
    left._sideEqual.showAll();
    right._line.show();
    right._angleTop.showAll();
    right._sideBase.showAll();
    right._angleEqual.showAll();
    right._sideEqual.showAll();
    right._angleBase._curve.show();
    correction.showAll();
    // correction.setColor(this.layout.colors.diagram.background);
    split._line.show();
    coll.setScenarios('summary');
    right._angleBase.autoRightAngle = true;
    right._angleBase.update();
    coll.transform.updateScale(0.6, 0.6);
    coll.setPosition(this.layout.position);
    this.transformToQRWindow(coll, new Rect(-1.3, -1.4, 2.6, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRMain,
  SplitLine: QRSplitLine,
});
