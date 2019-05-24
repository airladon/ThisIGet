// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  highlight,
  highlightWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;
    const aaa = diag._aaa;
    const sas = diag._sas;
    const asa = diag._asa;
    const aas = diag._aas;
    const ssa = diag._ssa;
    // const sss = diag._sss;

    this.addSection({
      title: 'Congruent Triangles',
      setContent: style({ centerV: true }, [
        'In mathematics, if |two shapes are the same size and shape|, then they are said to be |congruent|.',
        'The word |congruent| comes from |Latin|, where it means |"agreeing, meeting together"|.',
      ]),
    });

    this.addSection({
      setContent: [
        'For two triangles to be |congruent|, the corresponding |side_lengths| and |angles| of each triangle must be the same as the other.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      setSteadyState: () => {
        congruent._tri1.setScenario('left');
        congruent._tri2.setScenario('right');
      },
    });

    this.addSection({
      setContent: [
        'If one triangle is |rotated|, the triangles are still congruent as the |side_lengths| and |angles| are the same.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
        rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      transitionFromAny: (done) => {
        congruent._tri1.setScenario('left');
        congruent._tri2.setScenario('right');
        coll.rotateTriangle(Math.PI, done);
      },
      setSteadyState: () => {
        congruent._tri2.makeTouchable();
        congruent._tri2.isMovable = true;
        congruent._tri2.touchInBoundingRect = true;
        congruent._tri2.move.type = 'rotation';
      },
      setLeaveState: () => {
        congruent._tri2.isTouchable = false;
        congruent._tri2.isMovable = false;
      },
    });

    this.addSection({
      setContent: [
        'If one triangle is |flipped|, the triangles are still congruent as the |side_lengths| and |angles| are the same.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
        flipped: click(coll.flipTriangle, [coll, 1, null], colors.diagram.action),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'prev') {
          coll.isFlipped = false;
          congruent._tri1.setScenario('left');
          coll.flipTriangle(1, done);
        } else {
          congruent._tri1.setScenario('left');
          congruent._tri2.setScenario('right');
          coll.isFlipped = false;
          coll.flipTriangle(0, done);
        }
      },
      setLeaveState: () => {
        congruent._tri2.stop(true, 'complete');
        coll.resetTriangle();
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'Showing two triangles are congruent can be beneficial in calculating a geometric problem.',
        'When |two triangles are known to be congruent|, unknown angles and lengths of one triangle, can be |inferred| from the known lengths and angles of the other triangle.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So |how| can you figure out if two triangles are congruent?',
        'One way is to measure all the angles and sides and see if they are equal.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'But this means the advantage of knowing triangles are congruent is reduced as you already know the angles and lengths of both triangles.',
        'In addition, |sometimes all properties cannot be measured or known|, so such a comparison is not practical.',
        'Therefore, it\'s important to explore how many side lengths and angles of a triangle really need to be known to guarantee two triangles are congruent.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'One way to do this is to take a set of known properties, then figure out how many triangles can be created from them.',
        'If |more than one size and shape of triangle| can be created, then the selected properties are |not enough| to guarantee two triangles that share those properties are congruent.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'In many cases you only need |3 properties| to determine congruency. For the cases where 3 is insufficient, 4 will always work.',
        'Therefore, we will examine all the different combinations of three properties, and see which ones can be used to determine two triangles sharing those properties are congruent.',
      ]),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */

    this.addSection({
      title: 'Angle Angle Angle',
      setContent: [
        'First consider when only the |three_angles| are known. Do triangles of different sizes exist that have the same angles, or can only one triangle size be formed from these constraints?',
      ],
      modifiers: {
        three_angles: highlight(colors.angles),
      },
      show: [
        aaa._fig._tri._line, aaa._fig._tri._angle0, aaa._fig._tri._angle1, aaa._fig._tri._angle2,
      ],
      setEnterState: () => {
        aaa.resetTri();
        aaa.hasTouchableElements = false;
      },
    });

    this.addSection({
      setContent: [
        'You can |move| the bottom corners of the triangle to see that |triangles with the same angles, can be of different sizes|. You can move the top corner of the triangle to test different triangles.',
      ],
      modifiers: {
        move: click(aaa.randomSize, [aaa], colors.diagram.action),
      },
      show: [aaa],
      setEnterState: () => {
        aaa.resetTri();
        aaa.hasTouchableElements = true;
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So triangles with the |same_angles|, can have |different_side_lengths|.',
        'Only knowing two triangles have the same angles, is |not enough| to know they are congruent.',
      ]),
      modifiers: {
        same_angles: highlight(colors.angles),
        different_side_lengths: highlight(colors.sides),
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'The next two cases are combinations of |two_sides| and |one_angle|.',
        'When you know one angle and two sides, the two sides can either be adjacent to the angle, or one can be adjacent while the other is opposite.',
      ]),
      modifiers: {
        two_sides: highlight(colors.sides),
        one_angle: highlight(colors.angles),
      },
    });
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Side Angle Side',
      setContent: [
        'First consider the case where the |two_sides_are_adjacent| to the |angle|. Can more than one triangle be made?',
      ],
      modifiers: {
        angle: highlight(colors.angles),
        two_sides_are_adjacent: highlight(colors.sides),
      },
      show: [sas._line, sas._angle, sas._base],
      setSteadyState: () => {
        sas.setScenarios('initial');
      },
    });

    this.addSection({
      setContent: [
        'We can start by connecting the angle to one of the sides. At first look, there seem to be |four| ways to do this.',
      ],
      modifiers: {
        four: click(sas.toggleAngles, [sas], colors.angles),
      },
      show: [sas._angle, sas._base],
      transitionFromPrev: (done) => {
        sas.setScenarios('initial');
        sas.animations.cancelAll();
        sas.animations.new()
          .scenarios({ target: 'center1', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas.setScenarios('center1');
        sas.anglePosition = 1;
      },
      transitionToNext: (done) => {
        // const r = sas._angle.getRotation();
        if (sas.anglePosition !== 1) {
          sas.animations.cancelAll();
          sas.animations.new()
            .scenarios({ target: 'center1', duration: 1 })
            .whenFinished(done)
            .start();
        } else {
          done();
        }
      },
    });

    this.addSection({
      setContent: [
        'We can visualize these 4 ways at the same time.',
      ],
      transitionFromPrev: (done) => {
        sas._config1.showAll();
        sas._config1._line.hide();
        sas._config1._line3.hide();
        sas._config1._angle2.hide();
        sas._config1.setScenario('center');
        sas._config1.animations.cancelAll();
        sas._config1.animations.new()
          .scenario({ target: 'showAll', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._config1.showAll();
        sas._config2.showAll();
        sas._config3.showAll();
        sas._config4.showAll();
        sas._config1._line.hide();
        sas._config2._line.hide();
        sas._config3._line.hide();
        sas._config4._line.hide();
        sas._config1._line3.hide();
        sas._config2._line3.hide();
        sas._config3._line3.hide();
        sas._config4._line3.hide();
        sas._config1._angle2.hide();
        sas._config2._angle2.hide();
        sas._config3._angle2.hide();
        sas._config4._angle2.hide();
        sas.setScenarios('showAll');
      },
    });

    let common = {
      setContent: [
        'Next, we can connect the |second side| to be |adjacent_to_the_angle|.',
      ],
      modifiers: {
        adjacent_to_the_angle: highlight(colors.angles),
      },
      setSteadyState: () => {
        sas.setScenarios('showAll');
      },
    };
    this.addSection(common, {
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line, sas._config2._line,
        sas._config3._line, sas._config4._line,
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],
    });
    this.addSection(common, {
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],
    });
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'For each of these scenarios, how many triangles can be made, and are the triangles between scenarios the same or different?',
      ]),
      show: [sas._config1, sas._config2, sas._config3, sas._config4],
      hide: [
        sas._config1._line3, sas._config2._line3,
        sas._config3._line3, sas._config4._line3,
        sas._config1._angle2, sas._config2._angle2,
        sas._config3._angle2, sas._config4._angle2,
      ],

    });

    this.addSection({
      setContent: [
        'We start by considering just one of these scenarios.',
      ],
      show: [sas._config1],
      hide: [sas._config1._line3, sas._config1._angle2],
      transitionFromPrev: (done) => {
        sas._config1.animations.cancelAll();
        sas._config1.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._fig.showAll();
        sas.setProblemStatement();
        sas._config1.hide();
        // console.log(sas)
      },
    });

    this.addSection({
      setContent: [
        'You can move the |pad| to see how many different lines can be drawn to make a triangle with the known sides and angle.',
      ],
      modifiers: {
        pad: click(sas.pulsePad, [sas], colors.pads),
      },
      show: [sas._fig],
      setSteadyState: () => {
        sas.setMovableLegReady();
      },
    });

    this.addSection({
      setContent: [
        'There is |only_one| line length and angle possible. If this line has a |different_length| or |different_angle|, it does not form a triangle.',
      ],
      modifiers: {
        only_one: click(sas.goToTri, [sas, null], colors.sides),
        different_length: click(sas.randLength, [sas], colors.sides),
        different_angle: click(sas.randRotation, [sas], colors.angles),
      },
      show: [sas._fig],
      transitionFromPrev: (done) => {
        if (sas._fig._pad0.getPosition().isNotEqualTo(sas._fig._pad3.getPosition())) {
          sas.goToTri(done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        sas.setMovableLeg();
      },
    });

    this.addSection({
      setContent: [
        'So for this scenario, |only one| triangle can be made.',
      ],
      show: [sas._fig],
      transitionFromPrev: (done) => {
        if (sas._fig._pad0.getPosition().isNotEqualTo(sas._fig._pad3.getPosition())) {
          sas.goToTri(done);
        } else {
          done();
        }
      },
      interactiveItemsOnly: [],
      setSteadyState: () => {
        sas._fig.hideAll();
        sas._config1.showAll();
        sas._config1.setScenario('center');
      },
    });

    this.addSection({
      setContent: [
        'Now if we |flip| this triangle in different ways, we know all the reflections are |congruent|.',
      ],
      show: [sas._config1],
      setSteadyState: () => {
        sas._config1.setScenario('center');
      },
    });

    common = {
      setContent: [
        'Therefore, we can |flip| them to resemble the |original| four scenarios of connecting the angle to the first side.',
      ],
      show: [sas._config1],
    };
    this.addSection(common, {
      modifiers: {
        flip: click(this.next, [this], colors.sides),
        original: click(this.next, [this], colors.diagram.action),
      },
      setSteadyState: () => {
        sas._config1.setScenario('center');
      },
    });

    this.addSection(common, {
      modifiers: {
        flip: click(sas.createCongruentTriangles, [sas, null, true], colors.sides),
        original: click(sas.toggleConfig, [sas, null], colors.diagram.action),
      },
      show: [sas._config1],
      transitionFromPrev: (done) => {
        sas.setScenario('center');
        sas.animations.cancelAll();
        sas.animations.new()
          .scenarios({ target: 'showAll', duration: 1 })
          .trigger({
            callback: sas.createCongruentTriangles.bind(sas, null, false),
            duration: 3,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._config2.showAll();
        sas._config3.showAll();
        sas._config4.showAll();
        sas.setScenarios('showAll');
        sas.configColors(colors.disabled, colors.disabled);
      },
      setLeaveState: () => {
        sas.configColors(colors.sides, colors.angles);
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So all four scenarios result in the |same triangle|, just flipped or rotated compared to the first.',
        'So we see that only one triangle can be formed when given two side lengths and the angle between them.',
      ]),
    });

    this.addSection({
      setContent: [
        'Therefore if two triangles share |two sides of the same length|, and the |angle_between| those two sides is also the same on both triangles, then they |are congruent|.',
        'This case is often called the |Side Angle Side| case.',
      ],
      modifiers: {
        angle_between: highlight(colors.angles),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle0, congruent._tri1._angle1,
        congruent._tri2._angle0, congruent._tri2._angle1,
        congruent._tri1._side01, congruent._tri2._side01,
      ],
      // setSteadyState: () => {
      // },
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    common = {
      show: [
        ssa._unknown, ssa._opposite, ssa._adjacent, ssa._angle,
        ssa._adjacentMovePad,
      ],
      setSteadyState: () => {
        ssa.hasTouchableElements = false;
        ssa.setScenarios('init');
        ssa.updatePosition();
        ssa.updateRotation();
        ssa.setDefault();
      },
    };
    this.addSection(common, {
      title: 'Side Side Angle',
      setContent: [
        'Next we consider the case where an |angle|, its |adjacent_side| and its |opposite_side| are known.',
      ],
      modifiers: {
        angle: highlight(colors.angles),
        adjacent_side: click(ssa.pulseAdjacent, [ssa], colors.sides),
        opposite_side: click(ssa.pulseOpposite, [ssa], colors.sides),
      },
    });

    this.addSection(common, {
      setContent: [
        'How many triangles can be made with this set of constraints?',
      ],
    });

    this.addSection(common, {
      setContent: [
        'To help visualize, we can |extend| the unknown side and |rotate| the opposite side while tracing its end.',
      ],
      modifiers: {
        extend: click(this.next, [this], colors.sides),
        rotate: click(this.next, [this], colors.sides),
      },
    });

    this.addSection({
      setContent: [
        'To help visualize, we can |extend| the unknown side and |rotate| the opposite side while tracing its end.',
      ],
      modifiers: {
        extend: click(ssa.createConstructionLines, [ssa, null, 'line'], colors.sides),
        rotate: click(ssa.createConstructionLines, [ssa, null, 'circle'], colors.sides),
      },
      show: [ssa],
      setEnterState: () => {
        ssa.setScenarios('init');
        ssa.updatePosition();
        ssa.updateRotation();
      },
      transitionFromPrev: (done) => {
        ssa._constructionCircle.angleToDraw = 0;
        ssa.createConstructionLines(done, 'both');
      },
      setSteadyState: () => {
        ssa.hasTouchableElements = true;
        ssa._constructionLine.isTouchable = false;
        ssa._constructionLine.isMovable = false;
        ssa._constructionLine._line.isMovable = false;
        ssa._constructionLine._line.isTouchable = false;
        ssa._adjacentMovePad.isTouchable = false;
        ssa._adjacentMovePad.isMovable = false;
        ssa.setDefault();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'The |intersect| points are the possible triangles. In this case there are |two| possible triangles.',
      ]),
      modifiers: {
        intersect: click(ssa.toggleInterceptAngles, [ssa], colors.sides),
        two: click(ssa.toggleInterceptAngles, [ssa], colors.sides),
      },
      show: [ssa],
      setEnterState: () => {
        ssa.setScenarios('init');
        ssa.updatePosition();
        ssa.updateRotation();
      },
      setSteadyState: () => {
        ssa.hasTouchableElements = true;
        ssa._constructionLine.isTouchable = false;
        ssa._constructionLine.isMovable = false;
        ssa._constructionLine._line.isMovable = false;
        ssa._constructionLine._line.isTouchable = false;
        ssa._adjacentMovePad.isTouchable = false;
        ssa._adjacentMovePad.isMovable = false;
        ssa.setDefault();
      },
    });
    this.addSection({
      setContent: style({ top: 0 }, [
        'But what happens if we start with a different length of the adjacent side, or different angle? Are two triangles still formed?',
      ]),
      show: [ssa],
      setEnterState: () => {
        if (this.comingFrom === 'goto') {
          ssa.setScenarios('init');
          ssa.updatePosition();
          ssa.updateRotation();
        }
      },
      setSteadyState: () => {
        ssa.makeFullyInteractive();
      },
    });
    this.addSection({
      setContent: style({ top: 0 }, [
        'You might see different scenarios where |two|, |one| or |zero| triangles can be formed.',
      ]),
      show: [ssa],
      setEnterState: () => {
        if (this.comingFrom === 'goto') {
          ssa.setScenarios('init');
          ssa.updatePosition();
          ssa.updateRotation();
        }
      },
      setSteadyState: () => {
        ssa.makeFullyInteractive();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'When the |adjacent| side is |shorter| than or equal to the |opposite| side, only |one triangle| can ever be formed.',
      ]),
      modifiers: {
        adjacent: click(ssa.pulseAdjacent, [ssa], colors.sides),
        opposite: click(ssa.pulseOpposite, [ssa], colors.sides),
        shorter: click(ssa.adjacentShorter, [ssa, null], colors.diagram.action),
      },
      show: [ssa],
      setEnterState: () => {
        ssa.setScenario('init');
        if (this.comingFrom === 'goto') {
          ssa.setScenarios('init');
          ssa.updatePosition();
          ssa.updateRotation();
        }
      },
      transitionFromAny: (done) => {
        ssa.adjacentShorterDefault(done);
      },
      setSteadyState: () => {
        ssa.makeFullyInteractive();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'When the |adjacent| side is |longer| than  the |opposite| side, then either |two|, |one| or |zero| triangles can be formed.',
      ]),
      modifiers: {
        adjacent: click(ssa.pulseAdjacent, [ssa], colors.sides),
        opposite: click(ssa.pulseOpposite, [ssa], colors.sides),
        two: click(ssa.adjacentTwo, [ssa, null], colors.diagram.action),
        one: click(ssa.adjacentOne, [ssa, null], colors.diagram.action),
        zero: click(ssa.adjacentZero, [ssa, null], colors.diagram.action),
      },
      show: [ssa],
      setEnterState: () => {
        if (this.comingFrom === 'goto') {
          ssa.setScenarios('init');
          ssa.updatePosition();
          ssa.updateRotation();
        }
      },
      transitionFromAny: (done) => {
        ssa.adjacentTwoDefault(done);
      },
      setSteadyState: () => {
        ssa.makeFullyInteractive();
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'To summarize, if we know an |angle|, an |adjacent side|, and an |opposite side| of a triangle, then we can uniquely create just one triangle if the |adjacent side is shorter than or equal to the opposite side|.',
        'If the adjacent side is longer than the opposite side, then up to two triangles might be possible.',
      ]),
    });

    this.addSection({
      setContent: style({}, [
        'This case is often referred to as the |Side Side Angle| case.',
        'If two triangles have the same |angle_a|, |adjacent side (B)|, and |opposite side (A)|, then we can only be sure they are |congruent| if the |opposite side is longer or equal to the adjacent side|, or |A ≥ B|.',
      ]),
      modifiers: {
        angle_a: highlightWord('angle (a)', colors.angles),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle1, congruent._tri2._angle1,
        congruent._tri1._angle0, congruent._tri2._angle0,
        // congruent._tri1._side01, congruent._tri2._side01,
        congruent._tri1._side20, congruent._tri2._side20,
      ],
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */

    this.addSection({
      setContent: style({ centerV: true }, [
        'The next two cases are combinations of |two_angles| and |one_side|.',
        'When you know one side and two angles, the two angles can either be adjacent to the side, or one can be adjacent while the other is opposite.',
      ]),
      modifiers: ({
        two_angles: highlight(colors.angles),
        one_side: highlight(colors.sides),
      }),
    });

    this.addSection({
      title: 'Angle Side Angle',
      setContent: [
        'We will start where |one_side| and its |two_adjacent_angles| are known. Can only one triangle be formed from this configuration?',
      ],
      modifiers: {
        one_side: highlight(colors.sides),
        two_adjacent_angles: highlight(colors.angles),
      },
      setEnterState: () => {
        asa.initialTri();
      },
      show: [asa],
      hide: [
        asa._fig._pad0, asa._fig._pad3,
        asa._fig._side01._label, asa._fig._side23._label],
    });

    this.addSection({
      setContent: [
        'As the two angles are fixed, the only way to make a triangle is to |extend| the remaining sides till they meet.',
      ],
      modifiers: {
        extend: click(this.next, [this], colors.sides),
      },
      setEnterState: () => {
        asa.initialTri();
      },
      show: [asa],
      hide: [
        asa._fig._pad0, asa._fig._pad3,
        asa._fig._side01._label, asa._fig._side23._label],
    });

    this.addSection({
      setContent: [
        'As the two angles are fixed, the only way to make a triangle is to |extend| the remaining sides till they meet.',
      ],
      modifiers: {
        extend: click(asa.goToTri, [asa, null, true], colors.sides),
      },
      transitionFromAny: (done) => {
        // asa.initialTri();
        if (this.comingFrom === 'prev') {
          asa.goToTri(done, true);
        } else {
          asa.goToTri(done, false);
        }
      },
      show: [asa],
      hide: [
        asa._fig._pad0, asa._fig._pad3,
      ],
    });

    this.addSection({
      setContent: [
        'Different lengths of the |left| or |right| side will not result in a triangle. Only |one_length| for each side will form the triangle.',
      ],
      modifiers: {
        one_length: click(asa.goToTri, [asa, null, false], colors.sides),
        left: click(asa.randLength, [asa, '01'], colors.sides),
        right: click(asa.randLength, [asa, '23'], colors.sides),
      },
      show: [asa],
      transitionFromAny: (done) => {
        asa.goToTri(done, false);
      },
    });

    this.addSection({
      setContent: [
        'Note, similar to the Side-Angle-Side case, we started this with a |choice| on how to orient the known |angles| and |side|.',
      ],
      modifiers: {
        angles: highlight(colors.angles),
        sides: highlight(colors.sides),
      },
      setEnterState: () => {
        asa.initialTri();
      },
      show: [asa],
      hide: [
        asa._fig._pad0, asa._fig._pad3,
        asa._fig._side01._label, asa._fig._side23._label,
      ],
    });

    this.addSection({
      setContent: [
        'We can follow the same procedure as the Side-Angle-Side case to show that these choices simply result in the same triangle which is either |rotated| or |flipped|.',
        'Therefore, the triangles resulting from these choices are all |congruent|.',
      ],
      modifiers: {
        angles: highlight(colors.angles),
        sides: highlight(colors.sides),
      },
      setEnterState: () => {
        asa.initialTri();
      },
      show: [asa],
      hide: [
        asa._fig._pad0, asa._fig._pad3,
        asa._fig._side01._label, asa._fig._side23._label,
      ],
    });

    this.addSection({
      setContent: [
        'Therefore if two triangles share the same |two_angles| and |side_between| them, then they will be |congruent|.',
        'This case is often called the |Angle Side Angle| case.',
      ],
      modifiers: {
        two_angles: highlight(colors.angles),
        side_between: highlight(colors.sides),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle0, congruent._tri2._angle0,
        congruent._tri1._side01, congruent._tri2._side01,
        congruent._tri1._side20, congruent._tri2._side20,
      ],
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Angle Angle Side',
      setContent: [
        'The next case is when a |side| and its |adjacent_angle| and |opposite_angle| are known.',
      ],
      modifiers: {
        side: highlight(colors.sides),
        opposite_angle: highlight(colors.angles),
        adjacent_angle: highlight(colors.angles),
      },
      show: [aas._angle1, aas._angle3, aas._side],
    });

    common = {
      setContent: [
        'First, we know angles in a |triangle| always add up to 180º. Therefore we can |calculate| the third angle.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        triangle: this.bindShowQR('Math/Geometry_1/Triangles/base', 'Main', colors.sides),
        calculate: click(this.next, [this], colors.angles),
      },
      show: [aas._angle1, aas._angle3, aas._side],
    });
    this.addSection(common, {
      modifiers: {
        triangle: this.bindShowQR('Math/Geometry_1/Triangles/base', 'Main', colors.sides),
        calculate: click(aas.pulseAngle2, [aas], colors.angles),
      },
      show: [aas],
      transitionFromPrev: (done) => {
        aas.pulseAngle2(done);
      },
    });

    this.addSection({
      setContent: [
        'The third angle has now given us the |Angle Side Angle| case. With this established, we know only one triangle can be formed.',
      ],
      show: [aas],
      setSteadyState: () => {
        aas._angle3.setColor(colors.disabled);
      },
      setLeaveState: () => {
        aas._angle3.setColor(colors.angles);
        aas._angle3._side1.setColor(colors.sides);
        aas._angle3._side2.setColor(colors.sides);
      },
    });

    this.addSection({
      setContent: [
        'Therefore if two triangles share the same |two_angles| and relatively positioned |side_not_between| them, then they will be |congruent|.',
        'This case is often called the |Angle Angle Side| case.',
      ],
      modifiers: {
        two_angles: highlight(colors.angles),
        side_not_between: highlight(colors.sides),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle1, congruent._tri2._angle1,
        congruent._tri1._side01, congruent._tri2._side01,
        congruent._tri1._side20, congruent._tri2._side20,
      ],
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'The |Angle Side Side| and |Angle Angle Side| cases can be combined to be more general as all the combinations of two angles and one side are covered between them.',
        'Therefore, if two triangles share the same |two_angles| and |relatively_positioned_side|, then the |triangles are congruent|.',
      ]),
      modifiers: {
        two_angles: highlight(colors.angles),
        relatively_positioned_side: highlight(colors.sides),
      },
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    this.addSection({
      title: 'Side Side Side',
      setContent: style({ centerV: true, size: 0.9 }, [
        'We have now seen whether we can determine congruency from |most| combinations of |three properties| including:',
        style({ left: 3, list: 'unordered', size: 0.9 }, [
          'All angles - |Angle-Angle-Angle|',
          'Two sides and an angle - |Side-Angle-Side| and |Side-Side-Angle|',
          'Two angles and a side - |Angle-Side-Angle| and |Angle-Angle-Side|',
        ]),
        'The remaining combination is |all sides| (|Side-Side-Side|).',
        'In fact, knowing three sides of two triangles |is| enough to determine they are congruent, but to show this we first need to look at |Isosceles Triangles|.',
      ]),
    });

    this.addSection({
      setContent: [
        'If two triangles share the same |side_lengths|, then they will be |congruent|.',
        'This case is often called the |Side Side Side| case.',
      ],
      modifiers: {
        side_lengths: highlight(colors.sides),
      },
      setEnterState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle1, congruent._tri2._angle1,
        congruent._tri1._angle2, congruent._tri2._angle2,
        congruent._tri1._angle0, congruent._tri2._angle0,
      ],
    });
  }
}

export default Content;
