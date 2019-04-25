// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  style,
//   click,
//   centerV,
} = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const examples = coll._examples;
    const meas = coll._measure;
    const unit = coll._unitShape;
    const shapes = coll._shapes;
    const rect = coll._rectangle;
    const square = coll._square;
    const eqn = coll._eqnEqn;
    const nav = coll._eqnNav;

    this.addSection({
      title: '',
      setContent: style({ top: 0 }, [
        '|Area| is the |amount of space| a shape takes up and is measured in |squared length| units, such as |square meters| normally written as |m<sup>2</sup>|.',
        `${new Definition('Area', 'Mid 16<sup>th</sup> century', ['area', 'space allocated for a specific purpose'], 'Latin', ['area', 'vacant piece of level ground']).html({ classes: 'lesson__definition_high' })}`,
      ]),
      show: [
        shapes._circle, shapes._triangle, shapes._square, unit._grid,
        shapes._triangleHtmlLabel, shapes._squareHtmlLabel,
        shapes._circleHtmlLabel,
      ],
      setSteadyState: () => {
        coll.setScenarios('summary');
      },
    });
  }
}

export default Content;
