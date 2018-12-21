// @flow
import Fig from 'figureone';
import {
  LessonContent, interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const { click, centerH } = Fig.tools.html;
const layout = lessonLayout();
const { colors } = layout;

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
    const diag = this.diagram.elements;
    const quizP1 = diag._quizP1;
    const quizP2 = diag._quizP2;

    this.addSection({
      title: 'Parallel Lines 1',
      setContent: centerH(`
        <p style="margin-top:3%">
          Move the |red_line| to be parallel with the |blue_line|.
        </p>
      `),
      modifiers: {
        red_line: click(quizP1.pulseLine2, [quizP1], colors.quizLine),
        blue_line: click(quizP1.pulseLine1, [quizP1], colors.line),
      },
      setInfo: `<ul>
          <li>Move the line by dragging its |middle|.</li>
          <li>Rotate the line by dragging one of its |ends|.</li>
          </ul>
      `,
      infoModifiers: {
        middle: click(this.highlightInteractiveElement, [this, quizP1._line2._mid, ''], layout.colors.line, false),
        ends: click(this.highlightInteractiveElement, [this, quizP1._line2._end1, 'center'], layout.colors.line, false),
      },
      interactiveElements: [
        interactiveItem(quizP1._check),
      ],
      setEnterState: () => {
        quizP1.setPosition(0, 0);
        quizP1._line2.setColor(colors.quizLine);
        quizP1.hasTouchableElements = true;
        quizP1.randomizeFuturePositions();
      },
      showOnly: [
        quizP1,
      ],
      show: [
        quizP1._line1,
        quizP1._line2,
      ],
      transitionFromAny: (done) => {
        quizP1.moveToFuturePositions(2, done);
      },
      setSteadyState: () => {
        quizP1.setFuturePositions();
        quizP1._check.show();
      },
    });

    this.addSection({
      title: 'Parallel Lines 2',
      setContent: centerH(`
        <p style="margin-top:3%">
          Select two parallel lines.
        </p>
      `),
      modifiers: {
        red_line: click(quizP1.pulseLine2, [quizP1], colors.quizLine),
        blue_line: click(quizP1.pulseLine1, [quizP1], colors.line),
      },
      setInfo: `<ul>
          <li>Touch a line to toggle selection.</li>
          <li>Move lines by dragging them to help determine if parallel.</li>
          <li>Note, there may be more than one answer to choose from!</li>
          </ul>
      `,
      interactiveElementsOnly: [
        interactiveItem(quizP2._line1),
        interactiveItem(quizP2._line2),
        interactiveItem(quizP2._line3),
        interactiveItem(quizP2._line4),
        interactiveItem(quizP2._line5),
        interactiveItem(quizP2._line6),
        interactiveItem(quizP2._check),
      ],
      setEnterState: () => {
        quizP2.setPosition(0, 0);
        quizP2.hasTouchableElements = true;
        quizP2.randomizeFuturePositions();
        quizP2.resetLines();
      },
      showOnly: [
        quizP2,
      ],
      show: [
        quizP2._line1,
        quizP2._line2,
        quizP2._line3,
        quizP2._line4,
        quizP2._line5,
        quizP2._line6,
      ],
      transitionFromAny: (done) => {
        quizP2.moveToFuturePositions(2, done);
      },
      setSteadyState: () => {
        quizP2.setFuturePositions();
        quizP2._check.show();
      },
    });
  }
}

export default Content;
