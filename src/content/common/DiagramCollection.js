// @flow
import Fig from 'figureone';
import {
  makeSelectorText, SelectorList,
} from './tools/selector';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from './CommonLessonDiagram';

const { Point, Transform } = Fig.tools.g2;
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

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object = { colors: {} },
    transform: Transform = new Transform(),
  ) {
    super(transform, diagram.limits);
    this.diagram = diagram;
    this.layout = layout;
    this.colors = layout.colors;
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
}