// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
// import { note } from '../../../../../common/tools/note';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  // style,
  // click,
  // clickW,
  // highlight,
  highlightWord,
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
      'Math/Trigonometry_1/Sine/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    // const fig = coll._fig;
    // const eqn = coll._eqn;

    this.addSection({
      setContent: [
        'In the |sine_function| topic, we showed that the ratio of any two sides of a right angle triangle is the same for all right angle triangles with the same angle |theta|.',
      ],
      modifiers: {
        sine_function: this.qr('Math/Trigonometry_1/Sine/base/MainPres'),
        theta: highlightWord('\u03b8', colors.angles),
      },
      show: [
        coll._tri, coll._eqn,
      ],
      hide: [coll._tri._complement, coll._tri._adj],
      setSteadyState: () => {
        coll._eqn.showForm('sine');
      },
    });
  }

  // this.addSectionEqnStep({ eqn: eqn, from: '0', to: '1' }, common, commonContent);
}

export default Content;
