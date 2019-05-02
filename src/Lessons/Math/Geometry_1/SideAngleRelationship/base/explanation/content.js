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
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  centerV,
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
      'isosceles_triangles',
      'triangle_external_angle',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const shortestExample = coll._shortestExample;
    const longestExample = coll._longestExample;
    const fig = coll._fig;

    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    };

    this.addSection(common, {
      title: 'Introduction',
      setContent: [
        'There are some triangles where the |longest| side’s |opposite_angle| is the |largest|, and the |shortest| side’s |_opposite_angle| is the |smallest|.',
      ],
      modifiers: {
        _opposite_angle: click(coll.pulseSmallestAngle, [coll], colors.angles),
        shortest: click(coll.pulseShortestSide, [coll], colors.sides),
        smallest: click(coll.pulseSmallestAngle, [coll], colors.angles),
        longest: click(coll.pulseLongestSide, [coll], colors.sides),
        largest: click(coll.pulseLargestAngle, [coll], colors.angles),
        opposite_angle: click(coll.pulseLargestAngle, [coll], colors.angles),
      },
      show: [shortestExample, longestExample],
      setEnterState: () => {
        coll.setScenarios('default');
      },
      // setSteadyState: () => {
      //   coll.setScenarios('default');
      //   coll._0.showForm('sides0');
      //   coll._1.showForm('sides1');
      //   coll._2.showForm('sides2');
      //   coll._3.showForm('sides3');
      //   coll._4.showForm('sides4');
      //   coll._fig.setScenarios('left');
      // },
    });

    this.addSection({
      setContent: centerV([
        'We wish to see if this observation holds |generally|.',
        'Do the longest side\'s opposite angle |always| correspond to the largest angle?',
        'Conversely, does the largest angle\'s opposite side |always| correspond to the longest side?',
      ]),
    });

    this.addSection(common, {
      title: 'Side to Angle Relationship',
      setContent: [
        'To look at this, start with a triangle where side |B| is longer than side |A|.',
      ],
      show: [
        fig._tri._line,
        fig._tri._side01, fig._tri._side12,
      ],
    });


    let content = {
      setContent: [
        'We are interested in the |opposite_angles| of these sides, so we can mark them.',
      ],
    };
    this.addSection(common, content, {
      modifiers: {
        opposite_angles: this.bindNext(colors.angles),
      },
      show: [fig._tri._line, fig._tri._side01, fig._tri._side12],
    });
    this.addSection(common, content, {
      modifiers: {
        opposite_angles: click(coll.pulseOppositeAngles, [coll, null], colors.angles),
      },
      transitionFromPrev: (done) => {
        coll.pulseOppositeAngles(done);
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2,
      ],
    });

    content = {
      setContent: [
        'As we know |side B > side A|, we can mark out |length A| on |side B|, and then form an |isosceles| |triangle| with |side A|.',
      ],
    };
    this.addSection(common, content, {
      modifiers: {
        isosceles: this.bindShowQR('isosceles_triangles/base', 'Main'),
        triangle: click(this.next, [this], colors.isosceles),
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2,
      ],
    });
    this.addSection(common, content, {
      modifiers: {
        isosceles: this.bindShowQR('isosceles_triangles/base', 'Main'),
        triangle: click(coll.pulseIsoscelesTriangle, [coll, null], colors.isosceles),
      },
      transitionFromPrev: (done) => {
        coll.pulseIsoscelesTriangle(done);
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2, fig._isosceles._line,
        fig._isosceles._side01, fig._isosceles._side12,
      ],
    });

    content = {
      setContent: [
        'Now lets mark some of the new |angles|.',
      ],
    };
    this.addSection(common, content, {
      modifiers: { angles: this.bindNext(colors.isosceles) },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2, fig._isosceles._line,
        fig._isosceles._side01, fig._isosceles._side12,
      ],
    });
    this.addSection(common, content, {
      modifiers: {
        angles: click(coll.pulseNewAngles, [coll, null], colors.isosceles),
      },
      transitionFromPrev: (done) => {
        coll.pulseNewAngles(done);
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2, fig._isosceles._line,
        fig._isosceles._side01, fig._isosceles._side12,
        fig._isosceles._angle0, fig._isosceles._angle2,
        fig._lowerAngle,
      ],
    });

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        coll.setScenarios('left');
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2, fig._isosceles._line,
        fig._isosceles._side01, fig._isosceles._side12,
        fig._isosceles._angle0, fig._isosceles._angle2,
        fig._lowerAngle,
      ],
    };
    content = {
      setContent: [
        'We can now |analyse| the diagram.',
      ],
    };
    this.addSection(common, content, {
      transitionFromPrev: (done) => {
        coll.setScenarios('default');
        coll.animations.cancelAll();
        coll.animations.new()
          .scenarios({ target: 'left', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('default');
        coll.setScenarios('left');
      },
    });

    content = {
      setContent: [
        'First, we started with the knowledge that |side B| was |longer| than |side A|.',
      ],
    };
    this.addSection(common, content);
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
      },
    });

    content = {
      setContent: [
        'We can see |n| is the |external_angle| of the |lower_triangle|.',
      ],
      modifiers: {
        n: click(coll.pulseAngleN, [coll], colors.isosceles),
        external_angle: this.bindShowQR('triangle_external_angle/base', 'Main', colors.isosceles),
        lower_triangle: click(coll.toggleLowerTriangle, [coll], colors.sides),
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
      },
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
      },
    });

    content = {
      setContent: [
        'Angles |m| and |n| are |equal| as they are the angles opposite the |isosceles| triangle\'s equal sides.',
      ],
      modifiers: {
        n: click(coll.pulseAngleN, [coll], colors.isosceles),
        m: click(coll.pulseAngleM, [coll], colors.isosceles),
        isosceles: this.bindShowQR('isosceles_triangles/base', 'Main', colors.isosceles),
        lower_triangle: click(coll.toggleLowerTriangle, [coll], colors.sides),
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
      },
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
        coll._2.showForm('sides2');
      },
    });

    content = {
      setContent: [
        'As |m| is the |sum| of |o| and |a|, then |_m| must be larger than |_a|.',
      ],
      modifiers: {
        o: click(coll.pulseAngleO, [coll], colors.isosceles),
        m: click(coll.pulseAngleM, [coll], colors.isosceles),
        _m: click(coll.pulseAngleM, [coll], colors.isosceles),
        a: click(coll.pulseAngleA, [coll], colors.angles),
        _a: click(coll.pulseAngleA, [coll], colors.angles),
        sum: click(coll.pulseEqn2, [coll], colors.diagram.action),
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
        coll._2.showForm('sides2');
      },
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
        coll._2.showForm('sides2');
        coll._3.showForm('sides3');
      },
    });

    content = {
      setContent: [
        'As |b| is the sum of |m_and_o|, and as |m_>_a|, then it follows |_b| > |a|.',
      ],
      modifiers: {
        a: click(coll.pulseAngleA, [coll], colors.angles),
        b: click(coll.pulseAngleB, [coll], colors.angles),
        _b: click(coll.pulseAngleB, [coll], colors.angles),
        m_and_o: click(coll.pulseAnglesMO, [coll], colors.isosceles),
        'm_>_a': click(coll.pulseEqn3, [coll], colors.diagram.action),
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
        coll._2.showForm('sides2');
        coll._3.showForm('sides3');
      },
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('sides0');
        coll._1.showForm('sides1');
        coll._2.showForm('sides2');
        coll._3.showForm('sides3');
        coll._4.showForm('sides4');
      },
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'So we see if |one side of a triangle is a different length to another|, then the |angles opposite the sides| will also be |different|.',
        'In addition, the |longer side| will |always| be opposite the |larger angle|.',
      ]),
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2,
      ],
      transitionFromPrev: (done) => {
        coll.setScenarios('left');
        coll.animations.cancelAll();
        coll.animations.new()
          .scenarios({ target: 'default', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('default');
      },
    });

    this.addSection({
      setContent: style({ centerV: true }, [
        'This conclusion applies to |all sides| in a triangle, as the same logic can be applied to any pair of sides.',
      ]),
    });

    this.addSection({
      title: 'Angle to Side Relationship',
      setContent: style({ centerV: true }, [
        'Does the relationship hold in the |other| direction?',
        'If you have two angles that are different, will the two side lengths also be different and will the longer side be opposite the larger angle?',
      ]),
    });

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        coll.setScenarios('left');
      },
      show: [
        fig._tri._line, fig._tri._side01, fig._tri._side12,
        fig._tri._angle0, fig._tri._angle2,
      ],
    };
    this.addSection(common, {
      setContent: style({}, [
        'We can show this through a contradiction.',
      ]),
    });

    content = {
      setContent: [
        'We start with the knowledge that angle |b| is |larger| than angle |a|.',
      ],
      modifiers: {
        b: click(coll.pulseAngleB, [coll], colors.angles),
        a: click(coll.pulseAngleA, [coll], colors.angles),
      },
    };
    this.addSection(common, content, {
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('angles0');
      },
    });

    content = {
      setContent: [
        'Now we make an assumption that |B| is |shorter| than |A|. If this assumption results in a |contradiction|, then we know the assumption is wrong.',
      ],
      modifiers: {
        A: click(coll.pulseSideA, [coll], colors.sides),
        B: click(coll.pulseSideB, [coll], colors.sides),
      },
    };
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('angles0');
      },
    });
    this.addSection(common, content, {
      setSteadyState: () => {
        coll._0.showForm('angles0');
        coll._1.showForm('angles1');
      },
    });
  }
}

export default Content;
