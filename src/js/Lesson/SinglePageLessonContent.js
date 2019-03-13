// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from './SimpleLessonContent';


const {
  Rect, DiagramElement,
} = Fig;
const {
  generateUniqueId,
} = Fig.tools.misc;

class SinglePageLessonContent extends SimpleLessonContent {
  // $FlowFixMe
  sections: Array<Array<string | React.Element<'div'>>>;
  diagram: Object;
  diagramHtmlId: string;
  content: Array<string | React.Element<'div'>>
  modifiers: Object;

  constructor(htmlId: string = 'lesson__content') {
    super(htmlId);
    this.diagramHtmlId = `${htmlId}_diagram`;
    this.content = [];
    this.modifiers = {};
  }

  initialize() {
    this.setDiagram(this.diagramHtmlId);
    this.diagram.resize();
    this.setElementContent();
    this.setContent();
    if (typeof this.content === 'string') {
      this.content = [this.content];
    }
    this.sections.push(this.content);
  }

  // eslint-disable-next-line class-methods-use-this
  setElementContent() {
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setDiagram(diagramHtmlId: string) {
  }

  // setTitle() {
  //   this.title = '';
  // }

  // // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // setContent() {
  // }
}

function makeFig(
  id: string = `id_figure__${generateUniqueId()}`,
  elements: DiagramElement | Array<DiagramElement>,
  scale: string = 'fit',
  limits: Rect | null = null,
) {
  let elementsToUse;
  if (Array.isArray(elements)) {
    elementsToUse = elements;
  } else {
    elementsToUse = [elements];
  }
  elementsToUse.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.tieToHTML.element = id;
    // eslint-disable-next-line no-param-reassign
    element.tieToHTML.scale = scale;
    if (limits != null) {
      // eslint-disable-next-line no-param-reassign
      element.tieToHTML.window = limits;
    }
  });
  return `<div id="${id}" class="single_page_lesson__figure"><img  class="single_page_lesson__figure_image" id="${id}_webgl"></img><img class="single_page_lesson__figure_image" id="${id}_2d"></img></div>`;
}

export { SinglePageLessonContent, makeFig };
