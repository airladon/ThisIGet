// @flow
import Fig from 'figureone';
import type { TypeDiagramOptions } from 'figureone';
import Lesson from '../../js/Lesson/Lesson';
import CommonDiagramCollection from './DiagramCollection';

const { Diagram, Rect } = Fig;
const { joinObjects } = Fig.tools.misc;

export type TypeCommonLessonDiagram = {
  layout: {};
  lesson: Lesson;
} & Diagram;

export default class CommonLessonDiagram extends Diagram {
  layout: Object;
  lesson: Lesson;
  elements: CommonDiagramCollection;

  constructor(diagramOptions: TypeDiagramOptions, layout: {
    limits?: Rect,
    colors?: {
      diagram?: {
        background?: Array<number>,
      }
    }
  }) {
    let background = [1, 1, 1, 1];
    if (layout.colors && layout.colors.diagram && layout.colors.diagram.background) {
      ({ background } = layout.colors.diagram);
    }
    const defaultOptions = {
      limits: layout.limits,
      backgroundColor: background,
      fontScale: 1.2,
    };
    const optionsToUse = joinObjects({}, defaultOptions, diagramOptions);
    super(optionsToUse);
    this.layout = layout;
  }
}
