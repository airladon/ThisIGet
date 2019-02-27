// @flow
import Fig from 'figureone';
import {
  makeSelectorText, SelectorList,
} from './tools/selector';
import CommonLessonDiagram from './CommonLessonDiagram';

const { Point, Transform, getMaxTimeFromVelocity } = Fig.tools.g2;
const {
  DiagramElementCollection, DiagramElement,
} = Fig;

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

// deprecate
function getTarget(
  element: DiagramElement,
  scenario: TypeScenario,
  layout: Object,
) {
  const target = element.transform._dup();
  let scenarioObject;

  if (scenario == null || scenario === '') {
    scenarioObject = layout[element.name];
  } else if (typeof scenario === 'string') {
    scenarioObject = layout[element.name][scenario];
  } else {
    scenarioObject = scenario;
  }
  if (scenarioObject.position != null) {
    target.updateTranslation(scenarioObject.position);
  }

  if (scenarioObject.rotation != null) {
    target.updateRotation(scenarioObject.rotation);
  }
  if (scenarioObject.scale != null) {
    if (scenarioObject.scale instanceof Point) {
      target.updateScale(scenarioObject.scale);
    } else {
      target.updateScale(scenarioObject.scale, scenarioObject.scale);
    }
  }
  return target;
}

type TypeFuturePosition = {
  element: DiagramElement;
  scenario: TypeScenario;
};

