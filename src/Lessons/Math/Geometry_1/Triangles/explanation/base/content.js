// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  click,
  style,
  highlight,
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
    this.loadQRs([
      'AdjacentAngles/base', 'RelatedAngles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const examples = coll._examples;
    const custom = coll._customTriangle;
    const total = coll._totalAngle;

    this.addSection({
      title: 'Triangle',
      setContent: [
        'A triangle is a shape formed by |three straight lines| connected at |three corners| (or angles).',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      show: [examples],
    });

    this.addSection({
      setContent: [
        'Another way to make a triangle is to draw lines between any |three_points|.',
      ],
      modifiers: {
        three_points: click(coll.newCustomTriangle, [coll, null], colors.pads),
      },
      show: [
        custom._line, custom._pad0, custom._pad1, custom._pad2,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'prev') {
          custom.stop(true, 'noComplete');
          custom.animations.new()
            .scenarios({ target: 'props', duration: 1 })
            .whenFinished(done)
            .start();
        } else {
          custom.setScenarios('props');
          done();
        }
      },
    });

    this.addSection({
      title: 'Properties',
      setContent: [
        'What |properties| does a triangle have? Well, its definition gives us some to start with: |three_side_lengths|, and |three_angles|.',
      ],
      modifiers: {
        three_side_lengths: click(coll.growSides, [coll], colors.sideLengths),
        three_angles: click(coll.pulseAngles, [coll], colors.angles),
      },
      show: [custom._line],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'prev') {
          custom.stop(true, 'noComplete');
          custom.animations.new()
            .scenarios({ target: 'props', duration: 1 })
            .whenFinished(done)
            .start();
        } else {
          custom.setScenarios('props');
          done();
        }
      },
      setSteadyState: () => {
        custom._angle0.showAll();
        custom._angle1.showAll();
        custom._angle2.showAll();
        custom._side01.showAll();
        custom._side12.showAll();
        custom._side20.showAll();
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'Once properties are identified, the next question is |are they related?|',
        'If they are, then future analysis of the shape is simplified as you only need to know some properties to calculate the rest.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'In fact, a triangle\'s side lengths and angles |are all related|. If you know any four (and sometimes three), you can calculate the remainder!',
        'In this lesson we will focus on the |relationship between angles|.',
        ' The relationship between sides and angles, and exploration of additional properties, requires developing other concepts first, which are future lessons.',
      ]),
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'To find the |relationship| between a triangle\'s |angles|, we can use  |supplementary_angles| and |alternate_angles|.',
      ]),
      modifiers: {
        supplementary_angles: click(this.showQR, [this, 'AdjacentAngles/base', 'Supplementary'], colors.diagram.action),
        alternate_angles: click(this.showQR, [this, 'RelatedAngles/base', 'Alternate'], colors.diagram.action),
      },
    });

    this.addSection({
      title: 'Total Angle',
      setContent: style({}, [
        'Start with |any| triangle.',
      ]),
      modifiers: {
        any: click(coll.newTotalTriangle, [coll, null], colors.lines),
      },
      setEnterState: () => {
        if (this.comingFrom === 'next') {
          coll.dupFixedTriangle();
        } else {
          total._triangle.updatePoints(layout.defaultTri);
        }
      },
      show: [
        total._triangle._line,
        total._triangle._pad0,
        total._triangle._pad1,
        total._triangle._pad2,
      ],
    });

    this.addSection({
      setContent: style({}, [
        'Orient the triangle so its |base| is |horizontal|.',
      ]),
      modifiers: {
        any: click(coll.newTotalTriangle, [coll, null], colors.lines),
      },
      show: [
        total._fixedTriangle._line,
      ],
      transitionFromAny: (done) => {
        total._fixedTriangle._line.setColor(colors.lines);
        coll.makeBaseHorizontal(done);
      },
    });

    let common = {
      setContent: style({}, [
        'Label the angles |a|, |b| and |c|.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
      },
      show: [
        total._fixedTriangle._line,
      ],
    };
    this.addSection(common);
    this.addSection(common, {
      setEnterState: () => {
        total._angleA.setColor(colors.angle1);
        total._angleB.setColor(colors.angle2);
        total._angleC.setColor(colors.angle3);
        total._fixedTriangle._line.setColor(colors.lines);
        coll.updateTotalAngles();
      },
      show: [
        total._fixedTriangle._line,
        total._angleC, total._angleB, total._angleA,
      ],
      transitionFromAny: (done) => {
        coll.totalPulseAngles(['A', 'B', 'C'], done);
      },
    });

    common = {
      setContent: style({}, [
        'Draw |parallel_lines| that enclose the triangle and align with the bottom side of the triangle.',
      ]),
      setEnterState: () => {
        total._angleA.setColor(colors.angle1);
        total._angleB.setColor(colors.angle2);
        total._angleC.setColor(colors.angle3);
        total._topParallel.setColor(colors.parallel);
        total._bottomParallel.setColor(colors.parallel);
        total._fixedTriangle._line.setColor(colors.lines);
        total.setScenarios('offscreen');
        coll.updateTotalAngles();
      },
      show: [
        total._fixedTriangle._line,
        total._angleC, total._angleB, total._angleA,
      ],
    };
    this.addSection(common, {
      modifiers: {
        parallel_lines: click(this.next, [this], colors.parallel),
      },
    });
    this.addSection(common, {
      modifiers: {
        parallel_lines: click(coll.drawParallelLines, [coll, null], colors.parallel),
      },
      show: [
        total._fixedTriangle._line,
        total._angleC, total._angleB, total._angleA,
        total._topParallel, total._bottomParallel,
      ],
      transitionFromAny: (done) => {
        if (this.comingFrom === 'next') {
          total.setScenarios('parallel');
          done();
        } else {
          coll.drawParallelLines(done);
        }
      },
    });

    common = {
      setContent: style({}, [
        'When a line intersects two parallel lines, the |alternate_angles| are equal, so we can identify the alternate angle of |a|.',
      ]),
      modifiers: {
        alternate_angles: click(this.showQR, [this, 'RelatedAngles', 'Alternate'], colors.angle1),
        a: highlight(colors.angle1),
      },
      show: [
        total._fixedTriangle._line, total._topParallel, total._bottomParallel,
        total._angleC, total._angleB, total._angleA,
      ],
    };
    this.addSection(common, {
      setEnterState: () => {
        total._angleA.setColor(colors.angle1);
        total._angleB.setColor(colors.angle2);
        total._angleC.setColor(colors.angle3);
        total._topParallel.setColor(colors.parallel);
        total._bottomParallel.setColor(colors.parallel);
        total._fixedTriangle._line.setColor(colors.lines);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        total._angleA.setColor(colors.angle1);
        total._angleB.setColor(colors.disabled);
        total._angleC.setColor(colors.disabled);
        total._topParallel.setColor(colors.disabled);
        total._bottomParallel.setColor(colors.disabled);
        total._fixedTriangle._line.setColor(colors.disabled);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
    });
    this.addSection(common, {
      setEnterState: () => {
        total._angleA.setColor(colors.angle1);
        total._angleATop.setColor(colors.angle1);
        total._angleB.setColor(colors.disabled);
        total._angleC.setColor(colors.disabled);
        total._topParallel.setColor(colors.disabled);
        total._bottomParallel.setColor(colors.disabled);
        total._fixedTriangle._line.setColor(colors.disabled);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
      transitionFromAny: (done) => {
        total._angleATop.showAll();
        total._angleATop.pulseScaleNow(1, 1.2, 0, done);
      },
    });

    common = {
      setContent: style({}, [
        'We can similarly identify the |alternate_angle| of |b|.',
      ]),
      modifiers: {
        alternate_angle: click(this.showQR, [this, 'RelatedAngles', 'Alternate'], colors.angle2),
        b: highlight(colors.angle2),
      },
      show: [
        total._fixedTriangle._line, total._topParallel, total._bottomParallel,
        total._angleC, total._angleB, total._angleA, total._angleATop,
      ],
      setEnterState: () => {
        total._angleA.setColor(colors.disabled);
        total._angleATop.setColor(colors.disabled);
        total._angleB.setColor(colors.angle2);
        total._angleBTop.setColor(colors.angle2);
        total._angleC.setColor(colors.disabled);
        total._topParallel.setColor(colors.disabled);
        total._bottomParallel.setColor(colors.disabled);
        total._fixedTriangle._line.setColor(colors.disabled);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
    };
    this.addSection(common, {
    });
    this.addSection(common, {
      transitionFromAny: (done) => {
        total._angleBTop.showAll();
        total._angleBTop.pulseScaleNow(1, 1.2, 0, done);
      },
    });

    common = {
      setContent: style({}, [
        'Around the triangle\'s top point, |a|, |b| and |c| form a straight angle and are therefore |supplementary_angles|.',
      ]),
      modifiers: {
        supplementary_angles: click(this.showQR, [this, 'AdjacentAngles', 'Supplementary'], colors.diagram.action),
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
      },
      show: [
        total._fixedTriangle._line, total._topParallel, total._bottomParallel,
        total._angleC, total._angleB, total._angleA,
        total._angleATop, total._angleBTop,
      ],
      setEnterState: () => {
        total._angleA.setColor(colors.disabled);
        total._angleATop.setColor(colors.angle1);
        total._angleB.setColor(colors.disabled);
        total._angleBTop.setColor(colors.angle2);
        total._angleC.setColor(colors.angle3);
        total._topParallel.setColor(colors.disabled);
        total._bottomParallel.setColor(colors.disabled);
        total._fixedTriangle._line.setColor(colors.disabled);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
    };
    this.addSection(common, {
    });
    this.addSection(common, {
      setContent: 'Therefore:',
      setSteadyState: () => {
        total._eqn.showForm('0');
        total._eqn.setScenario('top');
      },
    });


    common = {
      setContent: style({}, [
        'Remember, angles |a| and |b| originally come from the triangle.',
      ]),
      modifiers: {
        a: highlight(colors.angle1),
        b: highlight(colors.angle2),
        c: highlight(colors.angle3),
      },
      show: [
        total._fixedTriangle._line, total._topParallel, total._bottomParallel,
        total._angleC, total._angleB, total._angleA,
        total._angleATop, total._angleBTop,
      ],
      setEnterState: () => {
        total._angleA.setColor(colors.disabled);
        total._angleATop.setColor(colors.angle1);
        total._angleB.setColor(colors.disabled);
        total._angleBTop.setColor(colors.angle2);
        total._angleC.setColor(colors.angle3);
        total._topParallel.setColor(colors.disabled);
        total._bottomParallel.setColor(colors.disabled);
        total._fixedTriangle._line.setColor(colors.disabled);
        coll.updateTotalAngles();
        total.setScenarios('parallel');
      },
    };
    this.addSection(common);

    common.setEnterState = () => {
      total._angleA.setColor(colors.angle1);
      total._angleATop.setColor(colors.disabled);
      total._angleB.setColor(colors.angle2);
      total._angleBTop.setColor(colors.disabled);
      total._angleC.setColor(colors.angle3);
      total._topParallel.setColor(colors.disabled);
      total._bottomParallel.setColor(colors.disabled);
      total._fixedTriangle._line.setColor(colors.lines);
      coll.updateTotalAngles();
      total.setScenarios('parallel');
    };
    this.addSection(common, {
      transitionFromAny: (done) => {
        coll.totalPulseAngles(['A', 'B'], done);
      },
    });

    common.show = [
      total._fixedTriangle._line,
      total._angleC, total._angleB, total._angleA,
    ];
    this.addSection(common, {
      setContent: 'Therefore:',
      setSteadyState: () => {
        total._eqn.showForm('0');
        total._eqn.setScenario('top');
      },
    });
    this.addSection(common, {
      setContent: 'So angles in a triangle add up to |180º|.',
    });
    this.addSection({
      setContent: style({ centerV: true }, [
        '|All triangles| have this relationship between angles.',
        'This means if you know any two angles, you can always |calculate| the third!',
      ]),
    });
  }
}

export default Content;
