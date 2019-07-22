// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  highlight,
  clickW,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/ParallelLines/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const opp = diag._opposite;
    const three = diag._threeLines;

    this.addSection({
      title: 'Angles at Intersections',
      setContent: style({ centerV: true }, [
        '|Related angles| are angles that can be used to calculate each other.',
        'This lesson will look at related angles in two common scenarios:',
        style({
          list: 'unordered',
          listStyleType: 'disc',
          left: 3,
          top: -3,
          size: 0.95,
        }, [
          'when two lines intersect',
          'when a line intersects two parallel lines',
        ]),
      ]),
    });

    this.addSection({
      title: 'Opposite Angles',
      setContent: [
        'When two lines intersect, |four_angles| are formed. These angles are |related|, and if you know one then you can |calulate| all others.',
      ],
      modifiers: {
        four_angles: click(opp.toggleAngles, [opp], colors.angle1),
      },
      setEnterState: () => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.setAngle(3, colors.angle3, 'c');
        opp.setAngle(4, colors.angle4, 'd');
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: [
        'First consider angles |a| and |b|. These form around a |straight_line|, and therefore are |supplementary| angles, adding up to 180º.',
      ],
      modifiers: {
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres', colors.diagram.action),
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        straight_line: click(opp.pulseLine1, [opp], colors.lines),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'Therefore we can calculate |b| from |a|:',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b = 180º - a');
        opp._eqn.showForm('b');
        opp._eqn.setScenario('top');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({}, [
        'Next we can consider |a| and |d|, which are also |supplementary| angles and add up to 180º.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        d: highlight(colors.angle4),
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres', colors.diagram.action),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.disabled, 'b = 180º - a');
        opp.setAngle(4, colors.angle4, 'd');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'Therefore, we can calculate |d| from |a|',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.disabled, 'b = 180º - a');
        opp.setAngle(4, colors.angle4, 'd = 180º - a');
        opp._eqn.showForm('d');
        opp._eqn.setScenario('top');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({}, [
        'So we can see that the opposite angles |b| and |d| are equal.',
      ]),
      modifiers: {
        b: highlight(colors.angle2),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.disabled, 'a');
        opp.setAngle(2, colors.angle2, 'b = 180º - a');
        opp.setAngle(4, colors.angle4, 'd = 180º - a');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({}, [
        'Doing the same exercise with angles |b| and |c|, or |d| and |c| shows that opposite angles |a| and |c| are also equal.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.disabled, 'a');
        opp.setAngle(2, colors.disabled, 'b = 180º - a');
        opp.setAngle(3, colors.angle3, 'c = a');
        opp.setAngle(4, colors.disabled, 'd = 180º - a');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle3.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({}, [
        'More |generally|, we can see that at the intersection of two lines, the |opposite angles are always equal|, and |adjacent angles are always supplementary|.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.setAngle(3, colors.angle1, 'a');
        opp.setAngle(4, colors.angle2, 'b');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle3.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: style({}, [
        'This means, if we know |one| angle all others can be |calculated|.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.setAngle(3, colors.angle1, 'a');
        opp.setAngle(4, colors.angle2, 'b');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle3.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Parallel Intersection',
      setContent: style({}, [
        'The next scenario is a |line| intersecting two |parallel_lines|. In this case, |eight_angles| are formed.',
      ]),
      modifiers: {
        eight_angles: click(three.toggleAngles, [three], colors.angle1),
        line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        parallel_lines: click(three.pulseParallel, [three], colors.lines),
      },
      setEnterState: () => {
        three.setScenarios('center');
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'f');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'g');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle1, 'h');
      },
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      transitionFromAny: (done) => {
        three.newPageRotation(0, 1, done);
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Corresponding Angles',
      setContent: style({}, [
        '|Corresponding_angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting_line|.',
      ]),
      modifiers: {
        Corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      transitionFromAny: (done) => {
        three._fig.setScenario('center');
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B1', colors.angle2, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle3, 'c');
        three.setAngle('C2', colors.angle3, 'g');
        three.setAngle('D1', colors.angle4, 'd');
        three.setAngle('D2', colors.angle4, 'h');
        if (this.comingFrom === 'prev') {
          three.newPageRotation(0, 1, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: style({}, [
        'How are |corresponding_Angles| related? We can examine this by looking at just one intersection.',
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      transitionFromAny: (done) => {
        three._fig.setScenario('center');
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B1', colors.angle2, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle3, 'c');
        three.setAngle('C2', colors.angle3, 'g');
        three.setAngle('D1', colors.angle4, 'd');
        three.setAngle('D2', colors.angle4, 'h');
        done();
        // if (this.comingFrom === 'goto') {
        //   three.newPageRotation(0, 1, done);
        // }
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    const enterTranslateLine = () => {
      three._fig._line1.move.type = 'translation';
      three._fig._line1.move.element = null;
      three._fig._line1.setTransformCallback = three._fig._line3.setTransformCallback;
      three._fig._line1.move.limitLine = layout.moveLine;
      three._fig._line3.isTouchable = false;
      three._fig._line3.isInteractive = false;
      three._fig._line2.isTouchable = false;
      three._fig._line2.isInteractive = false;
      three._fig._line2.setColor(colors.disabled);
    };
    const leaveTranslationLine = () => {
      three._fig._line1.move.type = 'rotation';
      three._fig._line1.move.element = three._fig;
      three._fig._line1.setTransformCallback = null;
      three._fig._line1.move.limitLine = null;
      three._fig._line3.isTouchable = true;
      three._fig._line3.isInteractive = null;
      three._fig._line2.isTouchable = true;
      three._fig._line2.isInteractive = null;
      three._fig._line2.setColor(colors.lines);
    };

    this.addSection({
      setContent: style({}, [
        'At one intersection there are four |angles| formed. When one line is |moved| without rotation, those angles stay the same.',
      ]),
      modifiers: {
        angles: click(three.toggle4Angles, [three], colors.angle1),
        moved: click(three.randomTranslateLine, [three, null], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3],
      transitionFromAny: (done) => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        enterTranslateLine();
        if (this.comingFrom === 'goto') {
          three.setScenarios('translate');
          done();
        } else if (this.comingFrom === 'prev') {
          three._fig.stop(true, 'noComplete');
          three._fig.animations.new()
            .inParallel([
              three._fig.anim.rotation({ target: 0, velocity: 2 }),
              three._fig._line3.anim.rotation({ target: 1, velocity: 2 }),
              three._fig._line1.anim.scenario({ target: 'translate', duration: 0.5 }),
            ])
            .whenFinished(done)
            .start();
        } else {
          done();
        }
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three.updateIntersectingLineAngle();
      },
      setLeaveState: () => {
        leaveTranslationLine();
      },
    });
    this.addSection({
      setContent: style({}, [
        '|Moving| a line without rotation means it is |parallel| to its |original| location.',
      ]),
      modifiers: {
        original: click(three.pulseShaddow, [three], colors.disabled),
        parallel: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        Moving: click(three.randomTranslateLine, [three, null], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.disabled, 'a');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        enterTranslateLine();
        if (this.comingFrom === 'goto' || this.comingFrom === 'next') {
          three.setScenarios('translate');
          done();
        } else if (this.comingFrom === 'prev') {
          three.shaddowLine1();
          three.randomTranslateLine(done);
        }
      },
      setSteadyState: () => {
        three.updateIntersectingLineAngle();
      },
      setLeaveState: () => {
        leaveTranslationLine();
      },
    });

    this.addSection({
      setContent: style({}, [
        'Therefore comparing the |original| and |moved| line, shows |corresponding_angles| are |equal|.',
      ]),
      modifiers: {
        original: click(three.pulseShaddow, [three], colors.disabled),
        moved: click(three.randomTranslateLine, [three, null], colors.lines),
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('translate');
          done();
        } else if (this.comingFrom === 'next') {
          three.newPageRotation(0, 1, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        enterTranslateLine();
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.disabled, 'a');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.disabled, 'b');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.disabled, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.disabled, 'd');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
      setLeaveState: () => {
        leaveTranslationLine();
      },
    });

    this.addSection({
      setContent: style({}, [
        'In general, |corresponding_angles| are always |equal| when the two lines being intersected are |parallel|.',
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else if (this.comingFrom === 'prev') {
          three.newPageRotation(0, 1, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle1, 'd');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'Similarly, if the |corresponding_angles| of |two_lines| being intersected by a |third_line| are |equal|, then the two lines have the |same rotation|, and are therefore |parallel|.',
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        third_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        // } else if (this.comingFrom === 'prev') {
        //   three.newPageRotation(0, 1, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle2, 'b');
        three.setAngle('B2', colors.angle2, 'b');
        three.setAngle('C1', colors.angle3, 'c');
        three.setAngle('C2', colors.angle3, 'c');
        three.setAngle('D1', colors.angle4, 'd');
        three.setAngle('D2', colors.angle4, 'd');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Alternate Angles',
      setContent: [
        '|Alternate_angles| are the pair of inside angles, or pair of outside angles that are on |opposite| sides of the |intersecting| and |parallel_lines|.',
      ],
      modifiers: {
        Alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        intersecting: click(three.pulseIntersecting, [three], colors.intersectingLine),
        parallel_lines: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else {
          three.newPageRotation(0, 1, done);
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle2, 'e');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle2, 'g');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle2, 'h');
        three._fig._angleA1.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: [
        'How can the relationship between |alternate_angles| be determined?',
      ],
      modifiers: {
        alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else {
          // three.newPageRotation(0, 1, done);
          done();
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle2, 'e');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle2, 'g');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle2, 'h');
        three._fig._angleA1.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: [
        'First, we know |corresponding_angles| are equal.',
      ],
      modifiers: {
        corresponding_angles: click(three.pulseAngles, [three, null], colors.angle2),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        const afterPulse = () => {
          three.setAngle('A1', colors.angle2, 'a');
          three.setAngle('A2', colors.angle2, 'a');
          three._fig._angleA1.showAll();
          three._fig._angleA2.showAll();
          three.updateIntersectingLineAngle();
          three.pulseAngles(done);
        };
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          afterPulse();
        } else {
          three.newPageRotation(0, 1, afterPulse);
        }
      },
    });
    this.addSection({
      setContent: [
        'We also know that |opposite_angles| are equal.',
      ],
      modifiers: {
        opposite_angles: click(three.adjacentPulseOpposite, [three, null], colors.angle3),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        three.setAngle('A1', colors.disabled, 'a');
        three.setAngle('A2', colors.angle3, 'a');
        three.setAngle('C2', colors.angle3, 'a');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three._fig._angleC2.showAll();
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
        }
        three.updateIntersectingLineAngle();
        three.adjacentPulseOpposite(done);
      },
    });

    this.addSection({
      setContent: [
        'Therefore |alternate_angles| are equal.',
      ],
      modifiers: {
        alternate_angles: click(three.adjacentPulseAlternate, [three], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
        }
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.disabled, 'a');
        three.setAngle('C2', colors.angle1, 'a');
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
        three.adjacentPulseAlternate(done);
      },
    });

    this.addSection({
      setContent: style({}, [
        'In general, |alternate_angles| are always |equal| when the two lines being intersected are |parallel|.',
      ]),
      modifiers: {
        alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else {
          // three.newPageRotation(0, 1, done);
          done();
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'c');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'd');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'a');
        three.setAngle('D1', colors.angle1, 'b');
        three.setAngle('D2', colors.angle1, 'd');
        three._fig._angleA1.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'Similarly, if |alternate_angles| are |equal|, then you can use the reverse procedure to show the |corresponding angles are equal|, and therefore the two lines are |parallel|.',
      ]),
      modifiers: {
        alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else {
          // three.newPageRotation(0, 1, done);
          done();
        }
      },
      setSteadyState: () => {
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'c');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'd');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'a');
        three.setAngle('D1', colors.angle1, 'b');
        three.setAngle('D2', colors.angle1, 'd');
        three._fig._angleA1.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Interior Angles',
      setContent: [
        '|Interior_angles| are the inside angles on the same side of the |intersecting_line| that crosses |two_lines|.',
      ],
      modifiers: {
        Interior_angles: click(three.toggleInterior, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          done();
        } else {
          three.newPageRotation(0, 1, done);
        }
      },
      setSteadyState: () => {
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle2, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three._fig._angleD1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: [
        'How can relationship between |interior_angles| be determined?',
      ],
      modifiers: {
        interior_angles: click(three.toggleInterior, [three], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
        }
        done();
      },
      setSteadyState: () => {
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle2, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three._fig._angleD1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: [
        'First, we know |corresponding_angles| are equal.',
      ],
      modifiers: {
        corresponding_angles: click(three.pulseAngles, [three, null], colors.angle2),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        const afterPulse = () => {
          three.setAngle('D1', colors.angle2, 'd');
          three.setAngle('D2', colors.angle2, 'd');
          three._fig._angleD1.showAll();
          three._fig._angleD2.showAll();
          three.updateIntersectingLineAngle();
          three.pulseAngles(done);
        };
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
          afterPulse();
        } else {
          three.newPageRotation(0, 1, afterPulse);
        }
      },
    });

    this.addSection({
      setContent: [
        'We also know that |supplementary| angles add up to |_180|.',
      ],
      modifiers: {
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres', colors.angle3),
        _180: clickW('180º', three.interiorPulseSupplementary, [three, null], colors.angle3),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
        }
        three.setAngle('D1', colors.disabled, 'd');
        three.setAngle('D2', colors.angle3, 'd');
        three.setAngle('A2', colors.angle3, '180º – d');
        three._fig._angleD1.showAll();
        three._fig._angleD2.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
        three.interiorPulseSupplementary(done);
      },
    });

    this.addSection({
      setContent: [
        'Adding the |interior| angles shows their total is |180º|.',
      ],
      modifiers: {
        interior: click(three.interiorPulseinterior, [three, null], colors.angle1),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          three.setScenarios('center');
        }
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.disabled, 'd');
        three.setAngle('A2', colors.angle1, '180º – d');
        three._fig._angleD1.showAll();
        three._fig._angleD2.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
        three.interiorPulseinterior(done);
      },
    });

    this.addSection({
      setContent: style({}, [
        'In general, for any |line| intersecting any |parallel| lines, the |interior_angles| always add up to |180º|.',
      ]),
      modifiers: {
        interior_angles: click(three.toggleInterior, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
        line: click(three.pulseIntersecting, [three], colors.intersectingLine),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto' || this.comingFrom === 'next') {
          three.setScenarios('center');
          done();
        } else {
          three.newPageRotation(0, 1, done);
        }
      },
      setSteadyState: () => {
        three.setAngle('A2', colors.angle1, '180º – d');
        three.setAngle('B2', colors.angle1, '180º – c');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three._fig._angleA2.showAll();
        three._fig._angleD1.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      setContent: style({ top: 0 }, [
        'Similarly, if the |interior_angles| add to 180º, then you can use the reverse procedure to show the |corresponding angles are equal|, and  therefore the two lines being intersected are |parallel|.',
      ]),
      modifiers: {
        interior_angles: click(three.toggleInterior, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto' || this.comingFrom === 'next') {
          three.setScenarios('center');
          done();
        } else {
          three.newPageRotation(0, 1, done);
        }
      },
      setSteadyState: () => {
        three.setAngle('A2', colors.angle1, '180º – d');
        three.setAngle('B2', colors.angle1, '180º – c');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three._fig._angleA2.showAll();
        three._fig._angleD1.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection({
      title: 'Conculsion',
      setContent: style({ centerV: true }, [
        'When two lines intersect, or one line intersects a pair of parallel lines, the knowledge of |opposite|, |corresponding| and |alternate| and |interior| angles can be used to find all angles in the system.',
        'However, you don\'t necessarily need to remember these relationships to use them.',
        'If you forget, you can always figure them out using just |supplementary_angles| and the fact that |parallel_lines| are the same angle!',
      ]),
      modifiers: {
        supplementary_angles: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres', colors.diagram.action),
        parallel_lines: this.qr('Math/Geometry_1/ParallelLines/base/Main', colors.diagram.action),
      },
    });
  }
}

export default Content;
