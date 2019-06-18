// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent, makeFig,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  click,
  style,
  centerV,
  highlight,
} = Fig.tools.html;

// const { Rect } = Fig;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
//    this.iconLink = imgLink;
//    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements._collection;
    const circle = diag._circle;

    this.addSection({
      title: '',
      setContent: centerV([
        style({ top: 0, right: 45 }, 'A |radian| is the |angle| where the |arc_length| equals the |radius|.'),
        style({ right: 45, top: 5 }, 'There are |2π| radians in a circle.'),
        style({ right: 45, top: 5 }, 'When using |radians|, angle, arc length and radius are |related|:'),
        // makeFig('id_figure_equation', diag._equation, 'fit', [-1, -0.6, 2, 0.8]),
        makeFig({
          element: diag._equation,
          window: [-0.9, -0.44, 2, 0.8],
          top: 2,
          left: 5,
          width: 45,
          height: 18,
          // borderDebug: true,
          classes: 'lesson__equation_border',
          id: 'id_lesson_content__equation_box',
        }),
      ]),
      modifiers: {
        radian: click(diag.bendRadius, [diag, null], colors.radianLines),
        arc_length: click(diag.pulseArc, [diag], colors.arc),
        radius: click(diag.pulseRadius, [diag], colors.lines),
        angle: click(diag.pulseAngle, [diag], colors.angles),
        _angle: highlight(colors.angles),
        _arc_length: highlight(colors.arc),
        _radius: highlight(colors.lines),
      },
      show: [
        circle._line1, circle._line2, circle._arc, circle._angle, circle._angleText],
      setSteadyState: () => {
        circle.setScenario('summary');
        circle._line1.setRotation(1.3);
        diag.setAngleMarks('radians');
        diag.updateAngle();
        diag._equation.showForm('arc');
        circle._angleText.setScenario('summary');
        const element = document.getElementById('id_lesson_content__equation_box');
        if (element) {
          diag._equation.updateHTMLElementTie(element);
        }
      },
    });
    this.addSection({
      setContent: centerV([
        '|Radians| can be converted to |degrees| using:',
        makeFig({
          element: diag._radDegEqn,
          id: 'id_rad_equation',
          window: [-0.9, -0.25, 2, 0.6],
        }),
        '|Degrees| can be converted to |_radians| using:',
        makeFig({
          element: diag._degRadEqn,
          id: 'id_deg_equation',
          window: [-0.9, -0.22, 2, 0.6],
        }),
      ]),
      modifiers: {
        Radians: highlight(colors.radianLines),
        _radians: highlight(colors.radianLines),
        Degrees: highlight(colors.degrees),
        _degrees: highlight(colors.degrees),
      },
      setSteadyState: () => {
        // diag._radDegEqn.setScenario('summary');
        diag._radDegEqn.showForm('6');
        // diag._degRadEqn.setScenario('summary');
        diag._degRadEqn.showForm('0');
      },
    });
  }
}

export default Content;
