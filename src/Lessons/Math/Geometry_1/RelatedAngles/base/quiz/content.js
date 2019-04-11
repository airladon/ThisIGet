// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';

const {
  // click,
  // centerV,
  // highlight,
  // clickWord,
  centerH,
} = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const quiz = diag._quiz;
    const fig = quiz._main._fig;

    this.addSection({
      title: '',
      setContent: centerH(['Enter the unknown angle in degrees.']),
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
      showOnly: [
      ],
      show: [fig._line1, fig._line2, fig._line3, quiz._input],
      hide: [],
      setSteadyState: () => {
        quiz.newProblem();
        console.log(quiz)
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
