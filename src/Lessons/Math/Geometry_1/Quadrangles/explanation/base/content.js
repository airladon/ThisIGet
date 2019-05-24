// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  // centerV,
  // highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: 'Quadrangles',
      setContent: [
        'A |quadrangle| is a shape with |four sides| and |four angles|. This shape is also sometimes called a |quadrilateral|.',
        `${new Definition('Quadrangle', 'Latin', ['quattuor', 'four', 'angulus', 'angle, corner']).html({ classes: 'lesson__definition_high', color: colors.sides })}`,
        `${new Definition('Quadrilateral', 'Latin', ['quattuor', 'four', 'latus, later', 'side']).html(colors.sides)}`,
      ],
      show: [coll._quad1, coll._quad2, coll._quad3],
    });

    this.addSection({
      setContent: [
        'The four side lengths and four angles are |properties| of a quadrangle.',
      ],
      show: [coll._quad1, coll._quad2, coll._quad3],
    });
    this.addSection({
      setContent: [
        'Similar to a |triangle|, all the angles of a quadrangle are |related| and will |always add up to the same angle|.',
      ],
      modifiers: {
        triangle: this.bindShowQR('Triangles/base', 'Main', colors.diagram.action),
      },
      show: [coll._quad1, coll._quad2, coll._quad3],
    });

    const common = {
      setContent: [
        'We can see this by drawing a |line| between opposite corners of a quadrangle.',
      ],
    };
    this.addSection(common, {
      modifiers: {
        line: click(this.next, [this], colors.sides),
      },
      show: [coll._quad1, coll._quad2, coll._quad3],
    });
    this.addSection(common, {
      modifiers: {
        line: click(coll.drawLines, [coll], colors.sides),
      },
      transitionFromPrev: (done) => {
        coll.drawLines(done);
      },
      show: [coll],
    });

    this.addSection({
      setContent: [
        'A quadrangle can |always| be split into |two triangles|.',
      ],
      show: [coll],
    });

    this.addSection({
      setContent: [
        'As angles in |triangle| always sum to 180º, then the angles in a quadrangle must always sum to |twice| that, or |360º|.',
      ],
      modifiers: {
        triangle: this.bindShowQR('Triangles/base', 'Main', colors.diagram.action),
      },
      show: [coll],
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So to summarize a |quadrangle| is a shape with |four sides| and |four angles|.',
        'A quadrangle\'s angles will |always add up to 360º|.',
      ]),
    });
  }
}

export default Content;
