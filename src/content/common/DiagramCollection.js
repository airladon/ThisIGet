// @flow
import Fig from 'figureone';
import {
  makeSelectorText, SelectorList,
} from './tools/selector';
// eslint-disable-next-line import/no-cycle
import CommonTopicDiagram from './CommonTopicDiagram';

const { Point, Transform } = Fig.tools.g2;
const {
  DiagramElementCollection, DiagramElement,
} = Fig;

const { joinObjects } = Fig.tools.misc;
const { click } = Fig.tools.html;

export type TypeUnits = 'deg' | 'rad';

export type TypeScenario = string | null
  | { position?: Point, rotation?: number, scale?: Point | number };

export type TypeAddElementObject = {
  path?: string,
  name?: string,
  method?: string,
  options?: {},
  addElements?: Array<TypeAddElementObject>
};

type TypeAccentOptions = {
  element?: ?DiagramElement | Array<DiagramElement>,
  children?: ?Array<DiagramElement | string>,
  style?: TypeAccent,
  done?: ?() => void,
}

type TypeAccent = 'pulse' | 'show' | 'highlight' | Array<'highlight' | 'pulse' | 'show'>;

function getColor(
  parent: DiagramElement,
  // $FlowFixMe
  childrenOrColor: ?(Array<number> | Array<DiagramElement | string>),
  color: ?Array<number>,
): Array<number> {
  if (color != null) {
    return color.slice();
  }
  let colorToUse = parent.color.slice();
  if (childrenOrColor != null) {
    if (typeof childrenOrColor[0] === 'number') {
      colorToUse = childrenOrColor;
    } else if (parent.type === 'collection' && childrenOrColor.length > 0) {
      const firstElement = parent.getElement(childrenOrColor[0]);
      if (firstElement != null) {
        colorToUse = firstElement.color.slice();
      }
    }
  }
  return colorToUse.slice();
}

function mergeAccentOptions(
  elementOrOptions: DiagramElement | Array<DiagramElement>
                    | TypeAccentOptions,
  childrenOrDoneOrColor: ?(Array<DiagramElement | string> | () => void | Array<number>) = null,
  done: ?() => void = null,
): {
  element: ?Array<DiagramElement>,
  children: ?Array<DiagramElement | string>,
  style: TypeAccent,
  done: ?() => void,
} {
  const defaultOptions: TypeAccentOptions = {
    element: null,
    children: null,
    style: 'pulse',
    done: null,
  };
  let options;
  if (typeof childrenOrDoneOrColor === 'function') {
    // $FlowFixMe
    defaultOptions.done = childrenOrDoneOrColor;
  } else if (childrenOrDoneOrColor != null
    && typeof childrenOrDoneOrColor[0] !== 'number') {
    defaultOptions.children = childrenOrDoneOrColor;
  }
  if (done != null) {
    defaultOptions.done = done;
  }

  if (Array.isArray(elementOrOptions)) {
    defaultOptions.element = elementOrOptions;
    options = defaultOptions;
  } else if (elementOrOptions instanceof DiagramElement) {
    defaultOptions.element = [elementOrOptions];
    options = defaultOptions;
  } else {
    options = joinObjects({}, defaultOptions, elementOrOptions);
  }

  if (options.element instanceof DiagramElement) {
    options.element = [options.element];
  }

  const styleIn = options.style;
  let style;
  if (typeof styleIn === 'string') {
    style = [styleIn];
  } else if (styleIn == null) {
    style = ['pulse'];
  } else {
    style = styleIn;
  }
  options.style = style;
  // $FlowFixMe
  return options;
}

function getElements(
  elementsIn: DiagramElement | Array<DiagramElement>,
  childrenIn: ?Array<DiagramElement | string>,
): Array<DiagramElement> {
  let elements;
  if (Array.isArray(elementsIn)) {
    elements = elementsIn;
  } else {
    elements = [elementsIn];
  }
  if (childrenIn == null) {
    return elements;
  }
  let childrenInToUse = childrenIn;
  if (!Array.isArray(childrenIn)) {
    childrenInToUse = [childrenIn];
  }
  const children = [];
  elements.forEach((element) => {
    childrenInToUse.forEach((child) => {
      if (typeof child === 'string') {
        const c = element.getElement(child);
        if (c != null) {
          children.push(c);
        }
      } else {
        children.push(child);
      }
    });
  });
  return children;
}


function getElementsFromOptions(
  options: TypeAccentOptions | DiagramElement | Array<DiagramElement>,
): Array<DiagramElement> {
  if (options instanceof DiagramElement) {
    return [options];
  }
  if (Array.isArray(options)) {
    return options;
  }
  const { element, children } = options;
  if (element == null) {
    return [];
  }
  if (children == null) {
    if (Array.isArray(element)) {
      return element;
    }
    return [element];
  }

  return getElements(element, children);
}

