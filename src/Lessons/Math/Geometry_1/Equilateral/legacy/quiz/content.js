// @flow
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import {
//   click, centerH,
// } from '../../../../../../js/tools/htmlGenerator';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';

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

    this.addSection({
      title: 'Enter_title_here',
      setContent: ['Enter_content_here'],
      show: [quiz],
    });
    this.addSection({
      title: 'Enter_title_here',
      setContent: [
        'Enter_question_here',
      ],
      modifiers: {
      },
      setInfo: `<ul>
          <li></li>
          </ul>
      `,
      infoModifiers: {
      },
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {
      },
      showOnly: [
      ],
      show: [
      ],
      setSteadyState: () => {
      },
    });
  }
}

export default Content;
