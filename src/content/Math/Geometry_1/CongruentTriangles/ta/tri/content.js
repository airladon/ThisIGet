// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../common/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';

// const {
//   // centerV,
//   // click,
//   // style,
//   // highlight,
//   // highlightWord,
// } = Fig.tools.html;

// const { Point } = Fig;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const tri = diag._tri;

    this.addSection({
      show: [tri],
      setInfo: [
        'Move the corners of the triangle around to create different triangles',
        'Observe how the angles and side lengths change',
      ],
      setSteadyState: () => {
        tri.hasTouchableElements = true;
      },
    });
  }
}

export default Content;
