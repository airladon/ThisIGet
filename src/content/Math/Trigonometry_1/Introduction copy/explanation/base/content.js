// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  // click,
  // clickW,
  // highlight,
  // centerV,
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
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    // const fig = coll._fig;

    this.addSection({
      title: 'Introduction',
      setContent: [
        '|Trigonometry| is a branch of mathematics that studies the |relationship| between |side lengths| and |angles| of |triangles|.',
        style({ top: 40 }, 'The word |trigonometry| comes from the the |Greek| words |trigonon| (meaning triangle) and |metron| (to measure).'),
      ],
      show: [coll._tri],
    });
    this.addSection({
      setContent: style({ centerV: true, centerH: true }, [
        'So |why| study triangles? Are they really that |important|?',
      ]),
    });
    this.addSection({
      setEnterState: () => {
        coll.setScenarios('house');
      },
      show: [coll._line, coll._house],
    });
    this.addSection({
      setEnterState: () => {
        coll.setScenarios('plane');
      },
      show: [coll._arrow, coll._plane],
    });
    this.addSection({
      setEnterState: () => {
        coll.setScenarios('cart');
      },
      show: [coll._arrow, coll._cart],
    });
  }
}

export default Content;
