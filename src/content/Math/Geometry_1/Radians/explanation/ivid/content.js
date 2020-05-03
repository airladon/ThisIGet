// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
import { note } from '../../../../../common/tools/note';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonCollection from './diagramCollectionCommon';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import states from './vidstates.json';
import events from './videvents.json';
import slides from './vidslides.json';
import audio from './audio.m4a';

const {
  click,
  centerVH, centerV,
  highlightWord,
  highlight,
  style,
  // actionWord,
  // onClickId,
} = Fig.tools.html;

// const { rand } = Fig.tools.math;

const { HTMLEquation } = Fig;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.diagram.elements = new CommonCollection(this.diagram, layout);
    this.loadQRs([
      'Math/Geometry_1/Circle/base',
    ]);
    // this.diagram.recorder.events = events;
    // this.diagram.recorder.loadEvents(events, true);
    // this.diagram.recorder.loadStates(states, true);
    // this.diagram.recorder.slides = slides;
    // this.diagram.recorder.audio = new Audio(audio);
    console.log(this.diagram.recorder)
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    const equation = diag._equation;

    let common = {
      setContent: [],
      show: [],
      modifiers: {},
      // transitionFromAny: (done, fnString) => {
      //   diag.setLineRotation(null, true, fnString);
      // },
      // setSteadyState: () => {
      //   circle.setScenario('center');
      // },
    };

    // Hello and welcome to this interactive video introducing the radian. We will go through where a radian comes from and why we use it.
    // This is an interactive video, meaning if you see me interact with an element on the screen, then you can as well.
    this.addSection({
      title: 'Introduction',
      setContent: [
        style({ centerH: true, size: 1.8, top: 20 }, 'Radian'),
        style({ centerH: true, size: 0.8, top: 2 }, 'Where does it come from, and why do we use it?'),
      ],
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
      ],
      setSteadyState: () => {
        circle._line1.setRotation(1);
        circle.setScenario('title');
      },
    });

    // Lets start with two lines on top of each other. We can rotate one line while tracing its end. As we rotate the line, an arc is formed. A full rotation results in a circle.
    this.addSection({
      setContent: [
        note({ top: 90 }, '|Arc|'),
      ],
      modifiers: {
        Arc: click(diag.pulseArc, [diag], colors.arc),
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._arc,
      ],
      setSteadyState: () => {
        circle._arc.showAll();
        circle._angle.hide();
        circle._line1.setRotation(0);
        diag.updateAngle();
        circle.setScenario('center');
      },
    });

    // These two lines form an angle. We often first learn how to measure angle using degrees, where a full angle, or angle within a circle, is 360º, and all other angles a portion of that.
    this.addSection({
      setContent: [
        note({ top: 90 }, '|Arc|'),
        note({ top: 85 }, '|Angle|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], colors.arc),
        Angle: click(diag.pulseAngle, [diag], colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle, circle._arc,
      ],
      setSteadyState: () => {
        diag.accent(circle._angle);
        // circle._line1.setRotation(1);
        circle._degrees.showAll();
        circle._angleText.showAll();
        diag.setAngleTextProperties(360, 0, 'º');
        circle._angleText.setScenario('bottomDeg');
        diag.updateAngle();
        circle.setScenario('center');
      },
    });

    // Now, you could split the circle up into any number of portions and similary count them to measure the angle, but 360 is a choice of tradition that was mostly likely due to convenience. As 360 has many factors, then many fractions of a circle are also whole numbers making some calculations easier.

    // But, there are other choices of convenience we can make to measure angle. Instead of comparing the angle to a portion of a circle, we can define angle so it is easy to relate to arc length and radius. Relating these properties will enable easy calculations of one property from the others.

    // We do this 

    // Now one of the goals we have when we study a shape is to the find relationships between the properties of that shape. That way you can calculate one property from another.
    // For instance, three properties of a circle are diameter, radius and circumference. You can show that these three are related as: diameter is twice the radius. The ratio between the circumference and the diameter is π, and thus by extension the ratio between circumference and radius is 2π.
    //
    // These properties are inherent in a circle. We cannot change them, that is what they are. A circle on mars will be the same as a circle on earth. Similarly, an angle between two lines is also something that exists. However, how we measure the angle is a choice. Using 360 degrees is a choice of convenience that goes back thousands of years. 360 is a number that has many factors and therefore fractions of a circle are easy to calculate. 360º is convenient to represent different angles with minimal use of complicated fractions.
    // And so there is another choice of a different convenience to measure angle.
    // Instead of comparing the angle to the proportion of a circle, we can define it so it can easily RELATE the arc length, radius and angle.
    // So how do we do this?
    // We find the angle where the arc length is equal to the radius length.
    // This angle we call one radian. The name radian comes directly from the rdaius.
    // We then use radians as our portion to relate angle.
    // Now, the first thing we may see is that radians do not fit evenly into the circle. In fact a little over 6 radians fit into a circle. So, this does not have the same convenience as degrees, as even just the fraction of 1 circle is not necessarily easy to deal with the value of radians.
    // However, lets see what happens to arc length when we change the angle.
    // By definition, at an angle of 1 radian we have an arc length of one radius length.
    // By extension, at an angle of 2 radians, we will have an arc length of two radius lengths.
    // Similarly for 3 radians we have an arc length of 3 radius lengths.
    // In other words, the arc length is the product of radius and angle (when the angle is in radians) which we can generalize to a relationship.
    const row = (portion: string, angle: number) => `<tr><td class="topic__fraction">${portion}</td><td>|_${angle}deg|</td></tr>`;

    const rowClick = (angle: number) => click(
      diag.pushLine,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_${angle}`,
        text: `${angle}&deg;`,
      },
    );
    this.addSection({
      setContent: [
        note({ top: 90 }, '|Arc|'),
        note({ top: 85 }, '|Angle|'),
        `
          <table class="in_topic__fraction_table">
            <tr>
              <th class="topic__fraction_title"> Fraction </th>
              <th class="topic__angle_title"> Angle </th>
            </tr>
            ${row('<sup>1</sup>&frasl;<sub>2</sub>', 180)}
            ${row('<sup>1</sup>&frasl;<sub>3</sub>', 120)}
            ${row('<sup>1</sup>&frasl;<sub>4</sub>', 90)}
            ${row('<sup>1</sup>&frasl;<sub>5</sub>', 72)}
            ${row('<sup>1</sup>&frasl;<sub>6</sub>', 60)}
            ${row('<sup>1</sup>&frasl;<sub>8</sub>', 45)}
            ${row('<sup>1</sup>&frasl;<sub>9</sub>', 40)}
            ${row('<sup>1</sup>&frasl;<sub>10</sub>', 36)}
            ${row('<sup>1</sup>&frasl;<sub>12</sub>', 30)}
            ${row('<sup>1</sup>&frasl;<sub>15</sub>', 24)}
            <tr><td>\u22ee</td><td>\u22ee</td>
          </table>
        `,
      ],
      modifiers: {
        _180deg: rowClick(180),
        _120deg: rowClick(120),
        _90deg: rowClick(90),
        _72deg: rowClick(72),
        _60deg: rowClick(60),
        _45deg: rowClick(45),
        _40deg: rowClick(40),
        _36deg: rowClick(36),
        _30deg: rowClick(30),
        _24deg: rowClick(24),
        _20deg: rowClick(20),
        Arc: click(diag.pulseArc, [diag], colors.arc),
        Angle: click(diag.pulseAngle, [diag], colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._arc, circle._degrees, circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleTextProperties(360, 0, 'º');
        circle._angleText.setScenario('bottomDeg');
        diag.updateAngle();
        circle.setScenario('center');
      },
    });

    this.addSection({
      setContent: [
        style({ top: 55, centerH: true }, 'Set |arc_length| to |equal| |radius_length|'),
        note({ top: 80 }, '|Radius|'),
        note({ top: 90 }, '|Arc|'),
        note({ top: 85 }, '|Angle|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
        'radius_length': highlight(colors.lines),
        'arc_length': highlight(colors.arc),
      },
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc,
      ],
      setSteadyState: () => {
        diag.updateAngle();
        circle.setScenario('center');
      },
    });

    // Now, let's trace the end points of the rotating line.
    this.addSection({
      show: [
        circle._line1, circle._line2, circle._corner,
        // circle._angle,
      ],
      transitionFromPrev(done, doneFnString) {
        circle.setScenario('center');
        circle.animations.new()
          .trigger({ callback: 'setLineRotation', payload: 0, duration: 2 })
          .trigger({ callback: 'showArc' })
          .trigger({ callback: 'setLineRotation', payload: 2, duration: 2 })
          .whenFinished(doneFnString)
          .start();
      },
      setSteadyState: () => {
        circle._line1.setRotation(2);
        circle._arc.showAll();
        diag.updateAngle();
        circle.setScenario('center');
      },
    });

    this.addSection(common, {
      setContent: [
        '|Angles and circles are closely related| as a circle can be created by rotating a line |_360|.',
      ],
      modifiers: {
        _360: click(diag.showCircle, [diag], {
          color: colors.arc,
          text: '360º',
          id: 'id_360',
        }),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        circle._arc, circle._corner,
      ],
      transitionFromAny: (done, doneFnString) => {
        if (this.comingFrom !== 'next') {
          diag.setLineRotation(1.3, false, doneFnString);
        } else {
          diag.setLineRotation(null, true, doneFnString);
        }
      },
      setSteadyState: () => {
        if (this.comingFrom !== 'next') {
          circle._line1.setRotation(1.3);
        }
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
        less: click(diag.pushLine, [diag, null, 2, 1, null], { color: colors.arc, id: 'click_less' }),
        arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'click_arc' }),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        // circle._angleText,
        circle._arc,
      ],
      transitionFromAny: (done, doneFnString) => {
        if (this.comingFrom !== 'prev') {
          diag.setLineRotation(1.3, false, doneFnString);
        } else {
          diag.setLineRotation(null, true, doneFnString);
        }
      },
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
        arc_length: click(diag.pulseArc, [diag], { color: colors.arc, id: 'arc_pulse' }),
        radius_length: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'radius:_pulse' }),
        equal: click(this.next, [this, null], { color: colors.radianLines, id: 'equal_next' }),
      },
      setSteadyState: () => {
        circle.setScenario('center');
        diag.updateAngle();
      },
    });

    common.modifiers = {
      arc_length: click(diag.pulseArc, [diag], { color: colors.arc, id: 'arc_pulse' }),
      radius_length: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'radius_pulse' }),
      equal: click(diag.bendRadius, [diag, null], { color: colors.radianLines, id: 'equal_anim' }),
    };
    this.addSection(common, {
      transitionFromPrev: (done, doneFnString) => {
        circle._bendLine.showAll();
        diag.bendRadius(doneFnString);
      },
      setSteadyState: () => {
        // circle._line1.setRotation(1);
        diag.bendLineToEnd();
        circle.setScenario('center');
        diag.updateAngle();
        // console.log(circle._line1)
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
        portions: click(this.next, [this, null], colors.radianLines),
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
      transitionFromAny: (done) => {
        setup();
        equation.showForm('1rad');
        diag.setLineRotation(1, true, done);
      },
      setSteadyState: () => {
        // setup();
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
        if (circle._line1.getRotation() !== 3) {
          diag.setLineRotation(3, true);
        }
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
        if (circle._line1.getRotation() !== 3) {
          diag.setLineRotation(3, true);
        }
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
        know: this.qr('Math/Geometry_1/Circle/base/Circumference', colors.diagram.action),
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
        circle._line1.isInteractive = false;
        circle.setScenario('top');
        diag._circumferenceEqn.setScenario('bottom');
        diag._circumferenceEqn.showForm('0');
        diag._circumferenceEqn.isTouchable = false;
      },
      setLeaveState: () => {
        circle._line1.isTouchable = true;
        circle._line1.isInteractive = true;
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
        diag._arcEqn.setScenario('bottom');
        diag._arcEqn.showForm('0');
        diag._arcEqn.isTouchable = false;
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
        diag._arcEqn.showForm('0');
        diag._circumferenceEqn.showForm('0');
        diag._arcEqn.animateToForm('1', 1, 0, done);
      },
      show: [circle._arc, circle._line1],
      setSteadyState: () => {
        circle._line1.setRotation(Math.PI * 1.999);
        circle._line1.isTouchable = false;
        circle.setScenario('top');
        diag._circumferenceEqn.setScenario('bottom');
        diag._circumferenceEqn.showForm('0');
        diag._circumferenceEqn.isTouchable = false;
        diag._arcEqn.setScenario('bottom');
        diag._arcEqn.showForm('1');
        diag._arcEqn.isTouchable = false;
        // diag._arcEqnNav.showForm('1');
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
        diag._arcEqn.showForm('1');
        diag._arcEqn.animateToForm('2', 1, 1, done);
        diag._arcEqn.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .start();
      },
      setSteadyState: () => {
        diag._arcEqn.setScenario('center');
        diag._arcEqn.isTouchable = true;
        diag._arcEqnNav.showForm('2');
      },
    });

    this.addSection({
      setContent: [
        'We saw previously that the circle |circumference| is a little larger than |_6_radius_lengths|. This aligns well with the number |_2pi| which is approximately |_6p28|.',
      ],
      modifiers: {
        _6_radius_lengths: click(diag.pulseRadianLines, [diag], colors.radianLines),
        circumference: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.arc),
        _2pi: this.qr('Math/Geometry_1/Circle/base/Pi', {
          color: colors.angles,
          text: '2π',
          id: 'id_2pi',
        }),
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
          <table id="id_common_angles_table" class="topic__table topic__common_angles_table">
            <tr>
              <td class="topic__deg_title"><div>Degrees</div></td><td class="topic__rad_title"><div>Radians</div></td>
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
        _2pi: click(diag.pushLineRad, [diag, Math.PI * 1.999], {
          id: 'id_2pi',
        }),
        _pi: click(diag.pushLineRad, [diag, Math.PI], {
          id: 'id_pi',
        }),
        _2pi_3: click(diag.pushLineRad, [diag, Math.PI * 2 / 3], {
          id: 'id_2pi_3',
        }),
        _3pi_2: click(diag.pushLineRad, [diag, Math.PI * 3 / 2], {
          id: 'id_3pi_2',
        }),
        _pi_2: click(diag.pushLineRad, [diag, Math.PI / 2], {
          id: 'id_pi_2',
        }),
        _pi_3: click(diag.pushLineRad, [diag, Math.PI / 3], {
          id: 'id_pi_3',
        }),
        _pi_6: click(diag.pushLineRad, [diag, Math.PI / 6], {
          id: 'id_pi_6',
        }),
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
