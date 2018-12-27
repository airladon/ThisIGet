// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import { addSelectorHTML } from '../../../../LessonsCommon/tools/selector';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import AdjacentCollection from '../common/diagramCollectionAdjacent';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import type { TypeUnits } from '../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _adjacent: AdjacentCollection;
  _selector: DiagramElementPrimative;
  units: TypeUnits;

  addSelector() {
    addSelectorHTML(
      this.diagram,
      this,
      'selector',
      'lesson__adjacent_angles_selector',
      this.selectorClicked.bind(this),
      'horizontal',
    );
    this._selector.setPosition(this.layout.selector.position);
  }

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);
    this.units = 'deg';
    this.add('adjacent', new AdjacentCollection(diagram, this.layout));
    this.addSelector();
    this.add('unitsSelector', this.makeUnitsSelector());
    this._adjacent.setPosition(this.layout.position);
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  setUnits(units: TypeUnits) {
    this.units = units;
    if (this._adjacent.isShown) {
      this._adjacent.setUnits(units);
    }
  }

  selectorClicked(title: string) {
    if (title === 'adjacent') {
      this.diagram.lesson.goToSection('Adjacent Angles');
    }
    if (title === 'complementary') {
      this.diagram.lesson.goToSection('Complementary Angles');
    }
    if (title === 'supplementary') {
      this.diagram.lesson.goToSection('Supplementary Angles');
    }
    if (title === 'explementary') {
      this.diagram.lesson.goToSection('Explementary Angles');
    }
  }
}
