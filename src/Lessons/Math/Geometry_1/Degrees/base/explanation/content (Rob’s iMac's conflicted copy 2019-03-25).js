// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
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
  actionWord,
  clickWord,
  onClickId,
} = Fig.tools.html;

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
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const circle = diag._circle;
    const equation = diag._equation;

    const common = {
      transitionFromAny: (done) => {
        diag.setLineRotation();
        done();
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
        rotation: click(diag.pushLine, [diag, null, 0, 1], colors.lines),
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
        rotation: click(diag.pushLine, [diag, null, 0, 1], colors.lines),
        angle: click(diag.pulseAngle, [diag], colors.angles),
        no_rotation: click(diag.pushLine, [diag, 0, -1, 2], colors.lines),
        full_rotation: click(diag.pushLine, [diag, Math.PI * 1.999, 1, 2], colors.lines),
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
        circle._line1, circle._line2, circle._angle, circle._marks12,
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
        // diag.updateAngle();
        diag.setAngleMarks(12);
        circle._angleText.setScenario('bottomRight');
      },
    });

    this.addSection(common, {
      setContent: [
        '|_12| portions is just an example. It could also be |_20|, |_50| or |_100|.',
      ],
      modifiers: {
        _12: click(diag.setAngleMarks, [diag, 12], colors.angles),
        _20: click(diag.setAngleMarks, [diag, 20], colors.angles),
        _50: click(diag.setAngleMarks, [diag, 50], colors.angles),
        _100: click(diag.setAngleMarks, [diag, 100], colors.angles),
      },
      show: [
        circle._line1, circle._line2, circle._angle, circle._marks12,
        circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleMarks(12);
        circle._angleText.setScenario('bottomRight');
      },
    });

    this.addSection({
      setContent: centerV([
        'So how many portions should we use?',
        'There are two common practices. The first is dividing into |360| portions',
        'Each portion is usually called a degree and is represented by the symbol |º|.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        'The word |degree| comes from the Latin words |de| (meaning |down|) and |gradus| (meaning |step|).',
        'So 360 degrees (360º) is the same as saying there are 360 smaller steps or pieces.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        '|Why choose 360?|',
        'If you were defining it today, you could choose anything!',
        'But angle is a concept people have worked on and understood for thousands of years.',
        'For instance, Babylonians divided the circle into 360 pieces |over 3000 years ago|.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        'So, |why did they| choose 360?',
        'It\'s not known, but one reason might be |360 is an easy number to work with| when you don\'t have a calculator.',
        '360 has a lot of numbers that can divide into it without a remainder:',
        '<ul style="list-style-type:none;"><li>|_factors|</li></ul>',
      ]),
      modifiers: {
        _factors: highlightWord('1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360', 'lesson__diagram_text_small'),
      },
    });

    const row = (portion: string, angle: number) => `<tr><td>${portion}</td><td>|_${angle}deg|</td></tr>`;

    const rowClick = (angle: number) => clickWord(`${angle}&deg;`, `id_${angle}`, diag.pushLine, [diag, angle / 180 * Math.PI, 0, 1], colors.diagram.text.keyword);

    this.addSection(common, {
      setContent: () => `
          <p>This means it's easy to work with fractions of a full rotation.</p>
          <table class="in_lesson__fraction_table">
            <tr>
              <th> Fraction </th>
              <th> Angle </th>
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
      modifiers: {
        _270deg: rowClick(270),
        _240deg: rowClick(240),
        _180deg: rowClick(180),
        _120deg: rowClick(120),
        _90deg: rowClick(90),
        _72deg: rowClick(72),
        _60deg: rowClick(60),
        // _270deg: clickWord('270&deg;', 'id_270', diag.pushLine, [diag, 270 / 180 * Math.PI, 0, 1], colors.diagram.text.keyword),
        // _240deg: actionWord('240&deg;', 'id_240', colors.diagram.text.keyword),
        // _180deg: actionWord('180&deg;', 'id_180', colors.diagram.text.keyword),
        // _120deg: actionWord('120&deg;', 'id_120', colors.diagram.text.keyword),
        // _90deg: actionWord('90&deg;', 'id_90', colors.diagram.text.keyword),
        // _72deg: actionWord('72&deg;', 'id_72', colors.diagram.text.keyword),
        // _60deg: actionWord('60&deg;', 'id_60', colors.diagram.text.keyword),
      },
      show: [
        circle._line1, circle._line2, circle._angle, circle._degrees,
        circle._angleText,
      ],
      setSteadyState: () => {
        diag.setAngleMarks('degrees');
        circle._angleText.setScenario('bottomLeft');
        circle.setScenario('right');
        const bindArray = deg => [diag, deg / 180 * Math.PI, 0, 1];
        // onClickId('id_270', diag.pushLine, bindArray(270));
        onClickId('id_240', diag.pushLine, bindArray(240));
        onClickId('id_180', diag.pushLine, bindArray(180));
        onClickId('id_120', diag.pushLine, bindArray(120));
        onClickId('id_90', diag.pushLine, bindArray(90));
        onClickId('id_72', diag.pushLine, bindArray(72));
        onClickId('id_60', diag.pushLine, bindArray(60));
      },
    });
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
