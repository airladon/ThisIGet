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
//   click,
//   centerV,
// } = Fig.tools.html;

const layout = lessonLayout();

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
    const total = coll._totalAngle;

    this.addSection({
      title: '',
      setContent: [
        'A |triangle| is a shape that has |three sides| and |three angles|. All the angles within a triangle add up to |180º|.',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      setEnterState: () => {
        coll.updateTotalAngles();
      },
      show: [
        total._fixedTriangle._line,
        total._angleC, total._angleB, total._angleA,
      ],
    });
  }
}

export default Content;
