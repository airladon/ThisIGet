// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

// const {
//   style,
// //   click,
// //   centerV,
// } = Fig.tools.html;

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
    const eqn = coll._eqn;
    const height1 = coll._height1;
    const height2 = coll._height2;

    this.addSection({
      setContent: [
        'The area of a triangle is equal to |half its base times its height|. The base can be any side, and the |height| is equal to the |perpendicular line between the line on which the base sits and the top| point.',
      ],
      show: [height1, height2],
      setSteadyState: () => {
        height1.setScenario('summary');
        height2.setScenario('summary');
        coll.setScenarios('summary');
        eqn.showForm('10');
      },
    });
  }
}

export default Content;
