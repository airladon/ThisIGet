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
import { removeClass, addClass } from '../../../../../common/tools/tools';
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

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // Lets start with two lines on top of each other. We can rotate one line while tracing its end. As we rotate the line, an arc is formed. A full rotation results in a circle.
    this.addSection({
      setContent: [
        note({ top: 90 }, '|Arc|'),
      ],
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
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

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // These two lines form an angle. We often first learn how to measure angle using degrees, where a full angle, or angle within a circle, is 360º, and all other angles a portion of that.
    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomDeg');
        diag.setAngleTextProperties(360, 0, 'º');
      },
      setContent: [
        note({ top: 85 }, '|Angle|'),
        note({ top: 90 }, '|Arc|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
      },
    };
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle, circle._arc,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag.updateAngle();
        addClass('note_angle', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          .pulse({ element: circle._angle, duration: 1 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        removeClass('note_angle', 'topic__diagram_text_fade_in_05');
        diag.updateAngle();
        // circle.setScenario('center');
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
        circle._line1, circle._line2, circle._corner, circle._angle, circle._arc,
      ],
      transitionFromPrev: (done, doneStr) => {
        // circle._angleText.setScenario('bottomDeg');
        diag.updateAngle();
        circle.animations.new()
          .inParallel([
            circle._degrees.anim.dissolveIn({ duration: 0.5 }),
            circle._angleText.anim.dissolveIn(0.5),
            circle.anim.trigger({ callback: 'setAngleTextDeg' }),
          ])
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        // circle._angleText.setScenario('bottomDeg');
        circle._degrees.showAll();
        circle._angleText.showAll();
        diag.setAngleTextDeg();
        diag.updateAngle();
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
    const row = (portion: string, angle: number) => `<tr><td class="topic__fraction radians_table_value">${portion}</td><td class="radians_table_value">|_${angle}deg|</td></tr>`;

    const rowClick = (angle: number) => click(
      diag.pushLine,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_${angle}`,
        text: `${angle}&deg;`,
        classes: 'action_word_table',
      },
    );
    this.addSection(common, {
      setContent: [
        note({ top: 85 }, '|Angle|'),
        note({ top: 90 }, '|Arc|'),
        `
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
      },
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._arc, circle._degrees, circle._angleText,
      ],
      // fadeInFromPrev: false,
      transitionFromPrev: (done, doneStr) => {
        addClass('radians_table', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          // .delay(0.5)
          .scenario({ target: 'centerLeft', duration: 1 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        removeClass('radians_table', 'topic__diagram_text_fade_in_05');
        circle.setScenario('centerLeft');
        // diag.setAngleTextProperties(360, 0, 'º');
        // circle._angleText.setScenario('bottomDeg');
        diag.updateAngle();
      },
      transitionToNext: (done, doneStr) => {
        const table = document.getElementById('radians_table');
        if (table) {
          table.classList.add('topic__diagram_text_fade_out_05');
        }
        circle._degrees.animations.new()
          .inParallel([
            circle._degrees.anim.dissolveOut({ duration: 0.5 }),
            circle._angleText.anim.dissolveOut({ duration: 0.5 }),
          ])
          .whenFinished(doneStr)
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
    this.addSection(common, {
      setContent: [
        style({
          top: 3, centerH: true, id: 'id_main_text',
        }, 'Set arc length to |equal| radius length.'),
        note({ top: 80 }, '|Radius|'),
        note({ top: 85 }, '|Angle|'),
        note({ top: 90 }, '|Arc|'),
      ],
      modifiers: {
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
      },
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc,
      ],
      transitionFromPrev: (done, doneStr) => {
        circle.setScenario('centerLeft');
        addClass('note_radius', 'topic__diagram_text_fade_in_05');
        addClass('id_main_text', 'topic__diagram_text_fade_in_05');
        circle.animations.new()
          .scenario({ target: 'center', duration: 1 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag.updateAngle();
        circle.setScenario('center');
        removeClass('note_radius', 'topic__diagram_text_fade_in_05');
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
    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomRad');
      },
      setContent: [
        note({ top: 75 }, '|Radian|'),
        note({ top: 80 }, '|Radius|'),
        note({ top: 85 }, '|Angle|'),
        note({ top: 90 }, '|Arc|'),
      ],
      fadeInFromPrev: false,
      modifiers: {
        Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
        Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        Radian: click(diag.bendRadius, [diag, null], { color: colors.lines, id: 'note_radian' }),
      },
    };
    this.addSection(common, {
      setContent: [
        style({
          top: 3, centerH: true, id: 'id_main_text',
        }, 'When |arc length equals radius length|, the angle is |one radian|'),
        note({ top: 75 }, '|Radian|'),
        note({ top: 80 }, '|Radius|'),
        note({ top: 85 }, '|Angle|'),
        note({ top: 90 }, '|Arc|'),
      ],
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines._line0,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines._line0,
      ],
      transitionFromPrev: (done, doneStr) => {
        circle.animations.new()
          .dissolveIn({ element: circle._radianLines._line1, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line2, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line3, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line4, duration: 0.3 })
          .dissolveIn({ element: circle._radianLines._line5, duration: 0.3 })
          .whenFinished(doneStr)
          .start();
      },
      setSteadyState: () => {
        diag.updateAngle();
        circle.setScenario('center');
        circle._radianLines.showAll();
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
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
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
    this.addSection(common, {
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc, circle._radianLines, circle._angleText,
      ],
      transitionFromPrev: (done, doneStr) => {
        eqn.setScenario('top');
        eqn.showForm('generalize');
        diag.setAngleTextRadians();
        eqn.goToForm({ name: 'arc', animate: 'move', callback: doneStr });
      },
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('arc');
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

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    this.addSection({
      show: [
        diag._radEqnNav, diag._radEqn,
      ],
      transitionFromPrev: (done, doneStr) => {
        diag._radEqn.setScenario('center');
        diag._radEqn.showForm('start');
        diag._radEqn.goToForm({ name: '0', animate: 'dissolve', callback: doneStr });
      },
      setSteadyState: () => {
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
    this.addSection({
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

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    const row1 = (angle: number) => `<tr><td class="radians_table_value">|_${angle}rad|</td><td class="radians_table_value">|_${angle}deg|</td></tr>`;

    const degClick = (angle: number) => click(
      diag.pushLineDeg,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_${angle}`,
        text: `${angle}&deg;`,
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
        _360deg: degClick(360),
        _270deg: degClick(270),
        _180deg: degClick(180),
        _120deg: degClick(120),
        _90deg: degClick(90),
        _60deg: degClick(60),
        _45deg: degClick(45),
        _30deg: degClick(30),
        _360rad: radClick('2&pi;', 360),
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
