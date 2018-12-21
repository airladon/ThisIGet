// @flow
import Fig from 'figureone';
import {
  LessonContent,
} from '../../../../../js/Lesson/LessonContent';
import LessonDiagram from './diagram';
import Definition from '../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const {
  click, centerV, highlight,
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
    // this.overlayDiagram = new OverlayLessonDiagram(htmlId, layout);
    this.diagram = new LessonDiagram(htmlId, layout);
  }

  addSections() {
    const diag = this.diagram.elements;
    const examples = diag._examples;
    const custom = diag._custom;
    const properties = diag._properties;
    const totalAngle = diag._totalAngle;
    const qr = diag._qr;
    // const qr = this.diagram.elements;
    let common = {};

    this.addSection({
      title: 'Introduction',
      setContent: `
        <p>
          A triangle is a shape formed by |three straight lines| connected at |three corners| (or angles). 
        </p>
        <p>
          Hence the name |tri| (three) |angle| (corner).
        </p>
        ${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html('id_lesson__related_angles_definition')}
      `,
      // showOnly: [
      //   diag,
      // ],
      show: [
        examples,
      ],
      setSteadyState: () => {
        examples.setScenario(examples._tri1, layout.examples.tri1.position);
        examples.setScenario(examples._tri2, layout.examples.tri2.position);
        examples.setScenario(examples._tri3, layout.examples.tri3.position);
      },
    });

    this.addSection({
      setContent: `
        <p>
          Another way to make a triangle is to draw lines between any |three_points|.
        </p>
      `,
      modifiers: {
        three_points: click(custom.newTriangle, [custom], colors.pointText),
      },
      setInfo: [
        '<ul>',
        '<li>Drag the points or touch the |three_points| text to change the triangle.</li>',
        '</ul>',
      ],
      infoModifiers: {
        three_points: highlight(colors.pointText),
      },
      show: [
        custom,
      ],
      setEnterState: () => {
        custom.calculateFuturePositions();
        custom._triangle._point1.setPosition(0.1, 0.1);
        custom._triangle._point1.setPosition(0.1, -0.1);
        custom._triangle._point1.setPosition(-0.1, 0.1);
      },
      transitionFromAny: (done) => {
        custom.moveToFuturePositions(1.5, done);
      },
      setSteadyState: () => {
        custom.setFuturePositions();
      },
    });

    this.addSection({
      title: 'Properties',
      setContent: `
        <p>
          What properties does a triangle have? Well, its definition gives us some, |three_side_lengths|, and |three_angles|.
        </p>
      `,
      modifiers: {
        three_side_lengths: click(properties.growDimensions, [properties], colors.dimensions),
        three_angles: click(properties.pulseAngles, [properties], colors.angleText),
      },
      setInfo: [
        '<ul>',
        '<li>Drag the triangle corners to change the triangle.</li>',
        '<li>Touch the |three_side_lengths| and |three_angle_sizes| text to highlight the side lengths and angles.</li>',
        '</ul>',
      ],
      infoModifiers: {
        three_side_lengths: highlight(colors.dimensions),
        three_angle_sizes: highlight(colors.angleText),
      },
      setEnterState: () => {
        if (this.comingFrom === 'prev') {
          const tri = custom._triangle;
          properties._triangle.updatePoints(tri.p1, tri.p2, tri.p3);
        }
        properties.calculateFuturePositions();
      },
      showOnly: [
        diag,
        properties,
        properties._triangle,
        properties._triangle._line,
        properties._triangle._point1,
        properties._triangle._point2,
        properties._triangle._point3,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'prev') {
          properties.moveToFuturePositions(2, done);
        } else {
          done();
        }
      },
      setSteadyState: () => {
        properties.setFuturePositions();
        properties._triangle.showDimensions(false);
        properties._triangle.showAngles(false);
      },
    });

    this.addSection({
      setContent: centerV(`
        <p>
          Once properties are identified, the next question is |are they related?|
        </p>
        <p>
          If they are, then future analysis of the shape is simplified as you only need to know some properties to calculate the rest.
        </p>

      `),
    });

    this.addSection({
      setContent: centerV(`
        <p>
          In fact, a triangle's side lengths and angles |are all related|. If you know any four (and sometimes three), you can calculate the remainder!
        </p>
        <p>
          In this lesson we will focus on the |relationship between angles|. The relationship to sides requires knowledge of the sine function, which which is in a later lesson.
        </p>
      `),
    });
    this.addSection({
      setContent: centerV(`
        <p>
          To find this relationship, we can use knowledge of |supplementary_angles| and |alternate_angles| when a line intersects parallel lines.
        </p>
      `),
      modifiers: {
        alternate_angles: click(qr._alternateAngles.show, [qr._alternateAngles], colors.line),
        supplementary_angles: click(qr._supplementary.show, [qr._supplementary], colors.line),
      },
      showOnly: [
        qr,
      ],
    });

    common = {
      showOnly: [
        totalAngle,
      ],
      show: [
        totalAngle._triangle,
      ],
      hide: [
        totalAngle._triangle._angle1,
        totalAngle._triangle._angle2,
        totalAngle._triangle._angle3,
      ],
    };
    this.addSection(common, {
      title: 'Total Angle',
      setContent: `
        <p>
          Start with |any| triangle.
        </p>
      `,
      modifiers: {
        any: click(totalAngle.randomize, [totalAngle, false], colors.diagram.action),
      },
      setInfo: [
        '<ul>',
        '<li>Drag the corners or touch the |any| text to change the triangle.</li>',
        '</ul>',
      ],
      infoModifiers: {
        any: highlight(colors.diagram.action),
      },
      setEnterState: () => {
        totalAngle._triangle.hasTouchableElements = true;
      },
      setLeaveState: () => {
        totalAngle._triangle.hasTouchableElements = false;
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          For convenience orient it so one side is horizontal.
        </p>
      `,
      setEnterState: () => {
        totalAngle.calculateTriangleFuturePositions();
      },
      transitionFromAny: (done) => {
        totalAngle.moveToFuturePositions(1, done);
      },
      setSteadyState: () => {
        totalAngle.setFuturePositions();
        totalAngle.resetTrianglePoints();
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          Label the angles |a|, |b| and |c|.
        </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        b: highlight(colors.angleB),
        c: highlight(colors.angleC),
      },
    });

    this.addSection(common, {
      setContent: `
        <p>
          Label the angles |a|, |b| and |c|.
        </p>
      `,
      modifiers: {
        a: highlight(colors.angleA),
        b: highlight(colors.angleB),
        c: highlight(colors.angleC),
      },
      hide: [],
      setSteadyState: () => {
        totalAngle._triangle._angle1.pulseScaleNow(1, 1.2);
        totalAngle._triangle._angle2.pulseScaleNow(1, 1.2);
        totalAngle._triangle._angle3.pulseScaleNow(1, 1.2);
      },
    });

    common = {
      setContent: `
        <p>
          Draw parallel lines that enclose the triangle and align with the bottom side of the triangle.
        </p>
      `,
      showOnly: [
        totalAngle,
      ],
      show: [
        totalAngle._triangle,
        // totalAngle._angleC,
      ],
    };
    this.addSection(common, {
    });

    this.addSection(common, {
      setEnterState: () => {
        const { offScreen } = layout.totalAngle.parallelLine;
        totalAngle.calculateParallelLineFuturePositions();
        totalAngle._line1.setPosition(offScreen.line1);
        totalAngle._line2.setPosition(offScreen.line2);
      },
      show: [...common.show, totalAngle._line1, totalAngle._line2],
      transitionFromAny: (done) => {
        totalAngle.moveToFuturePositions(1.5, done);
      },
      skipWhenComingFromNext: true,
      setSteadyState: () => {
        totalAngle.setFuturePositions();
      },
    });


    common = {
      setContent: `
        <p>
          When one line intersects two parallel lines, the |alternate_angles| are equal, so we can identify the alternate angle of |a|.
        </p>
      `,
      modifiers: {
        alternate_angles: click(qr._alternateAngles.show, [qr._alternateAngles], colors.line),
        a: highlight(colors.angleA),
      },
      showOnly: [
        qr,
        totalAngle,
      ],
      show: [
        totalAngle._triangle,
        totalAngle._line1,
        totalAngle._line2,
        // totalAngle._angleC,
      ],
      setLeaveState: () => {
        totalAngle.resetColors();
      },
    };
    const greyLines = {
      setEnterState: () => {
        totalAngle._triangle._angle2.setColor(colors.diagram.disabled);
        totalAngle._triangle._angle3.setColor(colors.diagram.disabled);
        // totalAngle._angleC.setColor(colors.diagram.disabled);
        totalAngle._line1.setColor(colors.diagram.disabled);
        totalAngle._line2.setColor(colors.diagram.disabled);
        totalAngle._triangle._line.setColor(colors.diagram.disabled);
      },
    };
    this.addSection(common);
    this.addSection(common, greyLines);
    this.addSection(common, greyLines, {
      modifiers: {
        alternate_angles: click(qr._alternateAngles.show, [qr._alternateAngles], colors.line),
        a: click(totalAngle.pulseAlternateA, [totalAngle], colors.angleA),
      },
      show: [
        ...common.show,
        totalAngle._angleA,
      ],
      setSteadyState: () => {
        totalAngle.pulseAlternateA();
      },
    });

    common = {
      setContent: `
        <p>
          We can similarly identify the |alternate_angle| of |b|.
        </p>
      `,
      modifiers: {
        alternate_angle: click(qr._alternateAngles.show, [qr._alternateAngles], colors.line),
        b: highlight(colors.angleB),
      },
      setEnterState: () => {
        totalAngle._triangle._angle1.setColor(colors.diagram.disabled);
        totalAngle._triangle._angle3.setColor(colors.diagram.disabled);
        // totalAngle._angleC.setColor(colors.diagram.disabled);
        totalAngle._angleA.setColor(colors.diagram.disabled);
        totalAngle._triangle._line.setColor(colors.diagram.disabled);
      },
      showOnly: [
        qr,
        totalAngle,
      ],
      show: [
        totalAngle._triangle,
        totalAngle._line1,
        totalAngle._line2,
        // totalAngle._angleC,
        totalAngle._angleA,
      ],
      setLeaveState: () => {
        totalAngle.resetColors();
      },
    };

    this.addSection(common, {
    });
    common.modifiers = {
      alternate_angle: click(qr._alternateAngles.show, [qr._alternateAngles], colors.line),
      b: click(totalAngle.pulseAlternateB, [totalAngle], colors.angleB),
    };

    this.addSection(common, {
      show: [...common.show, totalAngle._angleB],
      setSteadyState: () => {
        totalAngle.pulseAlternateB();
      },
    });

    common = {
      setContent: `
        <p>
          Therefore:
        </p>
      `,
      setEnterState: () => {
        totalAngle._triangle._angle1.setColor(colors.diagram.disabled);
        totalAngle._triangle._angle2.setColor(colors.diagram.disabled);
        totalAngle._triangle._line.setColor(colors.diagram.disabled);
      },
      showOnly: [
        qr,
        totalAngle,
        totalAngle._eqn,
      ],
      show: [
        totalAngle._triangle,
        totalAngle._line1,
        totalAngle._line2,
        // totalAngle._angleC,
        totalAngle._angleA,
        totalAngle._angleB,
      ],
      setSteadyState: () => {
        totalAngle.eqn.showForm('base');
      },
      setLeaveState: () => {
        totalAngle.resetColors();
      },
    };
    this.addSection(common, {
      setContent: `
        <p>
          Around the triangle's top point, |a|, |b| and |c| form a straight angle and are therefore |supplementary_angles|.
        </p>
      `,
      modifiers: {
        supplementary_angles: click(qr._supplementary.show, [qr._supplementary], colors.line),
        b: highlight(colors.angleB),
        a: highlight(colors.angleA),
        c: highlight(colors.angleC),
      },
      setSteadyState: () => {},
    });
    this.addSection(common, {
      setSteadyState: () => {
        totalAngle.eqn.showForm('base');
      },
    });
    this.addSection(common, {
      setContent: `
        <p>
          Remember, angles |a| and |b| originally come from the triangle.
        </p>
      `,
      modifiers: {
        b: highlight(colors.angleB),
        a: highlight(colors.angleA),
      },
      setSteadyState: () => {},
    });
    this.addSection(common, {
      setContent: `
        <p>
          Remember, angles |a| and |b| originally come from the triangle.
        </p>
      `,
      modifiers: {
        b: highlight(colors.angleB),
        a: highlight(colors.angleA),
      },
      setEnterState: () => {
        totalAngle._angleA.setColor(colors.diagram.disabled);
        totalAngle._angleB.setColor(colors.diagram.disabled);
        // totalAngle._triangle._line.setColor(colors.diagram.disabled);
      },
      setSteadyState: () => {
        totalAngle._triangle._angle1.pulseScaleNow(1, 1.2);
        totalAngle._triangle._angle2.pulseScaleNow(1, 1.2);
      },
    });
    this.addSection(common, {
      setEnterState: () => {
      },
      show: [
        totalAngle._triangle,
        // totalAngle._angleC,
      ],
      setSteadyState: () => {
        totalAngle.eqn.showForm('base');
      },
    });

    this.addSection({
      setContent: `
        <p>
         So angles in a triangle add up to |180º| or |π radians|.
        </p>
      `,
      showOnly: [
        qr,
        totalAngle,
      ],
      show: [
        totalAngle._triangle,
      ],
    });

    this.addSection({
      setContent: centerV(`
        <p>
         |All triangles| have this property. This means if you know two angles, you can always calculate the third!
        </p>
      `),
    });
  }
}

export default Content;
