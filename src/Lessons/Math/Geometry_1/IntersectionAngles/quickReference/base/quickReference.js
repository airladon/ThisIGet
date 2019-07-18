// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollectionOpposite from './collectionOpposite';
import CommonCollectionThreeLines from './collectionThreeLines';
import details from '../../details';
import version from './version';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
  highlight,
} = Fig.tools.html;

export class QROpposite extends PopupBoxCollection {
  _collection: CommonCollectionOpposite;

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
      CommonCollectionOpposite,
    );
    this.hasTouchableElements = true;

    const opp = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      Opposite_angles: click(opp.toggleOpposite, [opp], colors.qrIntersectionAngles_angle1),
    };
    this.setTitle('Opposite Angles');
    this.setDescription([
      'When two lines intersect, four angles are created.',
      '|Opposite_angles| at the intersection are |equal|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const opp = this._collection;
    const { colors } = this.layout;
    opp.setAngle(1, colors.qrIntersectionAngles_angle1, 'a');
    opp.setAngle(2, colors.qrIntersectionAngles_angle1, 'b');
    opp.setAngle(3, colors.qrIntersectionAngles_angle1, 'a');
    opp.setAngle(4, colors.qrIntersectionAngles_angle1, 'b');
    opp.hideAll();
    opp._fig.setScenarios('qr');
    opp._fig._line1.showAll();
    opp._fig._line2.showAll();
    opp._fig._angle1.showAll();
    opp._fig._angle3.showAll();
    opp._fig._line1.makeTouchable();
    opp._fig._line2.makeTouchable();
    opp.updateAngles();
    this.transformToQRWindow(collection, new Rect(-1.5, -1.5, 3, 3));
    this.diagram.animateNextFrame();
  }
}

export class QRCorresponding extends PopupBoxCollection {
  _collection: CommonCollectionThreeLines;

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
      CommonCollectionThreeLines,
    );
    this.hasTouchableElements = true;

    const three = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      Corresponding_angles: click(
        three.toggleCorresponding, [three], colors.qrIntersectionAngles_angle1,
      ),
      parallel: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      two_lines: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      intersecting: click(
        three.pulseIntersecting, [three],
        colors.qrIntersectionAngles_intersectingLine,
      ),
      corresponding_angles_are_always_equal: highlight(colors.qrIntersectionAngles_angle3),
      two_lines_are_always_parallel: highlight(colors.qrIntersectionAngles_angle3),
    };
    this.setTitle('Corresponding Angles');
    this.setDescription([
      '|Corresponding_angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting| line.',
      'When the two lines are |parallel|, |corresponding_angles_are_always_equal|.',
      'If corresponding angles are |equal|, then the |two_lines_are_always_parallel|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.45 });
    super.show();
    const collection = this._collection;
    collection.show();
    const three = this._collection;
    const { colors } = this.layout;
    three.setScenarios('qr');
    three.setAngle('A1', colors.qrIntersectionAngles_angle1, 'a');
    three.setAngle('A2', colors.qrIntersectionAngles_angle1, 'a');
    three.setAngle('B1', colors.qrIntersectionAngles_angle1, 'b');
    three.setAngle('B2', colors.qrIntersectionAngles_angle1, 'b');
    three.setAngle('C1', colors.qrIntersectionAngles_angle1, 'c');
    three.setAngle('C2', colors.qrIntersectionAngles_angle1, 'c');
    three.setAngle('D1', colors.qrIntersectionAngles_angle1, 'd');
    three.setAngle('D2', colors.qrIntersectionAngles_angle1, 'd');
    three.hideAll();

    three._fig._angleA1.showAll();
    three._fig._angleA2.showAll();
    three._fig._line1.showAll();
    three._fig._line2.showAll();
    three._fig._line3.showAll();
    three._fig._line1.makeTouchable();
    three._fig._line2.makeTouchable();
    three._fig._line3.makeTouchable();
    three.updateIntersectingLineAngle();

    this.transformToQRWindow(collection, new Rect(-1.5, -1.5, 3, 3));
    this.diagram.animateNextFrame();
  }
}

