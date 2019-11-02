// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import { note } from '../../../../../common/tools/note';
import diagramLayout from './layout';
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
  // note,
  highlightWord,
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
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/AnglesAtIntersections/base',
      'Math/Geometry_1/ParallelSplitOfTriangle/base',
      'Math/Geometry_1/Isosceles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const examples = coll._examples;
    const eqn = coll._eqn;
    const twoProp = diag._twoProp;
    const sas = diag._sas;
    const ssa = diag._ssa;

    this.addSection({
      title: 'Introduction',
      setContent: [
        'Shapes that have the |same shape|, but are a |different size|, are commonly called |similar_shapes|.',
      ],
      modifiers: {
        similar_shapes: click(coll.pulseSimilar, [coll], colors.diagram.action),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

    this.addSection({
      setContent: [
        'Similar shapes can be |enlarged|, or |reduced| to become the same size (|congruent|).',
      ],
      modifiers: {
        enlarged: click(coll.growExamples, [coll, null], colors.diagram.action),
        reduced: click(coll.reduceExamples, [coll, null], colors.diagram.action),
      },
      show: [examples],
      setEnterState: () => {
        examples._circ1.setScenario('small');
        examples._tri1.setScenario('small');
        examples._quad1.setScenario('small');
        examples._circ2.setScenario('large');
        examples._tri2.setScenario('large');
        examples._quad2.setScenario('large');
      },
    });

    this.addSection({
      setContent: [
        'When a shape\'s size is |changed|, all its sides are changed by the |same proportion|, or |scaling factor|.',
      ],
      modifiers: {
        changed: click(coll.goToOtherBound, [coll, null], colors.diagram.action),
      },
      show: [fig._triScaler],
      setEnterState: () => {
        fig._triScaler.setScenario('base');
        coll.scaleTri();
      },
      setSteadyState: () => {
        fig._triScaler.hideAngles();
      },
    });

    let common = {
      show: [fig._tri1, fig._trir],
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
      },
      setSteadyState: () => {
        fig._tri1.hideAngles();
        fig._trir.hideAngles();
        // eqn.showForm('ratios');
        // eqn.setScenario('bottom');
      },
    };
    this.addSection(common, {
      setContent: [
        'Thus |similar triangles| are triangles whose |corresponding_sides| have the |same proportion|.',
      ],
      modifiers: {
        corresponding_sides: click(coll.pulseTriRSide, [coll], colors.sides),
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    let commonContent = {
      setContent: [
        'Now, if we measure the |angles| of these two triangles, we will see they are the |same|.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        same: click(this.next, [this], colors.angles),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
        coll.setAngles('initial');
      },
      show: [fig._tri1, fig._trir],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        same: click(coll.pulseAngles, [coll], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseAllAngles(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'Does this mean that |any| two triangles with |equal corresponding angles| will be |similar|?',
      ],
      title: 'Equal Angles',
    };
    this.addSection(common, commonContent);

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'To find out, let\'s start with two triangles with the |same_angles|, but of |different_side_lengths|.',
      ],
      modifiers: {
        different_side_lengths: click(coll.pulseTri1ASides, [coll], colors.sides),
        same_angles: click(coll.pulseTri1AAngles, [coll], colors.angles),
      },
    };
    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._tria.setScenario('right');
        coll.setTri1('general');
        coll.setTriA('initial');
      },
      show: [fig._tri1, fig._tria],
    };
    this.addSection(common, commonContent);

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'As the angles are the same, we can |move| the smaller triangle on the larger one such that one angle lines up.',
      ],
      modifiers: {
        move: this.bindNext(colors.diagram.action),
      },
    };
    this.addSection(common, commonContent);

    this.addSection(common, commonContent, {
      modifiers: {
        move: click(coll.triAtoTri1, [coll, null], colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll.triAtoTri1(done);
      },
      setSteadyState: () => {
        fig._tria.setScenario('on');
      },
    });

    // ************************************************************************
    // ************************************************************************
    // commonContent = {
    //   setContent: [
    //     'Now let\'s focus on just a portion of the diagram',
    //   ],
    // };

    // this.addSection(common, commonContent, {
    //   setSteadyState: () => {
    //     fig._tria.setScenario('on');
    //   },
    // });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._tria.setScenario('on');
        coll.setTri1('inWorking');
        coll.setTriA('inWorking');
      },
      show: [fig._tri1, fig._tria],
    };
    // this.addSection(common, commonContent);

    // ************************************************************************
    // ************************************************************************
    this.addSection(common, commonContent, {
      setContent: [
        'We can see that line |A_| intersects lines |B| and |B\'|, making two |corresponding_angles| of equal size |a|.',
      ],
      modifiers: {
        corresponding_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        a: click(coll.pulseAnglesA1a, [coll], colors.angles),
        A_: click(coll.pulseSideA, [coll], colors.sides),
        B: click(coll.pulseSideB, [coll], colors.sides),
        'B\'': click(coll.pulseSideBa, [coll], colors.sides2),
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'We know that when |corresponding_angles| are equal, the |intersected_lines| must be |parallel|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        corresponding_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        parallel: this.bindNext(colors.sides),
        intersected_lines: click(coll.pulseParallelLines, [coll], colors.sides),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._tria.setScenario('on');
        coll.setTri1('inWorking');
        coll.setTriA('inWorking');
      },
      show: [fig._tri1, fig._tria, fig._arrow1, fig._arrow2],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        corresponding_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        parallel: click(coll.pulseArrows, [coll], colors.sides),
        intersected_lines: click(coll.pulseParallelLines, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.pulseArrows(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'We also know that |any triangle split with a parallel line|, will form a smaller triangle whose sides are all in |proportion| to the larger triangle.',
      ],
      modifiers: {
        proportion: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
      },
    };
    this.addSection(common, commonContent);

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'We also know that |any triangle split with a parallel line|, will form a smaller triangle whose sides are all in |proportion| to the larger triangle.',
      ],
      modifiers: {
        proportion: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
      },
    };
    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
        coll.pulseEqn(done);
      },
      setSteadyState: () => {
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
      },
    });
    this.addSection(common, commonContent, {
      show: [fig._tri1, fig._tria],
      transitionFromPrev: (done) => {
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
        coll.setTri1('general');
        coll.setTriA('initial');
        fig._tria.animations.new()
          .scenario({ target: 'right', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig._tria.setScenario('right');
        coll.setTri1('general');
        coll.setTriA('initial');
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._tria.setScenario('right');
        coll.setTri1('general');
        coll.setTriA('solved');
      },
      show: [fig._tri1, fig._tria],
    };
    this.addSection(common, commonContent, {
      show: [fig._tri1, fig._tria],
      transitionFromPrev: (done) => {
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
        coll.pulseTriASides(done);
      },
      setSteadyState: () => {
        eqn.showForm('ratios');
        eqn.setScenario('bottom');
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'And so we see the two triangles are actually |similar triangles| as their |corresponding_sides| all have the same scaling factor |s| and therefore have the |same proportion|.',
      ]),
      modifiers: {
        corresponding_sides: click(coll.pulseTriASide, [coll], colors.sides),
        r: highlight(colors.sides2),
      },
    };
    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._tria.setScenario('right');
        coll.setTri1('general');
        coll.setTriA('solved');
      },
      show: [fig._tri1, fig._tria],
    };
    this.addSection(common, commonContent);

    // ************************************************************************
    // ************************************************************************
    this.addSection({
      setContent: style({ centerV: true }, [
        'So |any| two triangles are similar if they have |equal corresponding angles|.',
        'By extension, this means |all triangles with equal corresponding angles are similar|.',
      ]),
    });

    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Similar Triangles',
      setContent: style({ centerV: true }, [
        'Does this mean that |all similar triangles have equal corresponding angles|?',
      ]),
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'To find out, let\'s start with two |similar triangles| with |unknown_corresponding_angles|.',
      ],
      modifiers: {
        unknown_corresponding_angles: click(coll.pulseAngles, [coll], colors.angles),
      },
    };
    // this.addSection(commonContent);

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('right');
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      show: [fig._tri1, fig._trir],
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'Using the |base_angles| of the larger triangle, and the |base| of the smaller triangle, let\'s |create| a third triangle.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        create: this.bindNext(colors.diagram.action),
        base: click(coll.pulseNewBase, [coll], colors.sides),
        base_angles: click(coll.pulseNewAngles, [coll], colors.angles),
      },
    });

    this.addSection(commonContent, {
      modifiers: {
        create: click(coll.createTriangle, [coll, null], colors.diagram.action),
        base: click(coll.pulseNewBase, [coll], colors.sides),
        base_angles: click(coll.pulseNewAngles, [coll], colors.angles),
      },
      setEnterState: () => {
        if (this.comingFrom === 'prev') {
          fig._tri1.setScenario('left');
          fig._trir.setScenario('right');
        } else {
          fig._tri1.setScenario('left');
          fig._trir.setScenario('topRight');
        }
        fig._tri2.setScenario('bottomRight');
        fig._tri2.setFirstTransform(fig.lastDrawTransform);
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      transitionFromPrev: (done) => {
        fig._trir.animations.new()
          .scenario({ target: 'topRight', duration: 1 })
          .trigger(coll.createTriangle.bind(coll, done))
          .start();
      },
      show: [fig._tri1, fig._trir],
      setSteadyState: () => {
        fig._trir.setScenario('topRight');
        fig._tri2.showAll();
        coll.setTri2('initial');
        fig._angleA.hideAll();
        fig._angleB.hideAll();
      },
    });

    commonContent = {
      setContent: [
        'As all angles in a triangle |add| to 180º, then if you know |two_angles| you can always calculate the |third|.',
      ],
      modifiers: {
        add: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        two_angles: click(coll.pulseNewAnglesOnly, [coll], colors.angles),
        third: click(coll.pulseUnknownAngle, [coll], colors.angles),
      },
    };
    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('initial');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'From the |first_triangle|, we know if there are two angles |a| and |b|, then the third must be |c|.',
      ],
      modifiers: {
        add: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        a: click(coll.pulseA, [coll], colors.angles),
        b: click(coll.pulseB, [coll], colors.angles),
        c: click(coll.pulseC, [coll], colors.angles),
      },
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'Thus the |third_triangle\'s| unknown angle is |c|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        'third_triangle\'s': click(coll.pulseTri2, [coll], colors.sides),
        c: this.bindNext(colors.angles),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('abc');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        'third_triangle\'s': click(coll.pulseTri2, [coll], colors.sides),
        c: click(coll.pulseNewC, [coll], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseNewC(done);
      },
    });

    this.addSection(common, {
      setContent: [
        'The |first_triangle| and |third_triangle| have equal corresponding angles. We saw earlier that |triangles with equal corresponding angles are always similar|.',
      ],
      modifiers: {
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    });

    commonContent = {
      setContent: [
        'Therefore the |first_triangle| and |third_triangle| are similar, and the sides are proportionally scaled by the |same factor|.',
      ],
      modifiers: {
        first_triangle: click(coll.pulseTri1, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'As we know the |base| is scaled by |s|, then the |other_sides| must also be scaled by |s|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        base: click(coll.pulseTri2Base, [coll], colors.sides),
        other_sides: this.bindNext(colors.sides),
      },
    });

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        base: click(coll.pulseTri2Base, [coll], colors.sides),
        other_sides: click(coll.pulseNewSides, [coll, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.setTri2('all');
        coll.pulseNewSides(done);
      },
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('general');
        coll.setTri2('all');
      },
    });

    commonContent = {
      setContent: [
        'Now we can see the |second_triangle| and |third_triangle| have the same side lengths.',
      ],
      modifiers: {
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
      },
    };
    this.addSection(common, commonContent);

    commonContent = {
      setContent: [
        'From |SSS| triangle congruence, any two triangles with the same side lengths are |congruent|, and thus both triangles have the |same_angles|.',
      ],
      modifiers: {
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
        same_angles: this.bindNext(colors.angles),
      },
    };
    this.addSection(common, commonContent);

    common = {
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        fig._tri2.setScenario('bottomRight');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir, fig._tri2],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
        second_triangle: click(coll.pulseTrir, [coll], colors.sides),
        third_triangle: click(coll.pulseTri2, [coll], colors.sides),
        same_angles: click(coll.pulseTri2rAngles, [coll, null], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseTri2rAngles(done);
      },
    });

    this.addSection({
      setContent: 'And so we have shown that |any two similar triangles| will also have the |same corresponding angles|.',
      setEnterState: () => {
        fig._tri1.setScenario('left');
        fig._trir.setScenario('topRight');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
      transitionFromPrev: (done) => {
        fig._trir.animations.new()
          .scenario({ target: 'right', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig._trir.setScenario('right');
      },
    });

    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Summary',
      setContent: style({ centerV: true }, [
        'So we have seen |all triangles with equal corresponding angles are similar|, and conversely all |similar triangles have equal corresponding angles|.',
      ]),
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      setContent: style({ centerV: true }, [
        'As similar triangles have proportional sides, and equal corresponding angles, you can often |infer unknown side lengths or angles| if know two triangles are |similar|.',
        '|How many properties| do you need to know to confirm two triangles are |similar|?',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'Another way to ask this is, what are the properties you need to confirm two triangles will have the same corresponding angles?',
        'As all similar triangles have the same corresponding angles, if you  show a set of properties can create a triangle with only one set of angles, then you know they will be sufficient to determine similarity.',
      ]),
    });

    this.addSection({
      title: 'One Property',
      setContent: [
        'How many triangles can be created if you fix just a single angle or side? You can try with the triangle below.',
        note({ label: 'Note:' }, 'Move the |vertices| of the triangle to change the triangle'),
      ],
      show: [twoProp._tri],
    });

    this.addSection({
      setContent: [
        'If we fix a single |angle| or |side|, many different triangles with |different angles| can be made.',
      ],
      modifiers: {
        side: click(twoProp.side, [twoProp], colors.sides),
        angle: click(twoProp.angle, [twoProp], colors.angles),
      },
      show: [twoProp._tri],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Two Properties',
      setContent: style({ centerV: true }, [
        'Therefore |one property is insufficient| to determine congruency.',
        'How about |two properties|?',
        'The two property |combinations| are:',
        style({ list: 'unordered' }, [
          'Adjacent Side-Angle',
          'Opposite Side-Angle',
          'Side-Side',
          'Angle-Angle',
        ]),
      ]),
    });

    this.addSection({
      setContent: 'Try making the |different combinations| and see if multiple triangles can be made for each.',
      show: [twoProp._tri],
    });

    this.addSection({
      setContent: style({ top: 0 }, 'You might see that |Side_Side|, |Adjacent_Side_Angle| and |Opposite_Side_Angle| can all form |many| triangles. These combinations are therefore insufficient.'),
      modifiers: {
        Side_Side: click(twoProp.sideSide, [twoProp], { text: 'Side-Side', color: colors.diagram.action }),
        Angle_Angle: click(twoProp.angleAngle, [twoProp], { text: 'Angle-Angle', color: colors.diagram.action }),
        Adjacent_Side_Angle: click(twoProp.adjacentAngleSide, [twoProp], { text: 'Adjacent Side-Angle', color: colors.diagram.action }),
        Opposite_Side_Angle: click(twoProp.oppositeAngleSide, [twoProp], { text: 'Opposite Side-Angle', color: colors.diagram.action }),
      },
      show: [twoProp._tri],
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'In comparison, the |Angle-Angle| combination |is sufficient| to determine similarity.',
        'This is because all angles in a triangle |add_to_180|.',
        'Therefore, if you |know any two angles|, you can |calculate all three|.',
        'You can then |directly compare all three corresponding angles|, and if they are equal, know that the triangles are similar.',
      ]),
      modifiers: {
        add_to_180: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres', { text: 'add to 180º' }),
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Three Properties',
      setContent: style({ top: 10 }, [
        'Next lets consider combinations of three properties.',
        'The three property |combinations| are:',
        `<ul style="position:absolute; top:40%">
          <li>Angle Angle Angle - |AAA|</li>
          <li>Side Side Side - |SSS|</li>
          <li>Angle Angle Side - |AAS|</li>
          <li>Angle Side Angle - |ASA|</li>
          <li>Side Angle Side - |SAS|</li>
          <li>Side Side Angle - |SSA|</li>
        </ul>`,
      ]),
    });
    this.addSection({
      setContent: style({ centerV: true }, [
        'Similar triangles have all corresponding sides as the same proportion.',
        'All similar triangles have the same corresponding angles.',
        'Therefore, |SSS| and |AAA| are |sufficient to determine similarity|.',
      ]),
    });
    this.addSection({
      setContent: style({ centerV: true }, [
        'In addition, we have just seen that knowing just |two angles| is sufficient to determine similarity.',
        'Therefore both |AAS| and |ASA| can determine similarity (though the side knowledge is unnecessary).',
      ]),
    });

    this.addSection({
      setContent: style({ }, [
        'Therefore we have so far:',
        `<ul style="position:absolute; top:30%; left: 30%">
          <li style="list-style: none">Angle Angle Angle - |AAA|  |check|</li>
          <li style="list-style: none">Side Side Side - |SSS|  |check|</li>
          <li style="list-style: none">Angle Angle Side - |AAS|  |check|</li>
          <li style="list-style: none">Angle Side Angle - |ASA|  |check|</li>
          <li style="list-style: none">Side Angle Side - |SAS|</li>
          <li style="list-style: none">Side Side Angle - |SSA|</li>
        </ul>`,
      ]),
      modifiers: {
        check: highlightWord('\u2713', colors.diagram.safe),
      },
    });

    // ************************************************************************
    // ************************************************************************

    common = {
      show: [sas],
      hide: [
        sas._tri1._angle0, sas._tri1._angle2,
        sas._tri2._angle0, sas._tri2._angle2,
        sas._tri1._side20, sas._tri2._side20,
        sas._arrow1, sas._arrow2,
      ],
      setSteadyState: () => {
        sas._tri1.setScenario('default');
        sas._tri2.setScenario('default');
      },
    };
    this.addSection(common, {
      setContent: style({}, [
        'Next, let\'s consider the |SAS| case, where we know two triangles have the same |angle| adjacent to |corresponding_sides| that are equal in proportion.',
      ]),
      modifiers: {
        angle: click(sas.pulseAngles, [sas, null], colors.angles),
        corresponding_sides: click(sas.pulseSides, [sas], colors.sides),
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'We start by |moving the triangles| such that the |known angles| are on |aligned|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        aligned: this.bindNext(colors.angles),
      },
      show: [sas],
      hide: [
        sas._tri1._angle0, sas._tri1._angle2,
        sas._tri2._angle0, sas._tri2._angle2,
        sas._tri1._side20, sas._tri2._side20,
        sas._arrow1, sas._arrow2,
      ],
      setSteadyState: () => {
        sas._tri1.setScenario('default');
        sas._tri2.setScenario('default');
      },
    });

    common = {
      show: [sas],
      hide: [
        sas._tri1._angle0, sas._tri1._angle2, sas._tri1._angle1,
        sas._tri2._angle0, sas._tri2._angle2,
        sas._tri1._side20, sas._tri2._side20,
        sas._arrow1, sas._arrow2,
      ],
      setSteadyState: () => {
        sas._tri1.setScenario('on');
        sas._tri2.setScenario('on');
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        aligned: click(sas.pulseAngles, [sas, null], colors.angles),
      },
      transitionFromPrev: (done) => {
        sas._tri1._angle1.showAll();
        sas.animations.new()
          .scenarios({ target: 'on', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._tri1._angle1.hide();
        sas._tri1.setScenario('on');
        sas._tri2.setScenario('on');
      },
    });

    commonContent = {
      setContent: [
        'This is equivalent to a triangle with |two_sides_split| in the same proportion, which means the |two base sides| must be |parallel|.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        two_sides_split: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/ProportionalSplitPres'),
        parallel: this.bindNext(colors.sides),
      },
    });

    common = {
      show: [sas],
      hide: [
        sas._tri1._angle0, sas._tri1._angle2, sas._tri1._angle1,
        sas._tri2._angle0, sas._tri2._angle2,
        sas._tri1._side20, sas._tri2._side20,
      ],
      setSteadyState: () => {
        sas._tri1.setScenario('on');
        sas._tri2.setScenario('on');
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        two_sides_split: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/ProportionalSplitPres'),
        parallel: click(sas.pulseParallel, [sas, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        sas.pulseParallel(done);
      },
    });

    commonContent = {
      setContent: style({ top: 0 }, [
        'We now have a |triangle_split_with_a_parallel_line|, which means all corresponding sides of both triangles must have |equal proportion|. In other words, they are |similar|.',
      ]),
    };
    this.addSection(common, commonContent, {
      modifiers: {
        triangle_split_with_a_parallel_line: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
        similar: this.bindNext(colors.sides),
      },
    });
    this.addSection(common, commonContent, {
      hide: [
        sas._tri1._angle0, sas._tri1._angle2, sas._tri1._angle1,
        sas._tri2._angle0, sas._tri2._angle2,
      ],
      modifiers: {
        triangle_split_with_a_parallel_line: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
        similar: click(sas.pulseSimilar, [sas, null], colors.sides),
      },
      transitionFromPrev: (done) => {
        sas.sideCounter = 2;
        sas.pulseSimilar(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      setContent: style({ centerV: true }, [
        'Finally, let\'s consider the |SSA| case.',
        'We have already seen from |SSA_triangle_congruency| that knowing an angle, opposite side, and adjacent side creates |two triangles| if the |opposite side is shorter than the adjacent side|.',
        'On the other hand, if the |opposite side| is |equal to or longer| than the |ajacent side|, only |one triangle| can be constructed.',
        'Hence SSA can be used to check for triangle congruency as long as the opposite side is the same length as, or longer than, the adjacent side.',
      ]),
      modifiers: {
        SSA_triangle_congruency: this.qr('Math/Geometry_1/CongruentTriangles/base/Ssa'),
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'Therefore, as a shorter opposite side than adjacent side results in more than one possible triangle, we cannot use this case for a similarity test.',
        'So, let\'s explore the case for when the opposite side is longer than the adjacent side.',
      ]),
    });

    common = {
      setEnterState: () => {
        ssa.setScenarios('default');
      },
      hide: [ssa._tri1._b._side1, ssa._tri1._b._side2, ssa._tri2._b._side1, ssa._tri2._b._side2],
    };
    this.addSection(common, {
      setContent: [
        'We start with two triangles that share the |same_angle|, and have adjacent and opposite sides that are in |proportion_to_each_other|.',
      ],
      modifiers: {
        same_angle: click(ssa.pulseAngle, [ssa], colors.angles),
        proportion_to_each_other: click(ssa.pulseSides, [ssa], colors.sides),
      },
      show: [ssa._tri1, ssa._tri2],
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        '|Extend| side |A| of the smaller triangle by to be the same as the larger.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        Extend: this.bindNext(colors.diagram.action),
      },
      show: [ssa._tri1, ssa._tri2],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        Extend: click(ssa.growRA, [ssa, 0, 0.8, true, null], colors.diagram.action),
      },
      show: [ssa._tri1, ssa._tri2, ssa._rALine],
      transitionFromPrev: (done) => {
        ssa.growRA(done);
      },
      setSteadyState: () => {
        ssa._rADim.showAll();
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        '|Copy| angle |b| to the end of the new line.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        Copy: this.bindNext(colors.diagram.action),
        b: highlight(colors.angles),
      },
      show: [ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        Copy: click(ssa.pulseAngleB, [ssa, null], colors.diagram.action),
        b: highlight(colors.angles),
      },
      show: [ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b],
      transitionFromPrev: (done) => {
        ssa.pulseAngleB(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        '|Extend| side |B| and a line from angle |b_| to form a larger triangle.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        Extend: this.bindNext(colors.diagram.action),
        b_: highlight(colors.angles),
      },
      show: [ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        Extend: click(ssa.growLargeTriangle, [ssa, null], colors.diagram.action),
        b_: highlight(colors.angles),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine,
      ],
      transitionFromPrev: (done) => {
        ssa.growLargeTriangle(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'The |b| angles are |equal_corresponding_angles|, therefore the two lines that rise from them must be |parallel|.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        b: click(ssa.pulseBAngles, [ssa], colors.angles),
        equal_corresponding_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        parallel: this.bindNext(colors.sides),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        b: click(ssa.pulseBAngles, [ssa], colors.angles),
        equal_corresponding_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        parallel: click(ssa.pulseParallel, [ssa, null], colors.sides),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine, ssa._arrow1, ssa._arrow2,
      ],
      transitionFromPrev: (done) => {
        ssa.pulseParallel(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'We now have a situation where the larger |triangle_is_split_by_a_parallel_line|. Therefore, the smaller triangle is |proportional| to the larger, and therefore |similar|.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        triangle_is_split_by_a_parallel_line: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
        proportional: this.bindNext(colors.sides),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        triangle_is_split_by_a_parallel_line: this.qr('Math/Geometry_1/ParallelSplitOfTriangle/base/TrianglePres'),
        proportional: click(ssa.pulseProportional, [ssa, null], colors.sides),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine, ssa._arrow1, ssa._arrow2,
        ssa._cLabel, ssa._rcLabel, ssa._rBDim,
      ],
      transitionFromPrev: (done) => {
        ssa.pulseProportional(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: [
        'From |SSA|, the two large triangles are |congruent|, and therefore both are similar to the smaller triangle.',
      ],
    };

    this.addSection(common, commonContent, {
      modifiers: {
        SSA: this.qr('Math/Geometry_1/CongruentTriangles/base/Ssa'),
      },
      show: [
        ssa._tri1, ssa._tri2, ssa._rALine, ssa._rADim, ssa._b,
        ssa._rCLine, ssa._rBLine,
        ssa._cLabel, ssa._rcLabel, ssa._rBDim,
      ],
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'And so we have seen that |SSA| can be used to determine if two triangles are similar if the side opposite the known angle is longer than the side adjacent.',
        'By the same process, we can also show |SSA| can be used as a similarity test if the |two known sides are equal|.',
        'We can also show the equal case using |isosceles| triangles, as if you know just |one angle| in an isosceles triangle, you can |calculate the rest|.',
      ]),
      modifiers: {
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main'),
      },
    });


    this.addSection({
      title: 'Summary',
      setContent: style({ centerV: true }, [
        'So we have seen that |similar triangles| have corresponding sides that have the |same proportion|.',
        '|All similar triangles| have |corresponding angles| that are |equal|.',
        '|All triangles| with |equal corresponding angles| are |similar|.',
        'We can test if two triangles are similar using |AA| and |SAS|.',
        'We can use |SSA| only when the |opposite side is longer than or equal to the adjacent side|.',
      ]),
      modifiers: {
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main'),
      },
    });
  }
}

export default Content;
