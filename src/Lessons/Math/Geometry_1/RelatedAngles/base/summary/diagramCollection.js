// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

import { addSelectorHTML } from '../../../../LessonsCommon/tools/selector';
// // eslint-disable-next-line import/no-cycle
// import LessonDiagram from './diagram';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import OppositeCollection from '../common/diagramCollectionOpposite';
import ThreeLinesCollection from '../common/diagramCollectionThreeLines';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import type { TypeUnits } from '../../../../LessonsCommon/DiagramCollection';

const { Transform, DiagramElementPrimative } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _opposite: OppositeCollection;
  _threeLines: ThreeLinesCollection;
  _selector: DiagramElementPrimative;
  units: TypeUnits;

  addSelector() {
    addSelectorHTML(
      this.diagram,
      this,
      'selector',
      'lesson__related_angles_selector',
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
    this.add('opposite', new OppositeCollection(diagram, this.layout));
    this.add('threeLines', new ThreeLinesCollection(diagram, this.layout));
    this.addSelector();
    this.add('unitsSelector', this.makeUnitsSelector());
  }

  selectorClicked(title: string) {
    if (title === 'opposite') {
      this.diagram.lesson.goToSection('Opposite Angles');
    }
    if (title === 'corresponding') {
      this.diagram.lesson.goToSection('Corresponding Angles');
    }
    if (title === 'alternate') {
      this.diagram.lesson.goToSection('Alternate Angles');
    }
    if (title === 'interior') {
      this.diagram.lesson.goToSection('Interior Angles');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setUnits(units: TypeUnits) {
    this.units = units;
    if (this._opposite.isShown) {
      this._opposite.setUnits(units);
    }
    if (this._threeLines.isShown) {
      this._threeLines.setUnits(units);
    }
  }
}
