// @flow
// import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../LessonsCommon/tools/definition';

// const {
//   // click,
//   // style,
// } = Fig.tools.html;

const layout = lessonLayout();
// const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
//    this.iconLink = imgLink;
//    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const markings = coll._markings;

    this.addSection({
      setContent: [
        'Lines are |parallel| if they have the |same rotation| and |do not touch|. Therefore, the lines cannot be on top of each other, and if extended to an infinite length, would never cross.',
        `${new Definition('Parallel', 'Greek', ['para', 'beside', 'allelois', 'each other']).html()}`,
      ],
      show: [markings._l1, markings._l2],
      setSteadyState: () => {
        markings._l1.setPosition(0, 0.3);
        markings._l2.setPosition(0, -0.8);
      },
    });
  }
}

export default Content;
