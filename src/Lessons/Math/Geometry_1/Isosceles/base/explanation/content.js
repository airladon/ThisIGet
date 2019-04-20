// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  // highlight,
  // clickWord,
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
    this.loadQRs([
      'congruent_triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: 'Isosceles Triangle',
      setContent: centerV([
        'There are several |types of triangle| commonly found in many applications.',
        'Being able to |identify| these types of triangle can make |analysing| a problem |quicker| and |easier|.',
      ]),
    });
    this.addSection({
      setContent: centerV([
        'Triangles are commonly grouped by either their |side lengths| or |angles|.',
      ]),
    });
    this.addSection({
      setContent: [
        'A triangle with |two_sides| of |equal length| is called an |isosceles| triangle.',
        `${new Definition('Isosceles', 'Greek', ['isoskeles', '', 'isos', 'equal', 'skelos', 'leg']).html()}`,
      ],
      modifiers: {
        two_sides: click(coll.pulseEqualSides, [coll], colors.sides),
      },
      show: [coll._triangle._line, coll._triangle._side01, coll._triangle._side12],
    });

    this.addSection({
      setContent: [
        'When |two sides| of a triangle are |equal|, the triangle\'s |angles| have a special relationship.',
      ],
      show: [coll._triangle._line, coll._triangle._side01, coll._triangle._side12],
    });
  }
}

export default Content;
