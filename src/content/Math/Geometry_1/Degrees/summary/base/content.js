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
  style,
  click,
  centerV,
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
    // const diag = this.diagram.elements;
    // const quiz = diag._quiz;
    const diag = this.diagram.elements._collection;
    const circle = diag._circle;

    this.addSection({
      title: '',
      setContent: [centerV([
        style({ right: 48, size: 1 }, '|Angle| is the amount of |rotation| between two |lines|.'),
        style({ right: 48, size: 1 }, 'A full rotation can be split into |360| |equal_portions|, called |degrees|.'),
        style({ right: 48, size: 1 }, 'An angle can be |measured| by counting the number of degrees within it.'),
      ]),
      `${new Definition('Degree', 'Latin', ['de', 'down', 'gradus', 'step']).html(colors.angles)}`,
      ],
      modifiers: {
        full_rotation: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.angles),
        Angle: click(diag.pulseAngle, [diag], colors.angles),
        equal_portions: click(diag.pulseDegrees, [diag], colors.marks),
        lines: click(diag.pulseLines, [diag], colors.lines),
        rotation: click(diag.pushLine, [diag, null, 2, 1, null], colors.angles),
        measured: click(diag.pulseAngleText, [diag], colors.angles),
      },
      show: [circle._line1, circle._line2, circle._angle, circle._degrees, circle._angleText],
      hide: [],
      setSteadyState: () => {
        circle._line1.setRotation(1);
        circle.setScenario('summary');
        diag.setAngleMarks('degrees');
        circle._angleText.setScenario('summary');
        diag.updateAngle();
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
