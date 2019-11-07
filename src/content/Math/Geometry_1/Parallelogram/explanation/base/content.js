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
  // style,
  click,
  // clickW,
  highlight,
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
    const dimmer = () => {
      coll._pgram.pulseDefault(null);
      coll._pgram.setDimColor([1, 0, 0, 0.5]);
      coll._pgram.dim();
      this.diagram.animateNextFrame();
    };

    const undimmer = () => {
      coll._pgram.undim();
      this.diagram.animateNextFrame();
    };
    
    const clicker = () => {
      coll._pgram.pulse(['_a1', '_a2', 'b1.curve']);
      this.diagram.animateNextFrame();
    }

    this.addSection({
      setContent: 'this is a |dim| and |undim|, and |test|',
      modifiers: {
        dim: click(dimmer, [this], colors.sides),
        undim: click(undimmer, [this], colors.sides),
        // test: click(clicker, [this], colors.sides),
        test: this.bindPulse(coll._pgram, ['a1', 'a2.curve'], colors.angles),
      },
      show: [coll],
      setSteadyState: () => {
        console.log(coll)
      }
    });
  }
}

export default Content;
