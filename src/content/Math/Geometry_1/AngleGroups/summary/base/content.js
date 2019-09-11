// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../common/tools/definition';

const {
  click,
  style,
} = Fig.tools.html;

const layout = lessonLayout();
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
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      title: 'Adjacent Angles',
      setContent: style({ left: 5, right: 56, top: 15 }, [
        '|Adjacent_angles| share a |vertex| and |edge|, and sum to give the |larger_angle|.',
      ]),
      modifiers: {
        Adjacent_angles: click(
          coll.goToRandomAngleThenPulse,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        larger_angle: click(coll.toggleAngleC, [coll], colors.angleC),
        vertex: click(coll.pulseVertex, [coll], colors.lines),
        edge: click(coll.pulseLine2, [coll], colors.lines),
        // calculated: click(coll.stepEqn, [coll], colors.diagram.action),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('summary');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 2, done);
        coll._eqns._adjacent.setScenario('summary');
        coll._eqns._adjacent.showForm('c');
        coll._eqns._adjacent.setFormSeries('2');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 0);
      },
    });

    this.addSection({
      title: 'Complementary Angles',
      setContent: style({ left: 5, right: 56, top: 15 }, [
        '|Complementary_angles| add up to a |right angle|, which is |90º|.',
        `${new Definition('Complementary', 'Latin', ['complere', 'MEANING', '', 'fill up, complete']).html()}`,
      ]),
      modifiers: {
        Complementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 2, Math.PI / 2], 0, 1.5, null],
          colors.diagram.action,
        ),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('summary');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 2, done);
        coll._eqns._complementary.setScenario('summary');
        coll._eqns._complementary.showForm('c');
        coll._eqns._complementary.setFormSeries('1');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 6, Math.PI / 2, 0, 0);
      },
    });

    this.addSection({
      title: 'Supplementary Angles',
      setContent: style({ left: 5, right: 56, top: 15 }, [
        '|Supplementary_angles| add up to a |straight angle|, which is |180º|.',
        `${new Definition('Supplementary', 'Latin', ['supplere', 'MEANING', '', 'fill up, complete']).html()}`,
      ]),
      modifiers: {
        Supplementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI, Math.PI], 0, 1.5, null],
          colors.diagram.action,
        ),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('summary');
        fig._line3.move.element = null;
        coll.hasTouchableElements = false;
        coll._eqns._supplementary.setScenario('summary');
        coll._eqns._supplementary.showForm('c');
        coll._eqns._supplementary.setFormSeries('1');
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 2, done);
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3, Math.PI, 0, 0);
      },
    });

    this.addSection({
      title: 'Explementary Angles',
      setContent: style({ left: 5, right: 56, top: 15 }, [
        '|Explementary_angles| add up to a |full angle|, which is |360º|.',
        `${new Definition('Explementary', 'Latin', [' explementum', 'MEANING', '', 'fill up']).html()}`,
      ]),
      modifiers: {
        Explementary_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI * 1.999, Math.PI * 1.999], 0, 1.5, null],
          colors.diagram.action,
        ),
      },
      show: [fig],
      hide: [fig._angleC],
      transitionFromAny: (done) => {
        fig.setScenario('summary');
        coll.hasTouchableElements = false;
        fig._line3.move.element = null;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 2, done);
        coll._eqns._explementary.setScenario('summary');
        coll._eqns._explementary.showForm('c');
        coll._eqns._explementary.setFormSeries('1');
      },
      setSteadyState: () => {
        coll.hasTouchableElements = true;
        fig._line3.move.element = fig;
        coll.goToAngles(Math.PI / 3 * 2, Math.PI * 1.999, 0, 0);
      },
    });
  }
}

export default Content;
