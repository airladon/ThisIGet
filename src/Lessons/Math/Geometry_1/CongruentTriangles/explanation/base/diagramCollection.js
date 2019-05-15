// @flow
import Fig from 'figureone';

import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollection from './diagramCollectionCommon';
import CommonCollectionAAA from './aaa';
import CommonCollectionSAS from './sas';
import CommonCollectionAAS from './aas';
import CommonCollectionASA from './asa';
import CommonCollectionSSA from './ssa';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _collection: CommonCollection;
  _aaa: CommonCollectionAAA;
  _aas: CommonCollectionAAS;
  _sas: CommonCollectionSAS;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('collection', new CommonCollection(diagram, this.layout));
    this.add('aaa', new CommonCollectionAAA(diagram, this.layout));
    this.add('sas', new CommonCollectionSAS(diagram, this.layout));
    this.add('asa', new CommonCollectionASA(diagram, this.layout));
    this.add('aas', new CommonCollectionAAS(diagram, this.layout));
    this.add('ssa', new CommonCollectionSSA(diagram, this.layout));
    // this.add('sss', new CommonCollectionSSS(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}