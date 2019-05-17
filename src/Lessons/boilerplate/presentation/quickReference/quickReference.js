// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from './collection';

const { Transform, Rect } = Fig;
const {
  // click,
//   highlight,
//   clickWord,
} = Fig.tools.html;

export default class QRMain extends PopupBoxCollection {
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

    // const coll = this._collection;
    // const { colors } = this.layout;
    const modifiers = {
    };
    this.setTitle('');
    this.setDescription([
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    coll.showAll();
    // coll.setScenarios('qr');
    this.transformToQRWindow(coll, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Main: QRMain,
  };
}

attachQuickReference1();

