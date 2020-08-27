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

const { HTMLEquation, DiagramElementCollection } = Fig;

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
    this.diagram.initialize();
    this.loadQRs([
      'Math/Geometry_1/Circle/base',
    ]);
  }

  loadEvents() {
    this.diagram.recorder.loadAudio(new Audio(audio));
    // this.diagram.recorder.loadEvents(events, true);
    // this.diagram.recorder.loadStates(states, true);
    this.diagram.recorder.settings.pause = 'freeze';

    this.diagram.recorder.settings.play = {
      how: 'dissolve',
      duration: {
        dissolveOut: 0.2,
        dissolveIn: 0.2,
        delay: 0.1,
      },
    };
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    const eqn = diag._eqn;
    const eqnCirc = diag._eqnCirc;
    const radEqnNav = diag._radEqnNav;

    let common = {
      setContent: [],
      show: [],
      modifiers: {},
    };

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection({
      title: 'Introduction',
      setContent: [
        style({ centerH: true, size: 1.8, top: 10 }, 'Radian'),
        style({ centerH: true, size: 0.8, top: 2 }, 'What is it, and why use it?'),
      ],
      show: [
        circle._line1, circle._line2, circle._angle, circle._corner,
      ],
      setSteadyState: () => {
        this.diagram.globalAnimation.disableDebugFrameRate();
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
      modifiers: {
        Degrees: click(diag.showDegrees, [diag], { id: 'note_degrees' }),
      },
    };

    const factorsText = '<span class="sub_highlight">1</span>, <span class="sub_highlight">2</span>, <span class="sub_highlight">3</span>, <span class="sub_highlight">4</span>, <span class="sub_highlight">5</span>, <span class="sub_highlight">6</span>, <span class="sub_highlight">8</span>, <span class="sub_highlight">9</span>, <span class="sub_highlight">10</span>, <span class="sub_highlight">12</span>, <span class="sub_highlight">15</span>, <span class="sub_highlight">18</span>, <span class="sub_highlight">20</span>, <span class="sub_highlight">24</span>, <span class="sub_highlight">30</span>, <span class="sub_highlight">36</span>, <span class="sub_highlight">40</span>, <span class="sub_highlight">45</span>, <span class="sub_highlight">60</span>, <span class="sub_highlight">72</span>, <span class="sub_highlight">90</span>, <span class="sub_highlight">120</span>, <span class="sub_highlight">180</span>, <span class="sub_highlight">360</span>';

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection(common, {
      title: '1 - Degrees',
      setContent: [
        devNote({ top: 5 }, '|Degrees|'),
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
            circle.anim.scenario({ target: 'center', duration: 2 }),
            circle._line1.anim.rotation({ target: 1, duration: 2 }),
          ])
          .trigger({
            callback: diag.pulseAngle.bind(diag),
            duration: 1,
          })
          .start();
        circle._angle.pulseSettings.allowFreezeOnStop = true;
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
        style(
          { top: 2, size: 0.9, centerH: true, className: 'radians_table_value', id: 'factors',
          },
          factorsText,
        ),
      ],
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._degrees, circle._angleText,
        circle._degreesHighlight,
      ],
      setSteadyState: () => {
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
      setContent: [
        style(
          { top: 2, size: 0.9, centerH: true, className: 'radians_table_value', id: 'factors',
          },
          factorsText,
        ),
      ],
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._degrees, circle._angleText,
        circle._degreesHighlight,
      ],
      setSteadyState: () => {
        diag.updateAngle();
        circle.animations.new()
          .scenario({ target: 'centerLeft', duration: 1 })
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
    const row = (portion: string, angle: number) => `<tr id="|id_${angle}degr|" ><td class="topic__fraction radians_table_value">${portion}</td><td class="radians_table_value">${angle}&deg</td></tr>`;

    const rowClick = (angle: number) => ({
      replacementText: `id_${angle}degr`,
      id: () => `id_${angle}degr`,
      actionMethod: diag.pushLine,
      bind: [diag, angle / 180 * Math.PI, 0, 1, null],
    });

    const tableContent = (c) => `
      <table class="radians_table fractions_table ${c}" id="radians_table">
        <tr>
          <th class="topic__fraction_title"> Fraction </th>
          <th class="topic__angle_title"> Angle </th>
        </tr>
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">2</sub>', 180)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">3</sub>', 120)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">4</sub>', 90)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">5</sub>', 72)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">6</sub>', 60)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">8</sub>', 45)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">9</sub>', 40)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">10</sub>', 36)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">12</sub>', 30)}
        ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">15</sub>', 24)}
        <tr><td>\u22ee</td><td>\u22ee</td>
      </table>
    `;
    const commonTable = {
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
          diag._box.custom.setSize(0.7, 3);
          diag._box.setPosition([1.49, 0.02]);
          diag._box.showAll();
          diag.accent({ element: diag._box, scale: 1.1 });
          this.diagram.animateNextFrame();
        }, [this], { id: 'note_fractions' }),
        angles: click(() => {
          diag._box.custom.setSize(0.5, 3);
          diag._box.setPosition([2.10, 0.02]);
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
    }
    this.addSection(common, commonTable, {
      // fadeInFromPrev: false,
      setContent: [
        style(
          { top: 2, size: 0.9, centerH: true, className: 'radians_table_value', id: 'factors',
          },
          factorsText,
        ),
        tableContent(),
      ],
      show: [
        circle._line1, circle._line2, circle._corner, circle._angle,
        circle._degrees, circle._angleText,
        circle._degreesHighlight,
      ],
      setSteadyState: () => {
        diag.updateAngle();
        circle.setScenario('centerLeft');
        // circle.animations.new()
        //   .trigger(() => addClass('radians_table', 'topic__diagram_text_fade_in_05'))
        //   .trigger({
        //     delay: 0.5,
        //     callback: () => removeClass('radians_table', 'topic__diagram_text_fade_in_05'),
        //   })
        //   .start();
      },
      
      // setSteadyState: () => {
      //   // circle.setScenario('centerLeft');
      //   addClass('radians_table', 'invisible');
      //   diag.updateAngle();
      //   circle.animations.new()
      //     // .delay(0.5)
      //     .scenario({ target: 'centerLeft', duration: 1 })
      //     .trigger({
      //       callback: () => {
      //         removeClass('radians_table', 'invisible');
      //         addClass('radians_table', 'topic__diagram_text_fade_in_05');
      //         diag.updateAngle();
      //       },
      //       duration: 0.5,
      //     })
      //     .trigger({
      //       callback: () => {
      //         removeClass('radians_table', 'topic__diagram_text_fade_in_05');
      //       },
      //     })
      //     .start();
      // },
    });

    

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // common = {
    //   setEnterState: () => {
    //     this.diagram.globalAnimation.disableDebugFrameRate();
    //     circle.setScenario('center');
    //     circle._angleText.setScenario('bottomDeg');
    //     diag.setAngleTextProperties(360, 0, 'º');
    //     circle._line1.setScenario('default');
    //     circle._line2.setScenario('default');
    //   },
    //   setContent: [
    //     devNote({ top: 5 }, '|Angle|'),
    //     devNote({ top: 10 }, '|Degrees|'),
    //     devNote({ top: 15 }, '|Value|'),
    //     // devNote({ top: 90 }, '|Arc|'),
    //   ],
    //   fadeInFromPrev: false,
    //   modifiers: {
    //     Arc: click(diag.pulseArc, [diag], { color: colors.arc, id: 'note_arc' }),
    //     Circle: click(diag.pulseCircle, [diag], { color: colors.arc, id: 'note_circle' }),
    //     Angle: click(diag.pulseAngle, [diag], { color: colors.angles, id: 'note_angle' }),
    //     Degrees: diag.bindAccent({
    //       elements: [circle._degrees, circle._degreesHighlight],
    //       scale: 1.15,
    //       color: colors.dull,
    //       id: 'note_degrees',
    //     }),
    //     Value: diag.bindAccent({ element: circle._angleText._value, scale: 2, color: colors.angles, id: 'note_value', x: 0.1 }),
    //   },
    // };

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // const row = (portion: string, angle: number) => `<tr id="|id_${angle}degr|" ><td class="topic__fraction radians_table_value">${portion}</td><td class="radians_table_value">${angle}&deg</td></tr>`;

    // const rowClick = (angle: number) => ({
    //   replacementText: `id_${angle}degr`,
    //   id: () => `id_${angle}degr`,
    //   actionMethod: diag.pushLine,
    //   bind: [diag, angle / 180 * Math.PI, 0, 1, null],
    // });

    // const tableContent = (c) => `
    //   <table class="radians_table fractions_table ${c}" id="radians_table">
    //     <tr>
    //       <th class="topic__fraction_title"> Fraction </th>
    //       <th class="topic__angle_title"> Angle </th>
    //     </tr>
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">2</sub>', 180)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">3</sub>', 120)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">4</sub>', 90)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">5</sub>', 72)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">6</sub>', 60)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">8</sub>', 45)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">9</sub>', 40)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">10</sub>', 36)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">12</sub>', 30)}
    //     ${row('<sup>1</sup>&frasl;<sub class="sub_highlight">15</sub>', 24)}
    //     <tr><td>\u22ee</td><td>\u22ee</td>
    //   </table>
    // `;
    // const commonTable = {
    //   modifiers: {
    //     id_180degr: rowClick(180),
    //     id_120degr: rowClick(120),
    //     id_90degr: rowClick(90),
    //     id_72degr: rowClick(72),
    //     id_60degr: rowClick(60),
    //     id_45degr: rowClick(45),
    //     id_40degr: rowClick(40),
    //     id_36degr: rowClick(36),
    //     id_30degr: rowClick(30),
    //     id_24degr: rowClick(24),
    //     id_20degr: rowClick(20),
    //     fractions: click(() => {
    //       diag._box.custom.setSize(0.7, 3);
    //       diag._box.setPosition([1.49, 0.02]);
    //       diag._box.showAll();
    //       diag.accent({ element: diag._box, scale: 1.1 });
    //       this.diagram.animateNextFrame();
    //     }, [this], { id: 'note_fractions' }),
    //     angles: click(() => {
    //       diag._box.custom.setSize(0.5, 3);
    //       diag._box.setPosition([2.10, 0.02]);
    //       diag._box.showAll();
    //       diag.accent({ element: diag._box, scale: 1.1 });
    //       this.diagram.animateNextFrame();
    //     }, [this], { id: 'note_angles' }),
    //     hide_box: click(() => {
    //       diag._box.hide();
    //       this.diagram.animateNextFrame();
    //     }, [this], { id: 'note_hide_box' }),
    //   },
    //   show: [
    //     circle._line1, circle._line2, circle._corner, circle._angle,
    //     circle._degrees, circle._angleText,
    //     circle._degreesHighlight,
    //   ],
    // }
    // this.addSection(common, commonTable, {
    //   title: '2 - 360',
    //   setContent: [
    //     style({ top: 2, size: 0.9, centerH: true, className: 'radians_table_value', id: 'factors', },
    //       '<span class="sub_highlight">1</span>, <span class="sub_highlight">2</span>, <span class="sub_highlight">3</span>, <span class="sub_highlight">4</span>, <span class="sub_highlight">5</span>, <span class="sub_highlight">6</span>, <span class="sub_highlight">8</span>, <span class="sub_highlight">9</span>, <span class="sub_highlight">10</span>, <span class="sub_highlight">12</span>, <span class="sub_highlight">15</span>, <span class="sub_highlight">18</span>, <span class="sub_highlight">20</span>, <span class="sub_highlight">24</span>, <span class="sub_highlight">30</span>, <span class="sub_highlight">36</span>, <span class="sub_highlight">40</span>, <span class="sub_highlight">45</span>, <span class="sub_highlight">60</span>, <span class="sub_highlight">72</span>, <span class="sub_highlight">90</span>, <span class="sub_highlight">120</span>, <span class="sub_highlight">180</span>, <span class="sub_highlight">360</span>',
    //     ),
    //     style({ top: 2, size: 0.8, centerH: true, className: 'radians_table_value', id: 'arithmetic', },
    //       // '<sup>1</sup>&frasl;<sub>3</sub> + <sup>1</sup>&frasl;<sub>5</sub> = 120º + 72º = 192º',
    //     ),
    //     // devNote({ top: 5 }, '|hide_box|'),
    //     // devNote({ top: 10 }, '|angles|'),
    //     // devNote({ top: 15 }, '|fractions|'),
    //     // devNote({ top: 20 }, '|Degrees|'),
    //     // devNote({ top: 25 }, '|Angle|'),
    //     tableContent(),
    //   ],
    //   setSteadyState: () => {
    //     // circle.setScenario('centerLeft');
    //     addClass('radians_table', 'invisible');
    //     diag.updateAngle();
    //     circle.animations.new()
    //       // .delay(0.5)
    //       .scenario({ target: 'centerLeft', duration: 1 })
    //       .trigger({
    //         callback: () => {
    //           removeClass('radians_table', 'invisible');
    //           addClass('radians_table', 'topic__diagram_text_fade_in_05');
    //           diag.updateAngle();
    //         },
    //         duration: 0.5,
    //       })
    //       .trigger({
    //         callback: () => {
    //           removeClass('radians_table', 'topic__diagram_text_fade_in_05');
    //         },
    //       })
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
    this.addSection({
      title: '2 - 360',
      fadeInFromPrev: false,
      show: [],
      setContent: [
        style({ size: 1.1, centerH: true, centerV: true, size: 1.5, className: 'radians_table_value', id: 'arithmetic', },
          '<span id="arithmetic_1"><sup>1</sup>&frasl;<sub>3</sub> + <sup>1</sup>&frasl;<sub>5</sub></span> &nbsp <span id="arithmetic_2">= &nbsp 120º + 144º &nbsp </span><span id="arithmetic_3">= &nbsp 264º</span>',
        ),
        // devNote({ top: 5 }, '|hide_box|'),
        // devNote({ top: 10 }, '|angles|'),
        // devNote({ top: 15 }, '|fractions|'),
        // devNote({ top: 20 }, '|Degrees|'),
        // devNote({ top: 25 }, '|Angle|'),
        // tableContent(),
      ],
      setSteadyState: () => {
        // circle.setScenario('centerLeft');
        addClass('arithmetic_1', 'topic__diagram_text_fade_in_05');
        addClass('arithmetic_2', 'invisible');
        addClass('arithmetic_3', 'invisible');
        // diag.updateAngle();
        diag.animations.new()
          // .inParallel([
          //   circle._line1.anim.rotation({
          //     target: 192 / 180 * Math.PI,
          //     delay: 1.8,
          //     duration: 1
          //   }),
            .trigger({
                callback: () => {
                  removeClass('arithmetic_1', 'topic__diagram_text_fade_in_05');
                  removeClass('arithmetic_2', 'invisible');
                  addClass('arithmetic_2', 'topic__diagram_text_fade_in_05');
              },
              delay: 0.8,
            })
            .trigger({
              callback: () => {
                removeClass('arithmetic_2', 'topic__diagram_text_fade_in_05');
                removeClass('arithmetic_3', 'invisible');
                addClass('arithmetic_3', 'topic__diagram_text_fade_in_05');
              },
              delay: 0.8,
            })
            .trigger({
              callback: () => {
                removeClass('arithmetic_3', 'topic__diagram_text_fade_in_05');
              },
              delay: 0.8,
            })
          // ])
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
    const listOptions = (top, id) => ({
      list: 'unordered',
      top,
      left: 5,
      size: 1.1,
      id: `radians_${id}`,
    });

    const listOptions1 = (top, id) => ({
      // list: 'unordered',
      centerH: true,
      top,
      // left: 5,
      size: 1.2,
      // id: `radians_${id}`,
    });

    this.addSection({
      title: '16 - Mid Summary - REALL',
      setContent: [
        style(listOptions1(20, 1), 'Degrees have |practical| convenience'),
      ],
    });

    this.addSection({
      title: '17 - Mid Summary',
      setContent: [
        style(listOptions1(20, 1), 'Degrees have |practical| convenience'),
        style(listOptions1(8, 2), 'Radians have |mathmatical| convenience'),
      ],
      // fadeInFromPrev: false,
      // setSteadyState: () => {
      //   addClass('radians_2', 'topic__diagram_text_fade_in_05');
      // },
    });
    
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection(common, {
      title: '3 - Radian Angle',
      // setContent: [
      //   tableContent('radians_table_hidden'),
      //   // devNote({ top: 5 }, '|Circle|'),
      //   // devNote({ top: 10 }, '|Lines|'),
      //   // devNote({ top: 15 }, '|Radius|'),
      //   // devNote({ top: 20 }, '|Arc|'),
      //   // devNote({ top: 25 }, '|Angle|'),
      // ],
      // modifiers: {
      //   id_180degr: rowClick(180),
      //   id_120degr: rowClick(120),
      //   id_90degr: rowClick(90),
      //   id_72degr: rowClick(72),
      //   id_60degr: rowClick(60),
      //   id_45degr: rowClick(45),
      //   id_40degr: rowClick(40),
      //   id_36degr: rowClick(36),
      //   id_30degr: rowClick(30),
      //   id_24degr: rowClick(24),
      //   id_20degr: rowClick(20),
      //   Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
      //   'equal': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
      //   Lines: click(diag.pulseLines, [diag], { color: colors.lines, id: 'note_lines' }),
      // },
      // show: [
      //   circle._line1, circle._line2, circle._corner, circle._angle,
      //   circle._arc
      //   // circle._degrees, circle._angleText,
      //   // circle._degreesHighlight,
      // ],
      // setSteadyState: () => {
      //   circle.setScenario('centerLeft');
      //   diag.updateAngle();
      //   const table = document.getElementById('radians_table');
      //   if (table) {
      //     table.classList.remove('radians_table_hidden');
      //     table.classList.add('radians_table_fade_out');
      //   }
      //   circle.animations.new()
      //     .inParallel([
      //       circle._degrees.anim.dissolveOut({ duration: 0.5 }),
      //       circle._degreesHighlight.anim.dissolveOut({ duration: 0.5 }),
      //       circle._angleText.anim.dissolveOut({ duration: 0.5 }),
      //       circle.anim.scenario({ target: 'center', duration: 1 }),
      //     // ])
      //     // .inParallel([
      //       circle._arc.anim.dissolveIn(1),
      //       circle._circle.anim.dissolveIn({ delay: 0.2, duration: 1 }),
      //       circle.anim.trigger({ callback: 'updateAngle' }),
      //       circle.anim.trigger({
      //         callback: () => {
      //           if (table) {
      //             table.classList.add('radians_table_hidden');
      //           }
      //         },
      //       }),
      //     ])
      //     .start();
      // },
      setSteadyState: () => {
        circle.setScenario('center');
        // diag.updateAngle();
        // const table = document.getElementById('radians_table');
        // if (table) {
        //   table.classList.remove('radians_table_hidden');
        //   table.classList.add('radians_table_fade_out');
        // }
        circle._line1.setRotation(2.5);
        circle.animations.new()
          .inParallel([
            // circle._degrees.anim.dissolveOut({ duration: 0.5 }),
            // circle._degreesHighlight.anim.dissolveOut({ duration: 0.5 }),
            // circle._angleText.anim.dissolveOut({ duration: 0.5 }),
            // circle.anim.scenario({ target: 'center', duration: 1 }),
          // ])
          // .inParallel([
            circle._arc.anim.dissolveIn(1),
            circle._line1.anim.dissolveIn(1),
            circle._corner.anim.dissolveIn(1),
            circle._angle.anim.dissolveIn(1),
            circle._circle.anim.dissolveIn(1),
            circle.anim.trigger({ callback: 'updateAngle' }),
            // circle.anim.trigger({
            //   callback: () => {
            //     if (table) {
            //       table.classList.add('radians_table_hidden');
            //     }
            //   },
            // }),
          ])
          .trigger({
            callback: diag.pulseAngle.bind(diag),
            duration: 1.5,
          })
          .trigger({
            callback: diag.pulseArc.bind(diag),
          })
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
      title: '4 - Randian equals',
      setContent: [
        style({
          top: 3, centerH: true, id: 'id_main_text',
        }, 'The angle where |arc_length_equals_radius| is |one radian|.'),
        // devNote({ top: 5 }, '|Radius|'),
        // devNote({ top: 10 }, '|Arc|'),
        // devNote({ top: 15 }, '|Angle|'),
      ],
      modifiers: {
        Radius: click(diag.pulseRadius, [diag], { color: colors.lines, id: 'note_radius' }),
        'arc_length_equals_radius': click(diag.bendRadius, [diag, null], { color: colors.diagram.action, id: 'equal_anim' }),
      },
      fadeInFromPrev: true,
      show: [
        circle._line1, circle._line2, circle._corner,
        circle._angle, circle._arc,
        circle._circle,
      ],
      setSteadyState: () => {
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
    common = {
      setEnterState: () => {
        circle.setScenario('center');
        circle._angleText.setScenario('bottomRad');
        circle._line1.setScenario('default');
        circle._line2.setScenario('default');
      },
      // setContent: [
      //   devNote({ top: 5 }, '|EqnRadius|'),
      //   devNote({ top: 10 }, '|EqnAngle|'),
      //   devNote({ top: 15 }, '|Value|'),
      //   devNote({ top: 20 }, '|Radian|'),
      //   devNote({ top: 25 }, '|Radius|'),
      //   devNote({ top: 30 }, '|Arc|'),
      //   devNote({ top: 35 }, '|Angle|'),
      // ],
      // fadeInFromPrev: false,
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

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    this.addSection(common, {
      title: '5 - Relationship',
      show: [
        circle._line1, circle._line2, circle._corner, // circle._radians,
        circle._angle, circle._arc, // circle._radianLines,
        // circle._angleText,
        circle._circle,
      ],
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn._radiusLengths.drawingObject.setText('radius length');
        eqn._value.drawingObject.setText('1.00');
        diag.setAngleTextRadians();
        circle._line1.animations.new()
          .rotation({ target: 1, velocity: 2 })
          .trigger({
            callback: () => {
              eqn.goToForm({ name: 'value', animate: 'dissolve' });
            }
          })
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
      title: '6 - angle super',
      show: [
        circle._line1, circle._line2, circle._corner, // circle._radians,
        circle._angle, circle._arc, // circle._radianLines,
        // circle._angleText,
        circle._circle,
      ],
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('value');
        diag.setAngleTextRadians();
        eqn.goToForm({ name: 'generalize', animate: 'move' });
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
      title: '7 - equation',
      show: [
        circle._line1, circle._line2, circle._corner, // circle._radians,
        circle._angle, circle._arc, // circle._radianLines,
        // circle._angleText,
        circle._circle,
      ],
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('generalize');
        // diag.setAngleTextRadians();
        eqn.goToForm({ name: '_arc', animate: 'move' });
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
      title: '8 - Center Eqn',
      show: [
        eqn,
      ],
      setSteadyState: () => {
        eqn.showForm('arc');
        eqn.animations.new()
          .scenario({ target: 'center', duration: 2 })
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

    this.addSection({
      title: '9 - How many Rads in a circle?',
      show: [
        eqn,
      ],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('arcSimple');
        eqn.goToForm({ name: 'arcOfCircle', animate: 'move' });
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
      title: '10 - Circumference',
      show: [
        eqn, eqnCirc,
      ],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('arcOfCircle');
        eqnCirc.setScenario('low');
        eqnCirc.showForm('circumference');
        eqnCirc.animations.new()
          .dissolveIn({ duration: 0.5 })
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
    this.addSection({
      title: '11 - 2Pi Radius lengths',
      show: [
        eqn, eqnCirc,
      ],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('arcOfCircle');
        eqnCirc.setScenario('low');
        eqnCirc.showForm('circumference');
        // eqn._twoPiGreen.show();
        // console.log(eqn.getPosition('diagram'))
        // console.log(eqn._twoPiGreen.getPosition('diagram'))
        // console.log(eqnCirc.getPosition('diagram'))
        // console.log(eqnCirc._twoPi.getPosition('diagram'))
        // // eqn._twoPiGreen.setPositionToElement(eqnCirc._twoPi, 'diagram')
        // console.log(eqn._twoPiGreen.getPosition('diagram'))
        // console.log(eqn._twoPiGreen.getPosition(), eqnCirc._twoPi.getPosition())
        eqn.goToForm({ name: 'arcOfCircle2Pi', animate: 'move' });
        eqnCirc.animations.new()
          .dissolveOut({ duration: 1, delay: 1 })
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
    this.addSection({
      title: '12 - 2Pi Radians in a circle',
      show: [
        eqn,
      ],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('arcOfCircle2Pi');
        eqn.goToForm({ name: 'twoPiRadiansInACircle', animate: 'move', duration: 1 });
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
      title: '13',
      show: [eqn],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('twoPiRadiansInACircle');
        eqn.goToForm({ name: '_arc', animate: 'dissolve', duration: 1 });
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
      title: '14',
      show: [eqn],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('_arc');
        eqn.goToForm({ name: '_arc1', animate: 'move' });
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
      title: '15',
      show: [eqn],
      setSteadyState: () => {
        eqn.setScenario('center');
        eqn.showForm('_arc1');
        eqn.goToForm({ name: '_arc2', animate: 'move' });
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // const listOptions = (top, id) => ({
    //   list: 'unordered',
    //   top,
    //   left: 5,
    //   size: 1.1,
    //   id: `radians_${id}`,
    // });

    this.addSection({
      title: '16 - Mid Summary - REALL',
      setContent: [
        style(listOptions(12, 1), 'A |radian| is the angle where arc length equals radius length'),
      ],
    });

    this.addSection({
      title: '17 - Mid Summary',
      setContent: [
        style(listOptions(12, 1), 'A |radian| is the angle where arc length equals radius length'),
        style(listOptions(5, 2), 'There are |2π| radians in a circle'),
      ],
      fadeInFromPrev: false,
      setSteadyState: () => {
        addClass('radians_2', 'topic__diagram_text_fade_in_05');
      },
    });

    this.addSection({
      title: '18 - Mid Summary',
      setContent: [
        style(listOptions(12, 1), 'A |radian| is the angle where arc length equals radius length'),
        style(listOptions(5, 2), 'There are |2π| radians in a circle'),
        style(listOptions(5, 3), 'With radians we can |relate| arc length, radius and angle'),
      ],
      fadeInFromPrev: false,
      setSteadyState: () => {
        addClass('radians_3', 'topic__diagram_text_fade_in_05');
      },
    });



    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // Angle is just a ratio, as both arc length and radius are a measure of length, their units cancel. Thus when we use radians in our calculations we can simply use it as a number and not have to track units.
    // this.addSection({
    //   setContent: [
    //     style({ top: 50, centerH: true }, 'Radians have no units!'),
    //   ],
    //   show: [
    //     eqn,
    //   ],
    //   setSteadyState: () => {
    //     eqn.showForm('angle');
    //     eqn.setScenario('center');
    //   },
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // Next, if we make the radius equal to 1, we can see that angle equals the arc length, and they can therefore be used interchangably. In geometry and trigonometry we often start with a unit circle, which is a circle of radius 1, and find relationships between properties. The processs to find the relatipnship can be involved, but it is simplified assuming a unit radius. The result is then generalized at the end by scaling the radius.
    // // Radians is useful because these relationships are clean and simple. When they get used in more complicated relationships they are easiest to manipulate. We can find similar relationships using degrees, but will see they are more complicated, and therefore less useful.
    // this.addSection({
    //   show: [
    //     eqn,
    //   ],
    //   setSteadyState: () => {
    //     eqn.setScenario('center');
    //     eqn.showForm('radiusEquals1_0');
    //     diag.animations.new()
    //       .trigger({
    //         callback: 'goToForm',
    //         payload: {
    //           name: 'radiusEquals1_1',
    //           animate: 'move',
    //           dissolveInTime: 0.7,
    //           dissolveOutTime: 0.7,
    //         },
    //         duration: 2,
    //       })
    //       .trigger({
    //         callback: 'goToForm',
    //         payload: {
    //           name: 'radiusEquals1_2',
    //           animate: 'move',
    //           dissolveInTime: 0.7,
    //         },
    //         duration: 1,
    //       })
    //       .trigger({
    //         callback: 'goToForm',
    //         payload: {
    //           name: 'radiusEquals1_3',
    //           animate: 'move',
    //           dissolveOutTime: 0.7,
    //           duration: 1,
    //         },
    //         duration: 2,
    //       })
    //       .trigger({
    //         callback: 'goToForm',
    //         payload: {
    //           name: 'radiusEquals1_4',
    //           animate: 'move',
    //           dissolveInTime: 0.7,
    //         },
    //         duration: 0.7,
    //       })
    //       .start();
    //   },
    // });

    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // // **********************************************************************
    // 19
    this.addSection({
      title: '19',
      setContent: [
        devNote({ top: 5 }, '|scalar|'),
        devNote({ top: 10 }, '|_2pi|'),
        devNote({ top: 15 }, '|_360|'),
      ],
      // fadeInFromPrev: false,
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
      setSteadyState: () => {
        diag._radEqn.setScenario('center');
        diag._radEqn.showForm('start');
        diag._radEqn.goToForm({ name: '0', animate: 'dissolve' });
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
      title: '20 - Deg and Rad',
      setContent: [
        devNote({ top: 5 }, '|scalarRad|'),
        devNote({ top: 10 }, '|scalarDeg|'),
        // devNote({ top: 90 }, '|_360|'),
      ],
      // fadeInFromPrev: false,
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
      setSteadyState: () => {
        diag._radEqn.setScenario('center');
        diag._degEqn.setScenario('down');
        diag._radEqn.showForm('6');
        diag._radEqn.animations.new()
          .scenario({ target: 'up', duration: 1 })
          .inParallel([
            diag._degEqn.anim.dissolveIn({ duration: 0.5 }),
            diag.anim.trigger({ callback: 'degShowForm', payload: '6' }),
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
      setSteadyState: () => {
        eqn.setScenario('left');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: eqn, duration: 0.5 }),
            diag.anim.trigger({ callback: 'showForm', payload: 'arcDegrees' }),
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
    common = {
      setContent: [
        devNote({ top: 10 }, '|arc|'),
        devNote({ top: 15 }, '|radius|'),
        devNote({ top: 20 }, '|angle|'),
        devNote({ top: 5 }, '|sin|'),
      ],
      // fadeInFromPrev: false,
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
      title: '21 - Unit Circle',
      show: [
        diag._lim._radius, diag._lim._angle, diag._lim._xAxis, diag._lim._arc,
      ],
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag._lim._radius.setRotation(0.8);
        diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag._lim._radius.anim.dissolveIn(1),
            diag._lim._angle.anim.dissolveIn(1),
            diag._lim._xAxis.anim.dissolveIn(1),
            diag._lim._arc.anim.dissolveIn(1),
          ])
          .start();
      },
    });

    this.addSection(common, {
      title: '22 - Vertical',
      show: [
        diag._lim,
      ],
      hide: [ diag._lim._sin._label, diag._lim._x ],
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag._lim._sin._line.anim.dissolveIn(1),
          ])
          .start();
      },
    });

    this.addSection(common, {
      title: '23 - Sine',
      show: [
        diag._lim,
      ],
      hide: [ diag._lim._x ],
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag._lim._sin._label.anim.dissolveIn(1),
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
    this.addSection(common, {
      title: '24 - x',
      show: [
        diag._lim
      ],
      setSteadyState: () => {
        diag._lim.setScenario('center');
        diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag._lim._x.anim.dissolveIn(1),
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
    this.addSection({
      title: '25 - limit',
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
      setSteadyState: () => {
        diag._ex1.setScenario('left');
        diag._lim.setScenario('center');
        diag.updateLimAngle();
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'lim' },
            }),
          ])
          .start();
      },
    });
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
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('left');
    //     diag._ex1.showForm('lim');
    //     diag._ex2.setScenario('bottom');
    //     diag.animations.new()
    //       .then(diag._ex1.anim.scenario({ target: 'top', duration: 1.5 }))
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex2', form: 'limDeg' },
    //         }),
    //       ])
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
    this.addSection({
      title: '26 - First derivative',
      show: [
        diag._ex1,
      ],
      setSteadyState: () => {
        diag._ex1.setScenario('middle');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'radFirst' },
            }),
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
    this.addSection({
      title: '27 - Sin infinite series',
      show: [
        diag._ex1,
      ],
      setSteadyState: () => {
        diag._ex1.setScenario('middleLeft');
        diag.animations.new()
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex1', form: 'sin' },
            }),
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
    this.addSection({
      title: '28 - Sin degrees infinite series',
      show: [
        diag._ex1,
      ],
      setSteadyState: () => {
        diag._ex1.setScenario('middleLeft');
        diag._ex1.showForm('sin');
        diag._ex2.setScenario('bottomLeft');

        diag.animations.new()
          .then(diag._ex1.anim.scenario({ target: 'topLeft', duration: 1 }))
          .inParallel([
            diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
            diag.anim.trigger({
              callback: 'showFormOfEqn',
              payload: { element: 'ex2', form: 'sinDeg' },
            }),
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
    this.addSection({
      title: '29 - Radians are simple and intuitive',
      setContent: [
        style({ centerV: true, centerH: true }, 'Radians are a simple, natural way to express angles in mathematics'),
      ],
    });

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
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('top');
    //     diag._ex1.showForm('radFirst');
    //     diag._ex2.setScenario('bottom');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex2', form: 'sin' },
    //         }),
    //       ])
    //       .start();
    //   },
    // });


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
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('topLeft');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex1, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex1', form: 'sin' },
    //         }),
    //       ])
    //       .start();
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
    //   setSteadyState: () => {
    //     diag._ex1.setScenario('topLeft');
    //     diag._ex1.showForm('sin');
    //     diag._ex2.setScenario('bottomLeft');
    //     diag.animations.new()
    //       .inParallel([
    //         diag.anim.dissolveIn({ element: diag._ex2, duration: 0.5 }),
    //         diag.anim.trigger({
    //           callback: 'showFormOfEqn',
    //           payload: { element: 'ex2', form: 'sinDeg' },
    //         }),
    //       ])
    //       .start();
    //   },
    // });

    // this.addSection({
    //   setContent: [
    //     style({ centerH: true, centerV: true }, 'In mathematics, working with radians is more |elegant and simple| than with degrees.'),
    //   ],
    // });
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
      title: '30 - final play',
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
