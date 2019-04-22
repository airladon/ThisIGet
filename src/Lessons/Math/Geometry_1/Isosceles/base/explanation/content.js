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
  highlight,
  style,
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
      'adjacent_angles/base',
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
        'These two triangles have the same |Side-Angle-Side| combination are therefore, |congruent|.',
      ],
      modifiers: {
        'Side-Angle-Side': click(this.showQR, [this, 'congruent_triangles/base', 'Sas'], colors.diagram.action),
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
          [coll],
          colors.diagram.action,
        ),
      },
      show: [left, right],
      transitionFromPrev: (done) => {
        coll.pulseRemainingLeftRightProperties();
        done();
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
        two_angles: click(coll.pulseEqualAngles, [coll], colors.angles),
      },
      show: [tri._line, tri._side01, tri._side12, tri._angle0, tri._angle2],
      transitionFromPrev: (done) => {
        coll.pulseEqualAngles();
        done();
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
        line: click(coll.pulseSplit, [coll], colors.sides),
      },
      show: [
        left._line, left._angleTop, left._angleBase, left._sideBase,
        right._line, right._angleTop, right._angleBase, right._sideBase,
        correction, split._line,
      ],
      transitionFromPrev: (done) => {
        coll.pulseSplit();
        done();
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
        supplementary: click(this.showQR, [this, 'adjacent_angles/base', 'Supplementary'], colors.angles),
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
        equal_sides: click(coll.pulseLeftRightEqualSides, [coll], colors.sides),
        equal_angles: click(coll.pulseLeftRightEqualAngles, [coll], colors.angles),
        opposite_side: click(coll.pulseLeftRightBaseLabel, [coll], colors.sides),
        right_angle: click(coll.pulseLeftRightBaseAngles, [coll], colors.angles),
        line: click(coll.pulseSplit, [coll], colors.sides),
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
        left._angleTop.setColor(colors.disabled);
        right._angleTop.setColor(colors.disabled);
        split._line.setColor(colors.disabled);
        // right._angleBase.setColor(colors.disabled);
      },
      setLeaveState: () => {
        right._angleBase.autoRightAngle = false;
        left._angleTop.setColor(colors.angles);
        right._angleTop.setColor(colors.angles);
        split._line.setColor(colors.sides);
        // right._angleBase.setColor(colors.angles);
      },
    });
  }
}

export default Content;
