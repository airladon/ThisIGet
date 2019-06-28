// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../LessonsCommon/tools/definition';

const {
//   click,
//   centerV,
  highlight,
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
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;

    this.addSection({
      setContent: [
        'If two triangles share the same |side_lengths|, then they will be |congruent|.',
        'This case is often called the |Side Side Side| case.',
      ],
      modifiers: {
        side_lengths: highlight(colors.sides),
      },
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [congruent],
      hide: [
        congruent._tri1._angle1, congruent._tri2._angle1,
        congruent._tri1._angle2, congruent._tri2._angle2,
        congruent._tri1._angle0, congruent._tri2._angle0,
      ],
    });
  }
}

export default Content;
