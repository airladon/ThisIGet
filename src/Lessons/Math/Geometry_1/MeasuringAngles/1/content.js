// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import lessonLayout from './layout';
import details from '../details';

const {
  actionWord, onClickId, highlightWord, highlight, click,
  centerVH, centerV, toHTML, clickWord,
} = Fig.tools.html;
const { HTMLEquation } = Fig;

const layout = lessonLayout();
const { colors } = layout;

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
      title: 'Introduction',
      setContent: centerVH(`
        <p>
          |Circles| and |Angles| are closely related.
        </p>
      `),
    });
    this.addSection({
      setContent: `
        <p style="text-align:center;margin-top:8%">
          A |circle| is formed by |rotating| a line around a |fixed| end.
        </p>
      `,
      modifiers: {
        circle: click(diag.rotateTo, [diag, Math.PI * 1.999, 2], colors.circle),
        rotating: click(diag.pushRadius, [diag], colors.action),
        fixed: click(diag.pulseAnchor, [diag], colors.anchor),
      },
      setEnterState: () => {
        diag.resetCircle('center');
        diag.setRotation(0.001);
      },
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'center', Math.PI * 1.999, 3);
      },
      showOnly: [
        circle,
        circle._radius,
        circle._arc,
        circle._anchor,
      ],
      setSteadyState: () => {
        diag.setRotation(Math.PI * 1.999);
      },
    });

    this.addSection({
      setContent: `
        <p>
          A |corner| is formed by |rotating| one |line| relative to |another|. The amount of rotation is called |angle|.
        </p>
      `,
      modifiers: {
        angle: click(diag.pulseAngle, [diag], colors.angleText),
        rotating: click(diag.pushRadius, [diag], colors.action),
        line: click(diag.pulseRadius, [diag], colors.radius),
        another: click(diag.pulseReference, [diag], colors.radius),
      },
      setEnterState: () => {
        diag.resetCircle('center');
        diag.updateRotation();
      },
      transitionFromPrev: (done) => {
        diag.transitionCircle(done, 'center', Math.PI / 3);
      },
      setSteadyState: () => {
        diag.setRotation(Math.PI / 3);
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
      ],
      show: [
        circle._angle,
      ],
    });

    this.addSection({
      setContent: `
        <p>
          To form a |circle|, the |line| must be |rotated| to the |maximum| |angle|.
        </p>
      `,
      modifiers: {
        maximum: click(diag.rotateTo, [diag, Math.PI * 1.999, 1], colors.action),
        circle: click(diag.pulseArc, [diag], colors.circle),
        angle: click(diag.pulseAngle, [diag], colors.angleText),
        rotated: click(diag.pushRadius, [diag], colors.action),
        line: click(diag.pulseRadius, [diag], colors.radius),
      },
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'center', Math.PI * 1.999);
      },
      showOnly: [
        circle,
        circle._radius,
        circle._arc,
        circle._reference,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('center', Math.PI * 1.999);
      },
    });
    this.addSection({
      setContent: centerV(`
        <p class="lesson__diagram_text_p_width_50">
          |Rotating| the line any |angle| less than maximum, will only form part of a circle.
        </p>
        <p>
          This part is named an |arc|.
        </p>
        <p class="lesson__diagram_text_p_width_50">
          The name |arc1| comes from the |Latin| word |arcus| and means a |bow| or |arch|.
        </p>
      `),
      modifiers: {
        Rotating: click(diag.rotateToRandom, [diag], colors.action),
        arc: click(diag.pulseArc, [diag], colors.circle),
        arc1: clickWord('arc', 'id_arc', diag.pulseArc, [diag], colors.circle),
        angle: click(diag.pulseAngle, [diag], colors.angleText),
        Latin: highlight('latin'),
        arcus: highlight('latin'),
        bow: highlight('english'),
        arch: highlight('english'),
      },
      transitionFromPrev: (done) => {
        diag.transitionCircle(done, 'mostRight');
      },
      blank: ['fromPrev'],
      showOnly: [
        circle,
        circle._radius,
        circle._arc,
        circle._reference,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('mostRight');
      },
    });

    this.addSection({
      setContent: () => centerV(`
          <p>
            So |angle| describes the sharpness of a corner, and the amount of a circle, or |arc| that is drawn.
          </p>
          <p>
            A |small angle| results in a sharp corner, and short arc.
          </p>
          <p>
            A |large angle| results in a less sharp corner, and long arc.
          </p>
        `),
    });
    this.addSection({
      title: 'How to Measure?',
      setContent: () => centerVH(`
          <p>
            How do we |measure| angle?
          </p> 
        `),
    });
    this.addSection({
      setContent: () => `
        <p>
          One way, is to |divide| the circle into |portions|.
        </p>
        <p class="lesson__diagram_text_p_width_50">
          For example, here are |12 equal portions| like a clock.
        </p>
        `,
      modifiers: {
        portions: click(diag.pulseRadialLines, [diag], colors.radialLines),
      },
      setEnterState: () => {
        diag.updateRotation();
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._radialLinesA,
      ],
      show: [
        circle._angle,
      ],

      transitionFromNext: (done) => {
        diag.transitionCircle(done, 'right');
      },
      setSteadyState: () => {
        diag.resetCircle('right');
      },
    });

    this.addSection({
      setContent: () => `
        <p>
          Now, as you |rotate| the line to change the |angle|, you can count how many portions there are.
        </p>
        <p>Try different portion sizes:
          <ul>
            <li>|_12_Portions|</li>
            <li>|_100_Portions|</li>
          </ul>
        </p>
        `,
      modifiers: {
        rotate: click(diag.rotateToRandom, [diag, 1], colors.action),
        angle: click(diag.pulseAngle, [diag], colors.angleText),
        _12_Portions: toHTML('12 Portions', 'id_12p', 'portions_selected'),
        _100_Portions: toHTML('100 Portions', 'id_100p'),
      },
      setEnterState: () => {
        diag.toggleRadialLines(0);
        diag.updateRotation();
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        diag._angleText,
        circle._radialLinesA,
      ],
      show: [
        circle._angle,
      ],
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'right', layout.circle.angle.large);
      },
      setSteadyState: () => {
        circle.setPosition(layout.circle.right);
        diag._angleText.showAll();
        diag._angleText._units.drawingObject.element.innerHTML = 'portions';
        diag._angleText.transform.updateTranslation(layout.angleEqualsText.left);
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
        onClickId('id_12p', diag.toggler, [diag, 0]);
        onClickId('id_100p', diag.toggler, [diag, 1]);
      },
    });

    this.addSection({
      title: 'Degrees',
      setContent: () => centerV(`
          <p>
            So how many portions should we use?
          </p>
          <p>
            There are two common practices. The first is dividing into |360| portions.
          </p>
          <p>
            Each portion is usually called a |degree| and is represented by the symbol |&deg;|.
          </p>
        `),
    });

    this.addSection({
      setContent: () => centerV(`
          <p>
            The word |degree| comes from |Latin|:
          </p>
          <ul>
            <li>|de|: |down|</li>
            <li>|gradus|: |step|</li>
          </ul>
          <p>
            So 360 degrees (360&deg;) is the same as saying there are 360 smaller steps or pieces.
          </p>
        `),
      modifiers: {
        degree: highlight('english'),
        Latin: highlight('latin'),
        de: highlight('latin'),
        down: highlight('english'),
        gradus: highlight('latin'),
        step: highlight('english'),
      },
    });

    this.addSection({
      setContent: () => centerV(`
          <p>|Why choose 360?| </p>
          <p>If you were defining it today, you could choose anything!</p>
          <p>But angle is a concept people have worked on and understood for thousands of years.</p>
          <p>For instance, Babylonians divided a circle into 360 portions |over 3000 years ago|.</p>
        `),
    });

    this.addSection({
      setContent: () => centerV(`
          <p>So |why did they| choose 360?</p>
          <p>It's not known, but one reason might be |360 is an easy number to work with| when you don't have a calculator.</p>
          <p>360 has a lot of numbers that can divide into it without a remainder:</p>
          <ul>
            <li>|_factors|</li>
          </ul>
        `),
      modifiers: {
        _factors: highlightWord('1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360', 'lesson__diagram_text_small'),
      },
    });

    this.addSection({
      setContent: () => `
          <p>This means it's easy to work with fractions of a circle.</p>
          <ul style="margin-top:15%;margin-left:15%">
                <li>${String.fromCharCode(190)} circle =   |_270deg|</li>
                <li>${String.fromCharCode(8532)} circle = |_240deg|</li>
                <li>${String.fromCharCode(189)} circle = |_180deg|</li>
                <li>${String.fromCharCode(8531)} circle = |_120deg|</li>
                <li>${String.fromCharCode(188)} circle = |_90deg|</li>
                <li>${String.fromCharCode(8533)} circle = |_72deg|</li>
                <li>${String.fromCharCode(8537)} circle = |_60deg|</li>
          </ul>
        `,
      modifiers: {
        _270deg: actionWord('270&deg;', 'id_270', colors.diagram.text.keyword),
        _240deg: actionWord('240&deg;', 'id_240', colors.diagram.text.keyword),
        _180deg: actionWord('180&deg;', 'id_180', colors.diagram.text.keyword),
        _120deg: actionWord('120&deg;', 'id_120', colors.diagram.text.keyword),
        _90deg: actionWord('90&deg;', 'id_90', colors.diagram.text.keyword),
        _72deg: actionWord('72&deg;', 'id_72', colors.diagram.text.keyword),
        _60deg: actionWord('60&deg;', 'id_60', colors.diagram.text.keyword),
      },
      setEnterState: () => {
        diag.updateRotation();
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
      ],
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'right');
      },
      setSteadyState: () => {
        diag.resetCircle('right');
        diag._angleText.transform.updateTranslation(layout.angleEqualsText.top);
        diag.showDegrees();
        const bindArray = deg => [diag, deg / 180 * Math.PI, 0, 1, () => {}];
        onClickId('id_angle', diag.pulseAngle, [diag]);
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
        onClickId('id_270', diag.rotateTo, bindArray(270));
        onClickId('id_240', diag.rotateTo, bindArray(240));
        onClickId('id_180', diag.rotateTo, bindArray(180));
        onClickId('id_120', diag.rotateTo, bindArray(120));
        onClickId('id_90', diag.rotateTo, bindArray(90));
        onClickId('id_72', diag.rotateTo, bindArray(72));
        onClickId('id_60', diag.rotateTo, bindArray(60));
      },
    });

    this.addSection({
      title: 'Radians',
      setContent: centerVH(`
        <p>
        The second common way to measure angle is |relative to the radius|.
        </p>
      `),
    });

    this.addSection({
      setContent: `
        <p>
        Instead of thinking of angle as |portions_of_a_circle|, we can think of it as how many |radius_lengths_make_up_the_arc|.
        </p>
      `,
      modifiers: {
        portions_of_a_circle: click(diag.toggleDegreesRadians, [diag, 'deg'], colors.action),
        radius_lengths_make_up_the_arc: click(diag.toggleDegreesRadians, [diag, 'rad'], colors.action),
      },
      setEnterState: () => {
        diag.updateRotation();
        diag._angleText.transform.updateTranslation(layout.angleEqualsText.leftCenter);
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
      ],
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'right');
      },
      setSteadyState: () => {
        diag.resetCircle('right');
        diag.showDegrees();
        diag.updateRotation();
      },
    });

    this.addSection({
      setContent: `
        <p>
          Rotate the |line|, till the |arc_length| is the |same| as the |radius_length|.
        </p>
        <p>
          This |angle| is called a |radian|.
        </p>
      `,
      modifiers: {
        line: click(diag.pulseRadius, [diag], colors.radius),
        arc_length: click(diag.pulseArc, [diag], colors.arc),
        same: click(diag.rotateTo, [diag, 1, 2, 2], colors.action),
        radius_length: click(diag.pulseRadiusOnArc, [diag, 1], colors.radiusLight),
        angle: click(diag.pulseAngle, [diag], colors.angle),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
        circle._radiusOnArc,
      ],
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'right');
      },
      setSteadyState: () => {
        diag.resetCircle('right');
      },
    });
    this.addSection({
      setContent: `
        <p style="margin-top:10%">
          So we can see when the angle is:
          <ul>
            <li>|one_radian|: </li>
            <li class="lesson__li_indent">|arc_length| = |one| |radius_length|</li>
            <li>|two_radians|: </li>
            <li class="lesson__li_indent">|arc_length| = |two| |radius_lengths|</li>
            <li>|five_radians|: </li>
            <li class="lesson__li_indent">|arc_length| = |five| |radius_lengths|</li>
          </ul>
        </p>
        <p style="margin-top:7%">
          Or in general:
        </p>
      `,
      modifiers: {
        arc_length: highlight('arc_length_text'),
        radius_lengths: highlight('radius_length_text'),
        radius_length: highlight('radius_length_text'),
        one: highlightWord('1', 'angle_text'),
        two: highlightWord('2', 'angle_text'),
        five: highlightWord('5', 'angle_text'),
        one_radian: toHTML('1 radian', 'id_1_rad', '', colors.angle),
        two_radians: toHTML('2 radians', 'id_2_rad', '', colors.angle),
        five_radians: toHTML('5 radians', 'id_5_rad', '', colors.angle),
      },
      setEnterState: () => {
        diag.arcEqn.setPosition(layout.arcEquation.leftBottom);
        diag.arcEqn.scale(layout.arcEquation.scale);
        diag.arcEqn.setCurrentForm('arc');
      },
      blank: [
        'fromPrev',
        'toNext',
      ],
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
        circle._radiusOnArc,
      ],
      transitionFromAny: (done) => {
        diag.transitionCircle(done, 'middleMostRight');
      },
      setSteadyState: () => {
        diag.arcEqn.render();
        diag.resetCircle('middleMostRight');
        function rotateToAndPulse(angle: number, num: number) {
          diag.rotateTo(angle, 2, 1.5, diag.pulseRadiusOnArc.bind(diag, num));
        }
        onClickId('id_1_rad', rotateToAndPulse, [this, 1, 1]);
        onClickId('id_2_rad', rotateToAndPulse, [this, 2, 2]);
        onClickId('id_5_rad', rotateToAndPulse, [this, 5, 5]);

        diag._arcEquation._angle.onClick = diag.pulseAngle.bind(diag);
        diag._arcEquation._radius.onClick = diag.pulseRadius.bind(diag);
        diag._arcEquation._arc.onClick = diag.pulseArc.bind(diag);
      },
      transitionToNext: (done) => {
        circle.hideAll();
        diag._arcEquation.animateTranslationTo(layout.arcEquation.centerTop, 1.5, done);
      },
    });

    this.addSection({
      setContent: centerVH(`
        <p>
          This is |only| true when angle is expressed in |radians|.
        </p>
        <p>
          This is |not| true for |other units|, such as degrees.
        </p>
      `),
      setEnterState: () => {
        diag.arcEqn.setPosition(layout.arcEquation.centerTop);
        diag.arcEqn.scale(layout.arcEquation.scale);
        diag.arcEqn.setCurrentForm('arc');
      },
      blank: [
        'fromPrev',
      ],
      setSteadyState: () => {
        diag.arcEqn.render();
      },
    });
    this.addSection({
      title: 'Radians in a Circle',
      setContent: `
        <p style="margin-top: 5%;text-align:center">
          How many radians are there in a half circle and full circle?
        </p>
        <ul style="margin-top: 23%">
        <li style="margin-top: 4%">A |half_circle| has about 3.14 radians.</li>
        <li style="margin-top: 4%">A |full_circle| has about 6.28 radians.</li>
        </ul>
      `,
      modifiers: {
        half_circle: click(diag.rotateTo, [diag, Math.PI], colors.action),
        full_circle: click(diag.rotateTo, [diag, Math.PI * 1.999], colors.action),
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
        circle._radiusOnArc,
      ],
      setSteadyState: () => {
        diag.resetCircle('middleMostRight');
        diag._angleText.setPosition(layout.angleEqualsText.bottomMostRight);
        diag.showRadians();
        diag.updateRotation();
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
      },
    });
    this.addSection({
      setContent: centerV(`
        <p>
          Saying a half circle has |3.14| radians is a |rough approximation|.
        </p>
        <p>
          Actually, the digits after the 3 go on forever.
        </p>
        <p>
          A more accurate |approximation| is |3.141593...|
        </p>
        <p>
          An even more accurate |approximation| is |3.14159265359...|
        </p>
      `),
    });

    // TODO include how to calculate this number here

    this.addSection({
      title: 'Why Use Radians?',
      setContent: centerV(`
        <p>
          At first glance, dividing a circle into |6.283185...| portions isn't as convenient as dividing it into |360|.
        </p>
        <p>
          A radian is a big portion, and there are plenty of applications that will require a |fraction of a radian|.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          For example, if you want to use the angle of a |quarter circle|, instead of a simple calculation in degrees:
        </p>
        <p style="text-align: center">|360 ${String.fromCharCode(247)} 4 = 90|</p>
        <p>you might need to use a calculator for radians:</p>
        <p style="text-align: center">|6.283185... ${String.fromCharCode(247)} 4 = 1.570796...|</p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          In addition, a circle cannot be divided |evenly| in radians without a remainder. 
        </p>
        <p>
          |6| radians go into a circle, but we are left with |0.283185... radians remaining|.
        </p>
      `),
    });
    this.addSection({
      setContent: `
        <p style="margin-top: 10%">
          But as radians relate |angle|, |radius| and |arc_length|, it means you can calculate one property from the other two.
        </p>
        <p style="margin-top: 28%">
          This means, you only need to |measure the two easiest properties|, to have all three.
        </p>
      `,
      modifiers: {
        angle: click(diag.animateEquation, [diag, 'angle', layout.arcEquation.scale, 0.7, 0.3, 0.4], colors.angle),
        radius: click(diag.animateEquation, [diag, 'radius', layout.arcEquation.scale, 0.7, 0.3, 0.4], colors.radius),
        arc_length: click(diag.animateEquation, [diag, 'arc', layout.arcEquation.scale, 0.7, 0.3, 0.4], colors.arc),
      },
      setEnterState: () => {
        diag.arcEqn.setPosition(layout.arcEquation.center);
        diag.arcEqn.scale(layout.arcEquation.scale);
        diag.arcEqn.setCurrentForm('arc');
      },
      setSteadyState: () => {
        diag.arcEqn.render();

        diag._arcEquation._angle.onClick =
          diag.animateEquation.bind(diag, 'angle', layout.arcEquation.scale, 0.7, 0.3, 0.4);
        diag._arcEquation._radius.onClick =
          diag.animateEquation.bind(diag, 'radius', layout.arcEquation.scale, 0.7, 0.3, 0.4);
        diag._arcEquation._arc.onClick =
          diag.animateEquation.bind(diag, 'arc', layout.arcEquation.scale, 0.7, 0.3, 0.4);
      },
    });
    this.addSection({
      setContent: centerVH(`
        <p>
          This is |very powerful|. 
        </p>
        <p>
          So powerful that people work with radians |all the time|.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        
        <p>
          One way to make it easier to work with, is to substitue the approximate value |3.14159...| with a |symbol| when showing or writing angles. 
        </p>
        <p>
          Most commonly, the Greek letter |&pi;| is used as this symbol (pronounced pi).
        </p>
        `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          Instead of saying there are |3.14159... radians| in a |half circle|, you can simply say there are |&pi; radians|.
        </p>
        <p>
          Instead of saying there are |6.28319... radians| in a |circle|, you say there are |2&pi; radians|.
        </p>
        <p>
          The number is only used when a calculation needs to be done.
        </p>
      `),
    });
    this.addSection({
      title: 'Common Angles',
      setContent: () => {
        const fraction = (id: string, numerator: string, denominator: string) => {
          const eqn = new HTMLEquation(`${id}`);
          eqn.createEq([eqn.frac(numerator, denominator)]);
          return eqn.render();
        };
        const _3piOn2 = fraction('id_3pi_2', '3&pi;', '2');
        const _2piOn3 = fraction('id_2pi_3', '2&pi;', '3');
        const _piOn2 = fraction('id_pi_2', '&pi;', '2');
        return `
          <p>
            Some common angles in degrees and radians.
          </p>
          <table class="lesson__table lesson__common_angles_table">
            <tr>
              <td></td><td><div class="lesson__deg_title">degrees</div></td><td><div class="lesson__rad_title">radians</div></td>
            </tr>
            <tr>
              <td>Full circle:</td><td>|_360deg|</td><td>|_2pi|</td>
            </tr>
            <tr>
              <td>Three quarter circle:</td><td>|_270deg|</td><td>${_3piOn2}</td>
            </tr>
            <tr>
              <td>Half circle:</td><td>|_180deg|</td><td>|_pi|</td>
            </tr>
            <tr>
              <td>One third circle:</td><td>|_120deg|</td><td>${_2piOn3}</td>
            </tr>
            <tr>
              <td>One quarter circle:</td><td>|_90deg|</td><td>${_piOn2}</td>
            </tr>
          </table>
        `;
      },
      modifiers: {
        _2pi: actionWord('2&pi;', 'id_2pi', colors.action),
        _pi: actionWord('&pi;', 'id_pi', colors.action),
        _360deg: actionWord('360', 'id_360a', colors.diagram.text.keyword),
        _270deg: actionWord('270', 'id_270a', colors.diagram.text.keyword),
        _180deg: actionWord('180', 'id_180a', colors.diagram.text.keyword),
        _120deg: actionWord('120', 'id_120a', colors.diagram.text.keyword),
        _90deg: actionWord('90', 'id_90a', colors.diagram.text.keyword),
      },
      setEnterState: () => {
        diag.updateRotation();
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('middleMostRight');
        diag._angleText.transform.updateTranslation(layout.angleEqualsText.bottomMostRightDeg);
        diag.showDegrees();
        const rotateDeg = (angle: number) => {
          diag.hideRadians();
          diag.showDegrees();
          diag.rotateTo(angle / 180 * Math.PI, 2, 1);
        };
        const rotateRad = (angle: number) => {
          diag.hideDegrees();
          diag.showRadians();
          diag.rotateTo(angle / 180 * Math.PI, 2, 1);
        };
        onClickId('id_angle', diag.pulseAngle, [diag]);
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
        onClickId('id_360a', rotateDeg, [diag, 359.99]);
        onClickId('id_270a', rotateDeg, [diag, 270]);
        onClickId('id_180a', rotateDeg, [diag, 180]);
        onClickId('id_120a', rotateDeg, [diag, 120]);
        onClickId('id_90a', rotateDeg, [diag, 90]);
        onClickId('id_2pi', rotateRad, [diag, 359.99]);
        onClickId('id_3pi_2', rotateRad, [diag, 270]);
        onClickId('id_pi', rotateRad, [diag, 180]);
        onClickId('id_2pi_3', rotateRad, [diag, 120]);
        onClickId('id_pi_2', rotateRad, [diag, 90]);
      },
    });
    this.addSection({
      title: 'Circle Circumference',
      setContent: `
        <p class="lesson__diagram_text_p_width_45" style="margin-top:10%">
          Let's use what we've learned about radians to calculate the |circumference| of any |circle| |we know the radius of|.
        </p>
        <p class="lesson__diagram_text_p_width_45">
          When using radians, |angle| and |radius| are related to |arc_length|:
        </p>
      `,
      modifiers: {
        circle: click(diag.pulseCircumference, [diag], colors.arcLight),
        angle: click(diag.pulseAngle, [diag], colors.angle),
        radius: click(diag.pulseRadius, [diag], colors.radius),
        arc_length: click(diag.pulseArc, [diag], colors.arc),
      },
      setEnterState: () => {
        diag.circEqn.setPosition(layout.circEquation.leftBottom);
        diag.circEqn.setCurrentForm('arc');
      },
      blank: [
        'toNext',
      ],
      showOnly: [
        circle,
        circle._radius,
        circle._circumference,
        circle._arc,
        circle._reference,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('middleMostRight');
        diag.circEqn.render();
        const circ = diag._circumferenceEquation;
        circ._angle.onClick = diag.pulseAngle.bind(diag);
        circ._radius.onClick = diag.pulseRadius.bind(diag);
        circ._arc.onClick = diag.pulseArc.bind(diag);
      },
      transitionToNext: (done) => {
        diag.toggleCircEquations(done);
      },
    });

    this.addSection({
      setContent: `
        <p class="lesson__diagram_text_p_width_45" style="margin-top:10%">
          A |circle| has an angle of |6.28|, or |2&pi; radians|.
        </p>
        <p class="lesson__diagram_text_p_width_45">
          Therefore, we can |calculate| the |circumference of any circle from just the radius|:
        </p>
      `,
      modifiers: {
        circle: click(diag.rotateTo, [diag, 1.999 * Math.PI, 1, 2], colors.arc),
        calculate: click(diag.toggleCircEquations, [diag, null], colors.action),

      },
      setEnterState: () => {
        diag.circEqn.scale(1);
        diag.circEqn.setPosition(layout.circEquation.leftBottom);
        diag.circEqn.setCurrentForm('arc');
        const t = diag._circumferenceEquation._angle.transform.t();
        if (t != null) {
          diag._circumferenceEquation._twoPi.transform
            .updateTranslation(t.add(layout.circEquation.twoPiOffset));
        }
      },
      showOnly: [
        circle,
        circle._radius,
        circle._circumference,
        circle._arc,
        circle._reference,
        diag._circumferenceEquation,
        diag._circumferenceEquation._circumference,
        diag._circumferenceEquation._equals,
        diag._circumferenceEquation._twoPi,
        diag._circumferenceEquation._radius,
        diag._circumferenceEquation._times,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('middleMostRight');
        diag.circEqn.setCurrentForm('circumference');
        const circ = diag._circumferenceEquation;
        circ._angle.onClick = diag.pulseAngle.bind(diag);
        circ._radius.onClick = diag.pulseRadius.bind(diag);
        circ._arc.onClick = diag.pulseArc.bind(diag);
        circ._r.onClick = diag.pulseRadius.bind(diag);
        circ._c.onClick = diag.pulseCircumference.bind(diag);
        circ._circumference.onClick = diag.pulseCircumference.bind(diag);
        circ._twoPi.onClick = diag.rotateTo.bind(diag, 1.999 * Math.PI, 1, 2);
        circ._equals.onClick = diag.toggleCircEquations.bind(diag, null);
      },
      setLeaveState: () => {
        const circ = diag._circumferenceEquation;
        circ._angle.onClick = null;
        circ._radius.onClick = null;
        circ._arc.onClick = null;
        circ._r.onClick = null;
        circ._c.onClick = null;
        circ._circumference.onClick = null;
        circ._twoPi.onClick = null;
        circ._equals.onClick = null;
      },
    });
    this.addSection({
      title: 'Summary',
      setContent: `
        <p class="lesson__font_0p7" style="margin-top: 4.5%">
          There are 2 common ways to measure |angle|.
        </p>
        <ul>
          <li  class="lesson__font_0p6">
            |degrees| - useful for simple angle calculations
          </li>
          <li  class="lesson__font_0p6">
            |radians| - useful for relating |radius| and |arc| length
          </li>
        </ul>
        <p class="lesson__diagram_text_p_width_55 lesson__font_0p7" style="margin-top:4.5%">
          There are |_360_degrees| in a full circle.
        </p>
        <p class="lesson__diagram_text_p_width_55 lesson__font_0p7" style="margin-top:4.5%">
          There are |_2pi_radians| in a full circle.
        </p>
        <p class="lesson__diagram_text_p_width_50 lesson__font_0p7" style="margin-top:4.5%">
          The |arc_length| of a |one_radian_angle| is |equal| to the |radius_|.
        </p>
        <p class="lesson__diagram_text_p_width_55 lesson__font_0p7" style="margin-top:4.5%">
          When using radians:
        </p>
        <p class="lesson__diagram_text_p_width_55 lesson__font_0p7" style="margin-top:8%">
          Which leads to:
        </p>
      `,
      modifiers: {
        angle: click(diag.pulseAngle, [diag], colors.angle),
        radius: click(diag.pulseRadius, [diag], colors.radius),
        radius_: click(diag.pulseRadius, [diag], colors.radius),
        arc: click(diag.pulseArc, [diag], colors.arc),
        arc_length: click(diag.pulseArc, [diag], colors.arc),
        degrees: clickWord('degrees', 'id_deg_toggle', diag.summaryAngleToggler, [diag, 'deg']),
        radians: clickWord('radians', 'id_rad_toggle', diag.summaryAngleToggler, [diag, 'rad']),
        _360_degrees: toHTML('360&deg;', 'id_360_deg', '', colors.degrees),
        _2pi_radians: toHTML('2&pi; radians', 'id_2pi_rad', '', colors.radians),
        equal: click(diag.summaryShowRadiusAsArc, [diag, 'rad'], colors.action),
        one_radian_angle: click(diag.summaryRotateToRad, [diag, 1], colors.angle),
      },
      setEnterState: () => {
        diag._angleText.setPosition(layout.angleEqualsText.summary);

        diag.arcEqn.scale(layout.arcEquation.summaryScale);
        diag.arcEqn.setPosition(layout.arcEquation.summary);
        diag.arcEqn.setCurrentForm('arc');

        diag.circEqn.scale(layout.circEquation.summaryScale);
        diag.circEqn.setCurrentForm('circumference');
        diag.circEqn.setPosition(layout.circEquation.summary);
        const t = diag._circumferenceEquation._angle.transform.t();
        if (t != null) {
          diag._circumferenceEquation._twoPi.transform
            .updateTranslation(t.add(layout.circEquation.twoPiOffset));
        }
      },
      showOnly: [
        circle,
        circle._radius,
        circle._reference,
        circle._arc,
        diag._circumferenceEquation,
        diag._circumferenceEquation._circumference,
        diag._circumferenceEquation._equals,
        diag._circumferenceEquation._twoPi,
        diag._circumferenceEquation._radius,
        diag._circumferenceEquation._times,
      ],
      show: [
        circle._angle,
      ],
      setSteadyState: () => {
        diag.resetCircle('summary');
        diag.summaryAngleToggler('deg');

        diag.arcEqn.render();
        diag._arcEquation._angle.onClick =
          diag.animateEquation.bind(diag, 'angle');
        diag._arcEquation._radius.onClick =
          diag.animateEquation.bind(diag, 'radius');
        diag._arcEquation._arc.onClick =
          diag.animateEquation.bind(diag, 'arc');

        const circ = diag._circumferenceEquation;
        circ.onClick = diag.toggleCircEquations.bind(diag);

        onClickId('id_360_deg', diag.summaryRotateToDeg, [diag, Math.PI * 1.999]);
        onClickId('id_2pi_rad', diag.summaryRotateToRad, [diag, Math.PI * 1.999]);
        onClickId('id_angle_text', diag.pulseAngle, [diag]);
      },
      setLeaveState: () => {
        diag._circumferenceEquation.onClick = null;
      },
    });
  }
}

export default Content;
