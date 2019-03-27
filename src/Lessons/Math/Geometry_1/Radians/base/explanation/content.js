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
  actionWord,
  clickWord,
  onClickId,
} = Fig.tools.html;

const { rand } = Fig.tools.math;

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
      title: 'Radians',
      setContent: centerV([
        'The second common way to measure angle is by relating it to the |properties of a circle|.',
      ]),
    });

    this.addSection(common, {
      setContent: [
        '|Angles and circles are closely related|. A circle can be created by rotating a line to |_360|.',
      ],
      modifiers: {
        _360: clickWord('360º', 'id_360', diag.showCircle, [diag], colors.arc),
      },
      show: [
        circle._line1, circle._line2,
        // circle._angle,
        circle._degrees,
        // circle._angleText,
        circle._arc,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.setAngleMarks('degrees');
        // circle._angleText.setScenario('bottomLeft');
      },
    });

    this.addSection(common, {
      setContent: [
        'If however, the angle is |less| than 360º, then only part of the circle is created. This part is called an |arc|.',
        `${new Definition('Arc', 'Latin', ['arcus', 'bow or arch']).html('id_lesson__isosceles_definition')}`,
      ],
      modifiers: {
        less: click(diag.pushLine, [diag, null, 0, 1 , null], colors.arc),
        arc: click(diag.pulseArc, [diag], colors.arc),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        // circle._angleText,
        circle._arc,
      ],
      setSteadyState: () => {
        circle.setScenario('center');
        diag.setAngleMarks('degrees');
        // circle._angleText.setScenario('bottomLeft');
      },
    });

    this.addSection(common, {
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
      setContent: [
        '|Why do this|? Because when we use |radians|, we have a direct relationship between arc |length|, |radius| and |angle|.',
      ],
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
    let setup = () => {
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
      setContent: centerVH([
        'So how many radians are there in a |circle|?',
      ]),
    });

    this.addSection({
      setContent: [
        'We |know| the |circumference| of a circle has a length of |_2pi| times the |radius|.',
      ],
      modifiers: {
        know: click(this.showQR, [this, 'circles', 'Circumference'], colors.diagram.action),
        _2pi: highlightWord('2π', colors.angles),
        circumference: click(diag.pulseArc, [diag], colors.arc),
        radius: click(diag.pulseRadius, [diag], colors.lines),
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
      show: [ circle._arc, circle._line1 ],
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

    // this.addSection({
    //   setContent: [
    //     'So when |arc_length| equals the |circumference|, then |angle| of a circle must be |_2pi|.',
    //   ],
    //   modifiers: {
    //     circumference: highlight(colors.arc),
    //     arc_length: highlight(colors.arc),
    //     angle: highlight(colors.angles),
    //     _2pi: highlightWord('2π', colors.angles),
    //   },
    //   setSteadyState: () => {
    //     diag._arcEqnEqn.setScenario('center');
    //     diag._arcEqnEqn.showForm('1');
    //     diag._arcEqnEqn.isTouchable = true;
    //   },
    // });

    // this.addSection({
    //   setContent: centerVH([
    //     'The total angle of a circle is |2π radians|.',
    //   ]),
    // });

    this.addSection({
      setContent: [
        'We saw previously that the circle |circumference| is a little larger than |_6_radius_lengths|. This aligns well with |2π| which is approximately |6.28|.',
      ],
      modifiers: {
        _6_radius_lengths: click(diag.pulseRadianLines, [diag], colors.radianLines),
        circumference: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1, null], colors.arc),
      },
      show: [
        circle._arc, circle._radianLines, circle._angle,
        circle._line1, circle._line2, circle._angleText,
      ],
      setSteadyState: () => {
        circle._line1.setRotation(1);
        circle.setScenario('bottom');
        diag.updateAngle();
        diag.setAngleMarks('radians');
        circle._angleText.setScenario('bottom');
        circle._radians.hide();
      },
    });


    // common.show = [
    //   circle._arc, circle._angle, circle._line1, circle._line2,
    //   circle._angleText, circle._radianLines,
    // ];
    // common.setSteadyState = () => {
    //   circle.setScenario('center');
    //   diag.updateAngle();
    //   diag.setAngleMarks('radians');
    //   circle._angleText.setScenario('bottom');
    //   circle._radians.hide();
    // };
    // this.addSection(common, {
    //   setContent: [
    //     'Fractions of a circle are in radians are not as easy as degrees.',
    //   ],
    // });
    // this.addSection(common, {
    //   setContent: [
    //     'A |half_circle| has an angle of approximately |3.14 radians|, while a |full_circle| is approximately |6.28 radians|.',
    //   ],
    //   modifiers: {
    //     full_circle: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 1.5, null], colors.angles),
    //     half_circle: click(diag.pushLine, [diag, Math.PI, 0, 1.5, null], colors.angles),
    //   },
    // });

    // this.addSection({
    //   setContent: centerV([
    //     'More prescisely, the half circle has an angle of |π radians|, and full circle an angle of |2π radians|.',
    //   ]),
    //   modifiers: {
    //     circumference: click(this.showQR, [this, 'circles', 'Circumference'], colors.arc),
    //   },
    // });

    // this.addSection({
    //   setContent: centerV([
    //     'This aligns with the |relationship| between |circumference| and |radius|.',
    //     'As the |circumference length is 2π radius lengths|, and we know that each radian covers a radius length of the arc, then if follows ',
    //     'As each radian covers a radius length on the arc, then if we know the arc has 2π radius lengths (circumference), then the angle must be the same number.',
    //   ]),
    //   modifiers: {
    //     relationship: click(this.showQR, [this, 'circles', 'Circumference'], colors.arc),
    //   },
    // });

    // this.addSection({
    //   title: 'Why Use Radians?',
    //   setContent: centerV([
    //     '|So why use radians?|',
    //     'At first glance, dividing a circle into |6.283185...| portions isn\'t as convenient as dividing it into |360|.',
    //     'A radian is a big portion, and there are plenty of applications that will require a |fraction of a radian|.',
    //   ]),
    // });
    // this.addSection({
    //   setContent: centerV([
    //     'For example, if you want to use the angle of a |quarter circle|, instead of a simple calculation in degrees:',
    //     `<p style="text-align: center">|360 ${String.fromCharCode(247)} 4 = 90|</p>`,
    //     'you might need to use a calculator for radians:',
    //     `<p style="text-align: center">|6.283185... ${String.fromCharCode(247)} 4 = 1.570796...|</p>`,
    //   ]),
    // });
    // this.addSection({
    //   setContent: centerV([
    //     'In addition, a circle cannot be divided |evenly| in radians without a remainder.',
    //     '|6| radians go into a circle, but we are left with |0.283185... radians remaining|.',
    //   ]),
    // });
    // this.addSection({
    //   setContent: centerV([
    //     'But radians relate |angle|, |radius| and |arc length|.',
    //     'This means you can calculate one property from the other two.',
    //     'Thus, you only need to |measure the two easiest properties|, to have all three.',
    //   ]),
    // });

    // this.addSection({
    //   setContent: [
    //     'Lets see the relationship by looking at some examples.',
    //   ],
    //   show: [
    //     circle._arc, circle._radianLines, circle._angle,
    //     circle._line1, circle._line2, circle._angleText,
    //   ],
    //   setSteadyState: () => {
    //     circle.setScenario('center');
    //     diag.updateAngle();
    //     diag.setAngleMarks('radians');
    //     circle._angleText.setScenario('bottom');
    //     circle._radians.hide();
    //   },
    // });

    // common = {
    //   modifiers: {
    //     _1_radian: click(diag.pushLine, [diag, 1, 0, 1, null], colors.angles),
    //     _2_radians: click(diag.pushLine, [diag, 2, 0, 1, null], colors.angles),
    //     _3_radians: click(diag.pushLine, [diag, 3, 0, 1, null], colors.angles),
    //   },
    //   show: [
    //     circle._arc, circle._radianLines, circle._angle,
    //     circle._line1, circle._line2, circle._angleText,
    //     // equation,
    //   ],
    //   // transitionFromAny: (done) => {
    //   //   diag.setLineRotation(null, true, done);
    //   // },
    // };
    // setup = () => {
    //   circle.setScenario('center');
    //   diag.updateAngle();
    //   diag.setAngleMarks('radians');
    //   circle._angleText.setScenario('bottom');
    //   circle._radians.hide();
    //   equation.setScenario('top');
    // };
    // this.addSection(common, {
    //   setContent: [
    //     'At an angle of |_1_radian|:',
    //   ],
    //   setEnterState: () => {
    //     equation.setScenario('top');
    //   },
    //   transitionFromPrev: (done) => {
    //     equation.showForm('1rad');
    //     diag.setLineRotation(1, true, done);
    //   },
    //   setSteadyState: () => {
    //     setup();
    //     equation.showForm('1rad');
    //     diag.setLineRotation(1, false);
    //   },
    // });
    // this.addSection(common, {
    //   setContent: [
    //     'At an angle of |_2_radians|:',
    //   ],
    //   transitionFromPrev: (done) => {
    //     equation.showForm('2rad');
    //     diag.setLineRotation(2, true, done);
    //   },
    //   setSteadyState: () => {
    //     setup();
    //     equation.showForm('2rad');
    //     diag.setLineRotation(2, false);
    //   },
    // });
    // this.addSection(common, {
    //   setContent: [
    //     'At an angle of |_3_radians|:',
    //   ],
    //   transitionFromPrev: (done) => {
    //     equation.showForm('3rad');
    //     diag.setLineRotation(3, true, done);
    //   },
    //   setSteadyState: () => {
    //     setup();
    //     equation.showForm('3rad');
    //     diag.setLineRotation(3, false);
    //   },
    // });

    // this.addSection(common, {
    //   setContent: [
    //     'So we can generalize:',
    //   ],
    //   transitionFromPrev: (done) => {
    //     equation.showForm('3rad');
    //     equation.animateToForm('3rad1', 2, 0, done);
    //     diag.setLineRotation(3, true);
    //   },
    //   setSteadyState: () => {
    //     setup();
    //     equation.showForm('3rad1');
    //     diag.setLineRotation(3, false);
    //   },
    // });

    // this.addSection(common, {
    //   setContent: [
    //     'So we can generalize:',
    //   ],
    //   transitionFromPrev: (done) => {
    //     equation.showForm('3rad1');
    //     equation.animateToForm('general', 2, 0, done);
    //     diag.setLineRotation(3, true);
    //   },
    //   setSteadyState: () => {
    //     setup();
    //     equation.showForm('general');
    //     diag.setLineRotation(3, false);
    //   },
    // });

    // this.addSection({
    //   setContent: [
    //     'This relationship can be used to calculate |any| of the properties, but only holds when |angle| is in |radians|.',
    //   ],
    //   modifiers: {
    //     angle: highlight(colors.angles),
    //     any: click(diag.cycleEquation, [diag], colors.lines),
    //   },
    //   blankTransition: { fromPrev: true },
    //   transitionFromPrev: (done) => {
    //     equation.showForm('general');
    //     equation.animateToForm('general', 2, 0, done);
    //     diag.setLineRotation(3, true);
    //     equation.animations.new()
    //       .scenario({ target: 'center', duration: 2 })
    //       .whenFinished(done)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     equation.setScenario('center');
    //     equation.showForm('arc');
    //   },
    // });

    // this.addSection(common, {
    // })
    // this.addSection(common, {
    //   title: '',
    //   setContent: centerV([
    //     '|tester|',
    //   ]),
    //   modifiers: {
    //     tester: click(diag.bendRadius, [diag], colors.radius),
    //   },
    //   setSteadyState: () => {
    //     circle._line1.setRotation(1);
    //     diag.updateAngle();
    //     diag.bend(0.5);
    //   },
    //   show: [circle],
    // });
  }
}

export default Content;
