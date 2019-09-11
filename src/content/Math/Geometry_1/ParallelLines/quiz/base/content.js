// @flow
import Fig from 'figureone';
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

const {
  click, style,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

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
    const quiz1 = diag._quiz1;
    const quiz2 = diag._quiz2;
    // const main1 = quiz1._main;
    // const main2 = quiz1._main;

    this.addSection({
      title: '',
      setContent: ['Move the |line| to be parallel with the other line.'],
      modifiers: {
        line: click(quiz1.pulseLine2, [quiz1], {
          color: colors.movable,
          interactive: true,
          id: 'id__quiz__1',
        }),
      },
      setInfo: style({ list: 'unordered', listStyleType: 'disc' }, [
        'Move the line by dragging its |middle|.',
        'Rotate the line by dragging one of its |ends|.',
      ]),
      interactiveElements: [
        'id__quiz__1',
        quiz1._line2._midLine,
        quiz1._line2._line,
        quiz1._check,
      ],
      show: [quiz1._line1, quiz1._line2],
      setSteadyState: () => {
        quiz1.newProblem();
      },
    });

    this.addSection({
      title: '',
      setContent: ['Select |two| parallel lines.'],
      setInfo: style({ list: 'unordered', listStyleType: 'disc' }, [
        'Touch a line to toggle selection.',
        'Move lines by dragging them to help determine if parallel.',
        'Note, there may be more than one answer to choose from!',
      ]),
      interactiveElementsOnly: [
        quiz2._line1._midLine,
        quiz2._line2._midLine,
        quiz2._line3._midLine,
        quiz2._line4._midLine,
        quiz2._line5._midLine,
        quiz2._line6._midLine,
        quiz2._check,
      ],
      show: [
        quiz2._line1, quiz2._line2, quiz2._line3,
        quiz2._line4, quiz2._line5, quiz2._line6,
      ],
      setSteadyState: () => {
        quiz2.newProblem();
      },
    });
  }
}

export default Content;
