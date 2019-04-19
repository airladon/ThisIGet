// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../LessonsCommon/tools/definition';

const {
  highlight,
  click,
//   centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

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
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;

    this.addSection({
      title: '',
      setContent: [
        'Shapes are |congruent| when they are the |same size and shape|. Triangles are congruent when they have the same set of |side_lengths| and |angles|. Shapes remain congruent even if they are |rotated| or |flipped|.',
        `${new Definition('Congruent', 'Latin', ['congruent', 'agreeing, meeting together']).html()}
      `,
      ],
      modifiers: {
        side_lengths: highlight(colors.sides),
        angles: highlight(colors.angles),
        rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
        flipped: click(coll.simpleFlip, [coll, 1, null], colors.diagram.action),
      },
      show: [congruent],
      // transitionFromAny: (done) => {
        
      //   coll.rotateTriangle(Math.PI, done);
      // },
      setSteadyState: () => {
        congruent.isFlipped = false;
        congruent._tri1.setScenario('summaryLeft');
        congruent._tri2.setScenario('summaryRight');
        congruent._tri2.makeTouchable();
        congruent._tri2.isMovable = true;
        congruent._tri2.touchInBoundingRect = true;
        congruent._tri2.move.type = 'rotation';
      },
      setLeaveState: () => {
        congruent._tri2.isTouchable = false;
        congruent._tri2.isMovable = false;
      },
    });
  }
}

export default Content;
