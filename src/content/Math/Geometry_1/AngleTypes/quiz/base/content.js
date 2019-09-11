// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';

// const {
//   click,
//   centerV,
//   highlight,
// } = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const quiz = diag._quiz;
    const main = quiz._main;
    const fig = main._fig;

    this.addSection({
      show: [fig._line1, fig._line2, fig._angle, quiz._question, quiz._check],
      setSteadyState: () => {
        fig.setScenario('quiz');
        quiz.newProblem();
      },
    });
  }
}

export default Content;
