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
  centerV,
  style,
  // highlight,
  // clickWord,
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
    const fig = coll._fig;
    // console.log(diag)

    const common = {
      setContent: [],
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    const container = (id, text) => `<div id="${id}"" class="lesson__important_angles__text">${text}</div>`;
    this.addSection(common, {
      title: '',
      setContent: [
        `<table class="lesson__important_angles_table">
          <tr>
            <td>|Acute|</td>
            <td>|Right|</td>
            <td>|Obtuse|</td>
            <td>|Straight|</td>
            <td>|Reflex|</td>
            <td>|Full|</td>
          </tr>
        </table>`,
        container('id_acute_text', style({ centerV: true, right: 50, left: 7 }, [
          'An |_acute| angle is any angle |less than 90º|.',
          `${new Definition('Acute', 'Latin', ['acutus', 'MEANING', '', 'sharp or pointed']).html({ color: colors.angle, id: 'id_acute_def' })}`,
        ])),
        container('id_right_text', style({ centerV: true, right: 50, left: 7 }, [
          'A |right_angle| is angle of |90º|.',
          'It can be thought of as the angle of a |quarter circle|.',
          'The angle mark is usually shown as a |square|, instead of an arc.',
          `${new Definition('Right Angle', 'Latin', ['angulus rectus', 'MEANING', '', 'upright corner']).html({ color: colors.angle, id: 'id_right_def' })}`,
        ])),
        container('id_obtuse_text', style({ centerV: true, right: 50, left: 7 }, [
          'An |_obtuse| angle is any angle |between 90º and 180º|.',
          `${new Definition('Obtuse', 'Latin', ['obtusus', 'MEANING', '', 'dull or blunted']).html({ color: colors.angle, id: 'id_obtuse_def' })}`,
        ])),
      ],
      modifiers: {
        Acute: click(coll.goToAcute, [coll], coll.getClass('acute'), true, 'id_acute'),
        Right: click(coll.goToRight, [coll], coll.getClass('right'), true, 'id_right'),
        Obtuse: click(coll.goToObtuse, [coll], coll.getClass('obtuse'), true, 'id_obtuse'),
        Straight: click(coll.goToStraight, [coll], coll.getClass('straight'), true, 'id_straight'),
        Reflex: click(coll.goToReflex, [coll], coll.getClass('reflex'), true, 'id_reflex'),
        Full: click(coll.goToFull, [coll], coll.getClass('full'), true, 'id_full'),
        _acute: click(coll.pulseAngle, [coll], colors.angle),
        right_angle: click(coll.pulseAngle, [coll], colors.angle),
        square: click(coll.pulseAngle, [coll], colors.angle),
      },
      show: [fig],
      refresh: () => {
        coll.updateAngle();
        coll.updateTable(true);
      },
      setSteadyState: () => {
        fig._line1.setRotation(1);
        coll.updateAngle();
        coll.updateTable(true);
      },
    });
  }
}

export default Content;
