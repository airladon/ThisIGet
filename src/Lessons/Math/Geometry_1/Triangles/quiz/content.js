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
      title: 'Summary',
      setContent: `
        <p>
          Find the unknown angle in the triangle.
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
      setEnterState: () => {
        tri._triangle.hasTouchableElements = true;
        tri._triangle.autoShowAngles = true;
        diag._input.setValue('');
        diag.randomizeFuturePositions();
      },
      show: [tri],
      hide: [
        tri._line1,
        tri._line2,
        tri._angleA,
        tri._angleB,
        tri._eqn,
      ],
      transitionFromAny: (done) => {
        tri.moveToFuturePositions(1, done);
      },
      setSteadyState: () => {
        tri.setFuturePositions();
        diag._input.enable();
        diag._check.show();
        diag.showAngles();
      },
    });
  }
}

export default Content;
