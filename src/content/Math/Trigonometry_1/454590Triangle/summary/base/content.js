// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../common/tools/definition';

const {
//   style,
  // click,
//   clickW,
  highlight,
//   centerV,
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
  }

  addSections() {
    const coll = this.diagram.elements;
    const tri = coll._tri;

    this.addSection({
      setContent: [
        'A triangle with two |45º| angles, and a |90º| angle have |opposite sides with ratios| of |1|, |1| and |√2| respectively. This is commonly called a |45-45-90 triangle|.',
      ],
      modifiers: {
        '45º': highlight(colors.angles),
        '90º': highlight(colors.angles),
      },
      show: [tri],
      setSteadyState: () => {
        tri.setScenario('default');
        tri._r2._label.showForm('0');
      },
    });
  }
}

export default Content;
