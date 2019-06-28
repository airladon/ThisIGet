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
import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  click,
  highlight,
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
    const tri = coll._triangle;

    this.addSection({
      setContent: [
        'An |equilateral| triangle has |three_equal_sides| and |three_equal_angles|. |Any| triangle with three equal |sides| |or| three equal |angles| will be an equilateral triangle.',
        `${new Definition('Equilateral', 'Latin', ['aequilateralis', '', 'aequi', 'equal', 'lateralis', 'side']).html()}`,
      ],
      modifiers: {
        three_equal_sides: click(coll.pulseSides, [coll], colors.sides),
        three_equal_angles: click(coll.pulseAngles, [coll, null], colors.angles),
        sides: highlight(colors.sides),
        angles: highlight(colors.angles),
      },
      show: [tri],
      setSteadyState: () => {
        tri.setScenario('summary');
      },
    });
  }
}

export default Content;
