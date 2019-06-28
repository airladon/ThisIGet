// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../LessonsCommon/tools/definition';

// const {
//   click,
//   centerV,
// } = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: '',
      setContent: [
        'A |quadrangle|, or |quadrilateral| is a shape with |four sides| and |four angles|. A quadrangle\'s angles will always add to |360º|.',
        `${new Definition('Quadrangle', 'Latin', ['quattuor', 'four', 'angulus', 'angle, corner']).html({ classes: 'lesson__definition_high', color: colors.sides })}`,
        `${new Definition('Quadrilateral', 'Latin', ['quattuor', 'four', 'latus, later', 'side']).html(colors.sides)}`,
      ],
      show: [coll._quad1, coll._quad2, coll._quad3],
    });
  }
}

export default Content;
