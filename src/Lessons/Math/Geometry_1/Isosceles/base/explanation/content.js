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

    let common = {
      setContent: [
        'We can show this by drawing a |line| that splits the triangle such that the top angle is split into two |equal_angles|.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        line: click(this.next, [this], colors.sides),
        equal_angles: click(this.next, [this], colors.angles),
      },
      show: [
        coll._triangle._line, coll._triangle._side01, coll._triangle._side12,
      ],
    });

    this.addSection(common, {
      modifiers: {
        line: click(coll.growSplit, [coll, null], colors.sides),
        equal_angles: click(coll.pulseTopAngles, [coll], colors.angles),
      },
      show: [
        coll._triangle._line, coll._triangle._side01,
        coll._triangle._side12, coll._split._line, coll._left._angleTop,
        coll._right._angleTop,
      ],
      transitionFromPrev: (done) => {
        coll.growSplit(done);
      },
      setSteadyState: () => {
        coll.setScenarios('combined');
      },
    });

    common = {
      setContent: [
        'This line has some length, which we can label as |L|.',
      ],
      show: [
        coll._triangle._line, coll._triangle._side01,
        coll._triangle._side12, coll._split._line, coll._left._angleTop,
        coll._right._angleTop,
      ],
      setSteadyState: () => {
        coll.setScenarios('combined');
      },
    };
    this.addSection(common, {
      modifiers: {
        L: click(this.next, [this], colors.sides),
      },
    });
    this.addSection(common, {
      modifiers: {
        L: click(coll.pulseL, [coll], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll._split._label.showAll();
        coll.pulseL();
        done();
      },
      setSteadyState: () => {
        coll._split._label.showAll();
        coll.setScenarios('combined');
      },
    });

    common = {
      setContent: [
        'We now have two triangles which we can now look at |separately|.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        separately: click(this.next, [this], colors.sides),
      },
      show: [
        coll._triangle._line, coll._triangle._side01,
        coll._triangle._side12, coll._split,
        coll._left._angleTop, coll._right._angleTop,
      ],
      setSteadyState: () => {
        coll.setScenarios('combined');
      },
    });
    this.addSection(common, {
      modifiers: {
        separately: click(coll.splitTriangle, [coll, null], colors.sides),
      },
      show: [
        coll._left._line, coll._left._angleTop,
        coll._right._line, coll._right._angleTop,
        coll._left._sideEqual, coll._right._sideEqual,
        coll._left._sideSplit, coll._right._sideSplit,
      ],
      transitionFromPrev: (done) => {
        coll.splitTriangle(done);
      },
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });
  }
}

export default Content;