export default class CommonDiagramCollection extends DiagramElementCollection {
  layout: Object;
  colors: Object;
  +diagram: CommonLessonDiagram;
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
  futurePositions: Array<TypeFuturePosition>;
  +calculateFuturePositions: (?TypeScenario) => void;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object = { colors: {} },
    transform: Transform = new Transform(),
  ) {
    super(transform, diagram.limits);
    this.diagram = diagram;
    this.layout = layout;
    this.colors = layout.colors;
    this.futurePositions = [];
  }

  // deprecate
  legacyGetTimeToMoveToScenario(
    element: DiagramElement,
    scenario: TypeScenario = null,
    rotDirection: -1 | 1 | 0 | 2 = 0,
  ) {
    const target = getTarget(element, scenario, this.layout);
    const velocity = element.transform.constant(0);
    velocity.updateTranslation(new Point(1 / 2, 1 / 2));
    velocity.updateRotation(2 * Math.PI / 6);
    velocity.updateScale(1, 1);
    const time = getMaxTimeFromVelocity(element.transform._dup(), target, velocity, rotDirection);
    return time;
  }

  // deprecate
  legacySetScenario(
    element: DiagramElement,
    scenario: TypeScenario = null,
  ) {
    const target = getTarget(element, scenario, this.layout);
    // eslint-disable-next-line no-param-reassign
    element.setTransform(target._dup());
  }

  // deprecate
  moveToScenario(
    element: DiagramElement,
    scenario: TypeScenario = null,
    animationTimeOrVelocity: ?number = null,    // null uses velocity
    callback: ?() => void = null,
    rotDirection: -1 | 1 | 0 | 2 = 0,
  ) {
    element.stop();
    const target = getTarget(element, scenario, this.layout);
    let time = 1;
    const estimatedTime = this.legacyGetTimeToMoveToScenario(element, scenario, rotDirection);
    if (animationTimeOrVelocity == null) {
      time = estimatedTime;
    } else {
      time = animationTimeOrVelocity;
    }
    if (time > 0 && estimatedTime !== 0) {
      element.animateTo(target, time, 0, rotDirection, callback);
    } else if (callback != null) {
      callback();
    }
    return time;
  }

  makeUnitsSelector() {
    const font = this.layout.defaultFont._dup();
    font.size = 0.09;
    font.setColor(this.layout.colors.diagram.disabled);
    const list = new SelectorList();
    list.add('deg', 'degrees');
    list.add('rad', 'radians');
    const selectorClicked = (selectedUnits: 'deg' | 'rad') => {
      const degSpans = document.getElementsByClassName('lesson__unit_deg');
      const radSpans = document.getElementsByClassName('lesson__unit_rad');
      if (selectedUnits === 'rad') {
        [].forEach.call(degSpans, degSpan => degSpan.classList.add('lesson__unit_hide'));
        [].forEach.call(radSpans, radSpan => radSpan.classList.remove('lesson__unit_hide'));
      }
      if (selectedUnits === 'deg') {
        [].forEach.call(degSpans, degSpan => degSpan.classList.remove('lesson__unit_hide'));
        [].forEach.call(radSpans, radSpan => radSpan.classList.add('lesson__unit_hide'));
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

  // eslint-disable-next-line class-methods-use-this
  calculateFuturePositions() {
  }

  addFuturePosition(element: DiagramElement, scenario: TypeScenario) {
    this.futurePositions.push({ element, scenario });
  }

  setFuturePositions() {
    this.futurePositions.forEach((futurePosition) => {
      const { element, scenario } = futurePosition;
      this.legacySetScenario(element, scenario);
    });
  }

  moveToFuturePositions(
    timeOrCallback: ?number | () => void = null,
    done: ?() => void = null,
    rotDirection: -1 | 1 | 0 | 2 = 0,
  ) {
    let maxTime: number = 0;
    if (typeof timeOrCallback !== 'number'
      || timeOrCallback == null
      || timeOrCallback === 0
    ) {
      this.futurePositions.forEach((futurePosition) => {
        const { element, scenario } = futurePosition;
        const thisTime = this.legacyGetTimeToMoveToScenario(element, scenario, rotDirection);
        maxTime = Math.max(maxTime, thisTime);
      });
    } else {
      maxTime = timeOrCallback;
    }

    let callbackToUse = done;
    if (typeof timeOrCallback === 'function') {
      callbackToUse = timeOrCallback;
    }
    let doneCount = 0;
    let toBeDoneCount = 0;
    const elementDone = () => {
      doneCount += 1;
      if (doneCount === toBeDoneCount) {
        if (callbackToUse != null) {
          callbackToUse();
        }
      }
    };
    this.futurePositions.forEach((futurePosition) => {
      const { element } = futurePosition;
      if (element.isShown) {
        toBeDoneCount += 1;
      }
    });
    this.futurePositions.forEach((futurePosition) => {
      const { element, scenario } = futurePosition;
      if (element.isShown) {
        this.moveToScenario(element, scenario, maxTime, elementDone, rotDirection);
        // toBeDoneCount += 1;
      }
    });
  }

  // deprecate
  getMethod(method: string) {
    const methods = {
      polyLine: this.diagram.shapes.polyLine.bind(this.diagram.shapes),
      line: this.diagram.objects.line.bind(this.diagram.objects),
      collection: this.diagram.shapes.collection.bind(this.diagram.shapes),
    };
    if (method in methods) {
      return methods[method];
    }
    return method;
  }

  // deprecate
  addLayout(
    rootCollection: DiagramElementCollection = this,
    layout: { addElements?: TypeAddElementObject } = this.layout,
  ) {
    if (layout.addElements != null
      && Array.isArray(layout.addElements)
    ) {
      layout.addElements.forEach((elementDefinition, index) => {
        let methodPathToUse;
        let nameToUse;
        let pathToUse;
        let optionsToUse;
        let addElementsToUse;

        // Extract the parameters from the layout object
        if (Array.isArray(elementDefinition)) {
          if (elementDefinition.length <= 4) {
            [
              nameToUse, methodPathToUse, optionsToUse, addElementsToUse,
            ] = elementDefinition;
          } else {
            [
              pathToUse, nameToUse, methodPathToUse, optionsToUse,
              addElementsToUse,
            ] = elementDefinition;
          }
        } else {
          nameToUse = elementDefinition.name;
          pathToUse = elementDefinition.path;
          optionsToUse = elementDefinition.options;
          addElementsToUse = elementDefinition.addElements;
          methodPathToUse = elementDefinition.method;
        }

        const getMethod = (e, remainingPath) => {
          if (!(remainingPath[0] in e)) {
            throw new Error(`Layout addElement at index ${index}: collection or method ${remainingPath} does not exist`);
          }
          if (remainingPath.length === 1) {          // $FlowFixMe
            return e[remainingPath[0]];
          }                                          // $FlowFixMe
          return getMethod(e[remainingPath[0]], remainingPath.slice(1));
        };

        let collectionPath;
        if (pathToUse == null || pathToUse === '') {
          collectionPath = rootCollection;
        } else {
          const path = elementDefinition.path.split('/');
          collectionPath = getMethod(rootCollection, path);
        }

        // Check for critical errors
        if (nameToUse == null || nameToUse === '') {
          throw new Error(`Layout addElement at index ${index} in collection ${rootCollection.name}: missing name property`);
        }
        if (methodPathToUse == null || methodPathToUse === '') {
          throw new Error(`Layout addElement at index ${index} in collection ${rootCollection.name}: missing method property`);
        }
        if (!(collectionPath instanceof DiagramElementCollection)) {
          throw new Error(`Layout addElement at index ${index} in collection ${rootCollection.name}: missing or incorrect path property`);
        }

        const methodPath = methodPathToUse.split('/');

        let method = this.getMethod(methodPathToUse);
        if (typeof method === 'string') {
          method = getMethod(this, methodPath).bind(getMethod(this, methodPath.slice(0, -1)));
        }
        if (typeof method !== 'function') {
          return;
        }

        if (typeof method !== 'function') {
          throw new Error(`Layout addElement at index ${index} in collection ${rootCollection.name}: incorrect method property`);
        }

        if (methodPath.slice(-1)[0].startsWith('add')) {
          method(collectionPath, nameToUse, optionsToUse);
        } else {
          let element;
          if (Array.isArray(optionsToUse)) {
            element = method(...optionsToUse);
          } else {
            element = method(optionsToUse);
          }
          if (element == null) {
            return;
          }
          if (collectionPath instanceof DiagramElementCollection) {
            collectionPath.add(nameToUse, element);
          }
        }

        if (`_${nameToUse}` in rootCollection
            && 'addElements' in elementDefinition
        ) {                                                     // $FlowFixMe
          this.addLayout(rootCollection[`_${nameToUse}`], { addElements: addElementsToUse });
        }
      });
    }
  }
}
