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
//   click,
//   centerV,
//   highlight,
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
    const diag = this.diagram.elements._quiz;
    const circle = diag._circle;
    const quiz = diag;

    this.addSection({
      title: '',
      setContent: [''],
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [circle, quiz._check, quiz._question],
      hide: [],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
        diag.newProblem();
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
