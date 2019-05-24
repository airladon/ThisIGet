// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
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
      longest_side: click(
        coll.pulseOpposite, [coll], colors.qrRightAngleTriangle_sides,
      ),
      right_angle: click(
        coll.pulseRightAngle, [coll], colors.qrRightAngleTriangle_rightAngle,
      ),
      equal: click(
        coll.pulseEquation, [coll], colors.qrRightAngleTriangle_sides,
      ),
    };
    this.setTitle('Right Angle Triangle');
    this.setDescription([
      'A |right angle triangle|, is a triangle that has a |right_angle|. The |longest_side| is opposite the right angle, and is called the |hypotenuse|.',
      'The square of the hypotenuse\'s length is |equal| to the sum of the square of the other two sides.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    coll._tri.showAll();
    coll._tri._angle0.hide();
    coll._tri._angle2.hide();
    coll._eqn.showForm('0');
    coll.setScenarios('qr');
    this.transformToQRWindow(coll, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRPythagorus extends PopupBoxCollection {
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
      hypotenuse: click(
        coll.pulseOpposite, [coll], colors.qrRightAngleTriangle_sides,
      ),
      two_side: click(
        coll.pulsePerpendicularSides, [coll], colors.qrRightAngleTriangle_sides,
      ),
      Pythagorean_Theorem: click(
        coll.pulseEquation, [coll], colors.qrRightAngleTriangle_sides,
      ),
    };
    this.setTitle('Pythagorean Theorem');
    this.setDescription([
      'The |Pythagorean_Theorem| relates the |side lengths| of a |right angle triangle|.',
      'For any right angle triangle, the |square| of the |hypotenuse| length is equal to the |sum of the squares| of the remaining |two_side| lengths.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    coll._tri.showAll();
    coll._tri._angle0.hide();
    coll._tri._angle2.hide();
    coll._eqn.showForm('0');
    coll.setScenarios('qr');
    this.transformToQRWindow(coll, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRRightAngleTriangleArea extends PopupBoxCollection {
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
      perpendicular_sides: click(
        coll.pulsePerpendicularSides, [coll], colors.qrRightAngleTriangle_sides,
      ),
    };
    this.setTitle('Area of Right Angle Triangle');
    this.setDescription([
      'The area of a |right angle triangle| is half the product of the |perpendicular_sides|.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    coll._tri.showAll();
    coll._tri._angle0.hide();
    coll._tri._angle2.hide();
    coll._tri._side20.hide();
    coll._eqn.showForm('area');
    coll.setScenarios('qr');
    this.transformToQRWindow(coll, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRMain,
  Pythagorus: QRPythagorus,
  Area: QRRightAngleTriangleArea,
});
