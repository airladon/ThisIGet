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
  //   centerV,
  highlightWord,
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
    const rect = coll._rect;
    const square = coll._square;

    this.addSection({
      title: 'Rectangle',
      setContent: [
        'A |rectangle| is a quadrangle with |all_angles_equal_to_90|. A rectangle\'s |opposite| sides are |parallel| and |equal| in length.',
        `${new Definition('Rectangle', 'Latin', ['rectus', 'right', 'angulus', 'corner, angle']).html(colors.sides)}`,
      ],
      modifiers: {
        opposite: click(coll.toggleOppositeSides, [coll], colors.diagram.action),
        all_angles_equal_to_90: highlightWord('all angles equal to 90º', colors.angles),
      },
      show: [
        rect._left, rect._right, rect._top, rect._bottom,
        rect._bottomLeft, rect._topLeft, rect._topRight, rect._bottomRight,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.setRectLabels('ABAB');
        coll.resetColors();
      },
    });

    this.addSection({
      title: 'Rectangle',
      setContent: [
        'A |square| is a rectangle with |all sides equal|. Therefore all the angles in a square are |_90| and its opposite sides are |parallel|.',
        `${new Definition('Square', 'Old French', ['esquare', 'square'], 'Latin', ['quadra', 'square']).html(colors.sides)}`,
      ],
      modifiers: {
        _90: highlightWord('90º', colors.angles),
      },
      show: [square],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });
  }
}

export default Content;
