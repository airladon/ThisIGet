// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../../js/Lesson/LessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click, centerV, highlight, clickWord,
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
    this.loadQRs([
      'triangle_introduction',
      'congruent_triangles',
      'related_angles',
      'quadrangles',
      'adjacent_angles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const iso = diag._iso;
    const iTri = iso._tri;
    const left = iso._left;
    const right = iso._right;
    const rec = iso._rect;

    let common = {
      setContent: '',
      setInfo: '',
      modifiers: {},
      infoModifiers: {},
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection({
      title: 'Introduction',
      setContent: centerV([
        'There are several |types of triangle| commonly found in many applications.',
        'Being able to |identify| these types of triangle can make |understanding| a problem |quicker and easier|.',
      ]),
      setSteadyState: () => {
        // qr._quadrangles._Rectangle.show();
      },
      // setSteadyState: () => {
      // iso.show();
      // equil.showAll();
      // iso._tri.showAll();
      // iso._rect.showAll();
      // iso._rect._tri1._angle2.update();
      // iso._rect._tri2._angle2.update();
      // iso._isoEqn.showAll();
      // iso.eqns.isoEqn.showForm('3');
      // iso._testEqn.setPosition(-1, 1);
      // iso._testEqn.showForm('1');
      // iso._testNav.setPosition(-1, 1);
      // iso._testNav.showForm('0');
      // },
    });

    this.addSection({
      setContent: centerV([
        'Triangles are commonly grouped by either their |side lengths| or |angles|.',
      ]),
      setSteadyState: () => {
        // qr.show();
        // qr._quadrangles.show();
        // qr._quadrangles._Main.show();
      },
    });


    common = {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
      },
    };
    this.addSection(common, {
      title: 'Equal Sides',
      setContent: [
        'A triangle with |two_sides| of |equal length| is called an |Isosceles| triangle.',
        `${new Definition('Isosceles', 'Greek', ['isoskeles', '', 'isos', 'equal', 'skelos', 'leg']).html('id_lesson__isosceles_definition')}`,
      ],
      modifiers: {
        two_sides: click(iso.pulseEqualSides, [iso], colors.equalLength),
        // equal_length: click(iso.pulseEqualSides, [iso], colors.equalLength),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [iTri._side12, iTri._side23, iTri._side31],
    });


    this.addSection(common, {
      setContent: 'When |two sides| of a triangle are |equal|, the triangle\'s |angles| have a special relationship.',
      showOnly: [iso, iTri, iTri._line],
      show: [iTri._side12, iTri._side23, iTri._side31],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
      },
    });

    common = {
      setContent: 'We can show this by |drawing_a_line| from the |point| between the equal sides to the |middle| of the opposite side.',
      modifiers: {
        drawing_a_line: highlight(colors.lines),
        point: click(iso.pulseTopPoint, [iso], colors.points),
        middle: click(iso.pulseMidPoint, [iso], colors.points),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [iTri._side12, iTri._side23, iTri._side31],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
      },
    };
    this.addSection(common);
    common.modifiers = {
      drawing_a_line: click(iso.growSplit, [iso], colors.lines),
      point: click(iso.pulseTopPoint, [iso], colors.points),
      middle: click(iso.pulseMidPoint, [iso], colors.points),
    };
    this.addSection(common, {
      show: [iTri._side12, iTri._side23, iTri._side31, iso._split],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
        iso.growSplit();
      },
    });

    common = {
      setContent: 'This line will have some length, which we can label |C|.',
      showOnly: [
        iso, iTri, iTri._line, left,
        // left, left._line, right, right._line,
      ],
      show: [iTri._side12, iTri._side23, iTri._side31, iso._split],
      setSteadyState: () => {
        iso.legacySetScenario(left, layout.iso.left.scenario.center);
        iso.legacySetScenario(right, layout.iso.right.scenario.center);
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
      },
    };
    this.addSection(common);
    this.addSection(common, {
      show: [iTri._side12, iTri._side23, iTri._side31, iso._split, left._side23],
    });

    this.addSection(common, {
      setContent: 'This line splits the triangle into two.',
      showOnly: [
        iso,
        left, left._line,
        right, right._line,
      ],
      show: [
        left._side31, right._side23, left._side23,
      ],
      transitionFromPrev: (done) => {
        iso.moveToScenario(left, layout.iso.left.scenario.left, 1, done);
        iso.moveToScenario(right, layout.iso.right.scenario.right, 1);
      },
      setSteadyState: () => {
        iso.legacySetScenario(left, layout.iso.left.scenario.left);
        iso.legacySetScenario(right, layout.iso.right.scenario.right);
        right._side12.showAll();
        left._side12.showAll();
        right._side31.showAll();
      },
    });


    common = {
      setContent: 'The |Side_Side_Side| triangle congruency test says that if two triangles share the same side lengths, then their |angles| are also |equal|.',
      modifiers: {
        Side_Side_Side: click(this.showQR, [this, 'congruent_triangles', 'Sss'], colors.diagram.action),
      },
      showOnly: [
        iso,
        left, left._line,
        right, right._line,
      ],
      show: [
        left._side12, left._side31, left._side23,
        right._side12, right._side23, right._side31,
      ],
      setSteadyState: () => {
        iso.legacySetScenario(left, layout.iso.left.scenario.left);
        iso.legacySetScenario(right, layout.iso.right.scenario.right);
      },
    };
    this.addSection(common);
    common.setContent = 'These two triangles do |share the same side lengths|, and therefore their |angles are also the same|.';
    this.addSection(common);
    common.show = [
      left, right,
    ];
    this.addSection(common, {
      show: [iso._left, iso._right],
      transitionFromPrev: (done) => {
        left._angle1.pulseScaleNow(1, 1.5);
        left._angle2.pulseScaleNow(1, 1.5);
        left._angle3.pulseScaleNow(1, 1.5);
        right._angle1.pulseScaleNow(1, 1.5);
        right._angle2.pulseScaleNow(1, 1.5);
        right._angle3.pulseScaleNow(1, 1.5);
        done();
      },
      setSteadState: () => {
        iso.legacySetScenario(left, layout.iso.left.scenario.left);
        iso.legacySetScenario(right, layout.iso.right.scenario.right);
      },
    });

    common = {
      setContent: 'Angles |b| and |c|, and side |C_| were not part of the original isosceles triangles, so we can remove them.',
      modifiers: {
        b: highlight(colors.angles),
        c: highlight(colors.angles),
        C_: highlight(colors.lines),
      },
      showOnly: [iso],
      show: [left, right],
      setSteadyState: () => {
        iso.legacySetScenario(left, layout.iso.left.scenario.left);
        iso.legacySetScenario(right, layout.iso.right.scenario.right);
      },
    };
    this.addSection(common);
    common.showOnly = [
      iso,
      left, left._line,
      right, right._line,
    ];
    common.show = [
      left._angle1, left._side31, left._side12,
      right._angle2, right._side23, right._side12,
    ];
    this.addSection(common);
    common.setContent = 'Now we can |join| the two triangles to re-form the |isoceles triangle|.';
    this.addSection(common, {
      transitionFromPrev: (done) => {
        iso.moveToScenario(left, layout.iso.left.scenario.center, 1, done);
        iso.moveToScenario(right, layout.iso.right.scenario.center, 1);
      },
      setSteadyState: () => {
        iso.legacySetScenario(iso._left, layout.iso.left.scenario.center);
        iso.legacySetScenario(iso._right, layout.iso.right.scenario.center);
        iTri.show();
        iTri._line.show();
        iso._left._line.hide();
        iso._right._line.hide();
        iso._split.showAll();
      },
    });
    common.showOnly = [iso, iTri, iTri._line];
    common.show = [
      iTri._angle1, iTri._angle2,
      iTri._side12, iTri._side23, iTri._side31,
    ];
    common.setSteadyState = () => {
      iso.legacySetScenario(left, layout.iso.left.scenario.center);
      iso.legacySetScenario(right, layout.iso.right.scenario.center);
      iso.legacySetScenario(iTri, layout.iso.scenario.center);
    };
    this.addSection(common);
    this.addSection(common, {
      setContent: 'And so we can see, when a triangle has two equal |sides|, it also has two equal |angles|.',
      modifiers: {
        sides: click(iso.pulseEqualSides, [iso], colors.equalLength),
        angles: click(iso.pulseEqualAngles, [iso], colors.angles),
      },
    });

    common.showOnly = [iso, iTri, iTri._line];
    common.show = [
      iTri._angle1, iTri._angle2,
      iTri._side12, iTri._side23, iTri._side31,
    ];
    common.setSteadyState = () => {
      iso.legacySetScenario(left, layout.iso.left.scenario.center);
      iso.legacySetScenario(right, layout.iso.right.scenario.center);
      iso.legacySetScenario(iTri, layout.iso.scenario.center);
    };

    common = {
      setContent: 'However, if we |only know| a triangle has two |equal_angles|, can we also show it has two equal sides?',
      modifiers: {
        equal_angles: click(iso.pulseEqualAngles, [iso], colors.angles),
        rectangle: click(this.showQR, [this, 'quadrangles', 'Rectangle'], colors.construction),
        right_angles: highlight(colors.angles),
        right_angles_: click(iso.pulseRectRightAngles, [iso], colors.angles),
        Alternate_Angles: click(this.showQR, [this, 'related_angles', 'Alternate'], colors.diagram.action),
        Angle_Angle_Side: click(this.showQR, [this, '_congruent_triangles', '_Aas'], colors.diagram.action),
        two_angles: click(iso.pulseEqualAngles, [iso], colors.angles),
        two_sides: click(iso.pulseEqualSides, [iso], colors.equalLength),
        triangles_: click(iso.pulseRectTriangles, [iso], colors.construction),
        side_: click(iso.pulseRectHeight, [iso], colors.lines),
        two_angles_: click(iso.pulseRectAngles, [iso], colors.angles),
        angles: highlight(colors.angles),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [iTri._angle1, iTri._angle2],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.center);
      },
    };
    this.addSection(common, {
      title: 'Equal Angles',
      transitionFromNext: (done) => {
        iso.moveToScenario(iTri, layout.iso.scenario.center, 1, done);
      },
    });

    // common.setContent = 'We can start by |labeling| the side between the equal angles.';
    // this.addSection(common);
    // common.show = [iTri._angle1, iTri._angle2, iTri._side12];
    // this.addSection(common, {
    //   transitionFromPrev: (done) => {
    //     iTri._side12._label.pulseScaleNow(1, 2);
    //     done();
    //   },
    // });

    common.setContent = 'Start by drawing a |rectangle| around the triangle.';
    common.showOnly = [iso, iTri, iTri._line, rec, rec._tri1, rec._tri2];
    this.addSection(common);
    common.show = [
      iTri._angle1, iTri._angle2,
      rec._tri1._line, rec._tri2._line,
    ];
    this.addSection(common);

    common.setContent = 'The |vertical sides| of the |rectangle| are the same as the |height| of the triangle, so we can label them.';
    this.addSection(common);
    common.show = [
      iTri._angle1, iTri._angle2,
      rec._tri1._line, rec._tri2._line, rec._tri1._side12, rec._tri2._side12,
    ];
    this.addSection(common);


    common.setContent = 'The |angles| of the |rectangle| are all |right_angles| and so we can label them.';
    this.addSection(common);
    common.setContent = 'The |angles| of the |rectangle| are all |right_angles_| and so we can label them.';
    common.show = [
      iTri._angle1, iTri._angle2,
      rec._tri1._line, rec._tri2._line, rec._tri1._side12, rec._tri2._side12,
      rec._tri1._angle2, rec._tri2._angle2,
    ];
    this.addSection(common);

    common.setContent = 'As the sides of |rectangle| are parallel, we can use |Alternate_Angles| to find two top angles.';
    this.addSection(common);
    common.show = [...common.show, rec._tri1._angle1];
    this.addSection(common, {
      transitionFromPrev: (done) => {
        rec._tri1._angle1.pulseScaleNow(1, 1.5);
        iTri._angle1.pulseScaleNow(1, 1.5);
        done();
      },
    });
    common.show = [...common.show, rec._tri2._angle1];
    this.addSection(common, {
      transitionFromPrev: (done) => {
        rec._tri2._angle1.pulseScaleNow(1, 1.5);
        iTri._angle2.pulseScaleNow(1, 1.5);
        done();
      },
    });

    common.setContent = 'Let\'s |simplify| the diagram to consider just the two outside triangles.';
    this.addSection(common);
    common.showOnly = [iso, rec, rec._tri1, rec._tri2];
    common.show = [
      rec._tri1._line, rec._tri2._line, rec._tri1._side12, rec._tri2._side12,
      rec._tri1._angle2, rec._tri2._angle2,
      rec._tri1._angle1, rec._tri2._angle1,
      rec._tri1._closeLine, rec._tri2._closeLine,
    ];
    this.addSection(common);
    common.setContent = 'We can see the triangles have the same |two_angles_| and |side_|.';
    this.addSection(common);
    common.setContent = 'The |Angle_Angle_Side| triangle congruency test can therefore be used to say that these two |triangles_| are the |same|.';
    this.addSection(common);
    common.setContent = 'As these |triangles_| are the |same|, then their |sides| are also |equal|.';
    this.addSection(common);
    common.show = [
      rec._tri1._line, rec._tri2._line, rec._tri1._side12, rec._tri2._side12,
      rec._tri1._angle2, rec._tri2._angle2,
      rec._tri1._angle1, rec._tri2._angle1,
      rec._tri1._closeLine, rec._tri2._closeLine,
      rec._tri1._side31, rec._tri2._side31,
    ];
    this.addSection(common, {
      transitionFromPrev: (done) => {
        rec._tri1._side31._label.pulseScaleNow(1, 1.5);
        rec._tri2._side31._label.pulseScaleNow(1, 1.5);
        done();
      },
    });

    common.setContent = 'Let\'s show the |original triangle|, and remove the rectangle.';
    this.addSection(common);
    common.showOnly = [iso, iTri, iTri._line, rec, rec._tri1, rec._tri2];
    common.show = [
      iTri._angle1, iTri._angle2, iTri._side23, iTri._side31,
      rec._tri1._line, rec._tri2._line, rec._tri1._side12, rec._tri2._side12,
      rec._tri1._angle2, rec._tri2._angle2,
      rec._tri1._angle1, rec._tri2._angle1,
    ];
    this.addSection(common);
    common.show = [
      iTri._angle1, iTri._angle2, iTri._side23, iTri._side31,
    ];
    this.addSection(common);

    common.setContent = 'So, if a triangle has |two_angles| that are the |same|, then the |two_sides| not between the angles must also be the same';
    this.addSection(common);

    this.addSection({
      setContent: centerV([
        'If you know a triangle has |two_equal_sides|, then you know it is an |isosceles triangle| and also has |two_equal_angles|.',
        'Similarly, if you know a triangle has |two_equal_angles|, then you know it also has |two_equal_sides| and is an |isosceles triangle|.',
      ]),
      modifiers: {
        two_equal_sides: highlight(colors.equalLength),
        two_equal_angles: highlight(colors.angles),
      },
    });

    this.addSection({
      setContent: centerV([
        'We can now use the knowledge that |two angles are the same| to consider the relationship between all the angles in an |isosceles| triangle.',
      ]),
    });

    common.setSteadyState = () => {
      iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
    };
    this.addSection(common, {
      title: 'Angle Relationships',
      setContent: [
        'We know |angles| in a triangle are related: their |sum| always equals |_180|. Therefore to calculate |all| angles, |two must be known|.',
      ],
      modifiers: {
        _180: clickWord(
          '180º', 'id_important_triangles_sum1',
          this.showQR, [this, '_triangle_introduction', '_Main'],
          colors.diagram.action,
        ),
        angles: highlight(colors.angles),
      },
      transitionFromPrev: (done) => {
        iso.moveToScenario(iTri, layout.iso.scenario.bottom, 1, done);
      },
    });

    this.addSection(common, {
      setContent: 'But, if we |also know that two angles are equal|, then actually we only need to know |one angle| to calculate all three.',
    });

    common = {
      setContent: 'We start by labelling the |third angle| as |b| and adding all the angles to |_180|.',
      modifiers: {
        _180: clickWord(
          '180º', 'id_important_triangles_sum1',
          this.showQR, [this, '_triangle_introduction', '_Main'], colors.diagram.action,
        ),
        b: highlight(colors.angles),
        a: highlight(colors.angles),
        rearrange: click(iso._eqnANav.clickNext, [iso._eqnANav], colors.diagram.action),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [
        iTri._angle1, iTri._angle2, iTri._angle3,
        iTri._side23, iTri._side31,
      ],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
      },
    };
    this.addSection(common, {
      hide: [iTri._angle3],
    });
    this.addSection(common, {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
        iso.pulseAngle3();
        iso._eqnANav.showForm('0');
        iso._eqnAEqn.isTouchable = false;
      },
    });
    common.setContent = 'We can now |rearrange| for either |a| or |b|. We will start by rearranging for |b|.';
    this.addSection(common, {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
        iso._eqnANav.showForm('0');
        iso._eqnAEqn.isTouchable = true;
      },
    });
    this.addSection(common, {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
        iso._eqnANav.showForm('5');
      },
    });

    common = {
      setContent: 'Similarly, if we know |a| we can |rearrange| to find |b|.',
      modifiers: {
        b: highlight(colors.angles),
        a: highlight(colors.angles),
        rearrange: click(iso._eqnANav.clickNext, [iso._eqnBNav], colors.diagram.action),
      },
      showOnly: [iso, iTri, iTri._line],
      show: [
        iTri._angle1, iTri._angle2, iTri._angle3,
        iTri._side23, iTri._side31,
      ],
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
      },
    };
    this.addSection(common, {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
        iso._eqnBNav.showForm('0');
      },
    });
    this.addSection(common, {
      setSteadyState: () => {
        iso.legacySetScenario(iTri, layout.iso.scenario.bottom);
        iso._eqnBNav.showForm('9');
      },
    });

    this.addSection({
      setContent: centerV([
        'And so we have found that only |one angle| is needed in an |isosceles triangle| to |calculate all three|.',
      ]),
    });
  }
}

export default Content;
