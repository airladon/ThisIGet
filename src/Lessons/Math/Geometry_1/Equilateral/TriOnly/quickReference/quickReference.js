// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import EquilateralCollection from '../common/diagramCollectionEquilateral';

const { Transform, Rect } = Fig;
const { click } = Fig.tools.html;

export default class QREquilateral extends PopupBoxCollection {
  _collection: EquilateralCollection;

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
      EquilateralCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      three_equal_sides: click(
        this._collection.pulseSides,
        [this._collection],
        this.layout.colors.lines,
      ),
      three_equal_angles: click(
        this._collection.pulseAngles,
        [this._collection],
        this.layout.colors.angles,
      ),
    };
    this.setTitle('Equilateral Triangle');
    this.setDescription(`
      <p>
      An |Equilateral| triangle has |three_equal_sides| and |three_equal_angles|.
      </p>
      <p>
      All triangles with three equal sides will have three equal angles, and all triangles with three equal angles will have three equal sides.
      </p>
    `, modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const iso = collection;
    const iTri = this._collection._tri;
    iso.show();
    iTri.show();
    iTri._line.show();
    iTri._side23.showAll();
    iTri._side31.showAll();
    iTri._side12.showAll();
    iTri._angle1.showAll();
    iTri._angle2.showAll();
    iTri._angle3.showAll();
    // collection.transform.updateScale(0.6, 0.6);
    // collection.setPosition(this.layout.position);
    this.transformToQRWindow(collection, new Rect(-1.5, -1.4, 3, 2.4));
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
    Main: QREquilateral,
  };
}

attachQuickReference1();