export class QRAlternate extends PopupBoxCollection {
  _collection: CommonCollectionThreeLines;

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
      CommonCollectionThreeLines,
    );
    this.hasTouchableElements = true;

    const three = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      Alternate_angles: click(three.toggleAlternate, [three], colors.qrIntersectionAngles_angle1),
      intersecting_line: click(
        three.pulseIntersecting, [three],
        colors.qrIntersectionAngles_intersectingLine,
      ),
      two_lines: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      parallel: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      alternate_angles_are_always_equal: highlight(colors.qrIntersectionAngles_angle3),
      two_lines_are_always_parallel: highlight(colors.qrIntersectionAngles_angle3),
    };
    this.setTitle('Alternate Angles');
    this.setDescription([
      '|Alternate_angles| are the pair of inside angles, or pair of outside angles that are on |opposite| sides of the |intersecting_line| that crosses |two_lines|.',
      'When the two lines are |parallel|, the |alternate_angles_are_always_equal|.',
      'If alternate angles are |equal|, then the |two_lines_are_always_parallel|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.45 });
    super.show();
    const collection = this._collection;
    collection.show();
    const three = this._collection;
    const { colors } = this.layout;
    three.setScenarios('qr');
    three.setAngle('A1', colors.qrIntersectionAngles_angle1, 'c');
    three.setAngle('A2', colors.qrIntersectionAngles_angle1, 'a');
    three.setAngle('B1', colors.qrIntersectionAngles_angle1, 'd');
    three.setAngle('B2', colors.qrIntersectionAngles_angle1, 'b');
    three.setAngle('C1', colors.qrIntersectionAngles_angle1, 'a');
    three.setAngle('C2', colors.qrIntersectionAngles_angle1, 'c');
    three.setAngle('D1', colors.qrIntersectionAngles_angle1, 'b');
    three.setAngle('D2', colors.qrIntersectionAngles_angle1, 'd');
    three.hideAll();

    three._fig._angleC1.showAll();
    three._fig._angleA2.showAll();
    three._fig._line1.showAll();
    three._fig._line2.showAll();
    three._fig._line3.showAll();
    three._fig._line1.makeTouchable();
    three._fig._line2.makeTouchable();
    three._fig._line3.makeTouchable();
    three.updateIntersectingLineAngle();

    this.transformToQRWindow(collection, new Rect(-1.5, -1.5, 3, 3));
    this.diagram.animateNextFrame();
  }
}

export class QRInterior extends PopupBoxCollection {
  _collection: CommonCollectionThreeLines;

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
      CommonCollectionThreeLines,
    );
    this.hasTouchableElements = true;

    const three = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      Interior_angles: click(three.toggleInterior, [three], colors.qrIntersectionAngles_angle1),
      intersecting: click(
        three.pulseIntersecting, [three],
        colors.qrIntersectionAngles_intersectingLine,
      ),
      two_lines: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      parallel: click(three.pulseParallel, [three], colors.qrIntersectionAngles_lines),
      interior_angles_always_add_to_180º: highlight(colors.qrIntersectionAngles_angle3),
      two_lines_are_always_parallel: highlight(colors.qrIntersectionAngles_angle3),
    };
    this.setTitle('Interior Angles');
    this.setDescription([
      '|Interior_angles| are the inside angles on the same side of the |intersecting| line that crosses |two_lines|.',
      'When the two lines are |parallel|, the |interior_angles_always_add_to_180º|.',
      'If interior angles are |add to 180º|, then the |two_lines_are_always_parallel|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'left', size: 0.45 });
    super.show();
    const collection = this._collection;
    collection.show();
    const three = this._collection;
    const { colors } = this.layout;
    three.setScenarios('qr');
    three.setAngle('A2', colors.qrIntersectionAngles_angle1, '180º – a');
    three.setAngle('B2', colors.qrIntersectionAngles_angle1, '180º – b');
    three.setAngle('C1', colors.qrIntersectionAngles_angle1, 'b');
    three.setAngle('D1', colors.qrIntersectionAngles_angle1, 'a');
    three.hideAll();

    three._fig._angleA2.showAll();
    three._fig._angleD1.showAll();
    three._fig._line1.showAll();
    three._fig._line2.showAll();
    three._fig._line3.showAll();
    three._fig._line1.makeTouchable();
    three._fig._line2.makeTouchable();
    three._fig._line3.makeTouchable();
    three.updateIntersectingLineAngle();

    this.transformToQRWindow(collection, new Rect(-1.5, -1.5, 3, 3));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Opposite: QROpposite,
  Corresponding: QRCorresponding,
  Alternate: QRAlternate,
  Interior: QRInterior,
});
