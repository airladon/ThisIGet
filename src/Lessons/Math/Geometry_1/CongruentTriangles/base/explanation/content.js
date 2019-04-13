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
    const sas = diag._sas;
    const asa = diag._asa;

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
        rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
      },
      show: [congruent._tri1._line, congruent._tri2._line],
      transitionFromAny: (done) => {
        congruent._tri1.setScenario('left');
        congruent._tri2.setScenario('right');
        coll.rotateTriangle(Math.PI, done);
      },
      setSteadyState: () => {
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
      setContent: style({ centerV: true }, [
        'Showing two triangles are congruent can sometimes be beneficial in calculating a geometric problem.',
        'When |two triangles are known to be congruent|, unknown angles and lengths of one triangle, can be |inferred| from the other triangle.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So |how| can you figure out if two triangles are congruent?',
        'One way is to measure all the angles and sides and see if they are equal.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'But this means the advantage of knowing triangles are congruent is reduced as you already know the angles and lengths of both triangles.',
        'In addition, |sometimes all properties cannot be measured or known|, so such a comparison is not practical.',
        'Therefore, it\'s important to explore how many side lengths and angles of a triangle really need to be known to guarantee two triangles are congruent.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'One way to do this is to take a set of known properties, then figure out how many triangles can be created from them.',
        'If |more than one size and shape of triangle| can be created, then the selected properties are |not enough| to guarantee two triangles that share those properties are congruent.',
      ]),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */

    this.addSection({
      title: 'Angle Angle Angle',
      setContent: [
        'First consider when only the three angles are known. Do triangles of different sizes exist that have the same angles?',
      ],
      show: [
        aaa._fig._tri._line, aaa._fig._tri._angle0, aaa._fig._tri._angle1, aaa._fig._tri._angle2,
      ],
      setEnterState: () => {
        aaa.resetTri();
        aaa.hasTouchableElements = false;
      },
    });

    this.addSection({
      setContent: [
        'Yes. You can |move| the bottom corners of the triangle to see the |same angles can make triangles of different sizes|. You can move the top corner of the triangle to test different triangles.',
      ],
      modifiers: {
        move: click(aaa.randomSize, [aaa], colors.diagram.action),
      },
      show: [aaa],
      setEnterState: () => {
        aaa.resetTri();
        aaa.hasTouchableElements = true;
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'So triangles with the |same angles|, can have |different side lengths|.',
        'Only knowing two triangles have the same angles, is |not enough| to know they are congruent.',
      ]),
    });

    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */
    /* ********************************************************************* */


    this.addSection({
      setContent: ['|rotation| |length| |goto|'],
      modifiers: {
        rotation: click(sas.randRotation, [sas], colors.diagram.action),
        length: click(sas.randLength, [sas], colors.diagram.action),
        goto: click(sas.goToTri, [sas], colors.diagram.action),
      },
      show: [sas],
      setSteadyState: () => {
        sas._fig._angle2.showAll();
      },
    });

    this.addSection({
      setContent: ['|length1| |length2| |goto|'],
      modifiers: {
        length1: click(asa.randLength, [asa, '01'], colors.diagram.action),
        length2: click(asa.randLength, [asa, '23'], colors.diagram.action),
        goto: click(asa.goToTri, [asa], colors.diagram.action),
      },
      show: [asa],
      setSteadyState: () => {
        asa._fig._angle2.showAll();
      },
    });


  }
}

export default Content;
