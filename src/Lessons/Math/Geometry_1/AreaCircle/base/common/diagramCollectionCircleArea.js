// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import {
  addTriRectEquation, addBorderEquation,
} from './equations';

const {
  Transform, Rect, DiagramElementPrimative, DiagramObjectLine,
} = Fig;

type TypeTri = {
  fill: DiagramElementPrimative;
  height: DiagramObjectLine;
  base: DiagramObjectLine;
};

export default class CircleAreaCollection extends CommonDiagramCollection {
  diagram: CommonLessonDiagram;
  // _selector: DiagramElementPrimative;
  _circle: DiagramElementPrimative;
  _circleFill: DiagramElementPrimative;

  _tri6: TypeTri;
  _tri10: TypeTri;
  _tri50: TypeTri;

  _poly6: DiagramElementPrimative;
  _poly10: DiagramElementPrimative;
  _poly50: DiagramElementPrimative;

  _fill6: DiagramElementPrimative;
  _fill10: DiagramElementPrimative;
  _fill50: DiagramElementPrimative;

  _lines6: DiagramElementPrimative;
  _lines10: DiagramElementPrimative;
  _lines50: DiagramElementPrimative;

  _radius: DiagramObjectLine;
  _backgroundCircle: DiagramElementPrimative;

  triRotation: number;

  addGrid() {
    const lay = this.layout.grid;
    const grid = this.diagram.shapes.grid(
      new Rect(
        -lay.length / 2, -lay.height / 2,
        lay.length, lay.height,
      ),
      lay.spacing, lay.spacing, 2, this.layout.colors.grid,
      new Transform().translate(lay.position),
    );
    this.add('grid', grid);
  }

  addCircles() {
    const lay = this.layout.circle;
    const circle = this.diagram.shapes.polygon(lay.default, lay.circle);
    const backgroundCircle = this.diagram.shapes.polygon(lay.default, lay.back);
    const fill = this.diagram.shapes.polygon(lay.default, lay.fill);
    this.add('circleFill', fill);
    this.add('backgroundCircle', backgroundCircle);
    this.add('circle', circle);
  }

  addTriangles() {
    this.triRotation = 0;
    const lay = this.layout.polygon;
    this.layout.polygonSides.forEach((sideNum, index) => {
      const tri = this.diagram.shapes.collection(new Transform().rotate(0));

      const fill = this.diagram.shapes.polygon(
        lay.default, lay.fill, { sides: sideNum },
      );
      this.add(`fill${index}`, fill);

      const triFill = this.diagram.shapes.fan(this.layout.triangle.fill(sideNum));
      tri.add('fill', triFill);

      const radialLines = this.layout.radialLines.lines(sideNum);
      const lines = this.diagram.shapes.radialLines(
        radialLines.innerRadius,
        radialLines.outerRadius,
        radialLines.width,
        radialLines.angleStep,
        radialLines.color,
        radialLines.transform,
      );
      this.add(`lines${index}`, lines);

      const poly = this.diagram.shapes.polygon(
        lay.default, lay.polygon, { sides: sideNum },
      );
      this.add(`poly${index}`, poly);

      const height = this.diagram.objects.line(this.layout.triangle.height(sideNum));
      tri.add('height', height);

      const base = this.diagram.objects.line(this.layout.triangle.base(sideNum));
      tri.add('base', base);
      this.add(`tri${index}`, tri);

      const border = this.diagram.shapes.polygon(
        lay.default, lay.border, { sides: sideNum },
      );
      this.add(`border${index}`, border);
    });

    const radius = this.diagram.objects.line(this.layout.circle.radiusLine);
    this.add('radius', radius);
  }

  addEquations() {
    addTriRectEquation(this.diagram, this.layout, this, 'triRectEqn');
    addBorderEquation(this.diagram, this.layout, this, 'borderEqn');

    const triRect = this.eqns.triRectEqn.collection;
    const border = this.eqns.borderEqn.collection;

    triRect._b.onClick = this.pulseBase.bind(this);
    triRect._b.isTouchable = true;
    triRect._h.onClick = this.pulseHeight.bind(this);
    triRect._h.isTouchable = true;
    triRect._r.onClick = this.pulseRadius.bind(this);
    triRect._r.isTouchable = true;
    triRect._r_.onClick = this.pulseRadius.bind(this);
    triRect._r_.isTouchable = true;
    triRect._border.onClick = this.pulseBorder.bind(this);
    triRect._border.isTouchable = true;
    triRect.hasTouchableElements = true;
    triRect._Area.isTouchable = true;
    triRect._Area.onClick = this.togglePolygonArea.bind(this);
    triRect._AreaCircle.isTouchable = true;
    triRect._AreaCircle.onClick = this.toggleCircleArea.bind(this);
    triRect._AreaTri.isTouchable = true;
    triRect._AreaTri.onClick = this.toggleTriangleArea.bind(this);

    border._border.onClick = this.pulseBorder.bind(this);
    border._border.isTouchable = true;
    border._b.onClick = this.pulseBase.bind(this);
    border._b.isTouchable = true;
    border.hasTouchableElements = true;
  }

