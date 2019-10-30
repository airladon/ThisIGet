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
  style,
  click,
//   clickW,
//   highlight,
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
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      setContent: style({ top: 0 }, [
        '|Similar triangles| have |corresponding_sides| that are proportional (have the same |scaling| factor, shown as |s| in the diagram).',
        'All |similar triangles| have equal |corresponding_angles|, and all triangles with |corresponding_angles_| angles are |similar|.',
      ]),
      modifiers: {
        corresponding_angles: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_angles_: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_sides: click(coll.pulseTriRSide, [coll, null], colors.sides),
      },
      setEnterState: () => {
        fig._tri1.setScenario('bottomLeft');
        fig._trir.setScenario('bottomRightSummary');
        coll.setAngles('solved');
        coll.setTri2('all');
      },
      show: [fig._tri1, fig._trir],
    });
  }
}

export default Content;
