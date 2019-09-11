// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile_ffffff.svg';
// import imgLinkGrey from '../../tile.svg';
import details from '../../details';
import CommonCollection from './diagramCollectionCommon';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';

const {
  click,
  centerVH, centerV,
  // highlightWord,
  highlight,
  style,
  // actionWord,
  // onClickId,
} = Fig.tools.html;

// const { rand } = Fig.tools.math;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new CommonCollection(this.diagram, layout);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    // const equation = diag._equation;

    const common = {
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
      setContent: centerVH([
        'How do we |measure| angle?',
        'How do we quantify how large or small an angle is?',
      ]),
    });

    this.addSection(common, {
      setContent: [
        'An |angle| is the amount of |rotation| between two lines.',
      ],
      modifiers: {
        rotation: click(diag.pushLine, [diag, null, 0, 1, null], colors.lines),
        angle: click(diag.pulseAngle, [diag], colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._angle,
      ],
      // setSteadyState: () => {
      //   // circle._line1.setScenario('start');
      //   // diag.updateAngle();
      // },
    });
    this.addSection(common, {
      setContent: [
        'An |angle| in a shape can be as small as |no_rotation|, and as large as a |full_rotation|.',
      ],
      modifiers: {
        rotation: click(diag.pushLine, [diag, null, 0, 1, null], colors.lines),
        angle: click(diag.pulseAngle, [diag], colors.angles),
        no_rotation: click(diag.pushLine, [diag, 0, -1, 2, null], colors.lines),
        full_rotation: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 2, null], colors.lines),
      },
      show: [
        circle._line1, circle._line2, circle._angle,
      ],
      // setSteadyState: () => {
      //   circle._line1.setScenario('start');
      //   diag.updateAngle();
      // },
    });
    this.addSection(common, {
      title: 'Portions',
      setContent: [
        'Therefore, one way to measure angle is to split the full rotation up into |equal portions|.',
      ],
      show: [
        circle._line1, circle._line2, circle._angle,
      ],
      // setSteadyState: () => {
      //   circle._line1.setScenario('start');
      //   diag.updateAngle();
      // },
    });

    this.addSection(common, {
      setContent: [
        'For example, it could be |_12| equal portions like a clock.',
      ],
      modifiers: { _12: click(this.next, [this], colors.marks) },
      show: [
        circle._line1, circle._line2, circle._angle,
      ],
      // setSteadyState: () => {
      //   circle._line1.setScenario('start');
      //   diag.updateAngle();
      // },
    });

    this.addSection(common, {
      setContent: [
        'For example, it could be |_12| equal portions like a clock.',
      ],
      modifiers: { _12: click(diag.pulseMarks, [diag, 12], colors.marks) },
      show: [
        circle._line1, circle._line2, circle._angle, circle._marks12Long,
      ],
    });

    this.addSection(common, {
      setContent: [
        'The |angle| would then be how many portions are covered.',
      ],
      modifiers: { angle: click(diag.pulseAngle, [diag], colors.angles) },
      show: [
        circle._line1, circle._line2, circle._angle, circle._marks12,
        circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleMarks('12Long');
        circle._angleText.setScenario('bottom');
        circle.setScenario('center');
      },
    });

    this.addSection(common, {
      setContent: [
        '|_12| portions is just an example. It could also be |_20|, |_50| or |_100|.',
      ],
      modifiers: {
        _12: click(diag.setAngleMarks, [diag, 12, true], colors.angles),
        _20: click(diag.setAngleMarks, [diag, 20, true], colors.angles),
        _50: click(diag.setAngleMarks, [diag, 50, true], colors.angles),
        _100: click(diag.setAngleMarks, [diag, 100, true], colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._angle, circle._marks12,
        circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleMarks(12);
        circle._angleText.setScenario('bottom');
        circle.setScenario('center');
      },
    });

    this.addSection({
      setContent: centerV([
        'So how many portions should we use?',
        'There are two common practices. The first is dividing into |360| portions.',
        'Each portion is usually called a degree and is represented by the symbol |º|.',
      ]),
    });

    this.addSection({
      title: 'Degree',
      setContent: centerV([
        'The word |degree| comes from the |Latin| words |de| (meaning |down|) and |gradus| (meaning |step|).',
        'So 360 degrees (360º) is the same as saying there are 360 |smaller steps| or pieces.',
      ]),
      modifiers: {
        Latin: highlight('lesson__latin'),
        de: highlight('lesson__latin'),
        gradus: highlight('lesson__latin'),
      },
    });

    this.addSection({
      setContent: centerV([
        '|Why choose 360?|',
        'If you were defining it today, you could choose anything!',
        'But angle is a concept people have worked on and understood for thousands of years.',
        'For instance, Babylonians used 360 |over 3000 years ago|.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        'So, |why did they| choose 360?',
        'It\'s not known, but one reason might be |360 is an easy number to work with| when you don\'t have a calculator.',
        '360 has a lot of numbers that can divide into it without a remainder:',
        style({
          left: 5, right: 15, size: 1, color: colors.diagram.text.keyword,
        }, '1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360'),
      ]),
    });

    const row = (portion: string, angle: number) => `<tr><td class="lesson__fraction">${portion}</td><td>|_${angle}deg|</td></tr>`;

    const rowClick = (angle: number) => click(
      diag.pushLine,
      [diag, angle / 180 * Math.PI, 0, 1, null],
      {
        color: colors.angles,
        id: `id_${angle}`,
        text: `${angle}&deg;`,
      },
    );
    this.addSection(common, {
      title: 'Common Angles',
      setContent: () => [
        style({ top: 0 }, 'This means it\'s easy to work with fractions of a full rotation. Some example fractions are shown, but |many| are possible.'),
        `
          <table class="in_lesson__fraction_table">
            <tr>
              <th class="lesson__fraction_title"> Fraction </th>
              <th class="lesson__angle_title"> Angle </th>
            </tr>
            ${row(String.fromCharCode(190), 270)}
            ${row(String.fromCharCode(8532), 240)}
            ${row(String.fromCharCode(189), 180)}
            ${row(String.fromCharCode(8531), 120)}
            ${row(String.fromCharCode(188), 90)}
            ${row(String.fromCharCode(8533), 72)}
            ${row(String.fromCharCode(8537), 60)}
          </table>
        `,
      ],
      modifiers: {
        _270deg: rowClick(270),
        _240deg: rowClick(240),
        _180deg: rowClick(180),
        _120deg: rowClick(120),
        _90deg: rowClick(90),
        _72deg: rowClick(72),
        _60deg: rowClick(60),
      },
      show: [
        circle._line1, circle._line2, circle._angle, circle._degrees,
        circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleMarks('degrees');
        circle._angleText.setScenario('bottomSlightRight');
        circle.setScenario('right');
      },
    });
  }
}

export default Content;
