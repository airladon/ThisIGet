// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  click,
  style,
  // centerV,
  // highlight,
} = Fig.tools.html;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: 'Quadrangles',
      setContent: [
        'A |quadrangle| is a shape with |four sides| and |four angles|. This shape is also sometimes called a |quadrilateral|.',
        `${new Definition('Quadrangle', 'Latin', ['quattuor', 'four', 'angulus', 'angle, corner']).html({ classes: 'diagram__definition_high', color: colors.sides })}`,
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
        triangle: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres', colors.diagram.action),
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
        line: click(this.next, [this, null], colors.sides),
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
        triangle: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres', colors.diagram.action),
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
