// @flow
import {
  LessonContent, interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
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

    this.addSection({
      title: 'Quiz',
      setContent: `
        <p>
          Calculate the unknown angle in the quadrangle.
        </p>
      `,
      setInfo: [
        '<ul>',
        '<li>Touch the grey box to enter the angle, then touch the |check| button to check the answer.</li>',
        '</ul>',
      ],
      interactiveElements: [
        interactiveItem(diag._check),
      ],
      show: [
        diag._input, diag._quad,
      ],
      setEnterState: () => {
        diag.calculateFuturePositions();
      },
      setSteadyState: () => {
        diag.showCheck();
        diag.setFuturePositions();
        diag.updateAngles();
      },
    });
  }
}

export default Content;
