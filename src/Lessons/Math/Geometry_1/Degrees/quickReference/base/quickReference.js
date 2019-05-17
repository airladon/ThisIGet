// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.details.uid;
const versionUID = version.details.uid;

const { Transform, Rect } = Fig;
const {
  click,
  style,
} = Fig.tools.html;

export default class QRDegrees extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    const diag = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      full_rotation: click(
        diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null],
        colors.qrDegrees_angles,
      ),
      Angle: click(diag.pulseAngle, [diag], colors.qrDegrees_angles),
      equal_portions: click(diag.pulseDegrees, [diag], colors.qrDegrees_marks),
      lines: click(diag.pulseLines, [diag], colors.qrDegrees_lines),
      rotation: click(diag.pushLine, [diag, null, 2, 1, null], colors.qrDegrees_angles),
      measured: click(diag.pulseAngleText, [diag], colors.qrDegrees_angles),
    };
    this.setTitle('Degrees');
    this.setDescription([
      style({ size: 0.9 }, '|Angle| is the amount of |rotation| between two |lines|.'),
      style({ size: 0.9 }, 'A full rotation can be split into |360| |equal_portions|, called |degrees|.'),
      style({ size: 0.9 }, 'An angle can be |measured| by counting the number of degrees within it.'),
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.5, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    const circle = collection._circle;
    circle._line1.showAll();
    circle._line2.showAll();
    circle._angle.showAll();
    circle._degrees.showAll();
    circle._angleText.showAll();
    circle._line1.setRotation(1);
    circle._line1.makeTouchable();
    circle.setScenario('qr');
    collection.setAngleMarks();
    circle._angleText.setScenario('qr');
    collection.updateAngle();
    this.transformToQRWindow(collection, new Rect(-2, -1, 4, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Main: QRDegrees,
});

