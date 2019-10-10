// @flow
// import Fig from 'figureone';
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

// const {
//   style,
// //   click,
// //   centerV,
// } = Fig.tools.html;

const layout = diagramLayout();
// const { colors } = layout;

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
    const eqn = coll._eqn;
    const height1 = coll._height1;
    const height2 = coll._height2;

    this.addSection({
      setContent: [
        'The area of a triangle is equal to |half its base times its height|. The base can be any side, and the |height| is equal to the |perpendicular line between the line on which the base sits and the top| point.',
      ],
      show: [height1, height2],
      setSteadyState: () => {
        height1.setScenario('summary');
        height2.setScenario('summary');
        coll.setScenarios('summary');
        eqn.showForm('10');
      },
    });
  }
}

export default Content;
