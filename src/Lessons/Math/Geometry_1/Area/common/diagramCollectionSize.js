// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const {
  Transform, Point, Rect, DiagramElementPrimative, DiagramElementCollection,
  DiagramObjectLine,
} = Fig;

export default class SizeCollection extends CommonDiagramCollection {
  _mm: {
    _yLine: DiagramObjectLine;
    _xLine: DiagramObjectLine;
    _square: DiagramElementPrimative;
  } & DiagramElementCollection;

  _m: {
    _yLine: DiagramObjectLine;
    _xLine: DiagramObjectLine;
    _square: DiagramElementPrimative;
  } & DiagramElementCollection;

  addRowLength() {
    const row = this.diagram.shapes.collection(new Transform()
      .translate(this.layout.countLength.position));

    const lay = this.layout.countLength;
    const length = lay.sideLength * lay.count;
    const gridColor = this.layout.colors.grid;
    const grid = this.diagram.shapes.grid(
      new Rect(
        -length / 2, -lay.sideLength / 2,
        length, lay.sideLength,
      ),
      lay.sideLength, lay.sideLength, 3, this.layout.colors.grid,
      new Transform(),
    );
    row.add('grid', grid);

    const addLine = (start: Point, len: number, label: string, name: string) => {
      const line = this.diagram.objects.line({
        vertexSpaceStart: 'start',
        length: len,
        width: lay.width,
        color: gridColor,
        position: start,
      });
      line.addArrow1(this.layout.arrow.width, this.layout.arrow.height);
      line.addArrow2(this.layout.arrow.width, this.layout.arrow.height);
      line.addLabel(label, lay.labelOffset, 'top', 'left', 'horizontal');
      row.add(name, line);
    };

    const start = new Point(
      -length / 2,
      lay.sideLength / 2 + lay.sideLength / 2,
    );
    // for (let i = 0; i < lay.count; i += 1) {
    //   const label = i === 0 ? '1mm' : '';
    //   addLine(
    //     start.add(i * lay.sideLength, 0), lay.sideLength,
    //     label, `square${i}`,
    //   );
    // }
    addLine(
      start, lay.sideLength,
      '1mm', 'square0',
    );
    addLine(
      start.add(0, lay.sideLength), lay.sideLength * lay.count,
      `${lay.count.toString()}mm`, 'totalLength',
    );

    this.add('row', row);
  }

  addSquareSize(name: string, label: string, layout: {
    position: Point,
    sideLength: number,
    width: number,
    lineOffset: number,
    labelOffset: number,
  }) {
    const color = this.layout.colors.reference;

    const square = this.diagram.shapes.polygon({
      sides: 4,
      radius: Math.sqrt(((layout.sideLength / 2) ** 2) * 2),
      width: layout.width,
      rotation: Math.PI / 4,
      color,
    });

    const yLine = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: layout.sideLength,
      width: layout.width,
      color,
      position: new Point(-layout.sideLength / 2 - layout.lineOffset, 0),
      angle: -Math.PI / 2,
    });
    yLine.addArrow1(this.layout.arrow.width, this.layout.arrow.height);
    yLine.addArrow2(this.layout.arrow.width, this.layout.arrow.height);
    // yLine.setPosition(new Point(-layout.sideLength / 2 - layout.lineOffset, 0));
    // yLine.transform.updateRotation(-Math.PI / 2);
    yLine.addLabel(label, layout.labelOffset, 'left', 'left', 'horizontal');
    // yLine.setLength(layout.sideLength);

    const xLine = this.diagram.objects.line({
      vertexSpaceStart: 'center',
      length: layout.sideLength,
      width: layout.width,
      color,
      position: new Point(0, -layout.sideLength / 2 - layout.lineOffset),
    });
    xLine.addArrow1(this.layout.arrow.width, this.layout.arrow.height);
    xLine.addArrow2(this.layout.arrow.width, this.layout.arrow.height);
    // xLine.setPosition(new Point(0, -layout.sideLength / 2 - layout.lineOffset));
    xLine.addLabel(label, layout.labelOffset, 'bottom', 'bottom', 'horizontal');
    // xLine.setLength(layout.sideLength);

    const group = this.diagram.shapes.collection(new Transform().translate(layout.position));
    group.add('square', square);
    group.add('yLine', yLine);
    group.add('xLine', xLine);
    this.add(name, group);
  }

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addSquareSize('mm', '1mm', this.layout.mmSquare);
    this.addSquareSize('m', '1m', this.layout.mSquare);
    this.addRowLength();

    this.setPosition(this.layout.sizePosition);
    this.hasTouchableElements = true;
  }
}
