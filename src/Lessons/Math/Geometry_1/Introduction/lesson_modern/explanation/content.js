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
    });

    this.addSection(common, {
      setContent: centerV([
        'Mathematics describes an object or phenomenon in a more |simple|, and more |general| way.',
        'Describing something more |simply|, makes it easier to study and understand.',
        'Describing something more |generally|, means the understanding can be reapplied to other scenarios.',
      ]),
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
      },
      show: [circ._circle],
    });
    this.addSection(common, {
      modifiers: {
        shape: click(circ.pulseCircle, [circ], colors.circle),
        Properties: click(circ.growDimensions, [circ, null, 4], colors.dimension),
      },
      transitionFromAny: (done) => {
        circ.growDimensions();
        done();
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        circ._properties.setScenario('right');
        circ.circumferenceAtAngle(Math.PI * 2);
      },
      show: [circ._circle, circ._properties],
      hide: [circ._properties._eqn],
    });

    common.setContent = [
      '|Relationships| between |properties| can be found.',
    ];
    this.addSection(common, {
      modifiers: {
        Relationships: click(this.next, [this], colors.dimension),
        properties: click(circ.pulseProperties, [circ], colors.dimension),
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        circ._properties.setScenario('right');
        circ.circumferenceAtAngle(Math.PI * 2);
      },
      show: [circ._circle, circ._properties],
      hide: [circ._properties._eqn],
    });
    this.addSection(common, {
      modifiers: {
        Relationships: click(circ.makeEqnFromProperties, [circ], colors.dimension),
        properties: click(circ.pulseProperties, [circ], colors.dimension),
      },
      transitionFromPrev: (done) => {
        circ.makeEqnFromProperties();
        done();
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        circ._properties.setScenario('right');
        circ.circumferenceAtAngle(Math.PI * 2);
        circ._properties._eqn.showForm('base');
        circ._properties._eqn.setScenario('left');
      },
      show: [circ._circle, circ._properties],
    });

    common.setContent = [
      'The |properties| and |relationships| can then be applied to |all| other objects that have the same shape, no matter their location, size or material.',
    ];
    this.addSection(common, {
      modifiers: {
        relationships: click(circ.pulseEquation, [circ], colors.dimension),
        properties: click(circ.pulseProperties, [circ], colors.dimension),
        all: click(this.next, [this], colors.diagram.action),
      },
      setEnterState: () => {
        circ._circle.setScenario('right');
        circ._properties.setScenario('right');
        circ.circumferenceAtAngle(Math.PI * 2);
        circ._properties._eqn.showForm('base');
        circ._properties._eqn.setScenario('left');
      },
      show: [circ._circle, circ._properties],
    });
    this.addSection(common, {
      modifiers: {
        relationships: click(circ.pulseEquation, [circ], colors.dimension),
        properties: click(circ.pulseProperties, [circ], colors.dimension),
        all: click(circ.toggleProperties, [circ], colors.diagram.action),
      },
      setEnterState: () => {
        circ._wheel.setScenario('moreLeft');
        circ._clock.setScenario('center');
        circ._ball.setScenario('moreRight');
        circ._properties.setScenario('moreRight');
        circ.circumferenceAtAngle(Math.PI * 2);
        circ._properties._eqn.showForm('base');
        circ._properties._eqn.setScenario('bottom');
        // circ.toggleProperties();
        console.log(circ)
      },
      show: [circ._clock, circ._wheel, circ._ball, circ._properties],
    });
  }
}

export default Content;
