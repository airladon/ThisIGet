// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../common/tools/definition';

const {
  highlight,
  click,
  style,
//   centerV,
} = Fig.tools.html;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
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
      setContent: style({ top: 0 }, [
        'Shapes are |congruent| when they are the |same size and shape|. Triangles are congruent when they have the same set of |side_lengths| and |angles|. Shapes remain congruent even if they are |rotated| or |flipped|.',
        `${new Definition('Congruent', 'Latin', ['congruent', 'agreeing, meeting together']).html()}
      `,
      ]),
      modifiers: {
        side_lengths: highlight(colors.sides),
        angles: highlight(colors.angles),
        rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
        flipped: click(coll.simpleFlip, [coll, 1, null], colors.diagram.action),
      },
      show: [congruent],
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
    this.addSection({
      setContent: [
        `<p class="topic__font_0p9">
          There are also some combinations of |three properties| that can show congruence.
        </p>
        <div class="topic__congruent_angles_summary__sub_title topic__diagram_text_p_width_40" style="margin-top: 3%">
        <b>CAN</b> guarantee congruence.
        </div>
          <ul class="topic__congruent_angles_summary__list">
            <li>|SAS|</li>
            <li>|SSS|</li>
            <li>|ASA|</li>
            <li>|AAS|</li>
          </ul>
        <div class="topic__congruent_angles_summary__sub_title topic__diagram_text_p_width_40">
        Can <b>SOMETIMES</b> guarantee congruence.
        </div>
          <ul class="topic__congruent_angles_summary__list">
            <li>|SSA|</li>
          </ul>
        <div class="topic__congruent_angles_summary__sub_title topic__diagram_text_p_width_40">
        <b>CANNOT</b> guarantee congruence.
        </div>
          <ul class="topic__congruent_angles_summary__list">
            <li>|AAA|</li>
          </ul>
      `],
      modifiers: {
        SAS: click(diag.showCombination, [diag, 'sas'], {
          color: colors.diagram.text.base,
          text: 'Side Angle Side',
        }),
        SSS: click(diag.showCombination, [diag, 'sss'], {
          color: colors.diagram.text.base,
          text: 'Side Side Side',
        }),
        ASA: click(diag.showCombination, [diag, 'asa'], {
          color: colors.diagram.text.base,
          text: 'Angle Side Angle',
        }),
        AAS: click(diag.showCombination, [diag, 'aas'], {
          color: colors.diagram.text.base,
          text: 'Angle Angle Side',
        }),
        AAA: click(diag.showCombination, [diag, 'aaa'], {
          color: colors.diagram.text.base,
          text: 'Angle Angle Angle',
        }),
        SSA: click(diag.showCombination, [diag, 'ssa'], {
          color: colors.diagram.text.base,
          text: 'Side Side Angle',
        }),
      },
      // modifiers: {
      //   side_lengths: highlight(colors.sides),
      //   angles: highlight(colors.angles),
      //   rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
      //   flipped: click(coll.simpleFlip, [coll, 1, null], colors.diagram.action),
      // },
      show: [congruent._tri1, diag._label],
      setSteadyState: () => {
      //   congruent.isFlipped = false;
        congruent._tri1.setScenario('summaryTri1');
      //   congruent._tri2.setScenario('summaryRight');
      //   congruent._tri2.makeTouchable();
      //   congruent._tri2.isMovable = true;
      //   congruent._tri2.touchInBoundingRect = true;
      //   congruent._tri2.move.type = 'rotation';
      },
      // setLeaveState: () => {
      //   congruent._tri2.isTouchable = false;
      //   congruent._tri2.isMovable = false;
      // },
    });
  }
}

export default Content;
