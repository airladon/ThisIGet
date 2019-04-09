// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
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
      'adjacent_angles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const opp = diag._opposite;

    this.addSection({
      title: 'Related Angles',
      setContent: style({ centerV: true }, [
        '|Related angles| are angles that have the same value, but are in different locations.',
        'This lesson will look at related angles in two scenarios:',
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
        'When two lines intersect, |four_angles| are formed. These angles are |related|.',
      ],
      modifiers: {
        four_angles: click(opp.toggleAngles, [opp], colors.angle1),
      },
      setEnterState: () => {
        opp.setScenarios('center');
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp.setScenarios('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.newPageRotation(done);
      },
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      setContent: [
        'First consider angles |a| and |b|. These are |supplementary| angles, and therefore they add up to 180º.',
      ],
      modifiers: {
        supplementary: click(this.showQR, [this, 'adjacent_angles', 'Supplementary'], colors.diagram.action),
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp.setScenarios('center');
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
        opp.setScenarios('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle2, '180º - a');
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
        supplementary: click(this.showQR, [this, 'adjacent_angles', 'Supplementary'], colors.diagram.action),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp.setScenarios('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.disabled, '180º - a');
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
        opp.setScenarios('center');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.disabled, '180º - a');
        opp.setAngle(4, colors.angle4, '180º - a');
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
        opp.setScenarios('center');
        opp.setAngle(1, colors.disabled, 'a');
        opp.setAngle(2, colors.angle2, '180º - a');
        opp.setAngle(4, colors.angle4, '180º - a');
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
        opp.setScenarios('center');
        opp.setAngle(1, colors.disabled, 'a');
        opp.setAngle(2, colors.disabled, '180º - a');
        opp.setAngle(3, colors.angle3, 'c = a');
        opp.setAngle(4, colors.disabled, '180º - a');
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
        opp.setScenarios('center');
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
        'This means, if we know one angle all others can be calculated!',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
        d: highlight(colors.angle4),
      },
      show: [opp._fig._line1, opp._fig._line2],
      transitionFromAny: (done) => {
        opp.setScenarios('center');
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
  }
}

export default Content;
