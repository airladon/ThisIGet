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
// import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  click,
  style,
} = Fig.tools.html;

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
    const diag = this.diagram.elements;
    const opp = diag._opposite;
    const three = diag._threeLines;

    this.addSection({
      title: 'Opposite Angles',
      setContent: style({ left: 5, right: 55, centerV: true }, [
        'When two lines intersect, four angles are created.',
        '|Opposite_angles| at the intersection are |equal|.',
      ]),
      modifiers: {
        Opposite_angles: click(opp.toggleOpposite, [opp], colors.angle1),
      },
      setEnterState: () => {
        opp._fig.setScenarios('summary');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle1, 'b');
        opp.setAngle(3, colors.angle1, 'a');
        opp.setAngle(4, colors.angle1, 'b');
      },
      showOnly: [],
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      hide: [],
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle3.showAll();
      },
      setLeaveState: () => {},
    });

    this.addSection({
      title: 'Corresponding Angles',
      setContent: style({ left: 5, right: 55, centerV: true }, [
        '|Corresponding_Angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting| line.',
        'When the two lines are |parallel|, corresponding angles are always |equal|.',
      ]),
      modifiers: {
        Corresponding_Angles: click(three.toggleCorresponding, [three], colors.angle1),
      },
      setEnterState: () => {
        opp._fig.setScenarios('summary');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle1, 'b');
        opp.setAngle(3, colors.angle1, 'a');
        opp.setAngle(4, colors.angle1, 'b');
      },
      showOnly: [],
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      hide: [],
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle3.showAll();
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
