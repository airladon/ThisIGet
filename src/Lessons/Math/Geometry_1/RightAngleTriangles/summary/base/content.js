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
  style,
  click,
//   clickW,
//   highlight,
//   centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
//    this.iconLink = imgLink;
//    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const pyth = fig._pythagorusSquare;

    this.addSection({
      setContent: style({ top: 0, size: 0.9 }, [
        'A |right angle triangle|, is a triangle that has a |right_angle|. The |longest_side| is opposite the right angle, and is called the |hypotenuse|.',
        'The square of the hypotenuse\'s length is |equal| to the sum of the square of the other two sides.',
      ]),
      modifiers: {
        right_angle: click(coll.pulseBottomLeftRightAngle, [coll], colors.rightAngle),
        longest_side: click(coll.pulseBottomLeftOpposite, [coll], colors.sides),
        equal: click(coll.pulseEquation3, [coll], colors.sides),
      },
      show: [
        pyth._bottomLeft,
      ],
      hide: [
        pyth._bottomLeft._angle0, pyth._bottomLeft._angle2,
      ],
      setSteadyState: () => {
        coll.setScenarios('summary');
        coll._3Eqn.showForm('3');
        coll.updatePythagorusSquareLabels();
      },
    });
  }
}

export default Content;
