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
  clickWord,
  click,
  style,
  centerV,
} = Fig.tools.html;

const { round } = Fig.tools.math;
const layout = lessonLayout();
const { colors } = layout;

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
    // const diag = this.diagram.elements;
    // const quiz = diag._quiz;
    const diag = this.diagram.elements._collection;
    const circle = diag._circle;

    const row = (portion: string, angle: number) => `<tr><td class="lesson__fraction">${portion}</td><td>|_${angle}deg|</td></tr>`;

    const rowClick = (angle: number) => clickWord(`${round(angle, 0)}&deg;`, `id_${round(angle, 0)}`, diag.pushLine, [diag, angle / 180 * Math.PI, 2, 1, null], colors.angles);

    this.addSection({
      title: '',
      setContent: [centerV([
        style({ right: 50, size: 0.9 }, '|Angle| is the amount of |rotation| between two |lines|.'),
        style({ right: 50, size: 0.9 }, 'A full rotation can be split into |360| |equal_portions|, called |degrees|.'),
        style({ right: 50, size: 0.9 }, 'An angle can be |measured| by counting the number of degrees within it.'),
      ]),
      `${new Definition('Degree', 'Latin', ['de', 'down', 'gradus', 'step']).html('id_lesson__degree_definition')}`,
      ],
      modifiers: {
        full_rotation: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.angles),
        Angle: click(diag.pulseAngle, [diag], colors.angles),
        equal_portions: click(diag.pulseDegrees, [diag], colors.marks),
        lines: click(diag.pulseLines, [diag], colors.lines),
        rotation: click(diag.pushLine, [diag, null, 2, 1, null], colors.angles),
        measured: click(diag.pulseAngleText, [diag], colors.angles),
        // _360deg: rowClick(359.999),
        // _270deg: rowClick(270),
        // _240deg: rowClick(240),
        // _180deg: rowClick(180),
        // _120deg: rowClick(120),
        // _90deg: rowClick(90),
        // _72deg: rowClick(72),
        // _60deg: rowClick(60),
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
