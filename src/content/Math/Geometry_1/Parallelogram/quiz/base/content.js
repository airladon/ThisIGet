// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import DiagramCollection from './diagramCollection';

const {
  style,
//   click,
//   centerV,
//   highlight,
} = Fig.tools.html;

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
    const quiz = diag._quiz;
    // const fig = quiz._fig;

    this.addSection({
      // setContent: ['Find the unknown angle:'],
      setContent: [
        style({ top: 0 }, 'Can you find the unknown property?'),
        style({ size: 0.6, top: 0 }, 'If there is not enough information, or the shape cannot be a parallelgram, then answer |No|.'),
      ],
      show: [quiz._pgram],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
