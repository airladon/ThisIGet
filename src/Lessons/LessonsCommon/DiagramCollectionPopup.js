// @flow
import Fig from 'figureone';
import CommonDiagramCollection from './DiagramCollection';
import getLessonIndex from '../index';

const {
  Transform, Point, DiagramElementPrimative, Rect,
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
  internalResize: boolean;

  setTitle(title: string, modifiers: Object = {}) {
    const modifiedText = html.applyModifiers(title, modifiers);
    this.titleElement.innerHTML = modifiedText;
    html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
    this.modifiers = modifiers;
  }

  setDescription(description: string, modifiers: Object = {}) {
    const modifiedText = html.applyModifiers(description, modifiers);
    this.descriptionElement.innerHTML = modifiedText;
    html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
    this.modifiers = modifiers;
  }

  makeBox(
    id: string,
    title: string = '',
    description: string = '',
    modifiers: Object = {},
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.modifiers = modifiers;

    const container = document.createElement('div');
    this.container = container;

    const titleElement = document.createElement('div');
    titleElement.classList.add('lesson__popup_box__title');
    container.appendChild(titleElement);

    const infoSymbol = document.createElement('div');
    infoSymbol.classList.add('lesson__popup_box__title_i');
    infoSymbol.innerHTML = 'i';
    titleElement.appendChild(infoSymbol);

    const close = document.createElement('div');
    close.classList.add('lesson__popup_box__close');
    close.id = 'id_lesson__popup_box__close';
    close.innerHTML = 'X';
    close.onclick = this.hideAll.bind(this);
    titleElement.appendChild(close);

    const titleText = document.createElement('div');
    titleText.classList.add('lesson__popup_box__title_text');
    this.titleElement = titleText;
    this.setTitle(title);
    titleElement.appendChild(titleText);

    const content = document.createElement('div');
    content.classList.add('lesson__popup_box__content');
    container.appendChild(content);

    const spaceForDiagram = document.createElement('div');
    spaceForDiagram.classList.add('lesson__popup_box__diagram');
    spaceForDiagram.id = (`id_lesson__popup_box__diagram__${id}`);
    this.spaceForDiagramElement = spaceForDiagram;
    content.appendChild(spaceForDiagram);

    const textContainer = document.createElement('div');
    textContainer.classList.add('lesson__popup_box__text_container');
    textContainer.id = `id_lesson__popup_box__text_container__${this.id}`;
    // const textSubContainer = document.createElement('div');
    // textSubContainer.classList.add('lesson__popup_box__text_sub_container');
    // textContainer.appendChild(textSubContainer);
    content.appendChild(textContainer);
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('lesson__popup_box__text');
    descriptionElement.id = `id_lesson__popup_box__text__${id}`;
    this.descriptionElement = descriptionElement;
    this.setDescription(description);
    textContainer.appendChild(descriptionElement);

    const linkElement = document.createElement('div');
    linkElement.classList.add('lesson__popup_box__link');
    this.linkElement = linkElement;
    container.appendChild(linkElement);


    const element = this.diagram.shapes.htmlElement(
      container,
      `id_lesson__popup_box__${this.id}`,
      'lesson__popup_box',
      new Point(0, 0),
      'middle',
      'center',
    );
    return element;
    // diagram.htmlCanvas.appendChild(container);
  }

  constructor(
    diagram: Object,
    layout: Object,
    transform: Transform = new Transform(),
    collectionName: string,
    Collection: Function | null = null,
    id: string = generateUniqueId(),
  ) {
    super(diagram, layout, transform);
    this.internalResize = false;
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
    this.add('box', this.makeBox(id));
    this.interactiveButtonMethod = null;
  }

  // eslint-disable-next-line class-methods-use-this
  getLinkFromString(linkOrLessonID: string, versionId: string) {
    if (linkOrLessonID.startsWith('/')) {
      return linkOrLessonID;
    }
    const index = getLessonIndex();
    let link = '';
    const lesson = index[linkOrLessonID];
    if (lesson != null) {
      const { versions } = lesson;
      let version;
      if (versionId !== '') {
        if (versions[versionId] != null) {
          version = versions[versionId];
        }
      }
      if (version == null) {
        version = versions[Object.keys(versions)[0]];
      }
      const { topics } = version;
      const versionPath = `${lesson.path}/${version.path}`;
      if (topics.indexOf('summary') > -1) {
        link = `${versionPath}/summary`;
      } else if (topics.indexOf('explanation') > -1) {
        link = `${versionPath}/explanation`;
      } else {
        link = `${versionPath}/${topics[0]}`;
      }
    }
    return link;
  }

  setLink(linkOrLessonID: string, explanationId: string = '') {
    const a = document.createElement('a');
    a.classList.add('interactive_word');
    const link = this.getLinkFromString(linkOrLessonID, explanationId);
    if (link) {
      a.href = link;
      a.innerHTML = 'Go to lesson to see why';
      this.linkElement.appendChild(a);
    }
  }

  resize(diagramHTMLElement: ?HTMLElement = null) {
    super.resize(diagramHTMLElement);
    // console.log(this.internalResize, this.isShown)
    if (this.internalResize === true) {
      return;
    }
    if (this.isShown) {
      this.hideAll();
    } else {
      super.hideAll();
    }
    // // if ((this.internalResize === false && this.isShown) || this.internalResize === true) {
    // //   this.hideAll();
    // // } else {
    // //   super.hideAll();
    // // }
    this.diagram.animateNextFrame();
  }

  transformToQRWindow(
    element: DiagramElementCollection | DiagramElementPrimative,
    lensWindow: Rect,
  ) {
    const diagramContainer = document.getElementById(`id_lesson__popup_box__diagram__${this.id}`);
    element.tieToHTML = {
      element: diagramContainer,
      window: lensWindow,
      scale: 'fit',
    };
    // element.diagramTransforms = this.diagram.spaceTransforms;
    // console.log(element)
    element.updateHTMLElementTie(this.diagram.canvasLow);
  }

  // size is width for 'left' or 'right', an height for 'up' or 'down'
  // For auto, size is 0.5
  setDiagramSpace(
    optionsIn: {
      location?: 'left' | 'right' | 'up' | 'down' | 'auto',
      xSize?: number,
      ySize?: number,
    },
  ) {
    const defaultOptions = {
      location: 'auto',
      xSize: 0.5,
      ySize: 0.5,
    };
    const options = joinObjects({}, defaultOptions, optionsIn);

    let overlayAR = 1;
    let overlay = document.getElementById('presentation_lesson__qr__overlay');

    // deterimine the lesson type
    let lessonType = 'presentation';
    if (overlay == null) {
      lessonType = 'singlePage';
      overlay = document.getElementById('single_page_lesson__qr__overlay');
    }
    if (overlay == null) {
      return;
    }

    // set size of font and window
    if (lessonType === 'singlePage') {
      this.setSinglePageSize();
    } else {
      this.setPresentationPageSize();
    }
    // this.diagram.webglLow.resize();
    // this.diagram.draw2DLow.resize();
    // this.diagram.setSpaceTransforms();
    // this.diagram.elements.updateLimits(this.diagram.limits, this.diagram.spaceTransforms);
    // this.internalResize = true;
    // console.log('1')
    // console.trace()
    this.tieToHTML.updateOnResize = false;
    this.diagram.resize(true);
    this.tieToHTML.updateOnResize = true;
    // console.log('2')
    // this.internalResize = false;
    // this.diagram.setFirstTransform();

    // Overlay aspect ratio
    overlayAR = overlay.clientWidth / overlay.clientHeight;

    // determine the location to use
    let locationToUse = options.location;
    if (options.location === 'auto') {
      if (
        overlay.clientWidth > 600
        || overlayAR > 1
        || lessonType === 'presentation'
      ) {
        locationToUse = 'left';
      } else {
        locationToUse = 'up';
      }
    }

    // determine diagram size to use
    let xSizeD;
    let ySizeD;
    let xSizeT;
    let ySizeT;
    if (locationToUse === 'up' || locationToUse === 'down') {
      xSizeD = 1;
      ySizeD = options.ySize;
      xSizeT = 1;
      ySizeT = 1 - options.ySize;
      this.spaceForDiagramElement.style.float = 'none';
    } else {
      xSizeD = options.xSize;
      ySizeD = 1;
      xSizeT = 1 - options.xSize;
      ySizeT = 1;
      this.spaceForDiagramElement.style.float = locationToUse;
    }

    // Arrange diagram and text content accordinly
    const textElement = document.getElementById(`id_lesson__popup_box__text_container__${this.id}`);
    const diagramElement = document.getElementById(`id_lesson__popup_box__diagram__${this.id}`);
    if (textElement != null && diagramElement != null) {
      const parent = textElement.parentElement;
      if (parent != null) {
        parent.removeChild(textElement);
        parent.removeChild(diagramElement);
        if (locationToUse === 'down') {
          parent.appendChild(textElement);
          parent.appendChild(diagramElement);
        } else {
          parent.appendChild(diagramElement);
          parent.appendChild(textElement);
        }
      }
    }

    // set size of diagram and text element
    if (textElement != null && diagramElement != null) {
      diagramElement.style.width
        = `calc(var(--lesson__qr_width) * ${xSizeD})`;
      diagramElement.style.height
        = `calc(var(--lesson__qr_height) * ${ySizeD * 0.8})`;
      textElement.style.width
        = `calc(var(--lesson__qr_width) * ${xSizeT})`;
      textElement.style.height
        = `calc(var(--lesson__qr_height) * ${ySizeT * 0.8})`;
    }

    
    // const rootElement = document.documentElement;
    // const lessonContent = document.getElementById('lesson__content');
    // if (lessonContent == null || rootElement == null) {
    //   return;
    // }
    // const contentFontSize = parseFloat(window
    //   .getComputedStyle(lessonContent, null)
    //   .getPropertyValue('font-size'));
    // const diagramFontSize = parseFloat(
    //   rootElement.style.getPropertyValue('--lesson__diagram-font-size'),
    // );
    // const contentWidth = parseFloat(rootElement.style.getPropertyValue('--lesson__content-width'));
    // const contentHeight = parseFloat(rootElement.style.getPropertyValue('--lesson__content-height'));
    // const qrWidth = contentWidth;
    // let qrHeight = contentHeight;
    // let fontSize = diagramFontSize;
    // let multiplier = 0.7;

    // if (lessonType === 'singlePage') {
    //   fontSize = contentFontSize * 0.8;
    //   multiplier = 0.9;
    //   if (overlay.clientWidth < 600) {
    //     qrHeight = contentHeight * 1.5;
    //   } else if (overlay.clientWidth < 500) {
    //     qrHeight = contentHeight * 2.0;
    //   } else {
    //     fontSize = Math.min(contentFontSize * 0.8, 25);
    //   }
    // }
    // // console.log(rootElement.style.getPropertyValue('--lesson__content-height'))
    // // console.log(qrWidth, multiplier, qrHeight, fontSize)
    // rootElement.style.setProperty('--lesson__qr_height', `${qrHeight * multiplier}px`);
    // rootElement.style.setProperty('--lesson__qr_width', `${qrWidth * multiplier}px`);
    // rootElement.style.setProperty('--lesson__popup_font_size', `${fontSize}px`);
  }

  setPresentationPageSize() {
    const overlay = document.getElementById('id_diagram__html');
    const lessonContent = document.getElementById('lesson__content');
    if (overlay == null || lessonContent == null) {
      return;
    }
    const fontSize = parseFloat(window
      .getComputedStyle(lessonContent, null)
      .getPropertyValue('font-size'));
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    const qrWidth = width * 0.7;
    const qrHeight = height * 0.7;
    const qrFontSize = fontSize;
    // if (width < 400) {

    // } else if (width < 600) {

    // } else {

    // }
    this.setRootElement(qrWidth, qrHeight, qrFontSize);
  }


  setSinglePageSize() {
    const overlay = document.getElementById('single_page_lesson__qr__overlay');
    const lessonContent = document.getElementById('lesson__content');
    if (overlay == null || lessonContent == null) {
      return;
    }
    const fontSize = parseFloat(window
      .getComputedStyle(lessonContent, null)
      .getPropertyValue('font-size'));
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    const qrWidth = Math.min(800, width * 0.9);
    let qrHeight = qrWidth * 2 / 3;
    const qrFontSize = Math.max(fontSize, qrWidth / 35);
    if (width < 600) {
      qrHeight = Math.min(height * 0.8, qrHeight * 2);
    }
    this.setRootElement(qrWidth, qrHeight, qrFontSize);
  }

  // eslint-disable-next-line class-methods-use-this
  setRootElement(width: number, height: number, fontSize: number) {
    const rootElement = document.documentElement;
    rootElement.style.setProperty('--lesson__qr_height', `${height}px`);
    rootElement.style.setProperty('--lesson__qr_width', `${width}px`);
    rootElement.style.setProperty('--lesson__popup_font_size', `${fontSize}px`);
  }

  showAll() {
    this.show();
  }

  showOnly() {
    this.show();
  }

  show() {
    super.show();
    this._box.show();
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
}

//   setPosition(
//     xOrPoint: Point | number,
//     yOrReference: 'center' | 'topLeft' | number = 'center',
//     reference: 'center' | 'topLeft' = 'center',
//   ) {
//     let point = xOrPoint;
//     let ref = yOrReference;
//     if (typeof xOrPoint === 'number' && typeof yOrReference === 'number') {
//       point = new Point(xOrPoint, yOrReference);
//       ref = reference;
//     }
//     if (point instanceof Point) {
//       const cssSpace = point
//         .transformBy(this.diagram.diagramToCSSPercentSpaceTransform.matrix());
//       this.container.style.left = `${cssSpace.x * 100}%`;
//       this.container.style.top = `${cssSpace.y * 100}%`;
//       if (ref === 'topLeft') {
//         this.container.style.transform = 'none';
//       }
//       if (ref === 'center') {
//         this.container.style.transform = 'translate(-50%, -50%)';
//       }
//     }
//   }
