// @flow
import Diagram from '../../../../../js/diagram/Diagram';
import Lesson from '../../../../../js/Lesson/Lesson';

export type LessonDiagramType = {
  layout: Object;
  lesson: Lesson;
} & Diagram;

export default class CommonLessonDiagram extends Diagram {
  layout: Object;
  lesson: Lesson;

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
