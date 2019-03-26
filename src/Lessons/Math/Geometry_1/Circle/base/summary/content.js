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
//   centerV,
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
    const circ = diag._circle;
    const circle = circ._circle;

    this.addSection({
      title: 'Circle',
      setContent: [
        'A |circle| is a shape whose |edge| is a constant distance from its |center|.',
        `${new Definition('Circle', 'Latin', ['circulus', 'ring']).html('id_lesson__isosceles_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        edge: click(circ.pulseCircle, [circ], colors.circle),
        center: click(circ.pulseCenter, [circ], colors.center),
      },
      setEnterState: () => {
        circle.setScenario('center');
      },
      show: [circle._line, circle._center],
      setSteadyState: () => {},
      setLeaveState: () => {},
    });

    this.addSection({
      title: 'Circle',
      setContent: [
        'A circle\'s |properties| include the |circumference|, |radius|, |diameter| and |center|.',
        `${new Definition('Center', 'Latin', ['centrum', 'middle']).html('id_lesson__center_definition', 'lesson__definition_highest')}`,
        `${new Definition('Radius', 'Latin', ['radius', 'spoke of a chariot wheel']).html('id_lesson__radius_definition', 'lesson__definition_higher')}`,
        `${new Definition('Diameter', 'Greek', ['diametros', '', 'dia', 'across', 'metros', 'measure']).html('id_lesson__diameter_definition', 'lesson__definition_high')}`,
        `${new Definition('Circumference', 'Latin', ['circumferentia', '', 'circum', 'around', 'ferre', 'carry']).html('id_lesson__circumference_definition')}`,
      ],
      modifiers: {
        center: click(circ.pulseCenter, [circ], colors.center),
        radius: click(circ.pulseRadius, [circ], colors.radius),
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      setEnterState: () => {
        circle.setScenario('centerHigh');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(-0.5);
      },
      show: [circle._line, circle._center, circle._radius, circle._diameter],
      setSteadyState: () => {},
      setLeaveState: () => {},
    });

    this.addSection({
      title: 'Circle',
      setContent: [
        'The |circumference|, |radius|, |diameter| are related and can be calculated from each other.',
      ],
      modifiers: {
        center: click(circ.pulseCenter, [circ], colors.center),
        radius: click(circ.pulseRadius, [circ], colors.radius),
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      setEnterState: () => {
        circle.setScenario('right');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(-0.5);
      },
      show: [circle._line, circle._center, circle._radius, circle._diameter],
      setSteadyState: () => {
        circ._dEquation.showForm('diameter');
        circ._dEquation.setScenario('left');
        circ._cEquation.showForm('diameter');
        circ._cEquation.setScenario('left');
        circ._rEquation.showForm('radius');
        circ._rEquation.setScenario('left');
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
