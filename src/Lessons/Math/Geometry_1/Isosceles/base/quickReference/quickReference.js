// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import IsocelesCollection from '../common/diagramCollectionIsoceles';

const { Transform, Rect } = Fig;
const { click } = Fig.tools.html;

export default class QRIsosceles extends PopupBoxCollection {
  _collection: IsocelesCollection;

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
      IsocelesCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      two_equal_sides: click(
        this._collection.pulseEqualSides,
        [this._collection],
        this.layout.colors.equalLength,
      ),
      two_equal_angles: click(
        this._collection.pulseEqualAngles,
        [this._collection],
        this.layout.colors.angles,
      ),
      opposite: click(
        this._collection.pulseOpposites,
        [this._collection],
        this.layout.colors.diagram.action,
      ),
    };
    this.setTitle('Isosceles Triangle');
    this.setDescription(`
      <p>
      An |Isosceles| triangle has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.
      </p>
      <p>
      All triangles with two equal sides will have two equal angles, and all triangles with two equal angles will have two equal sides.
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
    iTri._angle1.showAll();
    iTri._angle2.showAll();
    // collection.transform.updateScale(0.6, 0.6);
    collection.setPosition(this.layout.position);
    this.transformToQRWindow(iTri, new Rect(-1.6, -0.9, 3.2, 2.4));
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
    Main: QRIsosceles,
  };
}

attachQuickReference1();

