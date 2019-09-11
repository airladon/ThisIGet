// @flow
// import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationFormatContent';
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

class Content extends PresentationFormatContent {
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
    const tri = quiz._triangle;

    this.addSection({
      title: '',
      setContent: ['Find the missing property:'],
      setEnterState: () => {},
      showOnly: [],
      show: [tri],
      setSteadyState: () => {
        quiz.newProblem();
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
