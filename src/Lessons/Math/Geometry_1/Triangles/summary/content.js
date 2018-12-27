// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
// import {
//   click, highlight,
// } from '../../../../../js/tools/htmlGenerator';
import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
const { click, highlight } = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
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
    const tri = diag._triangle;

    this.addSection({
      title: 'Summary',
      setContent: `
        <p>
          A |Triangle| is a shape with |three sides|, and |three angles|. All the angles within a triangle add up to 180º.
        </p>
        ${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html('id_lesson__related_angles_definition', 'lesson__definition_lowest')}
      `,
      modifiers: {
        Triangle: click(tri.randomize, [tri], colors.line),
      },
      setInfo: [
        '<ul>',
        '<li>Drag the triangle corners or touch the |Triangle| text to change the triangle\'s shape.</li>',
        '</ul>',
      ],
      infoModifiers: {
        Triangle: highlight(colors.line),
      },
      setEnterState: () => {
        tri._triangle.hasTouchableElements = true;
        tri._triangle.autoShowAngles = true;
      },
      show: [tri],
      hide: [
        tri._line1,
        tri._line2,
        tri._angleA,
        tri._angleB,
      ],
    });
  }
}

export default Content;
