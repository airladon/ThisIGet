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
      setContent: [
        style({ top: 0 }, 'What is the unknown |side length|?'),
        style({ size: 0.6, top: 0 }, 'Round answers to |1 decimal place|. Square roots can either be precise, or approximated to 1 decimal place in calculations.'),
      ],
      show: [quiz._tri],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
