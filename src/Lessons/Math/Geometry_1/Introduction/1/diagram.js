// @flow
import Fig from 'figureone';
import CircleCollection from './diagramCollectionCircle';
import lessonLayout from './layout';

const { Transform, Diagram, DiagramElementCollection } = Fig;

const layout = lessonLayout();
const { colors } = layout;
const backgroundColor = colors.diagram.background;

type typeElements = {
  _circle: CircleCollection;
} & DiagramElementCollection ;

// $FlowFixMe
class LessonDiagram extends Diagram {
  elements: typeElements;

  constructor(id: string) {
    const { limits } = layout;
    super(
      `${id}`,
      limits.left,
      limits.bottom,
      limits.width,
      limits.height,
      backgroundColor,
      layout,
      'withTexture',
      'withTexture',
    );
  }

  createDiagramElements() {
    const { shapes } = this;
    this.elements = shapes.collection();

    const circleCollection = new CircleCollection(this, new Transform()
      .translate(layout.position));
    this.add('circle', circleCollection);

    this.fontScale = 1.2;
  }

  resize() {
    const { limits } = layout;
    this.limits = limits;
    this.elements.updateLimits(limits);
    this.elements._circle.resize();
    super.resize();
  }
}

export default LessonDiagram;
