// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
import { devNote } from '../../../../../common/tools/note';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonCollection from './diagramCollectionCommon';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import { removeClass, addClass } from '../../../../../common/tools/tools';
import states from './ividStates.json';
import events from './ividEvents.json';
// import slides from './vidslides.json';
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

const { round } = Fig.tools.math;

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
    // this.diagram.elements._circle.asdf = true;
    // console.log(this.diagram.elements.elements.circle.asdf)
    this.diagram.initialize();
    // console.log(this.diagram.elements.elements.circle.elements.line1.animationFinishedCallback);
    // this.diagram.elements.elements.circle.animationFinishedCallback = this.diagram.animationFinished.bind(this.diagram, this.diagram.elements.elements.circle);
    // console.log(this.diagram.elements.elements.circle.animationFinishedCallback);
    // console.log(this.diagram.elements.elements.circle.asdf);
    // this.diagram.elements.elements.circle.asdf = true;
    this.loadQRs([
      'Math/Geometry_1/Circle/base',
    ]);
    // this.diagram.recorder.events = events;
    // this.diagram.recorder.loadEvents(events, true);
    // this.diagram.recorder.loadStates(states, true);
    // this.diagram.recorder.slides = slides;
    // this.diagram.recorder.audio = new Audio(audio);
  }

  loadEvents() {
    this.diagram.recorder.loadAudio(new Audio(audio));
    this.diagram.recorder.loadEvents(events, true);
    this.diagram.recorder.loadStates(states, true);
    // this.diagram.recorder.states.baseReference = null;
    console.log(this.diagram.recorder)
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    // const equation = diag._equation;
    const eqn = diag._eqn;
    const radEqnNav = diag._radEqnNav;

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

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Welcome to this interactive video about the Radian. The intention is for this to be a bottom up
    // explanation about where a radian comes from and why we use it. It is
    // appropriate for anyone learning about a radian for the first time, or
    // for those that learnt about it in the past, but feel like they need
    // to understand it better.
    // Now, this is an interactive video. That means if you see me interact with
    // and element on this screen, then you can too. Just touch or drag the
    // element, the video will pause and then when you're finished press play.
    // This way, you can explore the concept more during the explanation and
    // hopefully get a better understanding of it.
    this.addSection({
      title: 'Introduction',
      setContent: [
        style({ centerH: true, size: 1.8, top: 20 }, 'Radian'),
        style({ centerH: true, size: 0.8, top: 2 }, 'Where does it come from, and why do we use it?'),
      ],
      show: [
        circle._line1, circle._line2, circle._angle, circle._corner,
      ],
      setSteadyState: () => {
        circle._line1.setScenario('default');
        circle._line2.setScenario('default');
        circle._line1.setRotation(1);
        circle.setScenario('title');
      },
    });

    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomDeg');
        diag.setAngleTextProperties(360, 0, 'º');
      },
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Circle: click(diag.pulseCircle, [diag], { color: colors.arc, id: 'note_circle' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
        Degrees: diag.bindAccent({
          elements: [circle._degrees, circle._degreesHighlight],
          scale: 1.15,
          color: colors.dull,
          id: 'note_degrees',
        }),
        Value: diag.bindAccent({ element: circle._angleText._value, scale: 2, color: colors.angles, id: 'note_value', x: 0.1 }),
      },
    };

    this.addSection(common, {
      setContent: [
        devNote({ top: 5 }, '|Angle|'),
        devNote({ top: 10 }, '|Degrees|'),
        devNote({ top: 15 }, '|Value|'),
      ],
      show: [
        circle._line1, circle._line2, circle._angle, circle._corner,
      ],
      setSteadyState: () => {
        circle.setScenario('title');
        circle._angleText.setScenario('bottomDeg');
        diag.setAngleTextProperties(360, 0, 'º');
        circle.animations.new()
          .inParallel([
            circle.anim.scenario({ target: 'center', duration: 4 }),
            circle._line1.anim.rotation({ target: 1, duration: 4 }),
          ])
          .inParallel([
            circle._degrees.anim.dissolveIn({ duration: 0.5 }),
            circle._degreesHighlight.anim.dissolveIn({ duration: 0.5 }),
            circle._angleText.anim.dissolveIn(0.5),
            circle.anim.trigger({ callback: 'setAngleTextDeg' }),
          ])
          .start();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Lets start with two lines on top of each other and connected at one end.
    // As we rotate one of the lines we will trace its end to form an arc, which will result in a full circle after a full rotation. That said, we will start with an arc.
    // Now these two lines form an angle at their connection point
    // this.addSection({
    //   setContent: [
    //     devNote({ top: 90 }, '|Arc|'),
    //   ],
    //   modifiers: {
    //     Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
    //   },
    //   show: [
    //     circle._line1, circle._line2, circle._corner,
    //   ],
    //   transitionFromPrev: (done, doneStr) => {
    //     circle.setScenario('title');
    //     circle.animations.new()
    //       .inParallel([
    //         circle.anim.scenario({ target: 'center', duration: 1 }),
    //         circle._line1.anim.rotation({ target: 0, duration: 1 }),
    //       ])
    //       // .then(circle._arc.anim.dissolveIn(0))
    //       // .then(circle._line1.anim.rotation({ target: 1.5, duration: 1 }))
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     circle.setScenario('center');
    //     circle._arc.showAll();
    //     // circle._angle.hide();
    //     circle._line1.setRotation(0);
    //     // circle._corner.showAll();
    //     circle._arc.showAll();
    //     diag.updateAngle();
    //   },
    // });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // whose size changes with rotation of one of the lines and so we can measure it. Now whenever we have property whose size changes, we want to be able to measure it, and we often first learn how to measure angle using degrees
    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomDeg');
        diag.setAngleTextProperties(360, 0, 'º');
        circle._line1.setScenario('default');
        circle._line2.setScenario('default');
      },
      setContent: [
        devNote({ top: 5 }, '|Angle|'),
        devNote({ top: 10 }, '|Degrees|'),
        devNote({ top: 15 }, '|Value|'),
        // devNote({ top: 90 }, '|Arc|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Circle: click(diag.pulseCircle, [diag], { color: colors.arc, id: 'note_circle' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
        Degrees: diag.bindAccent({
          elements: [circle._degrees, circle._degreesHighlight],
          scale: 1.15,
          color: colors.dull,
          id: 'note_degrees',
        }),
        Value: diag.bindAccent({ element: circle._angleText._value, scale: 2, color: colors.angles, id: 'note_value', x: 0.1 }),
      },
    };
    // this.addSection(common, {
    //   show: [
    //     circle._line1, circle._line2, circle._corner, circle._angle, circle._arc,
    //   ],
    //   transitionFromPrev: (done, doneStr) => {
    //     diag.updateAngle();
    //     addClass('note_angle', 'topic__diagram_text_fade_in_05');
    //     circle.animations.new()
    //       .pulse({ element: circle._angle, duration: 1 })
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     removeClass('note_angle', 'topic__diagram_text_fade_in_05');
    //     diag.updateAngle();
    //     // circle.setScenario('center');
    //   },
    // });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Where a circle's angle is split evenly into 360 pieces, or degrees. We then measure angles by counting how many degrees are within them. If you were inventing angle measurement today, you might choose a different number than 360, and there are trade-offs to which number you choose. But 360 is a convenient number for many practical purposes. as it has a lot of factors (24 in fact) which means we can split the circle into many different fractions and be left with whole numbers.


    // For instance, these are the first 10 factors of 360 as a portion of a circle. When we use 360, a half circle is 180º, a third of a circle is 120º, a quarter is 90º and so on. This is useful for many simple, everyday practical applications of angles, such as angle arithmatic easy to do without aid from a computer or needing to write it down.
    // So 360 is a measure of convenience for easy angle arithmatic. Now, let's find a different measure that is convenient in a different way.
    const row = (portion: string, angle: number) => `<tr id="|id_${angle}degr|" ><td class="topic__fraction radians_table_value">${portion}</td><td class="radians_table_value">${angle}&deg</td></tr>`;

    const rowClick = (angle: number) => ({
      replacementText: `id_${angle}degr`,
      id: () => `id_${angle}degr`,
      actionMethod: diag.pushLine,
      bind: [diag, angle / 180 * Math.PI, 0, 1, null],
    });

    const tableContent = `
      <table class="radians_table fractions_table" id="radians_table">
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
    `;
    this.addSection(common, {
      setContent: [
        devNote({ top: 5 }, '|hide_box|'),
        devNote({ top: 10 }, '|angles|'),
        devNote({ top: 15 }, '|fractions|'),
        devNote({ top: 20 }, '|Degrees|'),
        devNote({ top: 25 }, '|Angle|'),
        // devNote({ top: 90 }, '|Arc|'),
        tableContent,
      ],
      modifiers: {
        id_180degr: rowClick(180),
        id_120degr: rowClick(120),
        id_90degr: rowClick(90),
        id_72degr: rowClick(72),
        id_60degr: rowClick(60),
        id_45degr: rowClick(45),
        id_40degr: rowClick(40),
        id_36degr: rowClick(36),
        id_30degr: rowClick(30),
        id_24degr: rowClick(24),
        id_20degr: rowClick(20),
        fractions: click(() => {
          diag._box.setSize(0.7, 3);
          diag._box.setPosition([1.47, -0.1]);
          diag._box.showAll();
          diag.accent({ element: diag._box, scale: 1.1 });
          this.diagram.animateNextFrame();
        }, [this], { id: 'note_fractions' }),
        angles: click(() => {
          diag._box.setSize(0.5, 3);
          diag._box.setPosition([2.08, -0.1]);
          diag._box.showAll();
          diag.accent({ element: diag._box, scale: 1.1 });
          this.diagram.animateNextFrame();
        }, [this], { id: 'note_angles' }),
        hide_box: click(() => {
          diag._box.hide();
          this.diagram.animateNextFrame();
        }, [this], { id: 'note_hide_box' }),
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._degrees, circle._angleText,
        circle._degreesHighlight,
      ],
      setSteadyState: () => {
        addClass('radians_table', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          // .delay(0.5)
          .scenario({ target: 'centerLeft', duration: 1 })
          .trigger(() => {
            removeClass('radians_table', 'topic__diagram_text_fade_in_05');
            diag.updateAngle();
          })
          .start();
      },
      // transitionToNext: (done, doneStr) => {
      //   const table = document.getElementById('radians_table');
      //   if (table) {
      //     table.classList.add('radians_table_fade_out');
      //   }
      //   circle.animations.new()
      //     .inParallel([
      //       circle._degrees.anim.dissolveOut({ duration: 0.5 }),
      //       circle._degreesHighlight.anim.dissolveOut({ duration: 0.5 }),
      //       circle._angleText.anim.dissolveOut({ duration: 0.5 }),
      //       circle.anim.scenario({ target: 'center', duration: 3 }),
      //     ])
      //     .whenFinished(doneStr)
      //     .start();
      // },
    });

    this.addSection(common, {
      setContent: [
        tableContent,
      ],
      modifiers: {
        id_180degr: rowClick(180),
        id_120degr: rowClick(120),
        id_90degr: rowClick(90),
        id_72degr: rowClick(72),
        id_60degr: rowClick(60),
        id_45degr: rowClick(45),
        id_40degr: rowClick(40),
        id_36degr: rowClick(36),
        id_30degr: rowClick(30),
        id_24degr: rowClick(24),
        id_20degr: rowClick(20),
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._degrees, circle._angleText,
        circle._degreesHighlight,
      ],
      setSteadyState: () => {
        circle.setScenario('centerLeft');
        diag.updateAngle();
        const table = document.getElementById('radians_table');
        if (table) {
          table.classList.add('radians_table_fade_out');
        }
        circle.animations.new()
          .inParallel([
            circle._degrees.anim.dissolveOut({ duration: 0.5 }),
            circle._degreesHighlight.anim.dissolveOut({ duration: 0.5 }),
            circle._angleText.anim.dissolveOut({ duration: 0.5 }),
            circle.anim.scenario({ target: 'center', duration: 3 }),
          ])
          .whenFinished(() => { this.next(); })
          .start();
      },
    });

    // this.addSection(common, {
    //   setContent: [
    //     devNote({ top: 10 }, '|Circle|'),
    //     devNote({ top: 15 }, '|Lines|'),
    //     devNote({ top: 20 }, '|Radius|'),
    //     devNote({ top: 25 }, '|Arc|'),
    //     devNote({ top: 30 }, '|Angle|'),
    //     tableContent,
    //   ],
    //   modifiers: {
    //     Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
    //     'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
    //     Lines: click(diag.pulseLines, [diag], { color: colors.lines, id: 'note_lines' }),
    //   },
    //   show: [
    //     circle._line1, circle._line2, circle._corner, circle._angle,
    //     circle._degrees, circle._angleText,
    //     circle._degreesHighlight,
    //   ],
    //   setSteadyState: () => {
    //     addClass('radians_table', 'topic__diagram_text_fade_in_05');
    //     circle.animations.new()
    //       // .delay(0.5)
    //       .scenario({ target: 'centerLeft', duration: 1 })
    //       .trigger(() => {
    //         removeClass('radians_table', 'topic__diagram_text_fade_in_05');
    //         diag.updateAngle();
    //       })
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     circle.
    //     const table = document.getElementById('radians_table');
    //     if (table) {
    //       table.classList.add('radians_table_fade_out');
    //     }
    //     circle.animations.new()
    //       .inParallel([
    //         circle._degrees.anim.dissolveOut({ duration: 0.5 }),
    //         circle._degreesHighlight.anim.dissolveOut({ duration: 0.5 }),
    //         circle._angleText.anim.dissolveOut({ duration: 0.5 }),
    //         circle.anim.scenario({ target: 'center', duration: 1 }),
    //       ])
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    // });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Instead of splitting the circle into 360 equal pieces, lets find the angle where the arc length equals the radius length. To do this, we will take the radius, bend it around the arc and set the angle to give that arc.
    this.addSection(common, {
      setContent: [
        // style({
        //   top: 3, centerH: true, id: 'id_main_text',
        // }, 'Set arc length to |equal| radius length.'),
        // devNote({ top: 80 }, '|Radius|'),
        devNote({ top: 10 }, '|Circle|'),
        devNote({ top: 15 }, '|Lines|'),
        devNote({ top: 20 }, '|Radius|'),
        devNote({ top: 25 }, '|Arc|'),
        devNote({ top: 30 }, '|Angle|'),
      ],
      modifiers: {
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
        Lines: click(diag.pulseLines, [diag], { color: colors.lines, id: 'note_lines' }),
      },
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, // circle._arc,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        // circle.setScenario('centerLeft');
        // addClass('note_radius', 'topic__diagram_text_fade_in_05');
        // addClass('id_main_text', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          // .scenario({ target: 'center', duration: 1 })
          // .delay(0.5)
          .inParallel([
            circle._arc.anim.dissolveIn(0.7),
            circle.anim.trigger({ callback: 'updateAngle', }),
            circle._circle.anim.dissolveIn(0.7),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        circle._arc.showAll();
        diag.updateAngle();
        circle.setScenario('center');
        // removeClass('note_radius', 'topic__diagram_text_fade_in_05');
        // removeClass('id_main_text', 'topic__diagram_text_fade_in_05');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Instead of splitting the circle into 360 equal pieces, lets find the angle where the arc length equals the radius length. To do this, we will take the radius, bend it around the arc and set the angle to give that arc.
    this.addSection(common, {
      setContent: [
        style({
          top: 3, centerH: true, id: 'id_main_text',
        }, 'Set arc length to |equal| radius length.'),
        devNote({ top: 75 }, '|Radius|'),
        devNote({ top: 80 }, '|Arc|'),
        devNote({ top: 85 }, '|Angle|'),
      ],
      modifiers: {
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
      },
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        // circle.setScenario('centerLeft');
        // addClass('note_radius', 'topic__diagram_text_fade_in_05');
        addClass('id_main_text', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          // .scenario({ target: 'center', duration: 1 })
          .delay(0.5)
          // .inParallel([
          //   circle._arc.anim.dissolveIn(0.7),
          //   circle.anim.trigger({ callback: 'updateAngle', }),
          // ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        // circle._arc.showAll();
        diag.updateAngle();
        circle.setScenario('center');
        // removeClass('note_radius', 'topic__diagram_text_fade_in_05');
        removeClass('id_main_text', 'topic__diagram_text_fade_in_05');
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // We call this angle one radian, where its name comes from its relationship with the radius. So let's take this further and see how many radians go into a circle.
    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomRad');
        circle._line1.setScenario('default');
        circle._line2.setScenario('default');
      },
      setContent: [
        devNote({ top: 55 }, '|EqnRadius|'),
        devNote({ top: 60 }, '|EqnAngle|'),
        devNote({ top: 65 }, '|Value|'),
        devNote({ top: 70 }, '|Radian|'),
        devNote({ top: 75 }, '|Radius|'),
        devNote({ top: 80 }, '|Arc|'),
        devNote({ top: 85 }, '|Angle|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        Radian: click(diag.bendRadius, [diag, null], { color: colors.lines, id: 'note_radian' }),
        Value: diag.bindAccent({ element: circle._angleText._value, color: colors.angles, id: 'note_value', scale: 1.8, x: 0.1 }),
        EqnAngle: diag.bindAccent({ element: eqn._angle, color: colors.angles, id: 'note_eqn_angle'}),
        EqnRadius: diag.bindAccent({ element: eqn._radius, color: colors.lines, id: 'note_eqn_radius'})
      },
    };
    this.addSection(common, {
      setContent: [
        style({
          top: 3, centerH: true, id: 'id_main_text',
        }, 'When arc length equals radius length, the angle is |one radian|'),
        devNote({ top: 70 }, '|Radian|'),
        devNote({ top: 75 }, '|Radius|'),
        devNote({ top: 80 }, '|Arc|'),
        devNote({ top: 85 }, '|Angle|'),
      ],
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines._line0,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        addClass('id_main_text', 'topic__diagram_text_fade_in_05');
        addClass('note_radian', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          .delay(0.5)
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag.updateAngle();
        removeClass('note_radian', 'topic__diagram_text_fade_in_05');
        removeClass('id_main_text', 'topic__diagram_text_fade_in_05');
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // And we see there are six and a bit radians in a circle. How many precisely? Well, we defined a radian as the angle when the arc length is equal to the radius length, so instead of asking how many radians in a circle, we can ask how many radius lengths are there in the circumference of a circle?
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines._line0,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        circle.animations.new()
          .dissolveIn({ element: circle._radianLines._line1, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line2, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line3, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line4, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line5, duration: 0.3 })
          // .dissolveIn({ element: circle._radians, duration: 0.4 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        // circle._radians.showAll();
        diag.updateAngle();
        circle.setScenario('center');
        // circle._radianLines.showAll();
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // We know a circle's circumference is equal to 2πr, where r is the radius length. This is the same as saying there are 2π lots of radius lengths in a circumference.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, // circle._radians,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('topCirc');
        diag.updateAngle();
        eqn.goToForm({ name: 'circ', animate: 'dissolve', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('topCirc');
        eqn.showForm('circ');
        diag.updateAngle();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Therefore if there are 2π radius lengths in the circumference, then there must be 2π radians in a circle. We can now look at what different angles are in radians. Note, these numbers are approximate, and most are irrational numbers with infinitely many decimal places, like π and 2π.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, // circle._radians,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('topCircle');
        diag.setAngleTextRadians();
        diag.updateAngle();
        eqn.goToForm({ name: 'circle', animate: 'dissolve', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('topCircle');
        eqn.showForm('circle');
        diag.updateAngle();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Clearly a radian does not have the same practical convenience of 360. A quarter circle is approximately 1.57, and a third of a circle is 2.09 radians. This is not easy to remember or calculate. But it is convenient when you right down its definition as an expression.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner, circle._radians,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('topCircle');
        eqn.showForm('circle');
        circle.animations.new()
          .inParallel([
            circle._angleText.anim.dissolveIn(0.3),
            circle.anim.trigger({ callback: 'setAngleTextRadians' }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag.setAngleTextRadians();
        eqn.setScenario('topCircle');
        eqn.showForm('circle');
        diag.updateAngle();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // One radian produces an arc length of 1 radius. Two radians produce an arc length of two radians. Half a radian produces an arc length of half a radius.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner, circle._radians,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('top');
        circle._line1.setRotation(1);
        eqn._radiusLengths.drawingObject.setText('radius length');
        eqn._value.drawingObject.setText('1.00');
        diag.setAngleTextRadians();
        eqn.goToForm({ name: 'value', animate: 'dissolve', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('top');
        circle._line1.setRotation(1);
        eqn.showForm('value');
        diag.updateAngle();
        circle._radianLines.showAll();
        circle._angleText.showAll();
        diag.setAngleTextRadians();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // More generally, this radian term is just the angle, and instead of writing out radius length each time, we will just write radius.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner, circle._radians,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('top');
        eqn.showForm('value');
        diag.setAngleTextRadians();
        diag.setAngleTextRadians();
        eqn.goToForm({ name: 'generalize', animate: 'move', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('generalize');
        diag.updateAngle();
        circle._radianLines.showAll();
        circle._angleText.showAll();
        diag.setAngleTextRadians();
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // And so we are left with a simple relationship.
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner, circle._radians,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
        circle._circle,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('top');
        eqn.showForm('generalize');
        diag.setAngleTextRadians();
        eqn.goToForm({ name: '_arc', animate: 'move', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('_arc');
        diag.updateAngle();
        circle._radianLines.showAll();
        circle._angleText.showAll();
        diag.setAngleTextRadians();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Now let's look at some consequences of this relationship. First of all, this relationship tells us if you know any two terms, you can always calculate the third.
    // Seconly, if we rearrange the relatipnship to show how angle is dependent on radius and arc length, we can see that the angle in radians is actually unitless.

    this.addSection({
      show: [
        eqn,
      ],
      // setEnterState: () => {
      //   eqn.setScenario('top');
      // },
      transitionFromPrev: (done, doneStr) => {
        eqn.showForm('arc');
        eqn.animations.new()
          .scenario({ target: 'center', duration: 2 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        eqn.showForm('arc');
        eqn.setScenario('center');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Angle is just a ratio, as both arc length and radius are a measure of length, their units cancel. Thus when we use radians in our calculations we can simply use it as a number and not have to track units.
    this.addSection({
      setContent: [
        style({ top: 50, centerH: true }, 'Radians have no units!'),
      ],
      show: [
        eqn,
      ],
      setSteadyState: () => {
        eqn.showForm('angle');
        eqn.setScenario('center');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Next, if we make the radius equal to 1, we can see that angle equals the arc length, and they can therefore be used interchangably. In geometry and trigonometry we often start with a unit circle, which is a circle of radius 1, and find relationships between properties. The processs to find the relatipnship can be involved, but it is simplified assuming a unit radius. The result is then generalized at the end by scaling the radius.
    // Radians is useful because these relationships are clean and simple. When they get used in more complicated relationships they are easiest to manipulate. We can find similar relationships using degrees, but will see they are more complicated, and therefore less useful.
    this.addSection({
      // setContent: [
        // style({ top: 50, centerH: true }, 'Radians have no units!'),
      // ],
      show: [
        eqn,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('center');
        eqn.showForm('radiusEquals1_0');
        diag.animations.new()
          .trigger({
            callback: 'goToForm',
            payload: {
              name: 'radiusEquals1_1',
              animate: 'move',
              dissolveInTime: 0.7,
              dissolveOutTime: 0.7,
              // duration: 1,
            },
            duration: 2,
          })
          .trigger({
            callback: 'goToForm',
            payload: {
              name: 'radiusEquals1_2',
              animate: 'move',
              dissolveInTime: 0.7,
              // dissolveOutTime: 0.7,
              // duration: 1,
            },
            duration: 1,
          })
          .trigger({
            callback: 'goToForm',
            payload: {
              name: 'radiusEquals1_3',
              animate: 'move',
              // dissolveInTime: 0.4,
              dissolveOutTime: 0.7,
              duration: 1,
            },
            duration: 2,
          })
          .trigger({
            callback: 'goToForm',
            payload: {
              name: 'radiusEquals1_4',
              animate: 'move',
              dissolveInTime: 0.7,
              // dissolveOutTime: 0.7,
              // duration: 1,
            },
            duration: 0.7,
          })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        eqn.showForm('radiusEquals1_4');
        eqn.setScenario('center');
      },
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // To do this, we need to find a way to convert between degrees and radians.
    // While the numerical value of the degrees and radians are different, we know if they represent the same angle then that angle must be the same portion of a full circle. Thus the ratios of the angles relative to their equivalent full circle angles must be the same. We can no rearrange the equation to find the radian angle in terms of the degree angle.
    // So to convert degrees to radians, we multiply by the ratio of pi over 180.
    this.addSection({
      setContent: [
        devNote({ top: 75 }, '|scalar|'),
        devNote({ top: 80 }, '|_2pi|'),
        devNote({ top: 85 }, '|_360|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        _360: diag.bindAccent({ element: diag._radEqn.__360, id: 'note_360' }),
        _2pi: diag.bindAccent({ element: diag._radEqn._twoPi, id: 'note_2pi' }),
        scalar: diag.bindAccent({ elements: [
          diag._radEqn._v_2,
          diag._radEqn._pi,
          diag._radEqn.__180,
        ], id: 'note_scalar', centerOn: diag._radEqn._v_2, scale: 1.5 }),
      },
      show: [
        diag._radEqnNav, diag._radEqn,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._radEqn.setScenario('center');
        diag._radEqn.showForm('start');
        diag._radEqn.goToForm({ name: '0', animate: 'dissolve', callback: doneStr });
      },
      setSteadyState: () => {
        // console.log('asdf')
        diag._radEqn.showForm('0');
        diag._radEqn.setScenario('center');
      },
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // We can do a similar procedure to find degrees from radians.
    this.addSection({
      setContent: [
        devNote({ top: 80 }, '|scalarRad|'),
        devNote({ top: 85 }, '|scalarDeg|'),
        // devNote({ top: 90 }, '|_360|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        // _360: diag.bindAccent({ element: diag._radEqn.__360, id: 'note_360' }),
        // _2pi: diag.bindAccent({ element: diag._radEqn._twoPi, id: 'note_2pi' }),
        scalarRad: diag.bindAccent({ elements: [
          diag._radEqn._v_2,
          diag._radEqn._pi,
          diag._radEqn.__180,
        ], id: 'note_scalar', centerOn: diag._radEqn._v_2, scale: 1.5 }),
        scalarDeg: diag.bindAccent({ elements: [
          diag._degEqn._v_1,
          diag._degEqn._pi,
          diag._degEqn.__180,
        ], id: 'note_scalar_deg', centerOn: diag._degEqn._v_1, scale: 1.5 }),
      },
      show: [
        diag._radEqnNav, diag._radEqn,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._radEqn.setScenario('center');
        diag._degEqn.setScenario('down');
        diag._radEqn.showForm('6');
        diag._radEqn.animations.new()
          .scenario({ target: 'up', duration: 1 })
          .inParallel([
            diag._degEqn.anim.dissolveIn({ duration: 0.5 }),
            diag.anim.trigger({ callback: 'degShowForm', payload: '6' }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._radEqn.showForm('6');
        diag._radEqn.setScenario('up');
        diag._degEqn.showForm('6');
        diag._degEqn.setScenario('down');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // This result in a relationship betwween angle, radius and arc length with an additional term. Now this doesn't seem like a lot of extra complexity, but the complexity adds up pretty quickly even for simple things.
    this.addSection({
      setContent: [
        devNote({ top: 5 }, '|angleD|'),
        devNote({ top: 10 }, '|factor|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        factor: diag.bindAccent({
          elements: [
            eqn._π,
            eqn._v_1,
            eqn.__180,
          ],
          id: 'note_factor',
          centerOn: eqn._v_1,
          x: 0.2,
          scale: 1.5,
        }),
        angleD: diag.bindAccent({
          elements: [
            // eqn._angle,
            eqn._d_g,
          ],
          id: 'note_angle',
          centerOn: eqn._d_g,
          scale: 2,
        }),
      },
      show: [
        eqn,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('left');
        // diag._eqn.showForm('arcDegrees');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: eqn, duration: 0.5 }),
            diag.anim.trigger({ callback: 'showForm', payload: 'arcDegrees' }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        eqn.setScenario('left');
        eqn.showForm('arcDegrees');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setContent: [
        devNote({ top: 5 }, '|sin|'),
        devNote({ top: 10 }, '|arc|'),
        devNote({ top: 15 }, '|radius|'),
        devNote({ top: 20 }, '|angle|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        angle: diag.bindAccent({
          element: diag._lim._angle,
          id: 'note_angle',
          // centerOn: eqn._v_1,
          scale: 1.3,
        }),
        arc: click(diag.pulseLimArc, [diag], { color: colors.arc, id: 'note_arc' }),
        sin: click(diag.pulseSine, [diag], { id: 'note_sin' }),
        radius: click(diag.pulseUnitR, [diag], { id: 'note_radius' }),
      },
    }
    this.addSection(common, {
      show: [
        diag._lim._radius, diag._lim._angle, diag._lim._xAxis, diag._lim._arc,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._lim.setScenario('center');
        diag._lim._radius.setRotation(0.8);
        diag.updateLimAngle();
        diag.animations.new()
          // .dissolveIn(1)
          .inParallel([
            diag._lim._radius.anim.dissolveIn(1),
            diag._lim._angle.anim.dissolveIn(1),
            diag._lim._xAxis.anim.dissolveIn(1),
            diag._lim._arc.anim.dissolveIn(1),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag._lim._radius.setRotation(0.8);
        diag.updateLimAngle();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection(common, {
      show: [
        diag._lim._radius, diag._lim._angle, diag._lim._xAxis, diag._lim._arc,
        diag._lim._x,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag.animations.new()
          .inParallel([
            diag._lim._x.anim.dissolveIn(1),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag.updateLimAngle();
      },
    });

    this.addSection(common, {
      show: [
        diag._lim,
      ],
      transitionFromPrev: (done, doneStr) => {
        // diag._lim.setScenario('center');
        // diag._lim._radius.setRotation(0.8);
        // diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag._lim._sin.anim.dissolveIn(1),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._lim.setScenario('center');
        // diag._lim._radius.setRotation(0.8);
        diag.updateLimAngle();
      },
    });
    
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection({
      setContent: [
        devNote({ top: 5 }, '|limit|'),
        devNote({ top: 10 }, '|sinx|'),
        devNote({ top: 15 }, '|x|'),
        devNote({ top: 20 }, '|one|'),
        devNote({ top: 25 }, '|sin|'),
        devNote({ top: 30 }, '|arc|'),
        devNote({ top: 35 }, '|radius|'),
        devNote({ top: 40 }, '|angle|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        limit: diag.bindAccent({
          elements: [diag._ex1._lim, diag._ex1._xTo0],
          centerOn: diag._ex1._lim,
          // y: 'bottom',
          id: 'note_limit',
          // y: 'top',
          scale: 1.5,
        }),
        sinx: diag.bindAccent({
          elements: [diag._ex1._sin, diag._ex1._x_1],
          centerOn: diag._ex1._sin,
          x: 0.8,
          id: 'note_sinx',
          y: 'bottom',
          scale: 1.5,
        }),
        x: diag.bindAccent({
          element: diag._ex1._x_2,
          id: 'note_x',
          y: 'top',
          scale: 1.5,
        }),
        one: diag.bindAccent({
          element: diag._ex1.__1,
          id: 'note_one',
          x: 'left',
          scale: 2,
        }),
        angle: diag.bindAccent({
          element: diag._lim._angle,
          id: 'note_angle',
          // centerOn: eqn._v_1,
          scale: 1.5,
        }),
        arc: click(diag.pulseLimArc, [diag], { color: colors.arc, id: 'note_arc' }),
        sin: click(diag.pulseSine, [diag], { id: 'note_sin' }),
        radius: click(diag.pulseUnitR, [diag], { id: 'note_radius' }),
      },
      show: [
        diag._lim,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('left');
        diag._lim.setScenario('center');
        // diag._lim._radius.setRotation(0.6);
        diag.updateLimAngle();
        diag.animations.new()
          // .then(diag._lim.anim.scenario({ target: 'bottom', duration: 1 }))
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'lim' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('left');
        diag._ex1.showForm('lim');
        // diag._lim.showAll();
        diag._lim.setScenario('center');
        // diag._lim._radius.setRotation(0.5);
        diag.updateLimAngle();
      },
    });
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // For instance, in calculus the first and second derivatives of the sine function when using radians are relatively simple. If however, degrees are being used,
    this.addSection({
      show: [
        diag._ex1,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('left');
        diag._ex1.showForm('lim');
        diag._ex2.setScenario('bottom');
        diag.animations.new()
          .then(diag._ex1.anim.scenario({ target: 'top', duration: 1.5 }))
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex2', form: 'limDeg' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('top');
        diag._ex1.showForm('lim');
        diag._ex2.setScenario('bottom');
        diag._ex2.showForm('limDeg');
      },
    });
  
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection({
      show: [
        diag._ex1,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('top');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'radFirst' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('top');
        diag._ex1.showForm('radFirst');
      },
    });
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // For instance, in calculus the first and second derivatives of the sine function when using radians are relatively simple. If however, degrees are being used,
    this.addSection({
      show: [
        diag._ex1,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('top');
        diag._ex1.showForm('radFirst');
        diag._ex2.setScenario('bottom');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex2', form: 'degFirst' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('top');
        diag._ex1.showForm('radFirst');
        diag._ex2.setScenario('bottom');
        diag._ex2.showForm('degFirst');
      },
    });


    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection({
      show: [
        diag._ex1,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('topLeft');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'sin' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('topLeft');
        diag._ex1.showForm('sin');
      },
    });
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // For instance, in calculus the first and second derivatives of the sine function when using radians are relatively simple. If however, degrees are being used,
    this.addSection({
      show: [
        diag._ex1,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._ex1.setScenario('topLeft');
        diag._ex1.showForm('sin');
        diag._ex2.setScenario('bottomLeft');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex2', form: 'sinDeg' },
            }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag._ex1.setScenario('topLeft');
        diag._ex1.showForm('sin');
        diag._ex2.setScenario('bottomLeft');
        diag._ex2.showForm('sinDeg');
      },
    });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // this.addSection({
    //   show: [
    //     diag._ex1,
    //   ],
    //   transitionFromPrev: (done, doneStr) => {
    //     diag._ex1.setScenario('top');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex1', form: 'radSecond' },
    //         }),
    //       ])
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('top');
    //     diag._ex1.showForm('radSecond');
    //   },
    // });
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // For instance, in calculus the first and second derivatives of the sine function when using radians are relatively simple. If however, degrees are being used,
    // this.addSection({
    //   show: [
    //     diag._ex1,
    //   ],
    //   transitionFromPrev: (done, doneStr) => {
    //     diag._ex1.setScenario('topLeft');
    //     diag._ex1.showForm('radSecond');
    //     diag._ex3.setScenario('bottom');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex3, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex3', form: 'degSecond' },
    //         }),
    //       ])
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('top');
    //     diag._ex1.showForm('radSecond');
    //     diag._ex3.setScenario('bottom');
    //     diag._ex3.showForm('degSecond');
    //     // diag._ex3.showForm('sinDeg');
    //     // console.log(diag._ex3)
    //   },
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // Then we have an extra term. In complex problems these extra terms add up to a lot of extra noise, that makes it harder to read and easier to make mistakes. As such, in the vast majority of mathematics, science, engineering (including all major programming languages) radians are used be default.
    // this.addSection({
    //   show: [
    //     diag._ex1,
    //   ],
    //   transitionFromPrev: (done, doneStr) => {
    //     diag._ex1.setScenario('topLeft');
    //     diag._ex1.showForm('radFirst');
    //     diag._ex2.setScenario('bottomLeft');
    //     diag._ex2.showForm('radSecond');
    //     diag._ex3.setScenario('topRight');
    //     diag._ex4.setScenario('bottomRight');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex3, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex3', form: 'degFirst' },
    //         }),
    //         diag.anim.dissolveIn({ element: diag._ex4, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex4', form: 'degSecond' },
    //         }),
    //       ])
    //       .whenFinished(doneStr)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('topLeft');
    //     diag._ex1.showForm('radFirst');
    //     diag._ex2.setScenario('bottomLeft');
    //     diag._ex2.showForm('radSecond');
    //     diag._ex3.setScenario('topRight');
    //     diag._ex3.showForm('degFirst');
    //     diag._ex4.setScenario('bottomRight');
    //     diag._ex4.showForm('degSecond');
    //   },
    // });
    this.addSection({
      setContent: [
        style({ centerH: true, centerV: true }, 'In mathematics, working with radians is more |elegant and simple| than with degrees.'),
      ],
    });
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // FInally, lets look at some angles and compare radians to degrees. Usually radians are expressed in a fraction of π, but it is useful to get a basic numerical feeling for radians. This is especially useful in software development when dealing with geometries.
    const row1 = (angle: number) => `<tr><td class="radians_table_value">|_${angle}rad|</td><td class="radians_table_value">|_${angle}deg|</td></tr>`;

    const degClick = (angle: number) => click(
      diag.pushLineDeg,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_${angle}`,
        text: `${round(angle, 0)}&deg;`,
        classes: 'action_word_table',
      },
    );
    const radClick = (label: string, angle: number) => click(
      diag.pushLineRad,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_rad_${angle}`,
        text: label,
        classes: 'action_word_table',
      },
    );
    this.addSection({
      setContent: [
        `
          <table class="radians_table comparison_table" id="radians_table">
            <tr>
              <th class="topic__fraction_title"> Radians </th>
              <th class="topic__angle_title"> Degrees </th>
            </tr>
            ${row1(360)}
            ${row1(270)}
            ${row1(180)}
            ${row1(120)}
            ${row1(90)}
            ${row1(60)}
            ${row1(45)}
            ${row1(30)}
          </table>
        `,
      ],
      modifiers: {
        _360deg: degClick(359.9),
        _270deg: degClick(270),
        _180deg: degClick(180),
        _120deg: degClick(120),
        _90deg: degClick(90),
        _60deg: degClick(60),
        _45deg: degClick(45),
        _30deg: degClick(30),
        _360rad: radClick('2&pi;', 359.9),
        _270rad: radClick('<sup>3&pi;</sup>&frasl;<sub>2</sub>', 270),
        _180rad: radClick('&pi;', 180),
        _120rad: radClick('<sup>2&pi;</sup>&frasl;<sub>3</sub>', 120),
        _90rad: radClick('<sup>&pi;</sup>&frasl;<sub>2</sub>', 90),
        _60rad: radClick('<sup>&pi;</sup>&frasl;<sub>3</sub>', 60),
        _45rad: radClick('<sup>&pi;</sup>&frasl;<sub>4</sub>', 45),
        _30rad: radClick('<sup>&pi;</sup>&frasl;<sub>6</sub>', 30),
      },
      show: [
        circle._line1, circle._line2,
        circle._degrees,
        circle._corner,
        // circle._radianLines,
        circle._angleText, circle._arc,
        circle._angle, circle._radians,
      ],
      setSteadyState: () => {
        circle.setScenario('left');
        circle._angleText.setScenario('bottom');
        diag.setAngleTextRadians();
        diag.updateAngle();
      },
    });
  }
}

export default Content;
