// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../LessonsCommon/tools/definition';

const {
  click,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
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
    const equil = diag._equil;

    this.addSection({
      title: 'Isosceles',
      setContent: [
        'An |Equilateral| triangle has |three_equal_sides| and |three_equal_angles|. Any triangle with equal angles will have equal sides and vise vesa.',
        `${new Definition('Equilateral', 'Latin', ['aequilateralis', '', 'aequi', 'equal', 'lateralis', 'side']).html('id_lesson__eqiuilateral_definition')}`,
      ],
      modifiers: {
        three_equal_sides: click(equil.pulseSides, [equil], colors.lines),
        three_equal_angles: click(equil.pulseAngles, [equil], colors.angles),
      },
      showOnly: [equil, equil._tri],
      show: [
        equil._tri._line,
        equil._tri._side12, equil._tri._side23, equil._tri._side31,
        equil._tri._angle1, equil._tri._angle2, equil._tri._angle3,
      ],
      setSteadyState: () => {
        equil.setScenario(equil._tri, layout.equil.scenario.center);
      },
    });
  }
}

export default Content;
