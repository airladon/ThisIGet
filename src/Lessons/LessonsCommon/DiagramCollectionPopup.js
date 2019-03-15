// @flow
import Fig from 'figureone';
import CommonDiagramCollection from './DiagramCollection';
import getLessonIndex from '../index';

const {
  Transform, Point, DiagramElementPrimative, Scale, Rect, DiagramElement,
  Translation,
} = Fig;
const { html } = Fig.tools;
const { generateUniqueId } = Fig.tools.misc;

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
    textContainer.id = `id_lesson__popup_box__text_container_${this.id}`;
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
    // this.linkElement.innerHTML = `<a href=${link}>Go to lesson</a>`;
  }

  // getDiagramSpacePosition(reference: 'topLeft' | 'center') {
  //   const matrix = this.diagram.pixelToDiagramSpaceTransform.matrix();

  //   const dBound = this.spaceForDiagramElement.getBoundingClientRect();
  //   const cBound = this.diagram.htmlCanvas.getBoundingClientRect();
  //   const pixelTopLeft = new Point(
  //     dBound.left - cBound.left,
  //     dBound.top - cBound.top,
  //   );
  //   const pixelBottomRight = new Point(
  //     dBound.right - cBound.left,
  //     dBound.bottom - cBound.top,
  //   );

  //   const topLeft = pixelTopLeft.transformBy(matrix);
  //   const bottomRight = pixelBottomRight.transformBy(matrix);

  //   if (reference === 'topLeft') {
  //     return topLeft;
  //   }

  //   const width = bottomRight.x - topLeft.x;
  //   const height = topLeft.y - bottomRight.y;
  //   return new Point(topLeft.x + width / 2, bottomRight.y + height / 2);
  // }

  scaleToQrWindow(
    // showWindow: Rect,
    element: DiagramElement,
    scale: number = 1,
    // scale: number,
    position: Point,
  ) {
    const diagram = this.diagram.limits;
    // let scaleX = 1;
    // let scaleY = 1;
    const diagramToWindowScaleX = diagram.width / this.layout.limits.width;
    const diagramToWindowScaleY = diagram.height / this.layout.limits.height;
    const elementTransform = element.transform;
    let elementScale = elementTransform.s();
    if (elementScale == null) {
      elementTransform.order = [new Scale(1, 1), ...elementTransform.order];
      elementTransform.calcMatrix();
      elementScale = new Scale(1, 1);
    }
    elementScale.x = diagramToWindowScaleX * scale;
    elementScale.y = diagramToWindowScaleY * scale;
    element.setScale(elementScale);

    element.setPosition(new Point(
      diagramToWindowScaleX * position.x,
      diagramToWindowScaleY * position.y,
    ));
  }

  setDiagramSpace(
    widthPercentage: number,
    heightPercentage: number,
    float: ?'left' | 'right' = null,
  ) {
    // As css 0, 0 is in top left and we are converting a relative dimension,
    // not absolute, then first make a point of the relavent dimension relative
    // to the top left of the diagram
    // const diagramSpace = new Point(
    //   this.diagram.limits.left + width,
    //   this.diagram.limits.top - height,
    // );
    // const cssSpace = diagramSpace
    //   .transformBy(this.diagram.spaceTransforms.diagramToCSSPercent.matrix());
    //   console.log(this.diagram.spaceTransforms.diagramToCSSPercent)
    //   console.log(this.diagram.spaceTransforms.diagramToPixel)
    //   console.log(this.diagram.limits)
    this.spaceForDiagramElement.style.width
      = `calc(var(--lesson__qr_width) * ${widthPercentage})`;
    this.spaceForDiagramElement.style.height
      = `calc(var(--lesson__qr_height) * ${heightPercentage})`;
    if (float != null) {
      this.spaceForDiagramElement.style.float = float;
      const textContainer = document.getElementById(`id_lesson__popup_box__text_container_${this.id}`);
      if (textContainer != null) {
        textContainer.style.height = `calc(var(--lesson__qr_height) * ${heightPercentage})`;
      }
    } else {
      const textContainer = document.getElementById(`id_lesson__popup_box__text_container_${this.id}`);
      if (textContainer != null) {
        textContainer.style.height = `calc(var(--lesson__qr_height) * ${1 - heightPercentage - 0.25})`;
        textContainer.style.display = 'block';
      }
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
    this._box.show();
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideAll() {
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
