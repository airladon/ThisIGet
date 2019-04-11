// @flow
import {
  PresentationLessonContent, interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import {
//   click, highlight,
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
