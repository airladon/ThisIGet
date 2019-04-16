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
  style,
  highlight,
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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;
    const aaa = diag._aaa;
    const sas = diag._sas;
    const asa = diag._asa;
    const sss = diag._sss;

    this.addSection({
      title: 'Congruency',
      setContent: style({ centerV: true }, [
        'In mathematics, if |two shapes are the same size and shape|, then they are said to be |congruent|.',
        'The word |congruent| comes from |Latin|, where it means |"agreeing, meeting together"|.',
        `${new Definition('Congruent', 'Latin', ['congruent', 'agreeing, meeting together']).html()}
      `,
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
        'Showing two triangles are congruent can sometimes be beneficial in calculating a geometric problem.',
        'When |two triangles are known to be congruent|, unknown angles and lengths of one triangle, can be |inferred| from the other triangle.',
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
        'First consider when only the three angles are known. Do triangles of different sizes exist that have the same angles?',
      ],
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
        'So triangles with the |same angles|, can have |different side lengths|.',
        'Only knowing two triangles have the same angles, is |not enough| to know they are congruent.',
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
      title: 'Side Angle Side Congruency',
      setContent: [
        'Next, consider the case where you know two side lengths, and the angle |between| them. Can more than one triangle be made?',
      ],
      modifiers: {
        between: highlight(colors.angles)
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
        'Next, we can connect the |second| known line. It can |only| connect to the angle, as we are considering the case where the angle is |between| the two known lines.',
      ],
      modifiers: {
        between: highlight(colors.angles),
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
      setContent: [
        'For each of these scenarios, how many triangles can be made?',
      ],
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
      },
    });

    this.addSection({
      setContent: [
        'You can move the |pad| to see how many different third lines can be drawn to make a triangle.',
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
        sas.goToTri(done);
      },
      setSteadyState: () => {
        sas.setMovableLeg();
      },
    });

    this.addSection({
      setContent: [
        'We can |flip| this triangle in different ways, and all the reflections will be |congruent|.',
      ],
      show: [sas._config1],
      setSteadyState: () => {
        sas._config1.setScenario('center');
      },
    });

    common = {
      setContent: [
        'Therefore, we can |flip| them to resemble the |original| four options we had to connect the angle to the first side.',
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
          .scenario({ target: 'showAll', duration: 1 })
          .trigger({
            callback: sas.createCongruentTriangles.bind(sas, false),
            duration: 4,
          })
          .trigger({ callback: sas.configColors.bind(sas, colors.disabled, colors.disabled) })
          // .trigger({ callback: () => {
          //   sas.configColors(colors.disabled, colors.disabled);
          //   console.log('triggered');
          // }, duration: 1, delay: 3 })
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

    // this.addSection({
    //   setContent: [
    //     'We have flipped these '
    //   ]
    // }

    this.addSection({
      setContent: [
        'Now, triangles are congruent if they have the same side lengths and angles. They can be moved, rotated and flipped and still be contruent. |test|, |asdf| |qwer|',
      ],
      modifiers: {
        test: click(sas.createCongruentTriangles, [sas, null], colors.sides),
        asdf: click(sas.configColors, [sas, colors.disabled, colors.disabled], colors.disabled),
        qwer: click(sas.configColors, [sas, colors.sides, colors.angles], colors.disabled),
      },
      show: [sas._config1],
      transitionFromPrev: (done) => {
        sas._config1.animations.cancelAll();
        sas._config1.animations.new()
          .scenario({ target: 'showAll', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sas._config1.setScenario('showAll');
      },
    });

    this.addSection({
      setContent: [
        'Therefore if two triangles share |two sides of the same length|, and the |angle_between| those two sides is also the same on both triangles, then they |are congruent|.',
        'This case is often called the |Side Angle Side| case.',
      ],
      modifiers: {
        angle_between: highlight(colors.angles),
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle0, congruent._tri1._angle1,
        congruent._tri2._angle0, congruent._tri2._angle1,
        congruent._tri1._side01, congruent._tri2._side01,
      ],
      setSteadyState: () => {
        congruent._tri1.setScenario('lowLeft');
        congruent._tri2.setScenario('rightLeft');
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
      title: 'Side Side Side Congruency',
      setContent: [
        'Next consider the case where only the |three side lengths| are known. How many triangles can be created with just this knowledge?',
      ],
      show: [sss],
      setSteadyState: () => {
        sss.setScenarios('disconnected');
      },
    });

    common = {
      setContent: [
        'We know a |triangle| is formed by |connecting three lines| together, so we can start by connecting one line\'s ends to the other two lines',
      ],
      show: [sss._fig._left, sss._fig._base, sss._fig._right],
    };
    this.addSection(common, {
      setSteadyState: () => {
        sss.setScenarios('disconnected');
        sss.hasTouchableElements = false;
      },
    });

    this.addSection(common, {
      transitionFromPrev: (done) => {
        sss.animations.cancelAll();
        sss.animations.new()
          .scenarios({ target: 'connected', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        sss.hasTouchableElements = false;
        sss.setScenarios('connected');
      },
    });

    this.addSection(common, {
      setContent: [
        'Now, how can the end lines be |rotated| to form a |triangle|? Can only |one triangle| be formed? You can experiment by rotating the end lines.',
      ],
      show: [sss._fig._left, sss._fig._base, sss._fig._right],
      setSteadyState: () => {
        sss.hasTouchableElements = true;
        sss.setScenarios('connected');
        console.log(sss)
      },
    });

    // this.addSection({
    //   setContent: ['|length1| |length2| |goto|'],
    //   modifiers: {
    //     length1: click(asa.randLength, [asa, '01'], colors.diagram.action),
    //     length2: click(asa.randLength, [asa, '23'], colors.diagram.action),
    //     goto: click(asa.goToTri, [asa], colors.diagram.action),
    //   },
    //   show: [asa],
    //   setSteadyState: () => {
    //     asa._fig._angle2.showAll();
    //   },
    // });


  }
}

export default Content;
