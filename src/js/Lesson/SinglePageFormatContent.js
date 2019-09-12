// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleFormatContent from './SimpleFormatContent';

const { generateUniqueId, joinObjects } = Fig.tools.misc;

const { click } = Fig.tools.html;

const {
  Rect, DiagramElement,
} = Fig;
// const {
//   generateUniqueId,
// } = Fig.tools.misc;

class SinglePageFormatContent extends SimpleFormatContent {
  // $FlowFixMe
  sections: Array<Array<string | React.Element<'div'>>>;
  diagram: Object;
  diagramHtmlId: string;
  content: Array<string | React.Element<'div'>>
  modifiers: Object;

  constructor(htmlId: string = 'topic__content') {
    super(htmlId);
    this.diagramHtmlId = `${htmlId}_diagram`;
    this.content = [];
    this.modifiers = {};
  }

  initialize() {
    this.setDiagram(this.diagramHtmlId);
    // this.diagram.resize();
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

  // eslint-disable-next-line class-methods-use-this
  qr(
    link: string,
    colorOrOptions: Array<number> | {
      color?: ?Array<number>,
      interactive?: boolean,
      id?: string,
      classes?: string,
      text?: ?string,
    } = {},
    // color: Array<number> = this.diagram.layout.colors.diagram.action,
  ) {
    const defaultOptions = {
      color: [1, 0, 0, 1],
      classes: 'topic__qr_action_word',
      id: generateUniqueId(),
    };
    let options = defaultOptions;
    if (Array.isArray(colorOrOptions)) {
      options.color = colorOrOptions;
    } else {
      options = joinObjects({}, defaultOptions, colorOrOptions);
      options.classes = `topic__qr_action_word ${options.classes}`;
    }
    return click(window.topicFunctions.qr, [window.topicFunctions, options.id, link], options);
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToShowQR() {
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideQR() {
  }
}


function makeFig(
  id: string = `id_figure__${generateUniqueId()}`,
  elements: DiagramElement | Array<DiagramElement>,
  scale: string = 'fit',
  limits: Rect | null = null,
  accessibilityText: string = '',
  width: number = 300,
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
  let aspectRatio = 1;
  if (limits != null) {
    aspectRatio = limits.height / limits.width;
  }
  return `<div id="${id}" class="single_page_topic__figure_container" style="width:${width}px"><div class="single_page_topic__figure" style="padding-top:${aspectRatio * 100}%"><img  class="single_page_topic__figure_image" id="${id}_webgl" alt="${accessibilityText}"></img><img class="single_page_topic__figure_image" id="${id}_2d" alt=""></img></div></div>`;
}

export { SinglePageFormatContent, makeFig };
