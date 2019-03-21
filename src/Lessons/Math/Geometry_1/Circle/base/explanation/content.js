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
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  centerV,
  // highlight,
  // clickWord,
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
    this.diagram.elements = new DiagramCollection(this.diagram);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const objects = diag._objects;
    const circ = diag._circle;
    const circle = circ._circle;

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
      setContent: centerV([
        'The first shape we will explore is the one you see everytime you look at the |moon|, a |wheel|, a |ball|, or a |ring|.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'Their size, mass and material is all very different, but they have a common |shape|.',
      ],
      modifiers: {
        shape: click(objects.objectToCircle, [objects], colors.circle),
      },
      show: [
        objects._moon, objects._wheel, objects._ring, objects._ball,
        objects._circle, objects._activator,
      ],
    });
    this.addSection(common, {
      setContent: centerV([
        'If you were naming this shape today, you might name it after a |familiar object|.',
        'For example, you might call it a |moon| shape or a |ring|.',
        'However, this shape has been studied for thousands of years, and therefore it already has a common name.',
      ]),
    });
    this.addSection(common, {
      setContent: centerV([
        'In ancient |Greek|, this shape was named |krikos|, which was their word for |ring|.',
        'Similarly, |Latin| also used the word for |ring|, with |circulus|.',
        'Today, our name comes from the Latin root, and it is |circle|.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'We can create a circle by |anchoring| a |line| at one end, and |pushing| its other end. If we trace the free end around a full rotation, we get a |circle|.',
      ],
      modifiers: {
        anchoring: click(circ.pulseAnchor, [circ], colors.center),
        line: click(circ.pulseRadius, [circ], colors.radius),
        pushing: click(circ.pushRadius, [circ, null], colors.circle),
        circle: click(circ.pushRadius, [circ, Math.PI * 1.999], colors.circle),
      },
      show: [circle._radius, circle._arc, circle._anchor],
      setSteadyState: () => {
        circ._circle.setScenario('center');
        circle._radius.setRotation(0.001);
      },
    });
    this.addSection(common, {
      setContent: centerV([
        'We\'ve now identified a shape, named it and know how to create it.',
        'Next we need to be able to describe it, by identifying some of its |properties|.',
      ]),
    });
    this.addSection(common, {
      setContent: centerV([
        'Similar to the word |circle|, when properties were first studied they were given names that used words from every day language.',
        'Many property names we use today come from their |historical roots|.',
        'However, as language has changed considerably in that time, these property names are |less intuitive|, and often just have to be |remembered|.',
      ]),
    });

    this.addSection(common, {
      title: 'Circumference',
      setContent: [
        'Every shape has a |perimeter|, which is the shape\'s boundary or outline. The |length| of the perimeter is a |property| used to describe the shape\'s size.',
        `${new Definition('Perimeter', 'Greek', ['perimetros', '', 'peri', 'around', 'metros', 'measure']).html('id_lesson__perimeter_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        perimeter: click(circ.pulseCircle, [circ], colors.circle),
      },
      show: [
        circle._line,
        circ._activator,
      ],
      setEnterState: () => {
        circ._activator.onClick = circ.pulseCircle.bind(circ);
        circ._circle.setScenario('center');
      },
      setLeaveState: () => {
        circ._activator.onClick = null;
      },
    });

    this.addSection(common, {
      setContent: [
        'A circle\'s perimeter has the special name |circumference|. The length of the circumference is most easily seen when |straightened| out.',
        `${new Definition('Circumference', 'Latin', ['circumferentia', '', 'circum', 'around', 'ferre', 'carry']).html('id_lesson__circumference_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        straightened: click(circ.straightenCircumference, [circ], colors.circle),
        // circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      show: [
        circle._line,
        circle._circumference,
        circ._activator,
      ],
      setEnterState: () => {
        circ.containToGrid = false;
        circ.straighten(0);
        circ.straightening = false;
        circle._line.setColor(colors.grid);
        circ._activator.onClick = circ.straightenCircumference.bind(circ);
        circ._circle.setScenario('center');
      },
      setLeaveState: () => {
        circle._line.setColor(colors.circle);
        circ._activator.onClick = null;
      },
    });
    this.addSection(common, {
      title: 'Center',
      setContent: [
        'The |center_point| is at the middle of the circle and is used to describe the circle\'s |location|.',
        `${new Definition('Center', 'Latin', ['centrum', 'middle']).html('id_lesson__center_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        center_point: click(circ.pulseAnchor, [circ], colors.center),
        location: click(this.next, [this], colors.center),
      },
      show: [circle._line, circle._anchor],
      setEnterState: () => {
        circ._circle.setScenario('center');
      },
    });
    this.addSection(common, {
      setContent: [
        'The |center_point| is at the middle of the circle and is used to describe the circle\'s |location|.',
      ],
      modifiers: {
        center_point: click(circ.pulseAnchor, [circ], colors.center),
        location: click(circ.pushCircle, [circ], colors.center),
      },
      fadeInFromPrev: false,
      show: [circle._line, circle._anchor, circ._grid, circ._locationText],
      setEnterState: () => {
        circ.containToGrid = true;
        circ.straighten(0);
        circ._circle.isMovable = true;
        circ._circle.isTouchable = true;
        circ._circle.hasTouchableElements = true;
        circ._circle._line.isTouchable = true;
        circ._circle.setScenario('center');
        circ.setCircleMoveLimits();
        circ.updateCircleLocation();
        circ._locationText.setScenario('topRight');
      },
      setLeaveState: () => {
        circ._circle.isMovable = false;
        circ._circle.isTouchable = false;
        circ._circle._line.isTouchable = false;
      },
    });
    this.addSection(common, {
      title: 'Radius',
      setContent: [
        'The |radius| describes the circle\'s size and is |any| line between the |center| and |edge|. The radius is half the circle width.',
        `${new Definition('Radius', 'Latin', ['radius', 'spoke of a chariot wheel']).html('id_lesson__radius_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        radius: click(circ.pulseRadius, [circ], colors.radius),
        center: click(circ.pulseAnchor, [circ], colors.center),
        edge: click(circ.pulseCircle, [circ], colors.circle),
        any: click(circ.pushRadiusRandom, [circ], colors.radius),
      },
      show: [circle._line, circle._anchor, circle._radius],
      setEnterState: () => {
        circ._circle.setScenario('center');
      },
    });
    this.addSection(common, {
      title: 'Diameter',
      setContent: [
        'The |diameter| describes the circle\'s full width and is |any| line that runs between two points on the circle\'s |edge| and the |center|.',
        `${new Definition('Diameter', 'Greek', ['diametros', '', 'dia', 'across', 'metros', 'measure']).html('id_lesson__diameter_definition', 'lesson__definition_lowest')}`,
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.radius),
        center: click(circ.pulseAnchor, [circ], colors.center),
        edge: click(circ.pulseCircle, [circ], colors.circle),
        any: click(circ.pushDiameterRandom, [circ], colors.radius),
      },
      show: [circle._line, circle._anchor, circle._diameter],
      setEnterState: () => {
        circ._circle.setScenario('center');
      },
    });
    this.addSection(common, {
      setContent: [
        '|Diameter| is often used when measuring a circle, as it can be easier to measure. In comparison, |radius| is often used when using a circle\'s properties in more complex problems, as it can make the math simpler.',
      ],
      show: [circle._line, circle._anchor, circle._diameter],
      setEnterState: () => {
        circ._circle.setScenario('center');
      },
    });
    this.addSection(common, {
      title: 'Summary',
      setContent: centerV([
        'So if we were discovering the circle today, we might call it a |ring|, with properties |middle|, |wheel spoke|, |width|, and |carry around|.',
        'This would make it easier for people learning about it today.',
        'However, as it was first studied a long time ago in different languages, it is called a |circle|, with properties |center|, |radius|, |diameter| and |circumference|.',
      ]),
    });
    this.addSection(common, {
      setContent: ['Experiment with changing the circle\'s |size| and |location| to see how it\'s properties change.'],
      show: [
        circle, circ._grid,
        circ._locationText, circ._circumferenceText,
        circ._diameterText, circ._radiusText,
      ],
      hide: [circle._arc],
      setEnterState: () => {
        circ.containToGrid = true;
        circ.straighten(0);
        circ.straightening = false;
        circle.setScenario('center');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(-0.5);
        circle.setScale(0.5);
        circle.move.maxTransform.updateScale(0.78, 0.78);
        circle.move.minTransform.updateScale(0.3, 0.3);
        circle._scale.isTouchable = true;
        circ._locationText.setScenario('summary');
        circ._circumferenceText.setScenario('summary');
        circle._line.setColor(colors.grid);
      },
      setLeaveState: () => {
        circle.setScale(1);
        circle._scale.isTouchable = false;
        circle._line.setColor(colors.circle);
      },
      setInfo: [
        'Drag circle |edge| to make larger or smaller',
        'Drag circle |center| to move',
        'Drag |radius| to rotate it',
        'Drag |diameter| to rotate it',
        'Press on |Circumference| text to straigten',
        'Press on other measurements text to hightlight',
      ],
    });
    this.addSection(common, {
      setContent: centerV([
        'Once properties are defined, the |relationship| between them can be investigated.',
        'However, to do this, first we need to understand |angle| which is another fundamental property of most shapes.',
      ]),
    });
  }
}

export default Content;
