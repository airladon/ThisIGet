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
  click, centerV, highlight,
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
    const iso = diag._iso;
    const iTri = iso._tri;

    this.addSection({
      title: 'Isosceles',
      setContent: [
        'An |Isosceles| triangle has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.',
        `${new Definition('Isosceles', 'Greek', ['isoskeles', '', 'isos', 'equal', 'skelos', 'leg']).html('id_lesson__isosceles_definition')}`,
      ],
      modifiers: {
        two_equal_sides: click(iso.pulseEqualSides, [iso], colors.equalLength),
        two_equal_angles: click(iso.pulseEqualAngles, [iso], colors.angles),
        opposite: click(iso.pulseOpposites, [iso], colors.diagram.action),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [
        iTri._side23, iTri._side31,
        iTri._angle1, iTri._angle2,
      ],
    });
    this.addSection({
      setContent: centerV([
        '|Any triangle| with two equal |sides|  will have two equal |angles|.',
        '|Any triangle| with two equal |angles| will have two equal |sides|.',
        'Therefore, if you know a triangle has |two equal sides| or |two equal angles|, then you know it is an |Isosceles triangle|.',
      ]),
    });
  }
}

export default Content;
