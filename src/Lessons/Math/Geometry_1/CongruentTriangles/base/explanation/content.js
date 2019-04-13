// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  // highlight,
  // clickW,
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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const congruent = coll._congruentTriangles;
    const aaa = diag._aaa;

    this.addSection({
      title: 'Congruency',
      setContent: style({ centerV: true }, [
        'In mathematics, if |two shapes are the same size and shape|, then they are said to be |congruent|.',
        'The word |congruent| comes from |Latin|, where it means |"agreeing, meeting together"|.',
        `${new Definition('Congruent', 'Latin', ['congruent', 'agreeing, meeting together']).html()}
      `,
      ]),
    });

    this.addSection({
      setContent: [
        'For two triangles to be |congruent|, the corresponding |side_lengths| and |angles| of each triangle must be the same as the other.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      setSteadyState: () => {
        congruent._tri1.setScenario('left');
        congruent._tri2.setScenario('right');
      },
    });

    this.addSection({
      setContent: [
        'If one triangle is |rotated|, the triangles are still congruent as the |side_lengths| and |angles| are the same.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
        rotated: click(coll.rotateTriangle, [coll, null], colors.diagram.action),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      setSteadyState: () => {
        congruent._tri2.makeTouchable();
        congruent._tri2.isMovable = true;
        congruent._tri2.touchInBoundingRect = true;
        congruent._tri2.move.type = 'rotation';
        congruent._tri1.setScenario('left');
        congruent._tri2.setScenario('right');
      },
      setLeaveState: () => {
        congruent._tri2.isTouchable = false;
        congruent._tri2.isMovable = false;
      },
    });

    this.addSection({
      setContent: [
        'If one triangle is |flipped|, the triangles are still congruent as the |side_lengths| and |angles| are the same.',
      ],
      modifiers: {
        side_lengths: click(coll.toggleBothSides, [coll, null], colors.sides),
        angles: click(coll.toggleBothAngles, [coll, null], colors.angles),
        flipped: click(coll.flipTriangle, [coll, 1, null], colors.diagram.action),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'prev') {
          coll.isFlipped = false;
          congruent._tri1.setScenario('left');
          coll.flipTriangle(1, done);
        } else {
          congruent._tri1.setScenario('left');
          congruent._tri2.setScenario('right');
          coll.isFlipped = false;
          coll.flipTriangle(0, done);
        }
      },
      setLeaveState: () => {
        congruent._tri2.stop(true, 'complete');
        coll.resetTriangle();
      },
    });

    this.addSection({
      show: [aaa],
      setSteadyState: () => {
        console.log(coll)
      }
    });
  }
}

export default Content;
