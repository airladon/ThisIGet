// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import TriangleCollection from '../common/diagramCollectionTriangles';
import PopupBoxCollection from '../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../details';

const { Transform } = Fig;
const { html } = Fig.tools;
class QRCongruent extends PopupBoxCollection {
  _triangle: TriangleCollection;
  name: string;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
    name: string = 'triangle',
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'triangle',
      TriangleCollection,
      name,
    );
    this.name = name;

    this.setLink(details.details.uid);
  }

  setDescription(specificText: string, extraModifiers: Object = {}) {
    const finalText = `<p>
        Two triangles are |congruent| (same size and shape) if they share the same |side_lengths| and |angles|.
      </p>
      ${specificText}
      <p>
        Triangles are congruent even if |rotated| or |mirrored|.
      </p>`;
    const modifiers = Object.assign({}, {
      angles: html.highlight(this.layout.colors.angleLabels),
      side_lengths: html.highlight(this.layout.colors.lineLabels),
      rotated: html.clickWord(
        'rotated',
        `id_lesson__qr_congruent_triangles_${this.name}__rotated`,
        this._triangle.toggleCongruentRotate, [this._triangle],
        this.layout.colors.line,
      ),
      mirrored: html.clickWord(
        'mirrored',
        `id_lesson__qr_congruent_triangles__${this.name}__mirrored`,
        this._triangle.toggleCongruentFlip, [this._triangle],
        this.layout.colors.line,
      ),
    }, extraModifiers);
    super.setDescription(finalText, modifiers);
  }

  show() {
    this.setDiagramSize(2.5, 1.2);
    super.show();
    const tri = this._triangle;
    const lay = this.layout.triangles.congruent;

    this.hasTouchableElements = true;
    tri.hasTouchableElements = true;
    tri._tri2.isMovable = true;
    tri._tri2.isTouchable = true;
    tri._tri2.touchInBoundingRect = true;
    tri._tri2.move.type = 'rotation';

    tri.setTriangleScenarios(lay.points, lay.points, lay.tri1.scenario, lay.tri2.scenario);
    tri.show();
    tri._tri1.show();
    tri._tri2.show();
    tri._tri1._line.show();
    tri._tri2._line.show();
    tri.transform.updateScale(0.7, 0.7);
    tri.setPosition(0, 0.75);
    this.diagram.animateNextFrame();
  }
}

export class QRAsa extends QRCongruent {
  _triangle: TriangleCollection;
  last: string;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, transform, 'triangle_asa');
    const modifiers = {
      two_angles: html.highlight(this.layout.colors.angleLabels),
      side_between_them: html.highlight(this.layout.colors.lineLabels),
      // rotated: html.click(
      //   this._triangle.toggleCongruentRotate, [this._triangle],
      //   this.layout.colors.line,
      // ),
    };

    this.setTitle('Congruent by Angle-Side-Angle');
    this.setDescription(`
      <p>
        All angles and side lengths of a triangle can be calculated if only |two_angles| and the |side_between_them| is known (|Angle-Side-Angle configuration|). Therefore, if two triangles share the same two angles and enclosed side length, the triangles will be congruent.
      </p>`, modifiers);
  }

  show() {
    super.show();
    const tri = this._triangle;
    tri._tri1._angle1.showAll();
    tri._tri2._angle1.showAll();
    tri._tri1._angle2.showAll();
    tri._tri2._angle2.showAll();
    tri._tri1._dimension12.showAll();
    tri._tri2._dimension12.showAll();
    this.diagram.animateNextFrame();
  }
}

