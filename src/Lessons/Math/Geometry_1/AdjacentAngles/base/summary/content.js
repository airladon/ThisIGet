// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  click,
  style,
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
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      setContent: style({ right: 56, top: 15 }, [
        '|Adjacent_angles| share a vertex and edge, and sum to give the |larger_angle|.',
      ]),
      modifiers: {
        Adjacent_angles: click(
          coll.goToRandomAngleThenPulse,
          [coll, [Math.PI / 4, Math.PI * 1.8], 0, 1.5, null],
          colors.diagram.action,
        ),
        larger_angle: click(coll.toggleAngleC, [coll], colors.angleC),
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
  }
}

export default Content;
