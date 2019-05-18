// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  highlight,
  style,
  // clickW,
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
      'CongruentTriangles/base',
      'AdjacentAngles/base',
      'Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const left = coll._left;
    const right = coll._right;
    const tri = coll._triangle;
    const split = coll._split;
    const correction = coll._correction;
    const eqn = coll._eqn;

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
      show: [tri._line, tri._side01, tri._side12],
    });

    this.addSection({
      title: 'Angle Relationship',
      setContent: [
        'When |two sides| of a triangle are |equal|, the triangle\'s |angles| have a special relationship.',
      ],
      show: [tri._line, tri._side01, tri._side12],
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
        tri._line, tri._side01, tri._side12,
      ],
    });
    this.addSection(common, {
      modifiers: {
        line: click(this.next, [this], colors.sides),
        equal_angles: click(this.next, [this], colors.angles),
      },
      show: [
        tri._line, tri._side01, tri._side12, tri._angle1,
      ],
    });

    this.addSection(common, {
      modifiers: {
        line: click(coll.growSplit, [coll, null], colors.sides),
        equal_angles: click(coll.pulseTopAngles, [coll], colors.angles),
      },
      show: [
        tri._line, tri._side01,
        tri._side12, coll._split._line, left._angleTop,
        right._angleTop,
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
        tri._line, tri._side01,
        tri._side12, coll._split._line, left._angleTop,
        right._angleTop,
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
        L: click(coll.pulseL, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll._split._label.showAll();
        coll.pulseL(done);
      },
      setSteadyState: () => {
        coll._split._label.showAll();
        coll.setScenarios('combined');
      },
    });

    common = {
      setContent: [
        'We now have two triangles which we can look at |separately|.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        separately: click(this.next, [this], colors.sides),
      },
      show: [
        tri._line, tri._side01, tri._side12,
        split,
        left._angleTop, right._angleTop,
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
        left._line, left._angleTop, left._sideEqual, left._sideSplit,
        right._line, right._angleTop, right._sideEqual, right._sideSplit,
      ],
      transitionFromPrev: (done) => {
        coll.splitTriangle(done);
      },
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });

    this.addSection({
      setContent: [
        'These two triangles have the same |Side-Angle-Side| combination, and are therefore |congruent|.',
      ],
      modifiers: {
        'Side-Angle-Side': this.bindShowQR('CongruentTriangles/base', 'Sas', colors.diagram.action),
      },
      show: [
        left._line, left._angleTop, left._sideEqual, left._sideSplit,
        right._line, right._angleTop, right._sideEqual, right._sideSplit,
      ],
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });

    common = {
      setContent: ['Therefore, the remaining sides and angles are the |same| between the triangles.'],
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    };
    this.addSection(common, {
      modifiers: { same: click(this.next, [this], colors.diagram.action) },
      show: [
        left._line, left._angleTop, left._sideEqual, left._sideSplit,
        right._line, right._angleTop, right._sideEqual, right._sideSplit,
      ],
    });
    this.addSection(common, {
      modifiers: {
        same: click(
          coll.pulseRemainingLeftRightProperties,
          [coll, null],
          colors.diagram.action,
        ),
      },
      show: [left, right],
      transitionFromPrev: (done) => {
        coll.pulseRemainingLeftRightProperties(done);
      },
    });

    common = {
      setContent: ['If we now |recombine| these triangles, we can make a couple of observations.'],
      show: [left, right],
    };
    this.addSection(common, {
      modifiers: {
        recombine: click(this.next, [this], colors.diagram.action),
      },
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });
    this.addSection(common, {
      modifiers: {
        recombine: click(coll.joinTriangles, [coll, null], colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll.joinTriangles(done);
      },
      setSteadyState: () => {
        correction.showAll();
        coll.setScenarios('combined');
      },
    });

    common = {
      setContent: [
        'First we can see that an isosceles triangle has |two_angles| that are equal. The equal angles are the angles |not between| the two equal sides.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        two_angles: click(this.next, [this], colors.angles),
      },
      show: [left, right, correction],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });
    this.addSection(common, {
      modifiers: {
        two_angles: click(coll.pulseEqualAngles, [coll, null], colors.angles),
      },
      show: [tri._line, tri._side01, tri._side12, tri._angle0, tri._angle2],
      transitionFromPrev: (done) => {
        coll.pulseEqualAngles(done);
      },
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });

    common = {
      setContent: [
        'Another observation relates to the |line| that splits the angle between the equal sides.',
      ],
    };
    this.addSection(common, {
      title: 'Split Line',
      modifiers: {
        line: click(this.next, [this], colors.sides),
      },
      show: [left, right, correction],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });
    this.addSection(common, {
      modifiers: {
        line: click(coll.pulseSplit, [coll, null], colors.sides),
      },
      show: [
        left._line, left._angleTop, left._angleBase, left._sideBase,
        right._line, right._angleTop, right._angleBase, right._sideBase,
        correction, split._line,
      ],
      transitionFromPrev: (done) => {
        coll.pulseSplit(done);
      },
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });

    common = {
      show: [
        left._line, left._angleTop, left._angleBase, left._sideBase,
        right._line, right._angleTop, right._angleBase, right._sideBase,
        correction, split._line,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    };
    this.addSection(common, {
      setContent: [
        'This line splits the base side into |two_equal_lengths|.',
      ],
      modifiers: {
        two_equal_lengths: click(coll.pulseLeftRightBaseLabel, [coll], colors.sides),
      },
    });

    this.addSection(common, {
      setContent: [
        'In addition, as the two |c| angles make a |supplementary| angle, then |_c| is 90º, and so the line joins the base side at a |right_angle|.',
      ],
      modifiers: {
        c: click(coll.pulseLeftRightBaseAngles, [coll], colors.angles),
        _c: highlight(colors.angles),
        supplementary: this.bindShowQR('AdjacentAngles/base', 'Supplementary', colors.angles),
        right_angle: click(coll.pulseRightAngle, [coll], colors.angles),
      },
      setLeaveState: () => {
        left._angleBase.autoRightAngle = false;
        right._angleBase.autoRightAngle = false;
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'So we see a triangle with two |equal_sides|, has two |equal_angles|, and the |line| that splits the third angle also splits the |opposite_side| equally and intersects at a |right_angle|.',
      ]),
      modifiers: {
        equal_sides: click(coll.pulseLeftRightEqualSides, [coll, null], colors.sides),
        equal_angles: click(coll.pulseLeftRightEqualAngles, [coll], colors.angles),
        opposite_side: click(coll.pulseLeftRightBaseLabel, [coll], colors.sides),
        right_angle: click(coll.pulseLeftRightBaseAngles, [coll], colors.angles),
        line: click(coll.pulseSplit, [coll, null], colors.sides),
      },
      show: [
        left._line, left._angleTop, left._sideBase, left._angleEqual,
        left._sideEqual,
        right._line, right._angleTop, right._sideBase, right._angleEqual,
        right._sideEqual, right._angleBase._curve,
        correction, split._line,
      ],
      setSteadyState: () => {
        right._angleBase.autoRightAngle = true;
        right._angleBase.update();
        // left._angleTop.setColor(colors.disabled);
        // right._angleTop.setColor(colors.disabled);
        // split._line.setColor(colors.disabled);
      },
      setLeaveState: () => {
        right._angleBase.autoRightAngle = false;
        // left._angleTop.setColor(colors.angles);
        // right._angleTop.setColor(colors.angles);
        // split._line.setColor(colors.sides);
      },
    });

    this.addSection({
      title: 'Triangle With Two Equal Angles',
      setContent: [
        'We can use the same process to show a triangle with two |equal_angles|, also has two equal sides and is therefore an |isosceles| triangle.',
      ],
      modifiers: {
        equal_angles: click(coll.pulseEqualAngles, [coll, null], colors.angles),
      },
      show: [
        tri._line, tri._angle0, tri._angle2,
      ],
    });

    common = {
      setContent: [
        'Draw a |line| that splits the triangle such that the top angle is split into two |equal_angles|.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        line: click(this.next, [this], colors.sides),
        equal_angles: click(this.next, [this], colors.angles),
      },
      show: [
        tri._line, tri._angle0, tri._angle2,
      ],
    });
    this.addSection(common, {
      modifiers: {
        line: click(this.next, [this], colors.sides),
        equal_angles: click(this.next, [this], colors.angles),
      },
      show: [
        tri._line, tri._angle0, tri._angle2, tri._angle1,
      ],
    });
    this.addSection(common, {
      modifiers: {
        line: click(coll.growSplit, [coll, null], colors.sides),
        equal_angles: click(coll.pulseTopAngles, [coll], colors.angles),
      },
      show: [
        tri._line, tri._angle0,
        tri._angle2, coll._split._line, left._angleTop,
        right._angleTop,
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
        'Label this line |L|, then consider the triangle\'s |separately|.',
      ],
      show: [
        tri._line, tri._angle0,
        tri._angle2, coll._split._line, left._angleTop,
        right._angleTop,
      ],
    };
    this.addSection(common, {
      modifiers: {
        L: click(this.next, [this], colors.sides),
        separately: click(this.next, [this], colors.sides),
      },
    });
    this.addSection(common, {
      modifiers: {
        L: click(coll.pulseL, [coll, null], colors.sides),
        separately: click(this.next, [this], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll._split._label.showAll();
        coll.pulseL(done);
      },
      setSteadyState: () => {
        coll._split._label.showAll();
        coll.setScenarios('combined');
      },
    });

    // this.addSection(common, {
    //   modifiers: {
    //     separately: click(this.next, [this], colors.sides),
    //   },
    //   show: [
    //     tri._line, tri._side01, tri._side12,
    //     split,
    //     left._angleTop, right._angleTop,
    //   ],
    //   setSteadyState: () => {
    //     coll.setScenarios('combined');
    //   },
    // });
    this.addSection(common, {
      modifiers: {
        separately: click(coll.splitTriangle, [coll, null], colors.sides),
      },
      show: [
        left._line, left._angleTop, left._angleEqual, left._sideSplit,
        right._line, right._angleTop, right._angleEqual, right._sideSplit,
      ],
      transitionFromPrev: (done) => {
        coll.splitTriangle(done);
      },
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });

    this.addSection({
      setContent: [
        'These two triangles have the same |Angle-Angle-Side| combination are therefore, |congruent|.',
      ],
      modifiers: {
        'Angle-Angle-Side': this.bindShowQR('CongruentTriangles/base', 'Aas', colors.diagram.action),
      },
      show: [
        left._line, left._angleTop, left._angleEqual, left._sideSplit,
        right._line, right._angleTop, right._angleEqual, right._sideSplit,
      ],
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });

    common = {
      setContent: ['Therefore, the remaining sides and angles are the |same| between the triangles.'],
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    };
    this.addSection(common, {
      modifiers: { same: click(this.next, [this], colors.diagram.action) },
      show: [
        left._line, left._angleTop, left._angleEqual, left._sideSplit,
        right._line, right._angleTop, right._angleEqual, right._sideSplit,
      ],
    });
    this.addSection(common, {
      modifiers: {
        same: click(
          coll.pulseRemainingLeftRightProperties2,
          [coll],
          colors.diagram.action,
        ),
      },
      show: [left, right],
      transitionFromPrev: (done) => {
        coll.pulseLeftRightBaseLabel();
        coll.pulseLeftRightBaseAngles();
        coll.pulseLeftRightEqualSides(done);
      },
    });

    common = {
      setContent: ['We then |recombine| the triangles.'],
      show: [left, right],
    };
    this.addSection(common, {
      modifiers: {
        recombine: click(this.next, [this], colors.diagram.action),
      },
      setSteadyState: () => {
        coll.setScenarios('separate');
      },
    });
    this.addSection(common, {
      modifiers: {
        recombine: click(coll.joinTriangles, [coll, null], colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll.joinTriangles(done);
      },
      setSteadyState: () => {
        correction.showAll();
        coll.setScenarios('combined');
      },
    });

    common = {
      setContent: [
        'And can see that a triangle with two |equal_angles|, also has two |equal_sides| and is therefore an |isosceles| triangle.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        equal_angles: click(this.next, [this], colors.angles),
        equal_sides: click(this.next, [this], colors.sides),
      },
      show: [left, right, correction],
      setSteadyState: () => {
        coll.setScenarios('combined');
      },
    });
    this.addSection(common, {
      modifiers: {
        equal_angles: click(coll.pulseEqualAngles, [coll, null], colors.angles),
        equal_sides: click(coll.pulseEqualSides, [coll, null], colors.sides),
      },
      show: [
        tri._line, tri._angle0, tri._angle2, tri._side01, tri._side12,
      ],
      setSteadyState: () => {
        coll.setScenarios('center');
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'If you know a triangle has |two_equal_sides| then it is called an |isosceles triangle|, and also has |two_equal_angles|.',
        'Similarly, if you know a triangle has |_two_equal_angles| then it also has |_two_equal_sides| and is therefore an |isosceles triangle|.',
      ]),
      modifiers: {
        two_equal_sides: highlight(colors.sides),
        _two_equal_sides: highlight(colors.sides),
        two_equal_angles: highlight(colors.angles),
        _two_equal_angles: highlight(colors.angles),
      },
    });

    this.addSection({
      title: 'Calculate All Angles',
      setContent: style({ centerV: true }, [
        'We can also use the knowledge that |two_angles_are_the_same| to consider the |relationship| between all |three angles| in an isosceles triangle.',
      ]),
      modifiers: {
        two_angles_are_the_same: highlight(colors.angles),
      },
    });

    this.addSection({
      setContent: [
        'We know that all angles in a triangle must add to |_180|, and in this case |two_angles| are the same.',
      ],
      show: [
        tri._line, tri._angle0, tri._angle1, tri._angle2,
      ],
      modifiers: {
        two_angles: click(coll.pulseEqualAngles, [coll, null], colors.angles),
        _180: this.bindShowQR('Triangles/base', 'Main', {
          text: '180º',
          color: colors.angles,
        }),
      },
    });
    this.addSection({
      setContent: [
        'Therefore:',
      ],
      show: [
        tri._line, tri._angle0, tri._angle1, tri._angle2, eqn,
      ],
      setSteadyState: () => {
        eqn.showForm('1');
        eqn.setScenario('top');
      },
    });
    this.addSection({
      setContent: [
        'So if |a| is known:',
      ],
      modifiers: {
        a: highlight(colors.angles),
      },
      show: [
        tri._line, tri._angle0, tri._angle1, tri._angle2, eqn,
      ],
      setSteadyState: () => {
        eqn.showForm('b');
        eqn.setScenario('top');
      },
    });
    this.addSection({
      setContent: [
        'Or if |b| is known:',
      ],
      modifiers: {
        b: highlight(colors.angles),
      },
      show: [
        tri._line, tri._angle0, tri._angle1, tri._angle2, eqn,
      ],
      setSteadyState: () => {
        eqn.showForm('a');
        eqn.setScenario('top');
      },
    });
  }
}

export default Content;
