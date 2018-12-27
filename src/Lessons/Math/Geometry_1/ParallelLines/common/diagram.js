// @flow
import Fig from 'figureone';
import Lesson from '../../../../../js/Lesson/Lesson';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

const { Diagram } = Fig;
export type LessonDiagramType = {
  layout: Object;
  lesson: Lesson;
} & Diagram;

export default class ParallelCommonLessonDiagram extends CommonLessonDiagram {
  layout: Object;
  lesson: Lesson;

  constructor(id: string, layout: Object) {
    const { limits } = layout;
    super({
      htmlId: `${id}`,
      limits,
    }, layout);
  }

  createDiagramElements() {
    this.fontScale = 1.2;
  }

  resize() {
    this.elements.updateLimits(this.limits);
    super.resize();
  }
}
