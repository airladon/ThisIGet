// @flow
import Fig from 'figureone';
import CommonDiagramCollection from './DiagramCollection';
// import getLessonIndex from './lessonindex';

const {
  Transform, DiagramElementPrimative, Rect,
  DiagramElementCollection,
} = Fig;
const { html } = Fig.tools;
const { generateUniqueId, joinObjects } = Fig.tools.misc;

export default class PopupBoxCollection extends CommonDiagramCollection {
  id: string;
  modifiers: {};
  description: string;
  title: string;
  titleElement: HTMLElement;
  descriptionElement: HTMLElement;
  spaceForDiagramElement: HTMLElement;
  container: HTMLElement;
  _box: DiagramElementPrimative;
  linkElement: HTMLElement;
  interactiveButtonMethod: Function | null;

  lastElement: HTMLElement;
  lastWindow: Rect;
  // internalResize: boolean;

  setTitle(title: string, modifiers: Object = {}) {
    const modifiedText = html.applyModifiers(title, modifiers);
    const elem = document.getElementById('id_lesson__static_qr__title_text');
    if (elem != null) {
      elem.innerHTML = modifiedText;
      html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
    }
    this.modifiers = modifiers;
  }

  setDescription(description: Array<string> | string, modifiers: Object = {}) {
    let text = '';
    if (typeof description === 'string') {
      text = description;
    } else {
      description.forEach((paragraph) => {
        text += `<p>${paragraph}</p>`;
      });
    }
    const elem = document.getElementById('id_lesson__qr_description');
    if (elem != null) {
      let modifiedText = html.applyModifiers(text, modifiers);
      modifiedText = modifiedText.replace(/ interactive_word/g, ' ');
      elem.innerHTML = modifiedText;

      html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
    }
    this.modifiers = modifiers;
  }

  // eslint-disable-next-line class-methods-use-this
  setLink(link: string = '') {
    const a = document.getElementById('id_lesson__static_qr__link_link');
    if (a != null) {
      a.href = `${window.location.origin}/Lessons/${link}`;
    }
  }

  constructor(
    diagram: Object,
    layout: Object,
    transform: Transform = new Transform(),
    collectionName: string = '',
    Collection: Function | null = null,
    id: string = generateUniqueId(),
  ) {
    super(diagram, layout, transform);
    if (Collection) {
      this.add(collectionName, new Collection(
        diagram, layout,
        new Transform(id).scale(1, 1).rotate(0).translate(0, 0),
      ));
    }
    this.interactiveButtonMethod = null;
  }

  transformToQRWindow(
    element: DiagramElementCollection | DiagramElementPrimative,
    lensWindow: Rect,
  ) {
    const diagramContainer = document.getElementById('id_lesson__qr_diagram_container');
    element.updateLimits(this.diagram.limits, this.diagram.spaceTransforms);

    if (diagramContainer != null) {
      // eslint-disable-next-line no-param-reassign
      element.tieToHTML = {
        element: diagramContainer.id,
        window: lensWindow,
        scale: 'fit',
        updateOnResize: true,
      };
      element.updateHTMLElementTie(this.diagram.canvasLow);
    }
  }

  // size is width for 'left' or 'right', an height for 'up' or 'down'
  // For auto, size is 0.5
  // eslint-disable-next-line class-methods-use-this
  setDiagramSpace(
    optionsIn: {
      location?: 'left' | 'right' | 'top' | 'bottom',
      size?: number,
    },
  ) {
    const defaultOptions = {
      location: 'top',
      size: 0.5,
    };
    const options = joinObjects({}, defaultOptions, optionsIn);
    const { location, size } = options;
    const diagramContainer = document.getElementById('id_lesson__qr_diagram_container');
    const textContainer = document.getElementById('id_lesson__qr_description_container');

    if (textContainer == null || diagramContainer == null) {
      return;
    }
    if (location === 'left') {
      textContainer.style.float = 'right';
      textContainer.style.height = '100%';
      textContainer.style.width = `${Math.floor((1 - size) * 100)}%`;
      diagramContainer.style.width = `${Math.floor(size * 100)}%`;
      diagramContainer.style.height = '100%';
      diagramContainer.style.float = '';
    } else if (location === 'right') {
      textContainer.style.float = '';
      textContainer.style.height = '100%';
      textContainer.style.width = `${Math.floor((1 - size) * 100)}%`;
      diagramContainer.style.width = `${Math.floor(size * 100)}%`;
      diagramContainer.style.height = '100%';
      diagramContainer.style.float = 'right';
    } else if (location === 'top') {
      textContainer.style.float = '';
      textContainer.style.height = `${Math.floor((1 - size) * 100)}%`;
      textContainer.style.width = '100%';
      diagramContainer.style.height = `${Math.floor(size * 100)}%`;
      diagramContainer.style.width = '100%';
      diagramContainer.style.float = '';
    }
  }

  setSimplePageSize() {
    const lessonContent = document.getElementById('lesson__content');
    if (lessonContent == null) {
      return;
    }
    const qrWidth = Math.min(600, lessonContent.clientWidth);
    const qrHeight = qrWidth * 2 / 3;
    this.setRootElement(qrWidth, qrHeight);
  }

  setPresentationPageSize() {
    const overlay = document.getElementById('lesson__content_diagram');
    const lessonContent = document.getElementById('lesson__content');
    if (overlay == null || lessonContent == null) {
      return;
    }
    // const fontSize = parseFloat(window
    //   .getComputedStyle(lessonContent, null)
    //   .getPropertyValue('font-size'));
    // const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    // const qrWidth = width * 0.7;
    const qrHeight = height * 0.7;
    const qrWidth = qrHeight * 3 / 2;
    this.setRootElement(qrWidth, qrHeight);
  }


  setSinglePageSize() {
    const overlay = document.getElementById('single_page_lesson__qr__overlay');
    const lessonContent = document.getElementById('lesson__content');
    if (overlay == null || lessonContent == null) {
      return;
    }
    // const fontSize = parseFloat(window
    //   .getComputedStyle(lessonContent, null)
    //   .getPropertyValue('font-size'));
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    let qrWidth = Math.min(800, width * 0.9);
    // let qrWidth = width * 0.9;
    let qrHeight = qrWidth * 2 / 3;
    if (width > height) {
      qrHeight = height * 0.8;
      qrWidth = qrHeight * 3 / 2;
    }

    this.setRootElement(qrWidth, qrHeight);
  }

  // eslint-disable-next-line class-methods-use-this
  setRootElement(width: number, height: number) {
    const rootElement = document.documentElement;
    if (rootElement != null) {
      rootElement.style.setProperty('--lesson__qr_height', `${height}px`);
      rootElement.style.setProperty('--lesson__qr_width', `${width}px`);
    }
  }

  showAll() {
    this.show();
  }

  showOnly() {
    this.show();
  }

  show() {
    super.show();
    // this._box.show();
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideAll() {
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToShow() {
  }

  hideAll() {
    this.prepareToHideAll();
    super.hideAll();
    this.diagram.animateNextFrame();
  }

  destroy() {
    this.prepareToHideAll();
    this.diagram.setElementsToCollection(new DiagramElementCollection());
    this.diagram.animateNextFrame();
    const element = document.getElementById(`id_lesson__popup_box__${this.id}`);
    if (element != null) {
      element.remove();
    }
  }
}