export class QRSss extends QRCongruent {
  _triangle: TriangleCollection;
  last: string;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, transform, 'triangle_sss');
    const modifiers = {
      three_side_lengths: html.highlight(this.layout.colors.lineLabels),
    };

    this.setTitle('Congruent by Side-Side-Side');
    this.setDescription(`
      <p>
        All angles and side lengths of a triangle can be calculated if only the |three_side_lengths| are known (|Side-Side-Side configuration|). Therefore, if two triangles share the same side lengths, the triangles will be congruent.
      </p>`, modifiers);
  }

  show() {
    super.show();
    const tri = this._triangle;
    tri._tri1._dimension12.showAll();
    tri._tri2._dimension12.showAll();
    tri._tri1._dimension23.showAll();
    tri._tri2._dimension23.showAll();
    tri._tri1._dimension31.showAll();
    tri._tri2._dimension31.showAll();
    this.diagram.animateNextFrame();
  }
}

export class QRSas extends QRCongruent {
  _triangle: TriangleCollection;
  last: string;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, transform, 'triangle_sas');
    const modifiers = {
      two_sides: html.highlight(this.layout.colors.lineLabels),
      angle_between_them: html.highlight(this.layout.colors.angleLabels),
    };

    this.setTitle('Congruent by Side-Angle-Side');
    this.setDescription(`
      <p>
        All angles and side lengths of a triangle can be calculated if only |two_sides| and the |angle_between_them| is known (|Side-Angle-Side configuration|). Therefore, if two triangles share the same two side lengths and enclosed angle, the triangles will be congruent.
      </p>`, modifiers);
  }

  show() {
    super.show();
    const tri = this._triangle;
    tri._tri1._dimension12.showAll();
    tri._tri2._dimension12.showAll();
    tri._tri1._dimension31.showAll();
    tri._tri2._dimension31.showAll();
    tri._tri1._angle1.showAll();
    tri._tri2._angle1.showAll();
    this.diagram.animateNextFrame();
  }
}

export class QRAas extends QRCongruent {
  _triangle: TriangleCollection;
  last: string;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, transform, 'triangle_aas');
    const modifiers = {
      side_not_between: html.highlight(this.layout.colors.lineLabels),
      two_angles: html.highlight(this.layout.colors.angleLabels),
    };

    this.setTitle('Congruent by Angle-Angle-Side');
    this.setDescription(`
      <p>
        All angles and side lengths of a triangle can be calculated if only |two_angles| and a |side_not_between| them is known (|Angle-Angle-Side configuration|). Therefore, if two triangles share the same two angles and adjacent side length, the triangles will be congruent.
      </p>`, modifiers);
  }

  show() {
    super.show();
    const tri = this._triangle;
    tri._tri1._dimension23.showAll();
    tri._tri2._dimension23.showAll();
    tri._tri1._angle1.showAll();
    tri._tri2._angle1.showAll();
    tri._tri1._angle2.showAll();
    tri._tri2._angle2.showAll();
    this.diagram.animateNextFrame();
  }
}


export class QRAaa extends PopupBoxCollection {
  _triangle: TriangleCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'triangle',
      TriangleCollection,
      'triangle_aaa',
    );

    this.setTitle('Angle-Angle-Angle Ambiguity');
    const modifiers = {
      three_angles: html.highlight(this.layout.colors.angleLabels),
    };
    this.setDescription(`
      <p>
        If only |three_angles| of a triangle are known, the |sides cannot be calculated|.
      </p>
      <p>
        For example, if you scale a triangle larger or smaller, its angles will remain the same. Therefore, knowing just the angles of two triangles is |not enough information to determine that they are congruent| (the same size and shape).
      </p>`, modifiers);

    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.2);
    super.show();
    const tri = this._triangle;
    const lay = this.layout.triangles.aaa;

    tri.setTriangleScenarios(lay.points, lay.points, lay.tri1.scenario, lay.tri2.scenario);
    tri.show();
    tri._tri1.show();
    tri._tri2.show();
    tri._tri1._line.show();
    tri._tri2._line.show();
    tri._tri1._angle1.showAll();
    tri._tri1._angle2.showAll();
    tri._tri1._angle3.showAll();
    tri._tri2._angle1.showAll();
    tri._tri2._angle2.showAll();
    tri._tri2._angle3.showAll();
    tri.transform.updateScale(0.7, 0.7);
    tri.setPosition(0, 0.6);
    this.diagram.animateNextFrame();
  }
}

