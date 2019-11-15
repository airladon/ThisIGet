// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
import { note } from '../../../../../common/tools/note';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  // highlight,
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
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/Quadrangles/base',
      'Math/Geometry_1/AngleGroups/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tot = coll._tot;

    // ************************************************************
    // ************************************************************
    // ************************************************************
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    }
    this.addSection(common, {
      title: 'Definition',
      setContent: [
        'A |polygon| is the general term that describes a shape made up of |straight sides|.',
        `${new Definition('Polygon', 'Latin', ['polygonum', ''], 'Greek', ['polygonos', 'many-angled']).html({
          // classes: 'diagram__definition_high',
          color: colors.sides,
        })}`,
      ],
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      setContent: [
        '|Triangles| and and |quadrangles| are |polygons| with |three| and |four| sides respectively.',
      ],
      modifiers: {
        Triangles: coll.bindAccent(coll._poly1),
        quadrangles: coll.bindAccent(coll._poly2),
      },
      show: [coll._poly0, coll._poly1, coll._poly2],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      title: 'Total Angle',
      setContent: style({ centerV: true }, [
        'We have previously found the |total angle| of a |triangle| and |quadrangle|.',
        'Is it possible to find the |total angle| of |any| polygon?',
      ]),
      modifiers: {
        triangle: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        quadrangle: this.qr('Math/Geometry_1/Quadrangles/base/Main'),
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    this.addSection(common, {
      setContent: 'Start with a |triangle| where we know the total angle is 180º.',
      show: [tot._n3],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    let commonContent = {
      setContent: 'To make a polygon with an |extra side|, we can add a |point| outside the shape.',
    };
    this.addSection(common, commonContent, {
      modifiers: { point: this.bindNext(colors.sides) },
      show: [tot._n3],
    });

    this.addSection(common, commonContent, {
      modifiers: { point: coll.bindAccent(tot._p4) },
      show: [tot._n3, tot._p4],
      transitionFromPrev: (done) => {
        coll.accent(tot._p4, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Replace one side with |two_sides|, which is effectively |adding one side|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n3, tot._p4],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 4, null], colors.sides),
      },
      show: [tot._n4, tot._p4, tot._l4],
      transitionFromPrev: (done) => {
        coll.growSides(4, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'The shape is made up of |two triangles|, meaning its total angle will be |360º|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Let\'s add another |point| outside the shape.',
    };
    this.addSection(common, commonContent, {
      modifiers: { point: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4],
    });

    this.addSection(common, commonContent, {
      modifiers: { point: coll.bindAccent(tot._p5) },
      show: [tot._n4, tot._l4, tot._p5],
      transitionFromPrev: (done) => {
        coll.accent(tot._p5, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Once again replace one side with |two_sides|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n4, tot._l4, tot._p5],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 5, null], colors.sides),
      },
      show: [tot._n5, tot._p5, tot._l5, tot._l4],
      transitionFromPrev: (done) => {
        coll.growSides(5, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'And now we have |three triangles|. So every time we |add a side|, we effectively add another |180º| to the |total internal angle|.',
    };
    this.addSection(common, commonContent, {
      show: [tot._n5, tot._l5, tot._l4],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Now, does this hold if we add the point |inside| the shape instead of outside?',
    };
    this.addSection(common, commonContent, {
      modifiers: { inside: this.bindNext(colors.sides) },
      show: [tot._n5],
    });

    this.addSection(common, commonContent, {
      modifiers: { inside: coll.bindAccent(tot._p6) },
      show: [tot._n5, tot._p6],
      transitionFromPrev: (done) => {
        coll.accent(tot._p6, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Similar before, we can replace one side with |two_sides|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { two_sides: this.bindNext(colors.sides) },
      show: [tot._n5, tot._p6],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        two_sides: click(coll.growSides, [coll, 6, null], colors.sides),
      },
      show: [tot._n6, tot._p6, tot._l6],
      transitionFromPrev: (done) => {
        coll.growSides(6, done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Let\'s now add in labels for the new triangle\'s |angles|.',
    };
    this.addSection(common, commonContent, {
      modifiers: { angles: this.bindNext(colors.angles) },
      show: [tot._n6, tot._p6, tot._l6],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        angles: coll.bindAccent(tot, ['a', 'b', 'c']),
      },
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      transitionFromPrev: (done) => {
        coll.accent(tot, ['a', 'b', 'c'], done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: style({ top: 0 }, [
        'The total |internal| angle has been |reduced_by_a|, |reduced_by_b| and |increased| by the |explementary_angle_of_c|.',
        note({ top: 93, color: colors.diagram.text.note }, 'Reference: |explementary| angle'),
      ]),
      modifiers: {
        reduced_by_a: click(coll.shrinkAngle, [coll, tot._af, 1.06, 0.55, true, []], colors.angles),
        reduced_by_b: click(coll.shrinkAngle, [coll, tot._bf, 1.9, 1.35, true, []], colors.angles),
        explementary_angle_of_c: click(
          coll.shrinkAngle, [coll, tot._cf, 0.005, 4.2, false, []], colors.angles,
        ),
        // internal: coll.bindAccentEqn(coll._eqnTot, ['Old'], 'box', 0.05),
        internal: coll.bindAccent(coll._eqnTot),
        explementary: this.qr('Math/Geometry_1/AngleGroups/base/Explementary'),
      },
    };
    this.addSection(common, commonContent, {
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    const temp = () => {
      coll._eqnTot.showForm('1')
      // console.log(coll._eqnTot._box._left.isShown)
      console.log(coll._eqnTot._box.isShown)
      coll._eqnTot.goToForm({ name: '2', animate: 'move', delay: 2 });
      // console.log(coll._eqnTot._box._left.isShown, coll._eqnTot._box.isShown)
      console.log(coll._eqnTot._box.isShown)
      this.diagram.animateNextFrame();
    }
    this.addSection(common, commonContent, {
      modifiers: {
        reduced_by_a: click(coll.shrinkAngle, [coll, tot._af, 1.06, 0.55, true, ['m1', 'a1']], colors.angles),
        reduced_by_b: click(coll.shrinkAngle, [coll, tot._bf, 1.9, 1.35, true, ['m2', 'b1']], colors.angles),
        explementary_angle_of_c: click(
          coll.shrinkAngle, [coll, tot._cf, 0.005, 4.2, false, ['Old', 'tot2', '_360', 'm3', 'c1']], colors.angles,
        ),
        internal: click(temp, [this], colors.angles),
      },
      show: [tot._n6, tot._l6, tot._a, tot._b, tot._c],
      transitionFromPrev: (done) => {
        tot.animations.new()
          .scenario({ target: 'low', duration: 0.8 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._eqnTot.showForm('0');
        tot.setScenario('low');
        console.log(coll._eqnTot)
      },
    });
  }
}

export default Content;
