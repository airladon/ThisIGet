// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../common/tools/definition';
import { hint, note } from '../../../../../common/tools/note';

const {
  click,
  style,
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
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/ParallelLines/base',
      'Math/Geometry_1/AnglesAtIntersections/base',
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
        three.updateIntersectingLineAngle();
      },
    });

    let common = {
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
        'If you |move| around the lines, you might see some angle pairs always seem to be |equal|.',
      ]),
      modifiers: {
        line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        parallel_lines: click(three.pulseParallel, [three], colors.lines),
        move: click(three.goToRandom, [three], colors.lines),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'We want to |prove| this is always the case. To do so, it is first useful to know the specific |angle pairs| that are |commonly| considered together.',
      ]),
    });

    common = {
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      // setEnterState: () => {
      //   three.setScenarios('center');
      // },
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
    };
    this.addSection(common, {
      title: 'Corresponding Angles',
      setContent: style({}, [
        '|Corresponding_angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting_line|.',
      ]),
      modifiers: {
        Corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Can you |prove| that |corresponding_angles| are |equal| when the lines being intersected are |parallel_|?',
        hint({ top: 93 }, '|Parallel| lines have the same angle'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        parallel_: click(three.pulseParallel, [three], colors.lines),
        Parallel: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=12'),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Conversely, can you |prove| that the |intersected_lines| are |parallel| if the |corresponding_angles| are |equal|?',
        hint({ top: 93 }, '|Parallel_| lines have the same angle'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        intersected_lines: click(three.pulseParallel, [three], colors.lines),
        Parallel_: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=12'),
      },
    });


    common = {
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      // setEnterState: () => {
      //   three.setScenarios('center');
      // },
      transitionFromAny: (done) => {
        three.setScenarios('center');
        three.showAngles([three._fig._angleA1, three._fig._angleC2]);
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle2, 'c');
        three.setAngle('B1', colors.angle4, 'b');
        three.setAngle('B2', colors.angle3, 'd');
        three.setAngle('C1', colors.angle2, 'c');
        three.setAngle('C2', colors.angle1, 'a');
        three.setAngle('D1', colors.angle3, 'd');
        three.setAngle('D2', colors.angle4, 'b');
        three.newPageRotation(0, 1, done);
      },
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleC2.showAll();
        three.updateIntersectingLineAngle();
      },
    };
    this.addSection(common, {
      title: 'Alternate Angles',
      setContent: style({}, [
        '|Alternate_angles| are the pair of |outside| angles, or pair of |inside| angles that are on |opposite| sides of the |intersecting_line|.',
      ]),
      modifiers: {
        Alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        // two_lines: click(three.pulseParallel, [three], colors.lines),
        inside: click(three.toggleInsideAlternate, [three], colors.lines),
        outside: click(three.toggleOutsideAlternate, [three], colors.lines),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Can you |prove| that |alternate_angles| are |equal| when the  intersected lines are |parallel|?',
        hint({ top: 93 }, 'Use |corresponding| angles and |opposite| angles'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
        opposite: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Opposite'),
        corresponding: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=19'),

      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Conversely, can you |prove| that the |intersected_lines| are |parallel| if the |alternate_angles| are equal?',
        hint({ top: 93 }, 'Use |opposite| angles to show |corresponding| angles are equal'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        intersected_lines: click(three.pulseParallel, [three], colors.lines),
        opposite: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Opposite'),
        corresponding: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=19'),

      },
    });

    common = {
      show: [three._fig._line1, three._fig._line2, three._fig._line3],
      transitionFromAny: (done) => {
        three.setScenarios('center');
        three.showAngles([three._fig._angleC1, three._fig._angleB2]);
        three.setAngle('A2', colors.angle2, 'd');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'a');
        three.setAngle('D1', colors.angle2, 'c');
        three.newPageRotation(0, 1, done);
      },
      setSteadyState: () => {
        three._fig._angleC1.showAll();
        three._fig._angleB2.showAll();
        three.updateIntersectingLineAngle();
      },
    };
    this.addSection(common, {
      title: 'Interior Angles',
      setContent: style({}, [
        '|Interior_angles| are the inside angles on the same side of the |intersecting| line.',
      ]),
      modifiers: {
        Interior_angles: click(three.toggleInterior, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        // two_lines: click(three.pulseParallel, [three], colors.lines),
      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Can you |prove| that |interior_angles| always |sum to 180º| when the intersected lines are |parallel|?',
        hint({ top: 93 }, 'Start with |corresponding| angles and then find the |supplementary| angle'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        interior_angles: click(three.toggleInterior, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres'),
        corresponding: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=26'),

      },
    });

    this.addSection(common, {
      setContent: style({}, [
        'Conversely, can you |prove| that the |intersected_lines| are |parallel| if the |interior_angles| |add to 180º|?',
        hint({ top: 93 }, 'Use |supplementary| angles to show |corresponding| angles are equal'),
        note({ color: colors.diagram.text.note, top: 93, right: 0 }, 'Answer in |Explanation|'),
      ]),
      modifiers: {
        interior_angles: click(three.toggleInterior, [three], colors.angle1),
        intersected_lines: click(three.pulseParallel, [three], colors.lines),
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres'),
        corresponding: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Corresponding'),
        Explanation: this.link('/Math/Geometry_1/AnglesAtIntersections/explanation/base?page=26'),

      },
    });

    this.addSection({
      title: 'Conculsion',
      setContent: style({ centerV: true }, [
        'When two lines intersect, or one line intersects a pair of parallel lines, the knowledge of |opposite|, |corresponding|, |alternate| and |interior| angles can be used to find all angles in the system.',
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
