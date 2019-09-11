// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  highlight,
//   click,
//   centerV,
} = Fig.tools.html;

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
    const fig = coll._fig;
    const polyMost = fig._polyMost;
    const circle = fig._circle;
    const eqn = coll._eqn;

    this.addSection({
      setContent: '|Circle area| is the product of |π| and the |radius| squared.',
      modifiers: {
        radius: highlight(colors.radius),
      },
      show: [circle, polyMost._radius],
      setSteadyState: () => {
        fig.setScenario('left');
        eqn.setScenario('summary');
        eqn.showForm('14');
        polyMost._radius.setScenario('circle');
        polyMost._radius.updateLabel(polyMost._radius.getRotation() + polyMost.getRotation());
      },
    });
  }
}

export default Content;
