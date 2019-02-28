// @flow
// import Diagram from '../../../../../js/diagram/Diagram';
// import PrsentationLesson from '../../../../../js/Lesson/PrsentationLesson';

export type LessonDiagramType = {
  layout: Object;
  lesson: Object;
} & Diagram;

export default class CommonLessonDiagram extends Diagram {
  layout: Object;
  lesson: Object;

  constructor(id: string, layout: Object) {
    const { limits } = layout;
    super(
      `${id}`,
      limits.left,
      limits.bottom,
      limits.width,
      limits.height,
      layout.colors.diagram.background,
      layout,
    );
  }

  createDiagramElements() {
    this.fontScale = 1.2;
  }

  resize() {
    this.elements.updateLimits(this.limits);
    super.resize();
  }
}
