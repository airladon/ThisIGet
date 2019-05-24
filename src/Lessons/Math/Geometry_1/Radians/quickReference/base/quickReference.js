// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
// import details from '../../details';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
} = Fig.tools.html;

export default class QRBoilerplate extends PopupBoxCollection {
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

    const diag = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      radian: click(diag.bendRadius, [diag, null], colors.qrRadians_angles),
      arc_length: click(diag.pulseArc, [diag], colors.qrRadians_arc),
      radius: click(diag.pulseRadius, [diag], colors.qrRadians_lines),
      angle: click(diag.pulseAngle, [diag], colors.qrRadians_angles),
    };
    this.setTitle('Radian');
    this.setDescription([
      'A |radian| is the |angle| where the |arc_length| equals the |radius|.',
      'There are |2π| radians in a circle.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const circle = collection._circle;
    circle._line1.showAll();
    circle._line2.showAll();
    circle._arc.showAll();
    circle._angle.showAll();
    collection.setAngleMarks('radians');
    circle._line1.setRotation(1.3);
    collection._equation.showForm('arc');
    collection._equation.setScenario('qr');
    circle.setScenario('qr');
    collection.updateAngle();
    circle._line1.makeTouchable();
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}


attachQuickReference(lessonUID, versionUID, {
  Main: QRBoilerplate,
});
