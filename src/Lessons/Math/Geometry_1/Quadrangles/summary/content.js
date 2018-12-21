// @flow
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
// import {
//   click, highlight, clickWord,
// } from '../../../../../js/tools/htmlGenerator';
import Definition from '../../../../LessonsCommon/tools/definition';
import LessonDiagram from './diagram';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const layout = lessonLayout();
// const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId, layout);
  }

  addSections() {
    const diag = this.diagram.elements;
    const quad = diag._quad;
    const rect = diag._rect;
    const square = diag._square;

    this.addSection({
      title: 'Quadrangle',
      setContent: `
        <p>
          A |quadrangle|, or |quadrilateral| is a shape with |four sides| and |four angles|. A quadrangle's angles always add up to 360º.
        </p>
        ${new Definition('Quadrangle', 'Latin', ['quattuor', 'four', 'angulus', 'angle, corner']).html('id_lesson__quadrilateral_definition')}
        ${new Definition('Quadrilateral', 'Latin', ['quattuor', 'four', 'latus, later', 'side']).html('id_lesson__quadrilateral_definition', 'lesson__definition_low')}
      `,
      showOnly: [
        quad, quad._quad1, quad._quad2, quad._quad3,
      ],
    });

    this.addSection({
      title: 'Rectangle',
      setContent: `
        <p>
          A |rectangle|, is a quadrangle with |all angles equal to 90º|. A rectangle's |opposite sides are parallel and equal length|.
        </p>
        ${new Definition('Rectangle', 'Latin', ['rectus', 'right', 'angulus', 'corner, angle']).html('id_lesson__rectangle_definition', 'lesson__definition_low')}
      `,
      showOnly: [
        rect, rect._rect,
      ],
      show: [
        rect._rect._rightAngle1, rect._rect._rightAngle2,
        rect._rect._rightAngle3, rect._rect._rightAngle4,
        rect._rect._lineA, rect._rect._lineB,
        rect._rect._lineC, rect._rect._lineD,
      ],
      hide: [
        rect._rect._lineC._label.__0,
        rect._rect._lineD._label.__0,
      ],
    });

    this.addSection({
      title: 'Square',
      setContent: `
        <p>
          A |square|, is a |rectangle with all sides equal|. Therefore a squares's angles are all 90º and its opposite sides are parallel.
        </p>
        ${new Definition('Square', 'Old French', ['esquare', 'square'], 'Latin', ['quadra', 'square']).html('id_lesson__square_definition', 'lesson__definition_low')}
      `,
      show: [square],
    });
  }
}

export default Content;
