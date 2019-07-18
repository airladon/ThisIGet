// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  style,
  // highlight,
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
      'Math/Geometry_1/AngleNames/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    const common = {
      setContent: '',
      modifiers: {},
      infoModifiers: {},
      interactiveElements: [
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection(common, {
      title: 'Introduction',
      setContent: centerV([
        '|Multiple angles| can sometimes be classified into |common categories| or |groups|.',
        '|Identifying such groups| can make analysing a problem easier as it often allows |calculation of unknown angles| within the group.',
      ]),
    });

    this.addSection(common, {
      title: 'Adjacent Angles',
      setContent: [
        '|Adjacent_angles| are any number of angles that share an adjacent |vertex| and |edge|.',
      ],
      modifiers: {
        Adjacent_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        vertex: click(coll.pulseVertex, [coll], colors.lines),
        edge: click(coll.pulseLine2, [coll], colors.lines),
      },
      show: [fig._line1, fig._line2, fig._line3, fig._angleA, fig._angleB, fig._vertex],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI / 3 * 2, 0, 2, done);
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 3 * 2, 0, 0);
      },
    });
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'The sum of |adjacent_angles| is the |larger_angle|. In this case, if you know any of the two angles, the third can be |calculated|.',
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
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 2, done);
        coll._eqns._adjacent.setScenario('centerTop');
        coll._eqns._adjacent.showForm('c');
        coll._eqns._adjacent.setFormSeries('2');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 0);
      },
    });

    this.addSection(common, {
      title: 'Complementary Angles',
      setContent: [
        style({ top: 0 }, [
          '|Complementary_angles| are |any number| of angles that add up to a |right_angle|, which is |90º|. They can be, but do not need to be adjacent.',
        ]),
      ],
      modifiers: {
        Complementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 2, Math.PI / 2], 0, 1.5, null],
          colors.diagram.action,
        ),
        right_angle: this.qr('Math/Geometry_1/AngleNames/base/Right', colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 2, done);
        coll._eqns._complementary.setScenario('centerTop');
        coll._eqns._complementary.showForm('c');
        coll._eqns._complementary.setFormSeries('1');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 0);
      },
    });

    this.addSection(common, {
      title: 'Supplementary Angles',
      setContent: style({ top: 0 }, [
        '|Supplementary_angles| are |any number| of angles that add up to a |straight_angle|, which is |180º|. They can be, but do not need to be adjacent.',
      ]),
      modifiers: {
        Supplementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI, Math.PI], 0, 1.5, null],
          colors.diagram.action,
        ),
        straight_angle: this.qr('Math/Geometry_1/AngleNames/base/Straight', colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 2, done);
        coll._eqns._supplementary.setScenario('centerTop');
        coll._eqns._supplementary.showForm('c');
        coll._eqns._supplementary.setFormSeries('1');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 0);
      },
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'Adjacent |supplementary_angles| appear when a |line| is intersected along its |length| and |not its end|.',
      ]),
      modifiers: {
        supplementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI, Math.PI], 0, 1.5, null],
          colors.diagram.action,
        ),
        // another: click(coll.pulseLine2, [coll], colors.lines),
        line: click(coll.pulseStraightLine, [coll], colors.lines),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 2, done);
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 0);
      },
    });

    this.addSection(common, {
      title: 'Explementary Angles',
      setContent: style({ top: 0 }, [
        '|Explementary_angles| are |any number| of angles that add up to a |full_angle|, which is |360º|.',
      ]),
      modifiers: {
        Explementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI * 1.999, Math.PI * 1.999], 0, 1.5, null],
          colors.diagram.action,
        ),
        full_angle: this.qr('Math/Geometry_1/AngleNames/base/Full', colors.angleC),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 2, done);
        coll._eqns._explementary.setScenario('centerTop');
        coll._eqns._explementary.showForm('c');
        coll._eqns._explementary.setFormSeries('1');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 0);
      },
    });

    this.addSection({
      title: 'Explanation of Names',
      setContent: style({ top: 15 }, [
        'The words |complementary|, |supplementary| and |explementary| all have a similar definition - |to fill up or complete|.',
        'In this case they fill up or complete a |right|, |straight| and |full| angle.',
        'Its not clear there is a particular reason |why| each word is assosiated with its angle, but it is the norm.',
        `${new Definition('Complementary', 'Latin', ['complere', 'MEANING', '', 'fill up, complete']).html({ classes: 'lesson__definition_higher' })}`,
        `${new Definition('Supplementary', 'Latin', ['supplere', 'MEANING', '', 'fill up, complete']).html({ classes: 'lesson__definition_high' })}`,
        `${new Definition('Explementary', 'Latin', [' explementum', 'MEANING', '', 'fill up']).html()}`,
      ]),
    });

    const indentStyle = {
      left: 4, top: -2, size: 1, list: 'unordered', listStyleType: 'none',
    };
    this.addSection({
      setContent: style({ centerV: true }, [
        'Often these group names are usually used to |describe| angles in different, and sometimes simpler ways.',
        'For example, rather than saying:',
        style(indentStyle, '" angles a and b |add up to 90º| "'),
        'you could say:',
        style(indentStyle, [
          '" angles a and b are |complementary| "',
          '" |complementary angles| a and b "',
        ]),
      ]),
    });
  }
}

export default Content;
