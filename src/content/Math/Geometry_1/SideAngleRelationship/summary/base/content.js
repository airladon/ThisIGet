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
  click,
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
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      setContent: [
        '|Angles_opposite_longer_sides| will always be |larger| than |angles_opposite_shorter_sides| in the same triangle.',
        'Similarly, |sides_opposite_larger_angles| will always be |longer| than |sides_opposite_smaller_angles| in the same triangle.',
      ],
      modifiers: {
        Angles_opposite_longer_sides: click(coll.pulseLargestSideAngle, [coll], colors.angles),
        angles_opposite_shorter_sides: click(coll.pulseSmallestSideAngle, [coll], colors.angles),
        sides_opposite_larger_angles: click(coll.pulseLargestSideAngle, [coll], colors.sides),
        sides_opposite_smaller_angles: click(coll.pulseSmallestSideAngle, [coll], colors.sides),
      },
      setEnterState: () => {
        coll.setScenarios('summary');
      },
      show: [
        fig._tri._line,
        fig._tri._angle0, fig._tri._angle2,
        fig._tri._side01, fig._tri._side12,
      ],
    });
  }
}

export default Content;
