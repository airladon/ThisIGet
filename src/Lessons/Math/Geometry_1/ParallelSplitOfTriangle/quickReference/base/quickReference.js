// @flow
import React from 'react';
// import Fig from 'figureone';
import StaticQR from '../../../../../../js/components/staticQR';
import { attachQuickReference } from '../../../../../../js/tools/misc';
// import lessonLayout from './layout';
// import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
// import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import triangle from './triangle.md';
import lines from './lines.md';
import './style.scss';

const lessonUID = details.uid;
const versionUID = version.uid;

// const { Transform, Rect } = Fig;
// const {
//   click,
// //   highlight,
// } = Fig.tools.html;

// export class QRMain extends PopupBoxCollection {
//   _collection: CommonCollection;

//   constructor(
//     diagram: Object,
//     transform: Transform = new Transform().scale(1, 1).translate(0, 0),
//   ) {
//     super(diagram, lessonLayout(), transform, 'collection', CommonCollection);

//     const coll = this._collection;
//     const { colors } = this.layout;
//     const modifiers = {
//       longest_side: click(
//         coll.pulseOpposite, [coll], colors.qrRightAngleTriangle_sides,
//       ),
//       right_angle: click(
//         coll.pulseRightAngle, [coll], colors.qrRightAngleTriangle_rightAngle,
//       ),
//       equal: click(
//         coll.pulseEquation, [coll], colors.qrRightAngleTriangle_sides,
//       ),
//     };
//     this.setTitle('Right Angle Triangle');
//     this.setDescription([
//       'A |right angle triangle|, is a triangle that has a |right_angle|. The |longest_side| is opposite the right angle, and is called the |hypotenuse|.',
//       'The square of the hypotenuse\'s length is |equal| to the sum of the square of the other two sides.',
//     ], modifiers);
//     this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
//   }

//   show() {
//     super.show();
//     const coll = this._collection;
//     coll._tri.showAll();
//     coll._tri._angle0.hide();
//     coll._tri._angle2.hide();
//     coll._eqn.showForm('0');
//     coll.setScenarios('qr');
//     this.setDiagramSpace({ location: 'left', size: 0.5 });
//     this.transformToQRWindow(coll, new Rect(-2, -1.5, 4, 3));
//     this.diagram.animateNextFrame();
//   }
// }

attachQuickReference(details.path, lessonUID, versionUID, {
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
