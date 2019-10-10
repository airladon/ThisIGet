// @flow
import Fig from 'figureone';

import diagramLayout from '../../explanation/base/layout';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonCollection from '../../explanation/base/diagramCollectionCommon';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  Transform, DiagramElementPrimitive, DiagramElementCollection,
  DiagramObjectAngle, DiagramObjectLine, DiagramObjectPolyLine,
} = Fig;

const { html } = Fig.tools;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: {
    _congruentTriangles: {
      _tri1: {
        _angle0: DiagramObjectAngle,
        _angle1: DiagramObjectAngle,
        _angle2: DiagramObjectAngle,
        _side01: DiagramObjectLine,
        _side12: DiagramObjectLine,
        _side20: DiagramObjectLine,
      } & DiagramObjectPolyLine;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _label: DiagramElementPrimitive;
  label: HTMLElement;

  makeLabel() {
    const container = document.createElement('div');
    this.label = document.createElement('div');
    container.classList.add('topic__congruent_angles_summary__label');
    container.appendChild(this.label);
    return this.diagram.shapes.htmlElement(
      container,
      'id_topic__congruent_angles_summary__label',
      '',
      this.layout.label.position, 'top', 'center',
    );
  }

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('label', this.makeLabel());
    this.hasTouchableElements = true;
  }


  showCombination(type: string) {
    // const tri = this._collection._tri1;
    const angle1 = this._collection._congruentTriangles._tri1._angle0;
    const angle2 = this._collection._congruentTriangles._tri1._angle1;
    const angle3 = this._collection._congruentTriangles._tri1._angle2;
    const side12 = this._collection._congruentTriangles._tri1._side01;
    const side23 = this._collection._congruentTriangles._tri1._side12;
    const side31 = this._collection._congruentTriangles._tri1._side20;
    if (type === 'sas') {
      angle1.hide();
      angle2.hide();
      angle3.showAll();
      side12.hide();
      side23.showAll();
      side31.showAll();
      html.setHTML(
        this.label,
        '|Side-Angle-Side|. If two triangles share the same |two side lengths| and |enclosed angle|, the triangles |will be congruent|.',
      );
    }
    if (type === 'sss') {
      angle1.hide();
      angle2.hide();
      angle3.hide();
      side12.showAll();
      side23.showAll();
      side31.showAll();
      html.setHTML(
        this.label,
        '|Side-Side-Side|. If two triangles share all of the same |side lengths|, the triangles |will be congruent|.',
      );
    }
    if (type === 'asa') {
      angle1.hide();
      angle2.showAll();
      angle3.showAll();
      side12.hide();
      side23.showAll();
      side31.hide();
      html.setHTML(
        this.label,
        '|Angle-Side-Angle|. If two triangles share the same |two angles| and |enclosed side| length, the triangles |will be congruent|.',
      );
    }
    if (type === 'aas') {
      angle1.showAll();
      angle2.hide();
      angle3.showAll();
      side12.hide();
      side23.showAll();
      side31.hide();
      html.setHTML(
        this.label,
        '|Angle-Angle-Side|. If two triangles share the same |two angles| and |adjacent side| length, the triangles |will be congruent|.',
      );
    }
    if (type === 'aaa') {
      angle1.showAll();
      angle2.showAll();
      angle3.showAll();
      side12.hide();
      side23.hide();
      side31.hide();
      html.setHTML(
        this.label,
        '|Angle-Angle-Angle|. Knowing |just the angles| of two triangles is |not enough information| to determine that they are congruent.',
      );
    }
    if (type === 'ssa') {
      angle1.hide();
      angle2.hide();
      angle3.showAll();
      side12.showAll();
      side23.showAll();
      side31.hide();
      html.setHTML(
        this.label,
        '|Side-Side-Angle|. If two triangles share the same |angle (a)|, |adjacent side (C)| and |opposite side (A)|, the two triangles are only |congruent if the opposite side is longer than or equal to the adjacent side, or A ≥ C|.',
      );
    }
    this.diagram.animateNextFrame();
  }
}
