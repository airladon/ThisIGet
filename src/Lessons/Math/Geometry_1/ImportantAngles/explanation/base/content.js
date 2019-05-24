// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  style,
  highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
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
    const right = coll._right;

    const container = (id, text) => `<div id="${id}"" class="lesson__important_angles__text">${text}</div>`;
    this.addSection({
      title: 'Important Angles',
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
          'An |acute_angle| is any angle |less than 90º|.',
          `${new Definition('Acute', 'Latin', ['acutus', 'MEANING', '', 'sharp or pointed']).html({ color: colors.angle, id: 'id_acute_def' })}`,
        ])),
        container('id_right_text', style({ centerV: true, right: 50, left: 7 }, [
          'A |right_angle| is an angle of |90º|.',
          'It can be thought of as the angle of a |quarter circle|.',
          'The angle mark is usually shown as a |square|, instead of an arc.',
          `${new Definition('Right Angle', 'Latin', ['angulus rectus', 'MEANING', '', 'upright corner']).html({ color: colors.angle, id: 'id_right_def' })}`,
        ])),
        container('id_obtuse_text', style({ centerV: true, right: 50, left: 7 }, [
          'An |obtuse_angle| is any angle |between 90º and 180º|.',
          `${new Definition('Obtuse', 'Latin', ['obtusus', 'MEANING', '', 'dull or blunted']).html({ color: colors.angle, id: 'id_obtuse_def' })}`,
        ])),
        container('id_straight_text', style({ centerV: true, right: 50, left: 7 }, [
          'A |straight_angle| is an angle of |180º|.',
        ])),
        container('id_reflex_text', style({ centerV: true, right: 50, left: 7 }, [
          'An |reflex_angle| is any angle |between 180º and 360º|.',
          `${new Definition('Reflex', 'Latin', ['reflexus', 'MEANING', '', 'to bend back']).html({ color: colors.angle, id: 'id_reflex_def' })}`,
        ])),
        container('id_full_text', style({ centerV: true, right: 50, left: 7 }, ['An |full_angle| angle is an angle of |360º|.'])),
      ],
      modifiers: {
        Acute: click(coll.goToAcute, [coll], {
          classes: coll.getClass('acute'),
          interactive: true,
          id: 'id_acute',
        }),
        Right: click(coll.goToRight, [coll], {
          classes: coll.getClass('right'),
          interactive: true,
          id: 'id_right',
        }),
        Obtuse: click(coll.goToObtuse, [coll], {
          classes: coll.getClass('obtuse'),
          interactive: true,
          id: 'id_obtuse',
        }),
        Straight: click(coll.goToStraight, [coll], {
          classes: coll.getClass('straight'),
          interactive: true,
          id: 'id_straight',
        }),
        Reflex: click(coll.goToReflex, [coll], {
          classes: coll.getClass('reflex'),
          interactive: true,
          id: 'id_reflex',
        }),
        Full: click(coll.goToFull, [coll], {
          classes: coll.getClass('full'),
          interactive: true,
          id: 'id_full',
        }),
        acute_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_acute_p',
        }),
        right_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_right_p',
        }),
        square: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_square_p',
        }),
        obtuse_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_obtuse_p',
        }),
        straight_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_straight_p',
        }),
        reflex_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_reflex_p',
        }),
        full_angle: click(coll.pulseAngle, [coll], {
          color: colors.angle,
          interactive: true,
          id: 'id_full_p',
        }),
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

    this.addSection({
      title: 'Right Angles',
      setContent: centerV([
        'Many |relationships| between right angles and different geometries have been found.',
        'This makes the right angle an |important angle| as identifying one often leads to a simpler analysis of a problem.',
      ]),
    });
    this.addSection({
      setContent: [
        'Another way to define a right angle is to consider a line intersecting another. A |right_angle| is the angle between the lines where the two |intersection_angles| are |equal|.',
      ],
      modifiers: {
        right_angle: highlight(colors.angle),
        intersection_angles: highlight(colors.angle),
      },
      show: [right],
    });
    this.addSection({
      setContent: [
        'When two lines are at right angles to each other, they are often given the special name |perpendicular| lines.',
        `${new Definition('Perpendicular', 'Latin', ['perpendicularis', 'MEANING', '', 'vertical, as a plumb line']).html({ color: colors.diagram.highlight, id: 'id_acute_def' })}`,
      ],
      show: [right],
      hide: [right._leftAngle],
    });
  }
}

export default Content;
