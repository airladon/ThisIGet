// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  // centerV,
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
    this.loadQRs([
      'Math/Geometry_1/Quadrangles/base',
      'Math/Geometry_1/ParallelLines/base',
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/AnglesAtIntersections/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const pgram = coll._pgram;
    
    // // const fig = coll._fig;
    // const dimmer = () => {
    //   // coll._pgram.pulseDefault(null);
    //   // coll._pgram.setDimColor([1, 0, 0, 0.5]);
    //   // coll._pgram.dim();
    //   coll._pgram.exec('dim', ['a1', 'a2', 'b2']);
    //   this.diagram.animateNextFrame();
    // };

    // const dim2 = () => {
    //   coll._pgram.undim();
    //   coll._pgram.exec(['setDimColor', [0, 1, 0, 1]], ['a1.curve', 'a2', 'b1']);
    //   coll._pgram.dim();
    //   this.diagram.animateNextFrame();
    // };

    // const highlight1 = () => {
    //   coll._pgram.highlight([coll._pgram._a1, 'b1', 'a2.curve']);
    //   this.diagram.animateNextFrame();
    // }

    // const undimmer = () => {
    //   coll.undim();
    //   this.diagram.animateNextFrame();
    // }
    
    // // const clicker = () => {
    // //   coll._pgram.pulse(['_a1', coll._param._a2, 'b1.curve']);
    // //   this.diagram.animateNextFrame();
    // // }

    // this.addSection({
    //   setContent: 'this is a |dim| and |dim2|, |undim|, and |test|, |highlight|, |h2|',
    //   modifiers: {
    //     dim: click(dimmer, [this], colors.sides),
    //     dim2: click(dim2, [this], colors.sides),
    //     undim: click(undimmer, [this], colors.sides),
    //     highlight: click(highlight1, [this], colors.sides),
    //     h2: this.bindHighlightAndPulse(coll._pgram, ['diag2', 'a1', 'a2']),
    //     // test: click(clicker, [this], colors.sides),
    //     test: this.bindPulse(coll._pgram, ['a1', 'a2.curve', 'diag1', 'lMark21', 'pMarkTop']),
    //   },
    //   show: [coll],
    //   setSteadyState: () => {
    //     console.log(coll)
    //   }
    // });
    let common = {
      setEnterState: () => {
        pgram.undim();
        pgram.setScenario('default');
      },
    };
    this.addSection(common, {
      title: 'Definition',
      setContent: [
        'A |parallelogram| is a |quadrangle| whose opposite sides are |parallel|.',
        `${new Definition('Parallelogram', 'Latin', ['parallelogrammum', ''], 'Greek', ['parallelogrammon', 'bounded by parallel lines']).html(colors.sides)}`,
      ],
      modifiers: {
        parallelogram: this.bindPulse(pgram, null, null),
        parallel: this.qr('Math/Geometry_1/ParallelLines/base/Main'),
        quadrangle: this.qr('Math/Geometry_1/Quadrangles/base/Main'),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
      ],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        '|Parallelograms| are |common| shapes, and it is therefore useful to know their |properties| to make solving problems that invovle them |easier|.',
      ]),
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
      ],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    let commonContent = {
      setContent: 'Let\'s start by labeling an |angle|.',
      modifiers: { angle: this.bindNext(colors.angles) },
    };

    this.addSection(common, commonContent, {
      title: 'Angles',
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        angle: this.bindPulse(pgram._a1, null, null),
      },
      transitionFromPrev: (done) => {
        this.pulse(pgram._a1, done);
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1,
      ],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: '|Interior_angles| between intersected parallel lines can then be used to calculate the bottom right |angle|.',
      modifiers: {
        Interior_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Interior'),
        angle: this.bindNext(colors.angles),
      },
    };

    this.addSection(common, commonContent, {
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        angle: this.bindPulse(pgram, ['b1', 'a1'], null),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1,
      ],
      transitionFromPrev: (done) => {
        this.pulse(pgram, ['b1', 'a1'], done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'Similarly, the remaining angles can be calculated with |interior_angle_pairs|.',
      modifiers: {
        interior_angle_pairs: this.bindNext(colors.angles),
      },
    };

    this.addSection(common, commonContent, {
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        interior_angle_pairs: click(coll.toggleInteriorAngles, [coll, null], colors.angles),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
      ],
      transitionFromPrev: (done) => {
        pgram.pulse(['a1', 'a2', 'b1', 'b2'], done);
      },
      setSteadyState: () => {
        coll.toggleIndex = 0;
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      setContent: 'And so we can see |opposite_angles| are |equal|.',
      modifiers: {
        opposite_angles: click(coll.toggleOppositeAngles, [coll, null], colors.angles),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
      ],
      setSteadyState: () => {
        coll.toggleIndex = 0;
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'For simplicity moving forward, let\'s |remove| the angle labels.',
      modifiers: {
        remove: this.bindNext(colors.angles),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
      ],
    });

    common = {
      setEnterState: () => {
        pgram.undim();
        pgram.setScenario('default');
        console.log(pgram)
      },
      hide: [
        pgram._a1._label, pgram._a2._label,
        pgram._b1._label, pgram._b2._label,
      ],
    }
    this.addSection(common, commonContent, {
      modifiers: {
        remove: click(coll.dissolveOutAngleLabels, [coll, null], colors.angles)
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
      ],
      transitionFromPrev: (done) => {
        coll.dissolveOutAngleLabels(done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'Draw a |diagonal_line| between two opposite corners to split the parallelogram into |two triangles|.',
      modifiers: {
        diagonal_line: this.bindNext(colors.sides),
      },
    };

    this.addSection(common, commonContent, {
      title: 'Side Lengths',
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
      ],
      hide: [
        pgram._a1._label, pgram._a2._label,
        pgram._b1._label, pgram._b2._label,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        diagonal_line: click(pgram._diag1.grow, [pgram._diag1, 0.05, 1, true, null], colors.sides),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
      ],
      transitionFromPrev: (done) => {
        pgram._diag1.grow(0.05, 1, true, done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'Using |alternate_angles| between parallel lines, we can highlight two more |equal_angles|.',
      modifiers: {
        alternate_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Alternate'),
        equal_angles: this.bindNext(colors.angles2),
      },
    };

    this.addSection(common, commonContent, {
      title: 'Side Lengths',
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        equal_angles: this.bindPulse(pgram, ['c1', 'c2']),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
      ],
      transitionFromPrev: (done) => {
        pgram.pulse(['c1', 'c2'], done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'We can remove some marks on the diagram that we don\'t need for now.',
      modifiers: {
        alternate_angles: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Alternate'),
        equal_angles: this.bindNext(colors.angles2),
      },
    };

    this.addSection(common, commonContent, {
      title: 'Side Lengths',
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        equal_angles: this.bindPulse(pgram, ['c1', 'c2']),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
      ],
      transitionFromPrev: (done) => {
        pgram.pulse(['c1', 'c2'], done);
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'The two triangles |share| the same corresponding two angles and side, therefore by |AAS| they must be |congruent|.',
      modifiers: {
        AAS: this.qr('Math/Geometry_1/CongruentTriangles/base/Aas'),
        share: click(coll.toggleSas, [coll, null], colors.diagram.action),
      },
    };

    this.addSection(common, commonContent, {
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
      ],
      setSteadyState: () => {
        coll.toggleIndex = 0;
      }
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'As the triangles are |congruent|, then their corresponding sides must be the |same_length|.',
      modifiers: {
        same_length: this.bindNext(colors.sides),
      },
    };

    this.addSection(common, commonContent, {
      title: 'Side Lengths',
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        same_length: click(coll.toggleEqualSides, [coll, null], colors.sides),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
        pgram._labelA1, pgram._labelA2, pgram._labelB1, pgram._labelB2,
      ],
      transitionFromPrev: (done) => {
        pgram.pulse(['labelA1', 'labelA2', 'labelB1', 'labelB2'], done);
      },
      setSteadyState: () => {
        coll.toggleIndex = 0;
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, commonContent, {
      setContent: 'And so we see the parallelogram\'s |opposite_sides| are |equal|.',
      modifiers: {
        opposite_sides: click(coll.toggleEqualSides, [coll, null], colors.sides),
      },
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._diag1,
        pgram._c1, pgram._c2,
        pgram._labelA1, pgram._labelA2, pgram._labelB1, pgram._labelB2,
      ],
      transitionFromPrev: (done) => {
        pgram.pulse(['labelA1', 'labelA2', 'labelB1', 'labelB2'], done);
      },
      setSteadyState: () => {
        coll.toggleIndex = 0;
      },
    });
  }
}

export default Content;
