// @flow
import {
  LessonContent,
  // interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
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
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const quiz = diag._quiz;

    // this.addSection({
    // title: 'Enter_title_here',
    //   setContent: ['What is the area of a circle'],
    // });
    this.addSection({
      title: 'Area of a Circle',
      setContent: '<p id="id_lesson__quiz_question">asdf</p>',
      modifiers: {
      },
      setInfo: [
        'Touch the answer box to enter the answer, then touch the check button to submit.'],
      infoModifiers: {
      },
      // interactiveElements: [
      //   interactiveItem(quiz._input),
      // ],
      setEnterState: () => {
      },
      showOnly: [
        quiz, quiz._circle,
      ],
      show: [
        quiz._area, quiz._input,
        quiz._check,
      ],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
