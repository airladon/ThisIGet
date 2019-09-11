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
  highlight,
  style,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const total = coll._totalAngle;
    const type = coll._triangleType;
    const def = coll._definition;

    this.addSection({
      title: 'Definition',
      setContent: [
        'A |triangle| is a shape that has |three sides| and |three angles|. All the angles within a triangle add up to |180º|.',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      setEnterState: () => {
        coll.updateTotalAngles();
      },
      show: [
        total._fixedTriangle._line,
        total._angleC, total._angleB, total._angleA,
      ],
    });

    const size = 1;
    const top = 3.5;
    const left = 10;
    this.addSection({
      title: 'Types',
      setContent: [
        'Triangles can be classified by their |angles| or |sides|:',
        style({ top: 5, size, left }, ['|Acute_Triangle|']),
        style({ top, size, left }, ['|Right_Angle_Triangle|']),
        style({ top, size, left }, ['|Obtuse_Triangle|']),
        style({ top, size, left }, ['|Equilateral_Triangle|']),
        style({ top, size, left }, ['|Isosceles_Triangle|']),
        style({ top, size, left }, ['|Scalene_Triangle|']),
      ],
      modifiers: {
        angles: highlight(colors.angles),
        sides: highlight(colors.sides),
        Acute_Triangle: click(coll.goToType, [coll, 'acute', 1, null, true], colors.angles),
        Right_Angle_Triangle: click(coll.goToType, [coll, 'right', 1, null, true], colors.angles),
        Obtuse_Triangle: click(coll.goToType, [coll, 'obtuse', 1, null, true], colors.angles),
        Equilateral_Triangle: click(coll.goToType, [coll, 'equilateral', 1, null, true], colors.lines),
        Isosceles_Triangle: click(coll.goToType, [coll, 'isosceles', 1, null, true], colors.lines),
        Scalene_Triangle: click(coll.goToType, [coll, 'scalene', 1, null, true], colors.lines),
      },
      show: [
        type, def,
      ],
      setSteadyState: () => {
        type.setScenario('left');
        coll.goToType('acute', 0);
      },
    });
  }
}

export default Content;
