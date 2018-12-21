// @flow
import {
  LessonContent, interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
// import {
//   click, highlight,
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
    const diag = this.diagram.elements;
    const tri = diag._triangle;

    this.addSection({
      title: 'Quiz',
      setContent: `
        <p>
          Can you determine if the triangles are congruent based on the properities shown?
        </p>
      `,
      setInfo: 'Select |Yes| or |No| then touch the |Check| box',
      setEnterState: () => {
        diag.calcRandomTriangles();
      },
      interactiveElements: [
        interactiveItem(diag._check),
        interactiveItem(diag._answerBox, 'center'),
      ],
      showOnly: [tri,
        tri._tri1, tri._tri1._line,
        tri._tri1._point1, tri._tri1._point2, tri._tri1._point3,
        tri._tri2, tri._tri2._line,
        tri._tri2._point1, tri._tri2._point2, tri._tri2._point3,
        diag._answerBox,
      ],
      transitionFromAny: (done) => {
        diag._answerBox.disable();
        diag.moveToFuturePositions(1, done);
      },
      setSteadyState: () => {
        diag.setFuturePositions();
        diag.showAnglesAndSides();
        diag._answerBox.enable();
      },
    });
  }
}

export default Content;
