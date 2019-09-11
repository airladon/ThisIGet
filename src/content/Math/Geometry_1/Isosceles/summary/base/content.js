// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../common/tools/definition';

const {
  click,
  style,
  highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
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
    const left = coll._left;
    const right = coll._right;
    const tri = coll._triangle;
    const correction = coll._correction;
    const split = coll._split;

    this.addSection({
      title: '',
      setContent: style({ top: 0 }, [
        'An |isosceles triangle| has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.',
        `${new Definition('Isosceles', 'Greek', ['isoskeles', '', 'isos', 'equal', 'skelos', 'leg']).html()}`,
      ]),
      modifiers: {
        two_equal_angles: click(coll.pulseEqualAngles, [coll], colors.angles),
        two_equal_sides: click(coll.pulseEqualSides, [coll], colors.sides),
        opposite: click(coll.pulseOpposites, [coll], colors.diagram.action),
      },
      show: [
        tri._line, tri._angle0, tri._angle2, tri._side01, tri._side12,
      ],
      setSteadyState: () => {
        tri.setScenario('summary');
      },
    });
    this.addSection({
      setContent: style({ centerV: true }, [
        '|Any triangle| with |two_equal_sides| will have |two_equal_angles|.',
        '|Any triangle| with |_two_equal_angles| will have |_two_equal_sides|.',
        'Therefore if you know a triangle has |__two_equal_sides| or |__two_equal_angles|, then you know it will be an |isosceles triangle|',
      ]),
      modifiers: {
        two_equal_sides: highlight(colors.sides),
        _two_equal_sides: highlight(colors.sides),
        __two_equal_sides: highlight(colors.sides),
        two_equal_angles: highlight(colors.angles),
        _two_equal_angles: highlight(colors.angles),
        __two_equal_angles: highlight(colors.angles),
      },
    });
    this.addSection({
      setContent: [
        'For an isosceles triangle, the |line| drawn from the angle between the |equal_sides| to the |midpoint| of the side between the |equal_angles| intersects the side at a |right_angle|, and splits the triangle into two equal halves.',
      ],
      modifiers: {
        right_angle: click(coll.pulseLeftRightBaseAngles, [coll], colors.angles),
        line: click(coll.pulseSplit, [coll], colors.sides),
        equal_sides: click(coll.pulseLeftRightEqualSides, [coll], colors.sides),
        equal_angles: click(coll.pulseLeftRightEqualAngles, [coll], colors.angles),
      },
      show: [
        left._line, left._angleTop, left._sideBase, left._angleEqual,
        left._sideEqual,
        right._line, right._angleTop, right._sideBase, right._angleEqual,
        right._sideEqual, right._angleBase._curve,
        correction, split._line,
      ],
      setSteadyState: () => {
        coll.setScenarios('summary');
        right._angleBase.autoRightAngle = true;
        right._angleBase.update();
      },
    });
  }
}

export default Content;
