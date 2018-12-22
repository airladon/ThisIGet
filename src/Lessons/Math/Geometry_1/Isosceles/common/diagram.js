// @flow
import Fig from 'figureone';
// import Diagram from '../../../../../js/diagram/Diagram';
import Lesson from '../../../../../js/Lesson/Lesson';

const { Diagram } = Fig;

export type LessonDiagramType = {
  layout: Object;
  lesson: Lesson;
} & Diagram;

export default class CommonLessonDiagram extends Diagram {
  layout: Object;
  lesson: Lesson;

  constructor(id: string, layout: Object) {
    const { limits } = layout;
    super({
      htmlId: `${id}`,
      limits,
      backgroundColor: layout.colors.diagram.background,
      layout,
      fontScale: 1.2,
    });
  }

  // createDiagramElements() {
  //   this.fontScale = 1.2;
  // }

  // resize() {
  //   this.elements.updateLimits(this.limits);
  //   super.resize();
  // }
}