  // addSelector() {
  //   addSelectorHTML(
  //     this.diagram,
  //     this,
  //     'selector',
  //     'lesson__circle_area_selector',
  //     this.selectorClicked.bind(this),
  //     'horizontal',
  //     '',
  //     'middle',
  //     'center',
  //   );
  //   this._selector.setPosition(this.layout.selector.position);
  // }

  selectorClicked(title: string) {
    const sides = this.layout.polygonSides;
    const sideNum = parseInt(title, 10);
    this.eqns.triRectEqn.showForm('3', sides.indexOf(sideNum));
    this.showTriangles(sideNum, 'tris', true);
  }

  rotateArea(numSides: number, toAngle: number | null) {
    const index = this.layout.polygonSides.indexOf(numSides);
    // $FlowFixMe
    const tri = this[`_tri${index}`];
    const r = this.triRotation;
    if (r != null) {
      let newR = r + Math.PI * 2 / numSides;
      if (newR > Math.PI * 2) {
        newR -= Math.PI * 2;
      }
      if (toAngle != null) {
        newR = toAngle;
      } else {
        this.triRotation = newR;
      }
      tri.transform.updateRotation(newR);
      tri._height.updateLabel(newR);
      tri._base.updateLabel(newR);
    }
    this.diagram.animateNextFrame();
  }

  pulseBorder() {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const border = this[`_border${index}`];
      if (border.isShown) {
        border.pulseThickNow(1, 1.02, 5);
      }
    });
    this.diagram.animateNextFrame();
  }

  pulseHeight() {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const tri = this[`_tri${index}`];
      const height = tri._height;
      if (height.isShown) {
        height.pulseWidth(1, 3);
      }
    });
    this.diagram.animateNextFrame();
  }

  pulseBase() {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const tri = this[`_tri${index}`];
      const base = tri._base;
      if (base.isShown) {
        base.pulseWidth(1, 3);
      }
    });
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._radius.pulseWidth();
  }

  pulseCircumference() {
    this._backgroundCircle.pulseThickNow(1, 1.02, 5);
    this.diagram.animateNextFrame();
  }

  togglePolygonArea() {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const poly = this[`_poly${index}`];
      // $FlowFixMe
      const fill = this[`_fill${index}`];
      if (poly.isShown) {
        if (fill.isShown) {
          fill.hide();
        } else {
          fill.show();
        }
      }
    });
    this.diagram.animateNextFrame();
  }

  toggleTriangleArea() {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const tri = this[`_tri${index}`];
      const height = tri._height;
      const fill = tri._fill;
      if (height.isShown) {
        if (fill.isShown) {
          fill.hide();
        } else {
          fill.show();
        }
      }
    });
    this.diagram.animateNextFrame();
  }

  toggleCircleArea() {
    if (this._circleFill.isShown) {
      this._circleFill.hide();
    } else {
      this._circleFill.show();
    }
    this.diagram.animateNextFrame();
  }

  showTriangles(
    numSides: number,
    area: 'tri' | 'tris' | 'circle' | 'none',
    showBorder: boolean,
  ) {
    this.layout.polygonSides.forEach((sides, index) => {
      // $FlowFixMe
      const polygon = this[`_poly${index}`];
      // $FlowFixMe
      const border = this[`_border${index}`];
      // $FlowFixMe
      const fill = this[`_fill${index}`];
      // $FlowFixMe
      const height = this[`_tri${index}`]._height;
      // $FlowFixMe
      const base = this[`_tri${index}`]._base;
      // $FlowFixMe
      const lines = this[`_lines${index}`];
      // $FlowFixMe
      const triFill = this[`_tri${index}`]._fill;
      // $FlowFixMe
      const tri = this[`_tri${index}`];
      if (sides === numSides) {
        polygon.show();
        if (area === 'tris') {
          fill.show();
        } else {
          fill.hide();
        }
        tri.show();
        lines.show();
        height.showAll();
        // base.showAll();
        if (showBorder) {
          border.show();
        } else {
          border.hide();
        }
        if (area === 'tri') {
          triFill.show();
        } else {
          triFill.hide();
        }
      } else {
        tri.hide();
        polygon.hide();
        fill.hide();
        lines.hide();
        height.hideAll();
        base.hideAll();
        border.hide();
        triFill.hide();
      }
    });
    if (area === 'circle') {
      this._circleFill.show();
    } else {
      this._circleFill.hide();
    }
    this.diagram.animateNextFrame();
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addGrid();
    this.addCircles();
    this.addTriangles();
    // this.addSelector();
    this.setPosition(this.layout.position);
    this.addEquations();
    this.hasTouchableElements = true;
    // console.log(this)
  }
}
