// @flow
import {
  LessonContent,
  // interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
// import {
//   click, centerH,
// } from '../../../../../js/tools/htmlGenerator';
import LessonDiagram from './diagram';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const layout = lessonLayout();
// const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId, layout);
  }

  addSections() {
    // const diag = this.diagram.elements;
    // const quiz = diag._quiz;

    this.addSection({
      title: 'Enter_title_here',
      setContent: ['Enter_content_here'],
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