export default class CommonDiagramCollection extends DiagramElementCollection {
  layout: Object;
  colors: Object;
  +diagram: CommonTopicDiagram;
  currentToggleIndex: { [toggleIndexName: string]: number };
  moveToScenario: (
    DiagramElement,
    ?TypeScenario,
    ?number,
    ?(() => void),
    ?(-1 | 1 | 0 | 2)) => number;

  legacyGetTimeToMoveToScenario: (
    DiagramElement,
    ?TypeScenario,
    ?(-1 | 1 | 0 | 2)) => number;

  legacySetScenario: (DiagramElement, ?TypeScenario) => void;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object = { colors: {} },
    transform: Transform = new Transform(),
  ) {
    super(transform, diagram.limits);
    this.diagram = diagram;
    this.layout = layout;
    this.colors = layout.colors;
    this.currentToggleIndex = { '0': 0 };
  }

  makeUnitsSelector() {
    const font = this.layout.defaultFont._dup();
    font.size = 0.09;
    font.setColor(this.layout.colors.diagram.disabled);
    const list = new SelectorList();
    list.add('deg', 'degrees');
    list.add('rad', 'radians');
    const selectorClicked = (selectedUnits: 'deg' | 'rad') => {
      const degSpans = document.getElementsByClassName('figureone__unit_deg');
      const radSpans = document.getElementsByClassName('figureone__unit_rad');
      if (selectedUnits === 'rad') {
        [].forEach.call(degSpans, degSpan => degSpan.classList.add('topic__unit_hide'));
        [].forEach.call(radSpans, radSpan => radSpan.classList.remove('topic__unit_hide'));
      }
      if (selectedUnits === 'deg') {
        [].forEach.call(degSpans, degSpan => degSpan.classList.remove('topic__unit_hide'));
        [].forEach.call(radSpans, radSpan => radSpan.classList.add('topic__unit_hide'));
      }
      this.setUnits(selectedUnits);
    };
    const selector = makeSelectorText(
      list,
      'deg',
      this.diagram,
      selectorClicked.bind(this),
      0,
      font,
      this.layout.colors.diagram.text.base,
      '/',
      0.1,
    );
    selector.setPosition(this.layout.units.position);
    return selector;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setUnits(units: TypeUnits) {
  }

  /*
    accent(element, done)
    accent(elements, done)
    accent(parent, children, done)
    accent({
      element: DiagramElement | Array<DiagramElement>,
      children: ?Array<DiagramElement | string>,
      style: ?'pulse' | 'highlight' | 'show' | ['pulse', 'highlight', 'show'],
      done: ?() => void,
    })
  }
  */
  accent(
    elementOrOptions: DiagramElement | Array<DiagramElement>
                      | TypeAccentOptions,
    childrenOrDone: ?(Array<DiagramElement | string> | () => void) = null,
    done: ?() => void = null,
  ) {
    const options = mergeAccentOptions(elementOrOptions, childrenOrDone, done);

    let parents = options.element;
    const { children, style } = options;
    let doneToUse = options.done;

    // $FlowFixMe
    const allElements = getElementsFromOptions(options);
    if (allElements.length === 0 || parents == null) {
      if (doneToUse != null) {
        doneToUse();
      }
      return;
    }

    if (!Array.isArray(parents)) {
      parents = [parents];
    }

    parents.forEach((element) => {
      if (children == null) {
        if (style.includes('show')) {
          element.showAll();
        }
        if (style.includes('highlight')) {
          element.highlight();
        }
        if (style.includes('pulse')) {
          element.pulse(doneToUse);
          doneToUse = null;
        }
      } else {
        if (style.includes('show')) {
          element.exec(['showAll'], children);
        }
        if (style.includes('highlight')) {
          element.highlight(children);
        }
        if (style.includes('pulse')) {
          element.pulse(children, doneToUse);
          doneToUse = null;
        }
      }
    });
    if (doneToUse != null) {
      doneToUse();
    }
    this.diagram.animateNextFrame();
  }

  /*
    bindAccent(element, color)
    bindAccent(elements, color)
    bindAccent(parent, children, color)
    bindAccent({
      element: DiagramElement | Array<DiagramElement>,
      children: ?Array<DiagramElement | string>,
      style: ?'pulse' | 'highlight' | 'show' | ['pulse', 'highlight', 'show'],
      done: ?() => void,
    }, color)
  }
  */
  bindAccent(
    elementOrOptions: DiagramElement | Array<DiagramElement>
                      | TypeAccentOptions,
    // $FlowFixMe
    childrenOrColor: ?(Array<DiagramElement | string> | Array<number>) = null,
    color: ?Array<number> = null,
  ) {
    let colorToUse = [1, 1, 1, 1];
    const options = mergeAccentOptions(elementOrOptions, childrenOrColor, null);

    // $FlowFixMe
    const allElements = getElementsFromOptions(options);
    if (allElements.length > 0) {
      colorToUse = allElements[0].color.slice();
    }

    if (Array.isArray(childrenOrColor)
      && childrenOrColor.length > 0
      && typeof childrenOrColor[0] === 'number'
    ) {
      colorToUse = childrenOrColor.slice();
    }
    if (color != null) {
      colorToUse = color.slice();
    }
    const accenter = () => {
      // $FlowFixMe
      this.accent(options);
      this.diagram.animateNextFrame();
    };
    return click(accenter, [this], colorToUse);
  }

  // If any child is not shown, then show all children - otherwise hide all
  toggle(
    parent: DiagramElement,
    children: ?Array<DiagramElement | string> = null,
    othersToHide: ?Array<DiagramElement | string> = null,
  ) {
    if (children == null) {
      if (parent.isShown) {
        parent.hide();
      } else {
        parent.showAll();
      }
      this.diagram.animateNextFrame();
      return;
    }
    const childElements = getElements(parent, children);
    const allChildrenShown = childElements.reduce(
      (allShown, elem) => elem.isShown && allShown,
      true,
    );
    let anyOthersShown = false;
    if (othersToHide != null && othersToHide.length > 0) {
      const otherElements = getElements(parent, othersToHide);
      anyOthersShown = otherElements.reduce((anyShown, elem) => elem.isShown || anyShown, false);
    }

    if (allChildrenShown && !anyOthersShown) {
      parent.exec(['hide'], children);
    } else {
      parent.exec(['showAll'], children);
    }
    if (anyOthersShown) {
      parent.exec('hide', othersToHide);
    }
    this.diagram.animateNextFrame();
  }

  bindToggle(
    parent: DiagramElement,
    // $FlowFixMe
    childrenOrColor: ?(Array<DiagramElement | string> | Array<number>) = null,
    // $FlowFixMe
    othersToHideOrColor: ?(Array<DiagramElement | string> | Array<number>) = null,
    color: ?Array<number> = null,
  ) {
    let colorToUse = getColor(parent, childrenOrColor, color);
    if (Array.isArray(othersToHideOrColor) && typeof othersToHideOrColor[0] === 'number') {
      colorToUse = othersToHideOrColor;
    }

    const toggler = () => {
      if (typeof childrenOrColor[0] === 'number') {
        this.toggle(parent);
      } else if (typeof othersToHideOrColor[0] === 'number') {
        this.toggle(parent, childrenOrColor);
      } else {
        this.toggle(parent, childrenOrColor, othersToHideOrColor);
      }
      this.diagram.animateNextFrame();
    };
    return click(toggler, [this], colorToUse);
  }

  toggleGroups(
    parent: DiagramElement,
    // $FlowFixMe
    groupsIn: Array<Array<DiagramElement | string>> | Array<DiagramElement | string>,
    currentToggleIndex: string | number = 0,
    styleIn: 'pulse' | 'highlightInParent' | 'show' | 'highlight' |
             Array<'highlight' | 'pulse' | 'show' | 'highlightInParent'> = 'pulse',
    done: ?() => void = null,
  ) {
    let style;
    if (typeof styleIn === 'string') {
      style = [styleIn];
    } else {
      style = styleIn;
    }

    let groups;
    if (typeof groupsIn[0] === 'string') {
      groups = groupsIn.map(g => [g]);
    } else {
      groups = groupsIn;
    }
    const indexToUse = `${currentToggleIndex}`;
    const index = this.currentToggleIndex[indexToUse];
    const numGroups = groups.length;
    const group = groups[index];
    if (style.includes('show')) {
      groups.forEach((g, i) => {
        if (i !== index) {
          parent.exec(['hide'], g);
        }
      });
      parent.exec(['showAll'], group);
    }
    if (style.includes('highlightInParent')) {
      parent.highlight([...group]);
    }
    if (style.includes('highlight')) {
      groups.forEach((g, i) => {
        if (i !== index) {
          parent.exec(['dim'], g);
        }
      });
      parent.exec(['undim'], group);
    }
    if (style.includes('pulse')) {
      parent.pulse([...group], done);
    }
    this.currentToggleIndex[indexToUse] = (index + 1) % numGroups;
    this.diagram.animateNextFrame();
  }

  bindToggleGroups(
    parent: DiagramElement,
    // $FlowFixMe
    groups: Array<Array<DiagramElement | string>> | Array<DiagramElement | string>,
    color: Array<number> = [1, 0, 0, 1],
    styleIn: 'pulse' | 'highlightInParent' | 'show' | 'highlight' |
             Array<'highlight' | 'pulse' | 'show' | 'highlightInParent'> = 'pulse',
    currentToggleIndex: number | string = 0,
  ) {
    const groupPulser = () => {
      this.toggleGroups(parent, groups, currentToggleIndex, styleIn, null);
    };
    return click(groupPulser, [this], color);
  }

  resetToggle(indexIn: ?(number | string) = null) {
    if (indexIn == null) {
      Object.keys(this.currentToggleIndex).forEach((index) => {
        this.currentToggleIndex[index] = 0;
      });
    } else {
      this.currentToggleIndex[`${indexIn}`] = 0;
    }
  }
}
