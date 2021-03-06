// @flow
// import Fig from 'figureone';
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

// const {
// //   click,
// //   centerV,
// //   highlight,
//   // toHTML,
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
    const quiz = diag._quiz;
    const main = quiz._main;

    this.addSection({
      // setContent: [
      //   'Create a triangle that has an area of |area| squares.',
      // ],
      // modifiers: {
      //   area: toHTML('?', 'id__topics__area_quiz1', '', colors.area),
      // },
      show: [main._implications],
      hide: [main._implications._text],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
