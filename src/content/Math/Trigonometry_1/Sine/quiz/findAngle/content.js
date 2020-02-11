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
  highlight,
} = Fig.tools.html;

const layout = diagramLayout();
// const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      'Math/Trigonometry_1/Sine/base',
    ]);
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
        style({ top: 0 }, 'What is the unknown |angle|?'),
        style({ top: 1, size: 0.7 }, 'A |Table_of_sines| may be helpful.'),
      ],
      modifiers: {
        Table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
        angle: highlight(layout.colors.angles),
      },
      show: [quiz._tri],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
