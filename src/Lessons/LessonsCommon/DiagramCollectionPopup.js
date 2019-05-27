// @flow
import Fig from 'figureone';
import CommonDiagramCollection from './DiagramCollection';
import getLessonIndex from './lessonindex';

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
      console.log(link)
      a.href = `${window.location.origin}/Lessons/${link}`;
      console.log(a.href)
    }
  }

  // makeBox(
  //   id: string,
  //   title: string = '',
  //   description: string = '',
  //   modifiers: Object = {},
  // ) {
  //   this.id = id;
  //   this.title = title;
  //   this.description = description;
  //   this.modifiers = modifiers;

  //   const container = document.createElement('div');
  //   this.container = container;

  //   const titleElement = document.createElement('div');
  //   titleElement.classList.add('lesson__popup_box__title');
  //   container.appendChild(titleElement);

  //   const infoSymbolContainer = document.createElement('div');
  //   infoSymbolContainer.classList.add('lesson__popup_box__title_i_container');
  //   const infoSymbol = document.createElement('div');
  //   infoSymbol.classList.add('lesson__popup_box__title_i');
  //   infoSymbol.innerHTML = 'i';
  //   infoSymbolContainer.appendChild(infoSymbol);
  //   titleElement.appendChild(infoSymbolContainer);

  //   const closeContainer = document.createElement('div');
  //   closeContainer.classList.add('lesson__popup_box__close_container');
  //   const close = document.createElement('div');
  //   close.classList.add('lesson__popup_box__close');
  //   close.id = 'id_lesson__popup_box__close';
  //   close.innerHTML = 'X';
  //   close.onclick = this.destroy.bind(this);
  //   closeContainer.appendChild(close);
  //   titleElement.appendChild(closeContainer);

  //   const titleContainer = document.createElement('div');
  //   titleContainer.classList.add('lesson__popup_box__title_text_container');
  //   const titleText = document.createElement('div');
  //   titleText.classList.add('lesson__popup_box__title_text');
  //   this.titleElement = titleText;
  //   this.setTitle(title);
  //   titleContainer.appendChild(titleText);
  //   titleElement.appendChild(titleContainer);

  //   const content = document.createElement('div');
  //   content.classList.add('lesson__popup_box__content');
  //   container.appendChild(content);

  //   const spaceForDiagram = document.createElement('div');
  //   spaceForDiagram.classList.add('lesson__popup_box__diagram');
  //   spaceForDiagram.id = (`id_lesson__popup_box__diagram__${id}`);
  //   this.spaceForDiagramElement = spaceForDiagram;
  //   content.appendChild(spaceForDiagram);

  //   const textContainer = document.createElement('div');
  //   textContainer.classList.add('lesson__popup_box__text_container');
  //   textContainer.id = `id_lesson__popup_box__text_container__${this.id}`;

  //   const centeringTextContainer = document.createElement('div');
  //   centeringTextContainer.classList.add('lesson__popup_box__centering_text_container');
  //   centeringTextContainer.id = `id_lesson__popup_box__centering_text_container__${this.id}`;
  //   textContainer.appendChild(centeringTextContainer);
  //   // const textSubContainer = document.createElement('div');
  //   // textSubContainer.classList.add('lesson__popup_box__text_sub_container');
  //   // textContainer.appendChild(textSubContainer);
  //   content.appendChild(textContainer);
  //   const descriptionElement = document.createElement('div');
  //   descriptionElement.classList.add('lesson__popup_box__text');
  //   descriptionElement.id = `id_lesson__popup_box__text__${id}`;
  //   this.descriptionElement = descriptionElement;
  //   this.setDescription(description);
  //   centeringTextContainer.appendChild(descriptionElement);

  //   const linkElement = document.createElement('div');
  //   linkElement.classList.add('lesson__popup_box__link');
  //   this.linkElement = linkElement;
  //   container.appendChild(linkElement);


  //   const element = this.diagram.shapes.htmlElement(
  //     container,
  //     `id_lesson__popup_box__${this.id}`,
  //     'lesson__popup_box',
  //     new Point(0, 0),
  //     'middle',
  //     'center',
  //   );
  //   return element;
  //   // diagram.htmlCanvas.appendChild(container);
  // }

  constructor(
    diagram: Object,
    layout: Object,
    transform: Transform = new Transform(),
    collectionName: string = '',
    Collection: Function | null = null,
    id: string = generateUniqueId(),
  ) {
    super(diagram, layout, transform);
    // this.internalResize = false;
    if (Collection) {
      // this.diagram.shapes = this.diagram.shapesHigh;
      // this.diagram.equation = this.diagram.equationHigh;
      // this.diagram.objects = this.diagram.objectsHigh;
      this.add(collectionName, new Collection(
        diagram, layout,
        new Transform(id).scale(1, 1).rotate(0).translate(0, 0),
      ));
      // this.diagram.shapes = this.diagram.shapesLow;
      // this.diagram.equation = this.diagram.equationLow;
      // this.diagram.objects = this.diagram.objectsLow;
    }
    // this.add('box', this.makeBox(id));
    this.interactiveButtonMethod = null;
  }

  // // eslint-disable-next-line class-methods-use-this
  // getLinkFromString(linkOrLessonID: string, versionId: string) {
  //   if (linkOrLessonID.startsWith('/')) {
  //     return linkOrLessonID;
  //   }
  //   const index = getLessonIndex();
  //   let link = '';
  //   const lesson = index[linkOrLessonID];
  //   if (lesson != null) {
  //     let topic = Object.keys(lesson.topics)[0];
  //     if (lesson.topics.summary != null) {
  //       topic = 'summary';
  //     } else if (lesson.topics.summary !== 'explanation') {
  //       topic = 'explanation';
  //     }
  //     link = `${lesson.path}/${lesson.uid}/${topic}/${versionId}`;
  //   }
  //   return link;
  // }


  // resize(diagramHTMLElement: ?HTMLElement = null) {
  //   super.resize(diagramHTMLElement);
  //   if (this.internalResize === true) {
  //     return;
  //   }
  //   if (this.isShown) {
  //     this.hideAll();
  //   } else {
  //     super.hideAll();
  //   }
  //   this.diagram.animateNextFrame();
  // }

  transformToQRWindow(
    element: DiagramElementCollection | DiagramElementPrimative,
    lensWindow: Rect,
  ) {
    const diagramContainer = document.getElementById('id_lesson__qr_diagram_container');
    // console.log(diagramContainer)
    // console.log(this.diagram.spaceTransforms)
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
