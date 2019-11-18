// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
import { note } from '../../../../../common/tools/note';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  // centerV,
} = Fig.tools.html;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/Quadrangles/base',
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/Isosceles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tot = coll._tot;
    const split = coll._split;

    // ************************************************************
    // ************************************************************
    // ************************************************************
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    }
    this.addSection(common, {
      title: 'Definition',
      setContent: [
        '|Polygon| is the |general term| that describes a shape made up of |straight sides|.',
        `${new Definition('Polygon', 'Latin', ['polygonum', ''], 'Greek', ['polygonos', 'many-angled']).html({
          // classes: 'diagram__definition_high',
          color: colors.sides,
        })}`,
      ],
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      setContent: [
        '|Triangles| and and |quadrangles| are |polygons| with |three| and |four| sides respectively.',
      ],
      modifiers: {
        Triangles: coll.bindAccent(coll._poly1),
        quadrangles: coll.bindAccent(coll._poly2),
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      title: 'Total Angle',
      setContent: style({ centerV: true }, [
        'We have previously found that the |total angle| of |any three sided polygon| (or triangle) is |_180º|.',
        'We have also seen the |total angle| of |any four sided polygon| (or quadrangle) is |_360º|.',
        // 'We have previously found the |total angle| of a |triangle| is 180º and total angle of a |quadrangle| is 360º.',
        // 'In other words, |any 3 sided polygon| has a total angle of |180º|, and |any four sided polygon| has a total angle of 360º.',
        'Is it possible to find the |total angle| of |any| polygon?',
      ]),
      modifiers: {
        _180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        _360º: this.qr('Math/Geometry_1/Quadrangles/base/Main'),
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      setContent: 'Start with a |triangle| where we know the total angle is 180º.',
      show: [tot._n3],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    let commonContent = {
      setContent: 'To make a polygon with an |extra side|, we can add a |point| outside the shape.',
    };
    this.addSection(common, commonContent, {
      modifiers: { point: this.bindNext(colors.sides) },
      show: [tot._n3],
    });

    this.addSection(common, commonContent, {
      modifiers: { point: coll.bindAccent(tot._p4) },
      show: [tot._n3, tot._p4],
      transitionFromPrev: (done) => {
        coll.accent(tot._p4, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Replacing one side with |two_sides|, is effectively |adding one side|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n3, tot._p4],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 4, null], colors.sides),
      },
      show: [tot._n4, tot._p4, tot._l4],
      transitionFromPrev: (done) => {
        coll.growSides(4, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'The shape is made up of |two triangles|, meaning its total angle will be |360º|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Let\'s add another |point| outside the shape.',
    };
    this.addSection(common, commonContent, {
      modifiers: { point: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4],
    });

    this.addSection(common, commonContent, {
      modifiers: { point: coll.bindAccent(tot._p5) },
      show: [tot._n4, tot._l4, tot._p5],
      transitionFromPrev: (done) => {
        coll.accent(tot._p5, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Once again replace one side with |two_sides|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4, tot._p5],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 5, null], colors.sides),
      },
      show: [tot._n5, tot._p5, tot._l5, tot._l4],
      transitionFromPrev: (done) => {
        coll.growSides(5, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'And now we have |three triangles|. So every time we |add a side|, we effectively add another |180º| to the |total internal angle|.',
    };
    this.addSection(common, commonContent, {
      show: [tot._n5, tot._l5, tot._l4],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Now, does this hold if we add the point |inside| the shape instead of outside?',
    };
    this.addSection(common, commonContent, {
      modifiers: { inside: this.bindNext(colors.sides) },
      show: [tot._n5],
    });

    this.addSection(common, commonContent, {
      modifiers: { inside: coll.bindAccent(tot._p6) },
      show: [tot._n5, tot._p6],
      transitionFromPrev: (done) => {
        coll.accent(tot._p6, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'As before we can replace one side with |two_sides|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n5, tot._p6],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 6, null], colors.sides),
      },
      show: [tot._n6, tot._p6, tot._l6],
      transitionFromPrev: (done) => {
        coll.growSides(6, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Let\'s now add in labels for the new triangle\'s |angles|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { angles: this.bindNext(colors.angles) },
      show: [tot._n6, tot._p6, tot._l6],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        angles: coll.bindAccent(tot, ['a', 'b', 'c']),
      },
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      transitionFromPrev: (done) => {
        coll.accent(tot, ['a', 'b', 'c'], done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'The |total angle| of the old shape has been |reduced_by_a|, |reduced_by_b| and |increased| by the |explementary_angle_of_c|.',
        note({ top: 93, color: colors.diagram.text.note }, 'Reference: |explementary| angle'),
      ]),
      modifiers: {
        reduced_by_a: click(coll.shrinkAngle, [coll, tot._af, 1.06, 0.55, true, []], colors.angles),
        reduced_by_b: click(coll.shrinkAngle, [coll, tot._bf, 1.9, 1.35, true, []], colors.angles),
        explementary_angle_of_c: click(
          coll.shrinkAngle, [coll, tot._cf, 0.005, 4.2, false, []], colors.angles,
        ),
        // internal: coll.bindAccentEqn(coll._eqnTot, ['Old'], 'box', 0.05),
        // internal: coll.bindAccent(coll._eqnTot),
        explementary: this.qr('Math/Geometry_1/AngleGroups/base/Explementary'),
      },
    };
    this.addSection(common, commonContent, {
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        reduced_by_a: click(coll.shrinkAngle, [coll, tot._af, 1.06, 0.55, true, ['m1', 'a1']], colors.angles),
        reduced_by_b: click(coll.shrinkAngle, [coll, tot._bf, 1.9, 1.35, true, ['m2', 'b1']], colors.angles),
        explementary_angle_of_c: click(
          coll.shrinkAngle, [coll, tot._cf, 0.005, 4.2, false, ['p1', '_360', 'c1']], colors.angles,
        ),
      },
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      transitionFromPrev: (done) => {
        tot.animations.new()
          .scenario({ target: 'low', duration: 0.8 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._eqnTot.showForm('0');
        tot.setScenario('low');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'Which can be rearranged to:',
      ]),
    };
    this.addSection(common, commonContent, {
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      setSteadyState: () => {
        coll._eqnTot.showForm('0');
        tot.setScenario('low');
      },
    });

    const commonShow = {
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      setEnterState: () => {
        coll.setScenarios('default');
        tot.setScenarios('low');
      },
    };
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '0', to: '1', duration: 1,
    }, common, commonContent, commonShow);

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'Here |a|, |b| and |c| are the angles of a triangle and thus their sum is |180º|.',
      ]),
      modifiers: {
        a: highlight(colors.angles),
        b: highlight(colors.angles),
        c: highlight(colors.angles),
      },
    };
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '1', to: '1', duration: 1,
    }, common, commonContent, commonShow);

    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '1', to: '2',
    }, common, commonContent, commonShow);
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '2', to: '3',
    }, common, commonContent, commonShow);
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '3', to: '4',
    }, common, commonContent, commonShow);
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '4', to: '5',
    }, common, commonContent, commonShow);

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'And so we see adding a point |inside| the shape also |increases the total angle by 180º|.',
      ]),
    };
    this.addSectionEqnStep({
      eqn: coll._eqnTot, from: '5', to: '5',
    }, common, commonContent, commonShow);

    this.addSection({
      setContent: style({ top: 15 }, [
        'We started with a |triangle|, that has a |total angle of 180º|, and |3 sides|.',
        '|Every additional side| increases the total angle by |180º|.',
        
        'Thus the |total angle| of an |n-sided polygon| is:',
      ]),
      setSteadyState: () => {
        coll._eqnTot.showForm('6');
        coll._eqnTot.setScenario('bottom');
      },
    });
    
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'A |regular polygon| is a special type of polygon whose |sides| and |angles| are all |equal|.',
      ],
      modifiers: {
        equal: coll.bindToggleGroups(
          coll,
          [
            [
              '_tri._angle0', '_tri._angle1', '_tri._angle2',
              '_tri._side01', '_tri._side12', '_tri._side20'],
            [
              '_quad._angle0', '_quad._angle1', '_quad._angle2', '_quad._angle3',
              '_quad._side01', '_quad._side12', '_quad._side23', '_quad._side30',
            ],
            [
              '_pent._angle0', '_pent._angle1', '_pent._angle2', '_pent._angle3', '_pent._angle4',
              '_pent._side01', '_pent._side12', '_pent._side23', '_pent._side34', '_pent._side40',
            ],
          ],
          colors.diagram.action,
          ['show', 'pulse'],
        ),
      },
      angles: highlight(colors.angles),
    };
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    };
    this.addSection(common, commonContent, {
      title: 'Regular Polygons',
      show: [coll._tri._line, coll._quad._line, coll._pent._line],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'A |regular polygon| can be created by |splitting a circle| into |equal_pieces|.',
      ],
    };
    this.addSection(common, commonContent, {
      show: [split._circle],
      modifiers: {
        equal_pieces: this.bindNext(colors.split),
      },
    });

    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0._line, split._s1._line, split._s2._line,
        split._s3._line, split._s4._line, // split._s5._line,
        // split._a0, split._a1, split._a2, split._a3,
        // split._a4, // split._a5,
      ],
      modifiers: {
        equal_pieces: coll.bindAccent(
          split,
          ['s0', 's1', 's2', 's3', 's4'],
          colors.split,
        ),
      },
      transitionFromPrev: (done) => {
        coll.accent(split, ['s0', 's1', 's2', 's3', 's4'], done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'Each piece has the same |angle|, and |side_lengths| (which are the |radius| of the circle).',
      ],
    };
    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0._line, split._s1._line, split._s2._line,
        split._s3._line, split._s4._line,
        // split._a0, split._a1, split._a2, split._a3,
        // split._a4,
        // split._r0, split._r1, split._r2,
        // split._r3, split._r4,
      ],
      modifiers: {
        angle: this.bindNext(colors.angles, 'angles'),
        side_lengths: this.bindNext(colors.split, 'sides'),
      },
    });

    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0._line, split._s1._line, split._s2._line,
        split._s3._line, split._s4._line, // split._s5._line,
        split._a0, split._a1, split._a2, split._a3,
        split._a4, // split._a5,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
      ],
      modifiers: {
        angle: coll.bindAccent(
          split,
          ['a0', 'a1', 'a2', 'a3', 'a4'],
        ),
        side_lengths: coll.bindAccent(
          split,
          ['r0', 'r1', 'r2', 'r3', 'r4'],
          colors.split,
        ),
      },
      transitionFromPrev: (done) => {
        if (this.message === 'angles') {
          coll.accent(split, ['a0', 'a1', 'a2', 'a3', 'a4'], done);
        } else if (this.message === 'sides') {
          coll.accent(split, ['r0', 'r1', 'r2', 'r3', 'r4'], done);
        } else {
          coll.accent(split, [
            'r0', 'r1', 'r2', 'r3', 'r4', 'a0', 'a1', 'a2', 'a3', 'a4',
          ], done);
        }
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'Joining the splits creates a |polygon|.',
      ],
    };
    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0._line, split._s1._line, split._s2._line,
        split._s3._line, split._s4._line, // split._s5._line,
        split._a0, split._a1, split._a2, split._a3,
        split._a4, // split._a5,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
      ],
      modifiers: {
        polygon: this.bindNext(colors.sides),
      },
    });

    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0._line, split._s1._line, split._s2._line,
        split._s3._line, split._s4._line, // split._s5._line,
        split._a0, split._a1, split._a2, split._a3,
        split._a4, // split._a5,
        split._line,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
      ],
      modifiers: {
        polygon: coll.bindAccent(split._line),
      },
      transitionFromPrev: (done) => {
        coll.accent(split._line, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'By |SAS|, each triangle is congruent. Each triangle is also an |isosceles| triangle as two sides have the same length.',
        note({ top: 93, color: colors.diagram.text.note }, 'Reference: |SAS_congruence|, |Isosceles_Triangle|'),
      ],
    };
    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0, split._s1, split._s2,
        split._s3, split._s4,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
        split._a0, split._a1, split._a2, split._a3,
        split._a4,
        split._line,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
      ],
      modifiers: {
        SAS: coll.bindToggleGroups(split, [
          ['r0', 'r1', 'a0'],
          ['r1', 'r2', 'a1'],
          ['r2', 'r3', 'a2'],
          ['r3', 'r4', 'a3'],
          ['r4', 'r0', 'a4'],
        ], colors.diagram.action, ['pulse', 'highlight']),
        isosceles: coll.bindToggleGroups(split, [
          ['r0', 'r1'],
          ['r1', 'r2'],
          ['r2', 'r3'],
          ['r3', 'r4'],
          ['r4', 'r0'],
        ], colors.diagram.action, ['pulse', 'highlight'], 0, [
          'a0', 'a1', 'a2', 'a3', 'a4',
        ]),
        SAS_congruence: this.qr('Math/Geometry_1/CongruentTriangles/base/Sas'),
        Isosceles_Triangle: this.qr('Math/Geometry_1/Isosceles/base/Main'),
      },
      setLeaveState: () => {
        coll.undim();
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: [
        'Therefore, all |sides| and internal |angles| are the |same|, and we have created a |regular_polygon|.',
      ],
      modifiers: {
        regular_polygon: this.bindNext(colors.sides),
        sides: this.bindNext(colors.sides, 'sides'),
        angles: this.bindNext(colors.angles, 'angles'),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0, split._s1, split._s2,
        split._s3, split._s4,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
        split._a0, split._a1, split._a2, split._a3,
        split._a4,
        split._line,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
      ],
    });

    this.addSection(common, commonContent, {
      show: [
        split._circle,
        split._s0, split._s1, split._s2,
        split._s3, split._s4,
        split._r0, split._r1, split._r2,
        split._r3, split._r4,
        split._a0, split._a1, split._a2, split._a3,
        split._a4,
        split._line,
        split._m0, split._m1, split._m2,
        split._m3, split._m4,
        split._i0, split._i1, split._i2,
        split._i3, split._i4,
      ],
      modifiers: {
        sides: coll.bindAccent(split, ['m0', 'm1', 'm2', 'm3', 'm4']),
        angles: coll.bindAccent(split, ['i0', 'i1', 'i2', 'i3', 'i4']),
      },
      transitionFromPrev: (done) => {
        if (this.message === 'sides') {
          coll.accent(split, ['m0', 'm1', 'm2', 'm3', 'm4'], done);
        } else if (this.message === 'angles') {
          coll.accent(split, ['i0', 'i1', 'i2', 'i3', 'i4'], done);
        } else {
          coll.accent(split, [
            'm0', 'm1', 'm2', 'm3', 'm4',
            'i0', 'i1', 'i2', 'i3', 'i4',
          ], done);
        }
      },
    });

    this.addSection(common, commonContent, {
      show: [
        split._line,
        split._m0, split._m1, split._m2,
        split._m3, split._m4,
        split._i0, split._i1, split._i2,
        split._i3, split._i4,
      ],
      modifiers: {
        regular_polygon: coll.bindAccent(split, colors.sides),
        sides: coll.bindAccent(split, ['m0', 'm1', 'm2', 'm3', 'm4']),
        angles: coll.bindAccent(split, ['i0', 'i1', 'i2', 'i3', 'i4']),
      },
      transitionFromPrev: (done) => {
        coll.accent(split, colors.sides, done);
      },
    });
  }
}

export default Content;
