// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
// import HTMLEquation from '../../../../js/diagram/DiagramElements/Equation/HTMLEquation';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import lessonLayout from './layout';
import details from '../details';

const {
  clickWord, onClickId, click, highlight,
} = Fig.tools.html;
const layout = lessonLayout();
const { colors } = layout;

const unit = (deg: string, rad: string, angleType: string, num: number = 1) => `<span id="id_${angleType}_deg${num}" class="highlight_word">${deg}&deg;</span><span id="id_${angleType}_rad${num}" class="highlight_word">${rad} radians</span>
  `;

// const fraction = (id: string, numerator: string, denominator: string) => {
//   const eqn = new HTMLEquation(`${id}`);
//   eqn.createEq([eqn.frac(numerator, denominator)]);
//   return eqn.render();
// };

const _piOn2 = '<sup>&pi;</sup>&frasl;<sub>2</sub>';
// const _piOn2 = '<sup>1</sup>&frasl;<sub>2</sub>';

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new LessonDiagram(htmlId);
  }

  addSections() {
    const circle = this.diagram.elements._circle;

    const diag = this.diagram.elements;
    this.addSection({
      title: 'Summary',
      setContent: [`
        <table class="lesson__important_angles_table">
          <tr>
            <td>|Acute|</td>
            <td>|Right|</td>
            <td>|Obtuse|</td>
            <td>|Straight|</td>
            <td>|Reflex|</td>
            <td>|Full|</td>
          </tr>
        </table>
        <div id="id_unit_selection"
             class="lesson__important_angles_unit_selection">
          <span id="id_radians">Radians</span>
          /
          <span id="id_degrees">Degrees</span>
        </div>
      `,
      `<div id="id_acute_text">
        <p class="lesson__diagram_text_p_width_45"
          style="margin-top:20%">
          An |acute_angle| is any angle less than
          ${unit('90', _piOn2, 'acute')}.
        </p>
        <p class="lesson__font_0p5" style="margin-top:23%; margin-left: 4%">
          <span class="english">Acute</span> |from_Latin| <i class="latin">acutus</i>: “sharp, pointed”
        </p>
      </div>`,
      `<div id="id_obtuse_text">
        <p class="lesson__diagram_text_p_width_40"
           style="margin-top:17%">
          An |obtuse_angle| is any angle between
          ${unit('90', _piOn2, 'obtuse')}
          and
          ${unit('180', '&pi;', 'obtuse', 2)}.
        </p>
        <p class="lesson__font_0p5"
          style="margin-top:21%; margin-left: 4%">
          <span class="english">Obtuse</span> |from_Latin| <i class="latin">obtusus</i>: “dull, blunted”
        </p>
      </div>`,
      `<div id="id_straight_text">
        <p class="lesson__diagram_text_p_width_45"
           style="margin-top:20%">
          A |straight_angle| is an angle of
          ${unit('180', '&pi;', 'straight')}.
        </p>
        <p class="lesson__font_0p5"
          style="margin-top:23.2%; margin-left: 4%">
          <span class="english">Straight</span>: “direct, undeviating; not crooked, not bent or curved”
        </p>
      </div>`,
      `<div id="id_right_text">
        <p class="lesson__diagram_text_p_width_45"
           style="margin-top:5%">
          A |right_angle| is an angle of
          ${unit('90', _piOn2, 'right')}.
        </p>
        <p class="lesson__diagram_text_p_width_45">
          It can also be thought of as the angle of a |quarter_circle|.
        </p>
        <p class="lesson__diagram_text_p_width_45">
          The angle mark is usually shown as a |square| instead of arc.
        </p>
        <p class="lesson__font_0p5"
           style="margin-top:3%; margin-left: 4%">
          <span class="english">Right Angle</span> |from_Latin| <i class="latin">angulus rectus</i>: “upright corner”
        </p>
      </div>`,
      `<div id="id_reflex_text">
        <p class="lesson__diagram_text_p_width_40"
          style="margin-top:17%">
          A |reflex_angle| is any angle between
          ${unit('180', '&pi;', 'reflex')}
          and ${unit('360', '2&pi;', 'reflex', 2)}.
        </p>
        <p class="lesson__font_0p5"
          style="margin-top:21%; margin-left: 4%">
          <span class="english">Reflex</span> |from_Late_Latin| <i class="latin">reflexus</i>: “to bend back”
        </p>
      </div>`,
      `<div id="id_full_text">
        <p class="lesson__diagram_text_p_width_40"
          style="margin-top:20%">
          A |full_angle| is an angle of
          ${unit('360', '2&pi;', 'full')}.
        </p>
        <p class="lesson__font_0p5"
          style="margin-top:23.2%; margin-left: 4%">
          <span class="english">Full</span>: “containing all that can be received; perfect, entire”
        </p>
      </div>`,
      ],
      modifiers: {
        Acute: clickWord('Acute', 'id_acute', diag.goToAcute, [diag]),
        Right: clickWord('Right', 'id_right', diag.goToRight, [diag]),
        Obtuse: clickWord('Obtuse', 'id_obtuse', diag.goToObtuse, [diag]),
        Straight: clickWord('Straight', 'id_straight', diag.goToStraight, [diag]),
        Reflex: clickWord('Reflex', 'id_reflex', diag.goToReflex, [diag]),
        Full: clickWord('Full', 'id_full', diag.goToFull, [diag]),
        acute_angle: click(diag.pulseAngle, [diag], colors.angleText),
        straight_angle: click(diag.pulseAngle, [diag], colors.angleText),
        obtuse_angle: click(diag.pulseAngle, [diag], colors.angleText),
        right_angle: click(diag.pulseAngle, [diag], colors.angleText),
        reflex_angle: click(diag.pulseAngle, [diag], colors.angleText),
        full_angle: click(diag.pulseAngle, [diag], colors.angleText),
        quarter_circle: highlight(),
        square: click(diag.toggleRightAngleLine, [diag, true], colors.angleText),
        from_Latin: highlight('lesson__important_angles_from_Latin'),
        from_Late_Latin: highlight('lesson__important_angles_from_Latin'),
      },
      setEnterState: () => {
        diag.setRotation(Math.PI / 3);
        diag._angleText.setPosition(layout.angleEqualsText.bottomRight);
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
      ],
      setSteadyState: () => {
        diag.resetCircle('right', Math.PI / 3);
        circle._angle.showAll();
        circle._axes.showAll();
        diag._angleText.setPosition(layout.angleEqualsText.bottomRight);
        diag._angleText.showAll();
        diag.showRadians();
        diag.selectAngle('acute');
        onClickId('id_unit_selection', diag.toggleUnits, [diag, null]);
        diag.toggleUnits('deg');
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
      },
    });
  }
}

export default Content;