export class QRSsa extends PopupBoxCollection {
  _triangle: TriangleCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'triangle',
      TriangleCollection,
      'triangle_ssa',
    );

    this.setTitle('Side-Side-Angle Ambiguity');
    const modifiers = {
      angle: html.highlightWord('angle (a)', this.layout.colors.angleLabels),
      adjacent_side: html.highlightWord(
        'adjacent side (C)',
        this.layout.colors.lineLabels,
      ),
      opposite_side: html.highlightWord(
        'opposite side (A)',
        this.layout.colors.lineLabels,
      ),
      angle_not_between_the_sides: html.highlight(this.layout.colors.angleLabels),
    };
    this.setDescription(`
      <p>
        If an |angle|, |adjacent_side| and |opposite_side| of a triangle is known, the remaining angles and side can be calculated with certainty only if the |opposite side is longer than or equal to the adjancent side or A ≥ C|.
      </p>
      <p>
        Therefore, if two triangles share the same angle, adjancent side and opposite side, and the opposite side longer than or equal to the adjacent side, then the triangles will be congruent.
      </p>`, modifiers);

    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1);
    super.show();
    const tri = this._triangle;
    const lay = this.layout.triangles.saa;
    tri.setTriangleScenarios(
      lay.tri1.points, lay.tri2.points,
      lay.tri1.scenario, lay.tri2.scenario,
    );
    tri.show();
    tri._tri1.show();
    tri._tri2.show();
    tri._tri1._line.show();
    tri._tri2._line.show();
    tri._tri1._angle1.showAll();
    tri._tri1._dimension12.showAll();
    tri._tri1._dimension23.showAll();
    tri._tri2._angle1.showAll();
    tri._tri2._dimension12.showAll();
    tri._tri2._dimension23.showAll();
    tri.transform.updateScale(0.7, 0.7);
    tri.setPosition(0, 0.4);
    this.diagram.animateNextFrame();
  }
}

export class QRCongruentTriangles extends PopupBoxCollection {
  _triangle: TriangleCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'triangle',
      TriangleCollection,
      'triangle_congruent',
    );

    this.setTitle('Congruent Triangles');
    const modifiers = {
      side_lengths: html.highlight(this.layout.colors.lineLabels),
      angles: html.highlight(this.layout.colors.angleLabels),
      rotated: html.clickWord(
        'rotated', 'id_lesson__QRCongruentTriangles__rotated',
        this._triangle.toggleCongruentRotate, [this._triangle],
        this.layout.colors.diagram.action,
      ),
      flipped: html.clickWord(
        'flipped', 'id_lesson__QRCongruentTriangles__flipped',
        this._triangle.toggleCongruentFlip, [this._triangle],
        this.layout.colors.diagram.action,
      ),
    };
    this.setDescription(`
      <p>
        Shapes are |congruent| when they are the |same size and shape|. Triangles are congruent when they have the same set of |side_lengths| and |angles|.
      </p>
      <p>
        Shapes remain |congruent| if one is |rotated| or |flipped|.
      </p>`, modifiers);

    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.3);
    super.show();
    const tri = this._triangle;
    const lay = this.layout.triangles.congruent;
    tri.setTriangleScenarios(
      lay.points, lay.points,
      lay.tri1.scenario, lay.tri2.scenario,
    );
    tri.showAll();
    tri._tri2.isMovable = true;
    tri._tri2.isTouchable = true;
    tri._tri2.touchInBoundingRect = true;
    tri._tri2.move.type = 'rotation';
    this.hasTouchableElements = true;
    tri.hasTouchableElements = true;
    tri.transform.updateScale(0.7, 0.7);
    tri.setPosition(0, 0.4);
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  window.quickReference[details.details.uid] = {
    Asa: QRAsa,
    Sss: QRSss,
    Sas: QRSas,
    Aas: QRAas,
    Aaa: QRAaa,
    Ssa: QRSsa,
    Main: QRCongruentTriangles,
  };
}

attachQuickReference();
