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

const {
  // click,
  // centerV,
  // highlight,
  style,
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
    const fig = quiz._main._fig;

    this.addSection({
      title: '',
      setContent: style({ top: 0, left: 30 }, ['Enter the unknown angle in degrees.']),
      show: [fig._line1, fig._line2, fig._line3, quiz._input],
      hide: [],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
