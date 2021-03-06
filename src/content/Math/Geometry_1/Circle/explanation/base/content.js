// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile_ffffff.svg';
// import imgLinkGrey from '../../tile.svg';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  click,
  centerV,
  style,
  highlight,
} = Fig.tools.html;

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
      // // setInfo: `
      // //     <ul>
      // //       <li></li>
      // //     </ul>
      // // `,
      // transitionFromPrev: (done) => { done(); },
      // infoModifiers: {},
      // interactiveElements: [
      //   // interactiveItem(quiz._check),
      // ],
      // setEnterState: () => {},
      // showOnly: [],
      // show: [],
      // hide: [],
      // setSteadyState: () => {},
      // setLeaveState: () => {},
      transitionFromPrev: (done) => { done(); },
      transitionFromAny: (done) => {
        if (this.comingFrom === 'goto') {
          circ.resetDiameterAndRadius();
        }
        done();
      },
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
      // setSteadyState: () => {
      //   console.log(this)
      // }
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
      modifiers: {
        Greek: highlight('topic__greek'),
        krikos: highlight('topic__greek'),
        Latin: highlight('topic__latin'),
        circulus: highlight('topic__latin'),
      },
    });
    this.addSection(common, {
      setContent: [
        'We can create a circle by |anchoring| a |line| at one end, and |pushing| its other end. If we trace the free end around a full rotation, we get a |circle|.',
      ],
      modifiers: {
        anchoring: click(circ.pulseCenter, [circ], colors.center),
        line: click(circ.pulseRadius, [circ], colors.radius),
        pushing: click(circ.pushRadius, [circ, null], colors.circle),
        circle: click(circ.pushRadius, [circ, Math.PI * 1.999], colors.circle),
      },
      show: [circle._radius, circle._arc, circle._center],
      setSteadyState: () => {
        circ._circle.setScenario('centerHigh');
        circle._radius.setRotation(0.001);
      },
    });
    this.addSection(common, {
      setContent: [
        'In other words, a |circle| is a shape whose |edge| is a constant distance from its |center|.',
      ],
      modifiers: {
        edge: click(circ.pulseCircle, [circ], colors.circle),
        center: click(circ.pulseCenter, [circ], colors.center),
      },
      show: [circle._line, circle._center],
      setSteadyState: () => {
        circ._circle.setScenario('centerHigh');
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
        `${new Definition('Perimeter', 'Greek', ['perimetros', 'WHERE', 'peri', 'around', 'metros', 'measure']).html(colors.circle)}`,
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
        circ._circle.setScenario('centerHigh');
      },
      setLeaveState: () => {
        circ._activator.onClick = null;
      },
    });

    this.addSection(common, {
      setContent: [
        'A circle\'s perimeter has the special name |circumference|. The length of the circumference is most easily seen when |straightened| out.',
        `${new Definition('Circumference', 'Latin', ['circumferentia', 'WHERE', 'circum', 'around', 'ferre', 'carry']).html(colors.circle)}`,
      ],
      modifiers: {
        straightened: click(circ.straightenCircumference, [circ, 4, null], colors.circle),
        circumference: highlight(colors.circle),
        // circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      show: [
        circle._line,
        circle._circumference,
        circ._activator,
      ],
      setEnterState: () => {
        // circ.containToGrid = false;
        circ.straighten(0);
        circ.straightening = false;
        circle._line.setColor(colors.grid);
        circ._activator.onClick = circ.straightenCircumference.bind(circ, 4, null);
        circ._circle.setScenario('centerHigh');
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
        `${new Definition('Center', 'Latin', ['centrum', 'MEANING', '', 'middle']).html(colors.center)}`,
      ],
      modifiers: {
        center_point: click(circ.pulseCenter, [circ], colors.center),
        location: click(this.next, [this, null], colors.center),
      },
      show: [circle._line, circle._center],
      setEnterState: () => {
        circ._circle.setScenario('centerHigh');
      },
    });
    this.addSection(common, {
      setContent: [
        'The |center_point| is at the middle of the circle and is used to describe the circle\'s |location|.',
      ],
      modifiers: {
        center_point: click(circ.pulseCenter, [circ], colors.center),
        location: click(circ.pushCircle, [circ], colors.center),
      },
      fadeInFromPrev: false,
      show: [circle._line, circle._center, circ._grid, circ._locationText],
      setEnterState: () => {
        circ.containToGrid = true;
        circ.straighten(0);
        circ._circle.isMovable = true;
        circ._circle.isTouchable = true;
        circ._circle.hasTouchableElements = true;
        circ._circle._line.isTouchable = true;
        circ._circle.setScenario('centerHigh');
        circ.setCircleMoveLimits();
        circ._locationText.setScenario('topRight');
      },
      setSteadyState: () => {
        circ.updateCircleLocation();
      },
      setLeaveState: () => {
        circ._circle.isMovable = false;
        circ._circle.isTouchable = false;
        circ._circle._line.isTouchable = false;
        circ.containToGrid = false;
      },
    });
    this.addSection(common, {
      title: 'Radius',
      setContent: [
        'The |radius| describes the circle\'s size and is |any| line between the |center| and |edge|. The radius is half the circle width.',
        `${new Definition('Radius', 'Latin', ['radius', 'MEANING', '', 'spoke of a chariot wheel']).html(colors.radius)}`,
      ],
      modifiers: {
        radius: click(circ.pulseRadius, [circ], colors.radius),
        center: click(circ.pulseCenter, [circ], colors.center),
        edge: click(circ.pulseCircle, [circ], colors.circle),
        any: click(circ.pushRadiusRandom, [circ], colors.radius),
      },
      show: [circle._line, circle._center, circle._radius],
      setSteadyState: () => {
        circ._circle.setScenario('centerHigh');
        circ._circle._radius.setRotation(0);
      },
    });
    this.addSection(common, {
      title: 'Diameter',
      setContent: [
        'The |diameter| describes the circle\'s full width and is |any| line that runs between two points on the circle\'s |edge| and the |center|.',
        `${new Definition('Diameter', 'Greek', ['diametros', 'WHERE', 'dia', 'across', 'metros', 'measure']).html(colors.diameter)}`,
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        center: click(circ.pulseCenter, [circ], colors.center),
        edge: click(circ.pulseCircle, [circ], colors.circle),
        any: click(circ.pushDiameterRandom, [circ], colors.diameter),
      },
      show: [circle._line, circle._center, circle._diameter],
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'next') {
          circ.resetDiameterAndRadius();
        }
        done();
      },
      setEnterState: () => {
        circ._circle.setScenario('centerHigh');
      },
    });
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        '|Diameter| is often used when measuring a circle, as it can be easier to measure. |Radius| is often used when relating a circle\'s properties as it can make the math simpler.',
      ]),
      modifiers: {
        Diameter: highlight(colors.diameter),
      },
      show: [circle._line, circle._center, circle._diameter],
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'prev') {
          circ.resetDiameterAndRadius();
        }
        done();
      },
      setEnterState: () => {
        circ._circle.setScenario('centerHigh');
      },
    });
    this.addSection(common, {
      setContent: centerV([
        'So if we were discovering the circle today, we might call it a |ring|, with properties |middle|, |wheel spoke|, |width|, and |carry around|.',
        'This would make it easier for people learning about it today.',
        'However, as it was first studied a long time ago in different languages, it is called a |circle|, with properties |center|, |radius|, |diameter| and |circumference|.',
      ]),
    });

    this.addSection({
      title: 'Relationships',
      setContent: centerV([
        'Once properties are defined, the |relationship| between them can be investigated.',
      ]),
    });
    this.addSection(common, {
      setContent: [
        'We start with |diameter| and |radius|.',
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        radius: click(circ.pulseRadius, [circ], colors.radius),
      },
      setEnterState: () => {
        circ.resetDiameterAndRadius();
      },
      // transitionFromPrev: (done) => {
      //   circ.setDiameterAndRadiusRotation(true, done);
      // },
      setSteadyState: () => {
        circ.setDiameterAndRadiusRotation();
        circle.setScenario('centerHigh');
      },
      show: [
        circle._line, circle._radius, circle._center, circle._diameter,
      ],
    });
    this.addSection(common, {
      setContent: [
        'As |radius| is |half| the width of the circle, and |diameter| is the |full| width, it follows that |diameter is twice the radius|.',
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        radius: click(circ.pulseRadius, [circ], colors.radius),
        half: click(circ.growRadius, [circ], colors.radius),
        full: click(circ.growDiameter, [circ], colors.diameter),
      },
      show: [
        circle._line, circle._radius, circle._center, circle._diameter,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'goto') {
          circ.setDiameterAndRadiusRotation(true, done);
        } else {
          circ.resetDiameterAndRadius();
          done();
        }
      },
      setSteadyState: () => {
        circle.setScenario('centerHigh');
      },
    });
    this.addSection(common, {
      setContent: [
        'Or written as an equation:',
      ],
      show: [
        circle._line, circle._radius, circle._center, circle._diameter,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'goto') {
          circ.setDiameterAndRadiusRotation(true, done);
        } else {
          circ.resetDiameterAndRadius();
          done();
        }
      },
      setSteadyState: () => {
        circ._eqnDiameterRadius.showForm('base');
        circ._eqnDiameterRadius.setScenario('centerTop');
        circ.setDiameterAndRadiusRotation();
        circle.setScenario('centerHigh');
      },
    });

    this.addSection(common, {
      setContent: [
        '|Diameter| and |circumference| are also related.',
      ],
      modifiers: {
        Diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      show: [
        circle._line, circle._center, circle._diameter,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom !== 'goto') {
          circ.setDiameterAndRadiusRotation(true, done);
        } else {
          circ.resetDiameterAndRadius();
          done();
        }
      },
      setSteadyState: () => {
        circle.setScenario('centerHigh');
      },
    });
    this.addSection(common, {
      setContent: [
        'If the |circumference| is straightened out, you can see it is a little over |three| times the |diameter|.',
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseBendLine, [circ], colors.circle),
        three: click(circ.diameterToCicumferenceComparison, [circ, null], colors.diagram.action),
      },
      show: [
        circle._line, circle._center, circle._diameter, circle._circumference,
      ],
      transitionFromAny: (done) => {
        circ.straighten(0);
        circle._line.setColor(colors.grid);
        circle._diameter.isTouchable = false;
        circle.move.maxTransform.updateTranslation(1000, 1000);
        circle.move.minTransform.updateTranslation(-1000, -1000);
        circ.diameterToCicumferenceComparison(done);
        circle.setScenario('centerHigh');
      },
      setLeaveState: () => {
        circle._line.setColor(colors.circle);
        circle._diameter.setScenario('center');
        circle._diameter.isTouchable = true;
      },
    });

    this.addSection(common, {
      title: 'Pi',
      setContent: centerV([
        'A better approximation is to say the circumference is |3.14| times the diameter.',
        'But actually, the digits after the 3 go on |forever|.',
        'A more accurate |approximation| is |3.141593...|',
        'An even more accurate |approximation| is |3.14159265359...|',
      ]),
    });

    this.addSection(common, {
      setContent: centerV([
        'Instead of writing out |3.14159265359...| every time, the Greek letter |π|, pronounced |pi|, is used.',
        'Whenever the exact ratio between diameter and circumference is needed, |π| can be used.',
      ]),
    });

    this.addSection(common, {
      setContent: [
        'So the relationship between |diameter| and |cicumference| is:',
      ],
      modifiers: {
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        cicumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      show: [
        circle._line, circle._center, circle._diameter,
      ],
      transitionFromAny: (done) => {
        circ.resetDiameterAndRadius();
        done();
      },
      setSteadyState: () => {
        circle.setScenario('center');
        circ._eqnCircumferenceDiameter.showForm('base');
        circ._eqnCircumferenceDiameter.setScenario('centerTop');
        // circ._circle._diameter.setRotation(0);
        // circ._circle._radius.setRotation(0.5);
      },
    });

    this.addSection({
      setContent: [
        style({ top: 12 }, 'We now have two relationships:'),
        style({ top: 22 }, 'Which we can use to find the relationship between |radius| and |circumference|.'),
      ],
      modifiers: {
        radius: highlight(colors.radius),
        circumference: highlight(colors.circle),
      },
      setEnterState: () => {
        circ._eqnCircumferenceDiameter._circumference.isTouchable = false;
        circ._eqnCircumferenceDiameter._diameter.isTouchable = false;
        circ._eqnDiameterRadius._diameter.isTouchable = false;
        circ._eqnDiameterRadius._radius.isTouchable = false;
      },
      setSteadyState: () => {
        circ._eqnDiameterRadius.showForm('base');
        circ._eqnDiameterRadius.setScenario('centerMid');
        circ._eqnCircumferenceDiameter.showForm('base');
        circ._eqnCircumferenceDiameter.setScenario('centerMid');
        // circ._allEquationNav.setScenario('bottom');
        circ._allEquationEqn.showForm('4');
        circ._allEquationEqn.setPosition(0.2, -0.65);
        circ._allEquationEqn.setScale(0.8);
      },
      setLeaverState: () => {
        circ._eqnCircumferenceDiameter._circumference.isTouchable = true;
        circ._eqnCircumferenceDiameter._diameter.isTouchable = true;
        circ._eqnDiameterRadius._diameter.isTouchable = true;
        circ._eqnDiameterRadius._radius.isTouchable = true;
      },
    });

    this.addSection(common, {
      title: 'Experiment',
      setContent: style({ top: 0 }, ['Experiment with changing the circle\'s |size| and |location| to see how it\'s properties change.']),
      show: [
        circle, circ._grid,
        circ._locationText, circ._circumferenceText,
        circ._diameterText, circ._radiusText,
      ],
      hide: [circle._arc],
      // setEnterState: () => {
      //   circ.containToGrid = true;
      //   circ.straighten(0);
      //   circ.straightening = false;
      //   circle.setScenario('center');
      //   circle._radius.setRotation(0.5);
      //   circle._diameter.setRotation(-0.5);
      //   circle.setScale(0.7);
      //   circle.move.maxTransform.updateScale(0.78, 0.78);
      //   circle.move.minTransform.updateScale(0.3, 0.3);
      //   circle._scale.isTouchable = true;
      //   circ._locationText.setScenario('summary');
      //   circ._circumferenceText.setScenario('summary');
      //   circ._radiusText.setScenario('summary');
      //   circle._line.setColor(colors.grid);
      // },
      // transitionFromAny: (done) => { done(); },
      // transitionFromPrev: (done) => { done(); },
      setSteadyState: () => {
        // circ.setDiameterAndRadiusRotation();
        circ.resetDiameterAndRadius();
        circ.containToGrid = true;
        circ.straighten(0);
        circ.straightening = false;
        circle.setScenario('center');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(0);
        circle.setScale(0.7);
        circle.move.maxTransform.updateScale(0.78, 0.78);
        circle.move.minTransform.updateScale(0.3, 0.3);
        circle._scale.isTouchable = true;
        circ._locationText.setScenario('summary');
        circ._circumferenceText.setScenario('summary');
        circ._radiusText.setScenario('summary');
        circle._line.setColor(colors.grid);
        circ.updateCircleLocation();
      },
      setLeaveState: () => {
        circle.move.maxTransform.updateScale(10, 10);
        circle.setScale(1);
        circle._scale.isTouchable = false;
        circle._line.setColor(colors.circle);
        circ.containToGrid = false;
      },
      setInfo: [
        'Drag circle |edge| to make larger or smaller',
        'Drag circle |center| to move',
        'Drag |radius| to rotate it',
        'Drag |diameter| to rotate it',
        'Press on |Circumference| text to straighten',
        'Press on other measurements text to hightlight',
      ],
    });
  }
}

export default Content;
