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
  style,
  // highlight,
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
      'important_angles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    const common = {
      setContent: '',
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection(common, {
      title: 'Adjacent Angles',
      setContent: [
        '|Adjacent_angles| are any angles that share an adjacent vertex and edge.',
      ],
      modifiers: {
        // Adjacent_angles: click(coll.pulseAdjacentAngles, [coll], colors.diagram.action),
        Adjacent_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        // edge: click(coll.pulseLine2, [coll], colors.lines),
      },
      show: [fig._line1, fig._line2, fig._line3, fig._angleA, fig._angleB],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI / 3 * 2, 0, 2, done);
      },
      setSteadyState: () => {
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 3 * 2, 0, 0);
      },
    });
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'The sum of |adjacent_angles| is the |larger_angle|. If you know any two angles, the third can be |calculated|.',
      ]),
      modifiers: {
        adjacent_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        larger_angle: click(coll.pulseAngleC, [coll], colors.angleC),
        calculated: click(coll.stepEqn, [coll], colors.diagram.action),
      },
      show: [fig],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 2, done);
      },
      setSteadyState: () => {
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 0);
        coll._eqns._adjacent.setScenario('centerTop');
        coll._eqns._adjacent.showForm('c');
        coll._eqns._adjacent.setFormSeries('2');
      },
    });

    this.addSection(common, {
      setContent: centerV([
        'This lesson examines adjacent angles that make up |common larger angles|. ',
        'Even though the adjacent angle\'s names are different for each case, the concept is always the same: |adjacent angles add up to the larger angle|.',
      ]),
    });

    this.addSection(common, {
      title: 'Complementary Angles',
      setContent: style({ top: 0 }, [
        '|Complementary_angles| add up to a |right_angle|, which is |90º|.',
      ]),
      modifiers: {
        Complementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 2, Math.PI / 2], 0, 1.5, null],
          colors.diagram.action,
        ),
        right_angle: click(this.showQR, [this, 'important_angles', 'Right'], colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 2, done);
      },
      setSteadyState: () => {
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 0);
        coll._eqns._complementary.setScenario('centerTop');
        coll._eqns._complementary.showForm('c');
        coll._eqns._complementary.setFormSeries('1');
      },
    });

    this.addSection(common, {
      title: 'Supplementary Angles',
      setContent: style({ top: 0 }, [
        '|Supplementary_angles| add up to a |straight_angle|, which is |180º|.',
      ]),
      modifiers: {
        Supplementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI, Math.PI], 0, 1.5, null],
          colors.diagram.action,
        ),
        straight_angle: click(this.showQR, [this, 'important_angles', 'Straight'], colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 2, done);
      },
      setSteadyState: () => {
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 0);
        coll._eqns._supplementary.setScenario('centerTop');
        coll._eqns._supplementary.showForm('c');
        coll._eqns._supplementary.setFormSeries('1');
      },
    });

    this.addSection(common, {
      title: 'Explementary Angles',
      setContent: style({ top: 0 }, [
        '|Explementary_angles| add up to a |full_angle|, which is |360º|.',
      ]),
      modifiers: {
        Explementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI * 1.999, Math.PI * 1.999], 0, 1.5, null],
          colors.diagram.action,
        ),
        full_angle: click(this.showQR, [this, 'important_angles', 'Full'], colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 2, done);
      },
      setSteadyState: () => {
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 0);
        coll._eqns._explementary.setScenario('centerTop');
        coll._eqns._explementary.showForm('c');
        coll._eqns._explementary.setFormSeries('1');
      },
    });

    this.addSection({
      setContent: style({ top: 15 }, [
        'The words |complementary|, |supplementary| and |explementary| all have a similar definition - |to fill up or complete|.',
        'In this case they fill up or complete a |right|, |straight| and |full| angle.',
        'Its not clear there is a particular reason |why| each word is assosiated with its angle, but it is the norm.',
        `${new Definition('Complementary', 'Latin', ['complere', 'MEANING', '', 'fill up, complete']).html({ classes: 'lesson__definition_higher' })}`,
        `${new Definition('Supplementary', 'Latin', ['supplere', 'MEANING', '', 'fill up, complete']).html({ classes: 'lesson__definition_high' })}`,
        `${new Definition('Explementary', 'Latin', [' explementum', 'MEANING', '', 'I fill up']).html()}`,
      ]),
    });
  }
}

export default Content;
