// @flow
import Fig from 'figureone';
import {
  LessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/LessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerVH,
  centerV,
  highlight,
  // clickWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({
      htmlId,
      vertexShader: 'withTexture',
      fragmentShader: 'withTexture',
    }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const circ = diag._circles;

    const common = {
      setContent: [],
      modifiers: {},
      // setInfo: `
      //     <ul>
      //       <li></li>
      //     </ul>
      // `,
      infoModifiers: {},
      interactiveElements: [
        // interactiveItem(quiz._check),
      ],
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };

    this.addSection(common, {
      title: 'Introduction',
      setContent: centerVH([
        '|Mathematics is a powerful tool.|',
        'We use it to understand and |predict| the world around us.',
      ]),
      transitionToNext: (done) => {
        const element = document.getElementById('id_lesson__diagram_text');
        element.classList.add('lesson__diagram_text_fade_out');
        diag.animations.new()
          .delay(0.5)
          .whenFinished(done)
          .start();
      },
    });

    this.addSection(common, {
      setContent: centerV([
        'Mathematics describes an object or phenomenon in a more |simple|, and more |general| way.',
        'Describing something more |simply|, makes it easier to study and understand.',
        'Describing something more |generally|, means the understanding can be reapplied to other scenarios.',
      ]),
      transitionFromPrev: (done) => {
        const element = document.getElementById('id_lesson__diagram_text');
        element.classList.add('lesson__diagram_text_fade_in');
        done();
      },
    });

    this.addSection(common, {
      setContent: centerV([
        'A large area of mathematics is the study of |shapes|.',
        '|Shapes| are simple generalizations of |objects| and the |paths| they travel.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'For example, a |wheel| is a physical thing.',
        'It is made of different materials, has mass, size, location and smell.',
      ],
      setEnterState: () => {
        circ._wheel.setScenario('left');
      },
      show: [circ._wheel],
    });

    common.setContent = [
      'In mathematics, a |shape| can be used to describe the wheel in a more simple, general way.',
    ];
    this.addSection(common, {
      modifiers: { shape: click(this.next, [this], colors.circle) },
      setEnterState: () => { circ._wheel.setScenario('left'); },
      show: [circ._wheel],
    });
    this.addSection(common, {
      modifiers: {
        shape: click(circ.appearCircleAndMoveWheel, [circ, null], colors.circle),
      },
      transitionFromAny: (done) => { circ.appearCircleAndMoveWheel(done); },
      show: [circ._wheel, circ._circle],
    });


    common.setContent = [
      'The |shape| can then be studied.',
      '|Properties| can be discovered that describe the shape.',
    ];
    this.addSection(common, {
      modifiers: {
        shape: click(circ.pulseCircle, [circ], colors.circle),
        Properties: click(this.next, [this], colors.dimension),
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        // circ._properties.setScenario('right');
        // circ.circumferenceAtAngle(Math.PI * 2);
      },
      show: [circ._circle],
    });
    this.addSection(common, {
      modifiers: {
        shape: click(circ.pulseCircle, [circ], colors.circle),
        Properties: click(circ.growDimensions, [circ, null], colors.dimension),
      },
      transitionFromAny: (done) => {
        circ.growDimensions();
        done();
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        circ._properties.setScenario('right');
        circ.circumferenceAtAngle(Math.PI * 2);
        // console.log(circ, colors)
      },
      show: [circ._circle, circ._properties],
    });
  }
}

export default Content;
