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
import CommonCollection from '../common/diagramCollectionCommon';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerVH, centerV,
  highlightWord,
  highlight,
  // actionWord,
  clickWord,
  clickId,
  // onClickId,
} = Fig.tools.html;

// const { rand } = Fig.tools.math;

const { HTMLEquation } = Fig;

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
    this.diagram.elements = new CommonCollection(this.diagram, layout);
    this.loadQRs([
      'circles',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    const equation = diag._equation;

    let common = {
      setContent: [],
      show: [],
      modifiers: {},
      transitionFromAny: (done) => {
        diag.setLineRotation(null, true, done);
      },
      setSteadyState: () => {
        circle.setScenario('center');
      },
    };

    this.addSection({
      title: 'Introduction',
      setContent: centerV([
        'The second common way to measure angle is by relating it to the |properties of a circle|.',
      ]),
    });

    this.addSection(common, {
      setContent: [
        '|Angles and circles are closely related| as a circle can be created by rotating a line |_360|.',
      ],
      modifiers: {
        _360: clickWord('360º', 'id_360', diag.showCircle, [diag], colors.arc),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        circle._arc,
      ],
      setSteadyState: () => {
        circle.setScenario('centerSmaller');
        diag.setAngleMarks('degrees');
        // circle._angleText.setScenario('bottomLeft');
      },
    });

    this.addSection(common, {
      setContent: [
        'If however, the angle is |less| than 360º, then only part of the circle is created. This part is called an |arc|.',
        `${new Definition('Arc', 'Latin', ['arcus', 'bow or arch']).html(colors.arc)}`,
      ],
      modifiers: {
        less: click(diag.pushLine, [diag, null, 2, 1, null], colors.arc),
        arc: click(diag.pulseArc, [diag], colors.arc),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        // circle._angleText,
        circle._arc,
      ],
      setSteadyState: () => {
        circle.setScenario('centerSmaller');
        diag.setAngleMarks('degrees');
        // circle._angleText.setScenario('bottomLeft');
      },
    });

    this.addSection(common, {
      title: 'Radian',
      setContent: centerV([
        'Now, instead of measuring |angle| by dividing a full rotation into 360 equal pieces, we can |relate| it to the |radius| of a circle and |arc length|.',
      ]),
    });

    common.show = [
      circle._line1, circle._line2, circle._arc,
      // circle._angleText,
    ];
    common.setContent = [
      'To do this, we find the angle where the |arc_length| and |radius_length| are |equal|.',
    ];
    common.setSteadyState = () => {
      circle.setScenario('center');
      diag.updateAngle();
    };

    this.addSection(common, {
      modifiers: {
        arc_length: click(diag.pulseArc, [diag], colors.arc),
        radius_length: click(diag.pulseRadius, [diag], colors.lines),
        equal: click(this.next, [this], colors.radianLines),
      },
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
      },
    });

    common.modifiers = {
      arc_length: click(diag.pulseArc, [diag], colors.arc),
      radius_length: click(diag.pulseRadius, [diag], colors.lines),
      equal: click(diag.bendRadius, [diag, null], colors.radianLines),
    };
    this.addSection(common, {
      transitionFromPrev: (done) => {
        circle._bendLine.showAll();
        diag.bendRadius(done);
      },
      setSteadyState: () => {
        diag.bend(1);
        circle._line1.setRotation(1);
        circle.setScenario('center');
        diag.updateAngle();
      },
    });

    common.modifiers = {
      radian: click(diag.goToOneRadian, [diag], colors.angles),
    };
    this.addSection(common, {
      setContent: [
        'This angle is called a |radian|, whose name comes from |radius|.',
      ],
      show: [
        circle._line1, circle._line2, circle._arc, circle._angle,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        circle._radianLines._line0.showAll();
        diag.bend(1);
        diag.updateAngle();
      },
    });

    common.setContent = ['We then use a |radian| as our |portions| to measure angle.'];
    common.setSteadyState();
    this.addSection(common, {
      modifiers: {
        radian: click(diag.goToOneRadian, [diag], colors.angles),
        portions: click(this.next, [this], colors.radianLines),
      },
      show: [
        circle._line1, circle._line2, circle._angle,
        circle._arc,
        circle._radianLines._line0,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
      },
    });

    this.addSection(common, {
      modifiers: {
        radian: click(diag.goToOneRadian, [diag], colors.angles),
        portions: click(diag.appearRadianLines, [diag, null], colors.radianLines),
      },
      show: [
        circle._line1, circle._line2, circle._angle,
        circle._arc,
        circle._radianLines,
      ],
      transitionFromPrev: (done) => {
        diag.appearRadianLines(done);
      },
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
        circle._angleText.showAll();
        diag.setAngleMarks('radians');
        circle._angleText.setScenario('bottom');
        circle._radians.hide();
      },
    });

    this.addSection(common, {
      title: 'Arc, Angle, Radius Relationship',
      setContent: [
        '|Why do this?| Because when we use |radians|, we have a direct relationship between |arc_length|, |radius| and |angle|.',
      ],
      modifiers: {
        arc_length: highlight(colors.arc),
        radius: highlight(colors.lines),
        angle: highlight(colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._angle,
        circle._arc,
        circle._radianLines,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
        circle._angleText.showAll();
        diag.setAngleMarks('radians');
        circle._angleText.setScenario('bottom');
        circle._radians.hide();
      },
    });

    this.addSection({
      setContent: [
        'Lets see the relationship by looking at some examples.',
      ],
      show: [
        circle._arc, circle._radianLines, circle._angle,
        circle._line1, circle._line2, circle._angleText,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
        diag.setAngleMarks('radians');
        circle._angleText.setScenario('bottom');
        circle._radians.hide();
      },
    });

    common = {
      modifiers: {
        _1_radian: click(diag.pushLine, [diag, 1, 0, 1, null], colors.angles),
        _2_radians: click(diag.pushLine, [diag, 2, 0, 1, null], colors.angles),
        _3_radians: click(diag.pushLine, [diag, 3, 0, 1, null], colors.angles),
      },
      show: [
        circle._arc, circle._radianLines, circle._angle,
        circle._line1, circle._line2, circle._angleText,
        // equation,
      ],
      // transitionFromAny: (done) => {
      //   diag.setLineRotation(null, true, done);
      // },
    };
    const setup = () => {
      circle.setScenario('center');
      diag.updateAngle();
      diag.setAngleMarks('radians');
      circle._angleText.setScenario('bottom');
      circle._radians.hide();
      equation.setScenario('top');
    };
    this.addSection(common, {
      setContent: [
        'At an angle of |_1_radian|:',
      ],
      setEnterState: () => {
        equation.setScenario('top');
      },
      transitionFromPrev: (done) => {
        equation.showForm('1rad');
        diag.setLineRotation(1, true, done);
      },
      setSteadyState: () => {
        setup();
        equation.showForm('1rad');
        diag.setLineRotation(1, false);
      },
    });
    this.addSection(common, {
      setContent: [
        'At an angle of |_2_radians|:',
      ],
      transitionFromPrev: (done) => {
        equation.showForm('2rad');
        diag.setLineRotation(2, true, done);
      },
      setSteadyState: () => {
        setup();
        equation.showForm('2rad');
        diag.setLineRotation(2, false);
      },
    });
    this.addSection(common, {
      setContent: [
        'At an angle of |_3_radians|:',
      ],
      transitionFromPrev: (done) => {
        equation.showForm('3rad');
        diag.setLineRotation(3, true, done);
      },
      setSteadyState: () => {
        setup();
        equation.showForm('3rad');
        diag.setLineRotation(3, false);
      },
    });

    this.addSection(common, {
      setContent: [
        'So we can generalize:',
      ],
      transitionFromPrev: (done) => {
        equation.showForm('3rad');
        equation.animateToForm('3rad1', 2, 0, done);
        diag.setLineRotation(3, true);
      },
      setSteadyState: () => {
        setup();
        equation.showForm('3rad1');
        diag.setLineRotation(3, false);
      },
    });

    this.addSection(common, {
      setContent: [
        'So we can generalize:',
      ],
      transitionFromPrev: (done) => {
        equation.showForm('3rad1');
        equation.animateToForm('general', 2, 0, done);
        diag.setLineRotation(3, true);
      },
      setSteadyState: () => {
        setup();
        equation.showForm('general');
        diag.setLineRotation(3, false);
      },
    });

    this.addSection({
      setContent: [
        'So when we use |radians| as our angle measurement, we have a simple |relationship| between , |angle|, |arc_length| and |radius|, where |any| property can be calculated from the other two.',
      ],
      modifiers: {
        angle: click(diag.goToAngleForm, [diag], colors.angles),
        arc_length: click(diag.goToArcForm, [diag], colors.arc),
        radius: click(diag.goToRadiusForm, [diag], colors.lines),
        any: click(diag.cycleEquation, [diag], colors.lines),
      },
      blankTransition: { fromPrev: true },
      transitionFromPrev: (done) => {
        equation.showForm('general');
        equation.animateToForm('general', 2, 0, done);
        diag.setLineRotation(3, true);
        equation.animations.new()
          .scenario({ target: 'center', duration: 2 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        equation.setScenario('center');
        equation.showForm('arc');
      },
    });

    this.addSection({
      title: 'Radians in a Circle',
      setContent: centerVH([
        'So how many radians are there in a |circle|?',
      ]),
    });

    this.addSection({
      setContent: [
        'We |know| the |circumference| of a circle is |_2pi| |radius_lengths|.',
      ],
      modifiers: {
        know: click(this.showQR, [this, 'circles', 'Circumference'], colors.diagram.action),
        _2pi: highlightWord('2π', colors.angles),
        circumference: click(diag.pulseArc, [diag], colors.arc),
        radius_lengths: click(diag.pulseRadius, [diag], colors.lines),
      },
      show: [
        circle._arc, circle._line1,
      ],
      setSteadyState: () => {
        circle._line1.setRotation(Math.PI * 1.999);
        circle._line1.isTouchable = false;
        circle.setScenario('top');
        diag._circumferenceEqn.setScenario('bottom');
        diag._circumferenceEqn.showForm('0');
        diag._circumferenceEqn.isTouchable = false;
      },
      setLeaveState: () => {
        circle._line1.isTouchable = true;
      },
    });

    this.addSection({
      setContent: [
        'We also know the |arc_length| is the product of |angle| and |radius|.',
      ],
      modifiers: {
        angle: highlight(colors.angles),
        arc_length: click(diag.pulseArc, [diag], colors.arc),
        radius: click(diag.pulseRadius, [diag], colors.lines),
      },
      show: [circle._arc, circle._line1],
      setSteadyState: () => {
        circle._line1.setRotation(Math.PI * 1.999);
        circle._line1.isTouchable = false;
        circle.setScenario('top');
        diag._circumferenceEqn.setScenario('bottom');
        diag._circumferenceEqn.showForm('0');
        diag._circumferenceEqn.isTouchable = false;
        diag._arcEqnEqn.setScenario('bottom');
        diag._arcEqnEqn.showForm('0');
        diag._arcEqnEqn.isTouchable = false;
      },
      setLeaveState: () => {
        circle._line1.isTouchable = true;
      },
    });


    this.addSection({
      setContent: [
        'So when |arc_length| equals the |circumference|, then |angle| of a circle must be |_2pi|.',
      ],
      modifiers: {
        circumference: highlight(colors.arc),
        arc_length: highlight(colors.arc),
        angle: highlight(colors.angles),
        _2pi: highlightWord('2π', colors.angles),
      },
      transitionFromPrev: (done) => {
        diag._arcEqnEqn.showForm('0');
        diag._circumferenceEqn.showForm('0');
        diag._arcEqnEqn.animateToForm('1', 1, 0, done);
      },
      show: [circle._arc, circle._line1],
      setSteadyState: () => {
        circle._line1.setRotation(Math.PI * 1.999);
        circle._line1.isTouchable = false;
        circle.setScenario('top');
        diag._circumferenceEqn.setScenario('bottom');
        diag._circumferenceEqn.showForm('0');
        diag._circumferenceEqn.isTouchable = false;
        diag._arcEqnEqn.setScenario('bottom');
        diag._arcEqnEqn.showForm('1');
        diag._arcEqnEqn.isTouchable = true;
      },
      setLeaveState: () => {
        circle._line1.isTouchable = true;
      },
    });

    this.addSection({
      setContent: [
        'So when |arc_length| equals the |circumference|, then |angle| of a circle must be |_2pi|.',
      ],
      modifiers: {
        circumference: highlight(colors.arc),
        arc_length: highlight(colors.arc),
        angle: highlight(colors.angles),
        _2pi: highlightWord('2π', colors.angles),
      },
      transitionFromPrev: (done) => {
        diag._arcEqnEqn.showForm('1');
        diag._arcEqnEqn.animateToForm('2', 1, 1, done);
        diag._arcEqnEqn.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .start();
      },
      setSteadyState: () => {
        diag._arcEqnEqn.setScenario('center');
        diag._arcEqnEqn.showForm('2');
        diag._arcEqnEqn.isTouchable = true;
      },
    });

    this.addSection({
      setContent: [
        'We saw previously that the circle |circumference| is a little larger than |_6_radius_lengths|. This aligns well with the number |_2pi| which is approximately |_6p28|.',
      ],
      modifiers: {
        _6_radius_lengths: click(diag.pulseRadianLines, [diag], colors.radianLines),
        circumference: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.arc),
        _2pi: clickWord('2π', 'id_2pi', this.showQR, [this, 'circles', 'Pi'], colors.angles),
        _6p28: highlightWord('6.28', colors.angles),
      },
      show: [
        circle._arc, circle._radianLines, circle._angle,
        circle._line1, circle._line2, circle._angleText,
      ],
      setSteadyState: () => {
        circle._line1.setRotation(1);
        circle.setScenario('centerSmall');
        diag.updateAngle();
        diag.setAngleMarks('radians');
        circle._angleText.setScenario('bottom');
        circle._radians.hide();
      },
    });

    this.addSection({
      title: 'Convert between Radians and Degrees',
      setContent: centerV([
        'The |relationship| between arc length, angle and radius is very |useful| but is only valid when the angle is in |radians|.',
        'If your angle is in |degrees|, then you need to |convert| your angle to radians to use the relationship.',
        '|How| do you do this?',
      ]),
    });

    common = {
      setContent: [
        'We know a |circle| has an angle of |_360deg| and |_2pi_radians|.',
        'So to convert from |degrees to radians|, we need to find a way to convert |_360| to |_2pi|.',
      ],
      modifiers: {},
    };
    common.modifiers = {
      _360deg: highlightWord('360º', colors.degrees),
      _2pi_radians: highlightWord('2π radians', colors.radianLines),
      _360: highlight(colors.degrees),
      _2pi: highlightWord('2π', colors.radianLines),
    };
    this.addSection(common, {
      setSteadyState: () => {
        diag._radDegEqn.showForm('0');
        diag._radDegEqn.setScenario('center');
      },
    });

    this.addSection(common, {
      transitionFromPrev: (done) => {
        diag._radDegEqn.showForm('0');
        diag._radDegEqn.setScenario('center');
        diag._radDegEqn.animateToForm('1', 0.2, 0, done);
      },
      setSteadyState: () => {
        diag._radDegEqn.showForm('1');
        diag._radDegEqn.setScenario('center');
      },
    });

    common.setContent = ['To convert |_360| to |_2|, we can |divide_by_180|.'];
    common.modifiers = {
      divide_by_180: highlight(colors.arc),
      _360: highlight(colors.degrees),
      _2: highlight(colors.radianLines),
    };
    this.addSection(common, {
      setSteadyState: () => {
        diag._radDegEqn.showForm('1');
        diag._radDegEqn.setScenario('center');
      },
    });
    this.addSection(common, {
      transitionFromPrev: (done) => {
        diag._radDegEqn.showForm('1');
        // diag._radDegEqn.setScenario('center');
        diag._radDegEqn.animateToForm('2', 1, 0, done);
      },
      setSteadyState: () => {
        diag._radDegEqn.showForm('2');
        diag._radDegEqn.setScenario('center');
      },
    });

    common.setContent = ['We can then |multiply_by_pi|.'];
    common.modifiers = {
      multiply_by_pi: highlightWord('multiply by π', colors.arc),
    };
    this.addSection(common, {
      setSteadyState: () => {
        diag._radDegEqn.showForm('2');
        diag._radDegEqn.setScenario('center');
      },
    });
    this.addSection(common, {
      transitionFromPrev: (done) => {
        diag._radDegEqn.showForm('2');
        // diag._radDegEqn.setScenario('center');
        diag._radDegEqn.animateToForm('3', 2, 0, done);
      },
      setSteadyState: () => {
        diag._radDegEqn.showForm('3');
        diag._radDegEqn.setScenario('center');
      },
    });

    common.setContent = ['We can use this same |multiplier| more |generally|.'];
    common.modifiers = {
      multiplier: highlight(colors.arc),
    };
    this.addSection(common, {
      setSteadyState: () => {
        diag._radDegEqn.showForm('3');
        diag._radDegEqn.setScenario('center');
      },
    });
    this.addSection(common, {
      transitionFromPrev: (done) => {
        diag._radDegEqn.showForm('3');
        diag._radDegEqn.animateToForm('4', 2, 0, done);
      },
      setSteadyState: () => {
        diag._radDegEqn.showForm('4');
        diag._radDegEqn.setScenario('center');
      },
    });
    this.addSection(common, {
      transitionFromPrev: (done) => {
        diag._radDegEqn.showForm('4');
        diag._radDegEqn.animateToForm('5', 2, 0, done);
      },
      setSteadyState: () => {
        diag._radDegEqn.showForm('5');
        diag._radDegEqn.setScenario('center');
      },
    });

    common.setContent = ['We can rearrange this to also convert |radians| to |degrees|.'];
    common.modifiers = {
      radians: highlight(colors.radianLines),
      degrees: highlight(colors.degrees),
    };
    this.addSection(common, {
      setSteadyState: () => {
        diag._radDegEqn.showForm('5');
        diag._radDegEqn.setScenario('center');
        diag._degRadEqn.showForm('0');
        diag._degRadEqn.setScenario('center');
      },
    });

    this.addSection({
      title: 'Common Angles',
      setContent: () => {
        const fraction = (id: string, numerator: string, denominator: string) => {
          const eqn = new HTMLEquation(`${id}`, 'radian_equation interactive_word');
          eqn.createEq([eqn.frac(numerator, denominator)]);
          return eqn.render();
        };
        const charEqn = (id: string, char: string) => {
          const eqn = new HTMLEquation(`${id}`, 'radian_equation interactive_word');
          eqn.createEq([char]);
          return eqn.render();
        };
        const _3piOn2 = fraction('id_3pi_2', '3&pi;', '2');
        const _2piOn3 = fraction('id_2pi_3', '2&pi;', '3');
        const _piOn2 = fraction('id_pi_2', '&pi;', '2');
        const _piOn3 = fraction('id_pi_3', '&pi;', '3');
        const _piOn6 = fraction('id_pi_6', '&pi;', '6');
        const _pi = charEqn('id_pi', '&pi;');
        const _2pi = charEqn('id_2pi', '2&pi;');
        return `
          <p>
            Some common angles in |degrees| and |radians|.
          </p>
          <table id="id_common_angles_table" class="lesson__table lesson__common_angles_table">
            <tr>
              <td class="lesson__deg_title"><div>Degrees</div></td><td class="lesson__rad_title"><div>Radians</div></td>
            </tr>
            <tr>
              <td>|_360|</td><td>${_2pi}</td>
            </tr>
            <tr>
              <td>|_270|</td><td>${_3piOn2}</td>
            </tr>
            <tr>
              <td>|_180|</td><td>${_pi}</td>
            </tr>
            <tr>
              <td>|_120|</td><td>${_2piOn3}</td>
            </tr>
            <tr>
              <td>|_90|</td><td>${_piOn2}</td>
            </tr>
            <tr>
              <td>|_60|</td><td>${_piOn3}</td>
            </tr>
            <tr>
              <td>|_30|</td><td>${_piOn6}</td>
            </tr>
          </table>
        `;
      },
      modifiers: {
        degrees: click(diag.toggleDegrees, [diag], colors.degrees),
        radians: click(diag.toggleRadians, [diag], colors.radianLines),
        _2pi: clickId('id_2pi', diag.pushLineRad, [diag, Math.PI * 1.999]),
        _pi: clickId('id_pi', diag.pushLineRad, [diag, Math.PI]),
        _2pi_3: clickId('id_2pi_3', diag.pushLineRad, [diag, Math.PI * 2 / 3]),
        _3pi_2: clickId('id_3pi_2', diag.pushLineRad, [diag, Math.PI * 3 / 2]),
        _pi_2: clickId('id_pi_2', diag.pushLineRad, [diag, Math.PI / 2]),
        _pi_3: clickId('id_pi_3', diag.pushLineRad, [diag, Math.PI / 3]),
        _pi_6: clickId('id_pi_6', diag.pushLineRad, [diag, Math.PI / 6]),
        _360: click(diag.pushLineDeg, [diag, Math.PI * 1.999], colors.degrees),
        _270: click(diag.pushLineDeg, [diag, Math.PI * 3 / 2], colors.degrees),
        _180: click(diag.pushLineDeg, [diag, Math.PI], colors.degrees),
        _120: click(diag.pushLineDeg, [diag, Math.PI * 2 / 3], colors.degrees),
        _90: click(diag.pushLineDeg, [diag, Math.PI / 2], colors.degrees),
        _60: click(diag.pushLineDeg, [diag, Math.PI / 3], colors.degrees),
        _30: click(diag.pushLineDeg, [diag, Math.PI / 6], colors.degrees),
      },
      show: [
        circle._line1, circle._line2, circle._radianLines, circle._angle,
        circle._degrees, circle._angleText,
      ],
      setSteadyState: () => {
        circle.setScenario('right');
        diag.setAngleMarks('degrees');
        circle._angleText.setScenario('bottomRight');
      },
    });
  }
}

export default Content;
