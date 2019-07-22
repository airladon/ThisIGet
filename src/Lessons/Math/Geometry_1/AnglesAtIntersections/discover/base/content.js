// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import { hint, note } from '../../../../../LessonsCommon/tools/note';

const {
  click,
  style,
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
      title: 'Opposite Angles',
      setContent: [
        'When two lines intersect, four angles are created.',
      ],
      modifiers: {
        Opposite_angles: click(opp.toggleOpposite, [opp], colors.angle1),
      },
      setEnterState: () => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.setAngle(3, colors.angle3, 'c');
        opp.setAngle(4, colors.angle4, 'd');
      },
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      transitionFromAny: (done) => {
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
      setContent: [
        'If you were to |draw| different scenarios, and measure all four angles, you might start to see a |pattern|. Can you see it?',
        hint({ label: 'Answer' }, 'The opposite angles always appear to be equal'),
      ],
      modifiers: {
        Opposite_angles: click(opp.toggleOpposite, [opp], colors.angle1),
        draw: click(opp.goToRandom, [opp], colors.lines),
      },
      setEnterState: () => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, null);
        opp.setAngle(2, colors.angle2, null);
        opp.setAngle(3, colors.angle3, null);
        opp.setAngle(4, colors.angle4, null);
      },
      transitionFromAny: (done) => {
        opp.newPageRotation(done);
      },
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle2.showAll();
        opp._fig._angle3.showAll();
        opp._fig._angle4.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: [
        'If we make the angles more general by labelling them, can you |prove opposite angles are always equal|?',
        hint('Use |supplementary| angles'),
        note({ top: 90, right: 0, color: colors.diagram.text.note }, 'Answer in |Explanation|'),
      ],
      modifiers: {
        Opposite_angles: click(opp.toggleOpposite, [opp], colors.angle1),
        draw: click(opp.goToRandom, [opp], colors.lines),
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres'),
        Explanation: this.link('Math/Geometry_1/AnglesAtIntersections/explanation/base?page=2'),
      },
      setEnterState: () => {
        opp._fig.setScenario('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, 'b');
        opp.setAngle(3, colors.angle3, 'c');
        opp.setAngle(4, colors.angle4, 'd');
      },
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      transitionFromAny: (done) => {
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
      title: 'Parallel Intersection',
      setContent: style({}, [
        'The next scenario is a |line| intersecting two |parallel_lines|. In this case, |eight_angles| are formed.',
      ]),
      modifiers: {
        // eight_angles: click(three.toggleAngles, [three], colors.angle1),
        line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        parallel_lines: click(three.pulseParallel, [three], colors.lines),
        eight_angles: click(three.toggleAnglesOnOff, [three], colors.angle1),
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
        // three._fig._angleA1.showAll();
        // three._fig._angleB1.showAll();
        // three._fig._angleC1.showAll();
        // three._fig._angleD1.showAll();
        // three._fig._angleA2.showAll();
        // three._fig._angleB2.showAll();
        // three._fig._angleC2.showAll();
        // three._fig._angleD2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    const common = {
      setEnterState: () => {
        three.setScenarios('center');
        three.setAngle('A1', colors.angle1, null);
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
        three._fig._angleB1.showAll();
        three._fig._angleC1.showAll();
        three._fig._angleD1.showAll();
        three._fig._angleA2.showAll();
        three._fig._angleB2.showAll();
        three._fig._angleC2.showAll();
        three._fig._angleD2.showAll();
        three.updateIntersectingLineAngle();
      },
    };
    this.addSection(common, {
      setContent: style({}, [
        'If you |move| around the lines, you might see some |patterns|, where some angles seem to always |equal| to other angles.',
      ]),
      modifiers: {
        line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        parallel_lines: click(three.pulseParallel, [three], colors.lines),
        move: click(three.goToRandom, [three], colors.lines),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'We want to |prove| these relationships, but to do so, it is first useful to know different |angle pairs| are commonly called.',
      ]),
    });

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
        three.setScenarios('center');
        three.showAngles([three._fig._angleA1, three._fig._angleA2]);
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B1', colors.angle2, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle3, 'c');
        three.setAngle('C2', colors.angle3, 'g');
        three.setAngle('D1', colors.angle4, 'd');
        three.setAngle('D2', colors.angle4, 'h');
        three.newPageRotation(0, 1, done);
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Corresponding Angles',
      setContent: style({}, [
        'Can you |prove| the relationship between two |corresponding_angles|?',
        hint({ top: 93 }, 'Remember the |two_lines| being intersected are |parallel|'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=12'),
      },
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      transitionFromAny: (done) => {
        three.setScenarios('center');
        three.showAngles([three._fig._angleA1, three._fig._angleA2]);
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'e');
        three.setAngle('B1', colors.angle2, 'b');
        three.setAngle('B2', colors.angle2, 'f');
        three.setAngle('C1', colors.angle3, 'c');
        three.setAngle('C2', colors.angle3, 'g');
        three.setAngle('D1', colors.angle4, 'd');
        three.setAngle('D2', colors.angle4, 'h');
        three.newPageRotation(0, 1, done);
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Corresponding Angles',
      setContent: style({
        left: 5, right: 55, centerV: true, size: 0.9,
      }, [
        '|Corresponding_angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting_line|.',
        'When the two lines are |parallel|, corresponding angles are always |equal|.',
        'Similarly, if corresponding angles are |equal|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
      },
      setEnterState: () => {
        three.setScenarios('summary');
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle1, 'd');
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Alternate Angles',
      setContent: style({
        left: 5, right: 55, size: 0.9, centerV: true,
      }, [
        '|Alternate_angles| are the pair of inside angles, or pair of outside angles that are on |opposite| sides of the |intersecting_line| that crosses |two_lines|.',
        'When the two lines are |parallel|, the alternate angles are always |equal|.',
        'Similarly, if alternate angles are |equal|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three.setScenarios('summary');
        three.setAngle('A1', colors.angle1, 'c');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'd');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'a');
        three.setAngle('C2', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'b');
        three.setAngle('D2', colors.angle1, 'd');
        three._fig._angleC1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Interior Angles',
      setContent: style({
        left: 5, right: 55, size: 0.9, centerV: true,
      }, [
        '|Interior_angles| are the inside angles on the same side of the |intersecting| line that crosses |two_lines|.',
        'When the two lines are |parallel|, the interior angles always add to |180º|.',
        'Similarly, if interior angles are |add to 180º|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Interior_angles: click(three.toggleInterior, [three], colors.angle1),
        intersecting: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three.setScenarios('summary');
        three.setAngle('A2', colors.angle1, '180º – a');
        three.setAngle('B2', colors.angle1, '180º – b');
        three.setAngle('C1', colors.angle1, 'b');
        three.setAngle('D1', colors.angle1, 'a');
        three._fig._angleA2.showAll();
        three._fig._angleD1.showAll();
        three.updateIntersectingLineAngle();
      },
    });
  }
}

export default Content;
