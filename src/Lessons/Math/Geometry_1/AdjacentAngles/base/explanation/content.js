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
  centerV,
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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
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
      title: 'Introduction',
      setContent: [
        '|Adjacent_angles| are any angles that share an adjacent vertex and edge.',
      ],
      modifiers: {
        // Adjacent_angles: click(coll.pulseAdjacentAngles, [coll], colors.diagram.action),
        Adjacent_angles: click(coll.goToRandomAngle, [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null], colors.diagram.action),
        // edge: click(coll.pulseLine2, [coll], colors.lines),
      },
      show: [fig._line1, fig._line2, fig._line3, fig._angleA, fig._angleB],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
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
      title: 'Introduction',
      setContent: [
        'The sum of |adjacent_angles| is the |larger_angle|. If you know any two angles, the third can be |calculated|.',
      ],
      modifiers: {
        adjacent_angles: click(
          coll.goToRandomAngle,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        larger_angle: click(coll.pulseAngleC, [coll], colors.angleC),
        calculated: click(coll.stepEqn, [coll], colors.diagram.action)
      },
      show: [fig],
      transitionFromAny: (done) => {
        fig.setScenario('center');
        fig._line1.isTouchable = false;
        fig._line2.isTouchable = false;
        fig._line3.isTouchable = false;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 2, done);
      },
      setSteadyState: () => {
        console.log(coll._eqns)
        fig._line1.isTouchable = true;
        fig._line2.isTouchable = true;
        fig._line3.isTouchable = true;
        coll.goToAngles(Math.PI / 3, Math.PI / 6 * 5, 0, 0);
        coll._eqns._adjacent.setScenario('centerTop');
        coll._eqns._adjacent.showForm('c');
        coll._eqns._adjacent.setFormSeries('2');
      },
    });
  }
}

export default Content;
