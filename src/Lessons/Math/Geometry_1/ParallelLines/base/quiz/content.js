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
  click, style,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

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
    const main = quiz._main;

    this.addSection({
      title: '',
      setContent: ['Move the |line| to be parallel with the other line.'],
      modifiers: {
        line: click(quiz.pulseLine2, [quiz], colors.lines, true, 'id__quiz__1'),
      },
      setInfo: style({ list: 'unordered', listStyleType: 'disc' }, [
        'Move and rotate the lines to see when they are parallel.',
        'Move the line by dragging its |middle|.',
        'Rotate the line by dragging one of its |ends|.',
        'The lines will have color when they are parallel.',
        'Touch |parallel| to make the lines parallel.',
      ]),
      interactiveElements: [
        'id__quiz__1', main._line2._midLine, main._line2._line,
      ],
      show: [main],
      setSteadyState: () => {
        quiz.newProblem();
      },
    });
  }
}

export default Content;
