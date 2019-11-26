// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
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
      'Math/Geometry_1/Equilateral/base',
      'Math/Geometry_1/Isosceles/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/RectanglesAndSquares/base',
      'Math/Geometry_1/RightAngleTriangles/base',
      'Math/Geometry_1/SimilarTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const equil = coll._equil;
    const square = coll._square;
    const eqn = coll._eqn;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'Some triangles have |relationships between sides| that are possible to |calculate| geometrically.',
        'When you |identify| these triangles, you will only need |one side| length to calculate all |three|.',
      ]),
    });
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
        coll.undim();
      },
      setSteadyState: () => {
        coll.setTriEqnForms('0');
      },
    };
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'For instance, an |equilateral_triangle| has |all equal sides|. If you |know| a triangle has |three 60º angles|, and you know |one side| length, the |other two| can be |calculated|.',
      ]),
      modifiers: {
        equilateral_triangle: this.qr('Math/Geometry_1/Equilateral/base/Main'),
      },
      show: [equil],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'This explanation will find |another| triangle where |side lengths can be calculated from any side|.',
      ]),
      show: [equil],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    let commonContent = {
      setContent: 'We start with a |square| and |split| along its diagonal.',
      modifiers: {
        square: this.qr('Math/Geometry_1/RectanglesAndSquares/base/Square'),
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        split: this.bindNext(colors.sides),
      },
      show: [square._square, square._A1, square._A2],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        split: click(coll._square._split.grow, [coll, 0.05, 1, true, null], colors.sides),
      },
      show: [square._square, square._split, square._D, square._A1, square._A2],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        square._D.hide();
        square._split.grow(0.05, 1, true, () => {
          square._D.show();
          coll.accent(square._D, done);
        });
      },
    });

    commonContent = {
      setContent: 'Consider just |one| of the triangles.',
    };
    this.addSection(common, commonContent, {
      show: [square._square, square._split, square._D, square._A1, square._A2],
    });
    this.addSection(common, commonContent, {
      show: [square._tri, square._right, square._D, square._A1, square._A2],
      transitionFromPrev: (done) => {
        square._split.showAll();
        square._square.showAll();
        square._tri.hide();
        coll.setTriEqnForms('0');
        coll.animations.new()
          .inParallel([
            square._square.anim.dissolveOut(1),
            square._split.anim.dissolveOut(1),
            square._tri.anim.dissolveIn(1),
          ])
          .inParallel([
            square.anim.scenario({ target: 'sideCenter', duration: 1 }),
          ])
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('sideCenter');
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'The two unknown |angles| must be |_45º| as they are equal (this is an |isosceles| triangle), and a triangle\'s angles |sum_to_180º|.',
      modifiers: {
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main'),
        sum_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        _45º: highlight(colors.angles),
        angles: this.bindNext(colors.angles),
      },
    };
    common = {
      setEnterState: () => {
        coll.setScenarios('sideCenter');
        coll.undim();
      },
      setSteadyState: () => {
        coll.setTriEqnForms('0');
      },
    };
    this.addSection(common, commonContent, {
      show: [square._tri, square._right, square._D, square._A1, square._A2],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        angles: coll.bindAccent(square, ['451', '452']),
      },
      show: [
        square._tri, square._right, square._D, square._A1, square._A2,
        square._451, square._452,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        coll.accent(square, ['451', '452'], done);
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'We now use the |Pythagorean_Theorem| to solve for |D|.',
      modifiers: {
        Pythagorean_Theorem: this.qr('Math/Geometry_1/RightAngleTriangles/base/PythagorusPres'),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        square._tri, square._right, square._D, square._A1, square._A2,
        square._451, square._452,
      ],
    });
    this.addSection(common, commonContent, {
      show: [
        square._tri, square._right, square._D, square._A1, square._A2,
        square._451, square._452,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        square.animations.new()
          .scenarios({ target: 'side', duration: 1 })
          .trigger({
            callback: () => {
              eqn.setScenario('side');
              eqn.showForm('0');
              eqn.pulseScaleNow(1, 1.3);
            },
            duration: 1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setTriEqnForms('0');
        coll.setScenarios('side');
        eqn.showForm('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('side');
      },
      show: [
        square._tri, square._right, square._D, square._A1, square._A2,
        square._451, square._452,
      ],
      setSteadyState: () => {
        coll.setTriEqnForms('0');
      },
      beforeTransitionFromPrev: () => {
        coll.setTriEqnForms('0');
      },
    };
    commonContent = {
      setContent: 'And now we can |rearrange| and |simplify|.',
    };
    this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '2', to: '3' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '6', to: '7' }, common, commonContent);

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        eqn.showForm('7');
        coll.setTriEqnForms('0');
        coll.goToTriEqnForms('1', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('1');
        eqn.showForm('7');
      },
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        eqn.showForm('7');
        coll.setTriEqnForms('1');
        coll.goToTriEqnForms('2', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('2');
        eqn.showForm('7');
      },
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        // eqn.showForm('7');
        coll.setTriEqnForms('2');
        square.animations.new()
          .scenario({ target: 'sideCenter', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setTriEqnForms('2');
        square.setScenario('sideCenter');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('sideCenter');
      },
      show: [
        square._tri, square._right, square._D, square._A1, square._A2,
        square._451, square._452,
      ],
      setSteadyState: () => {
        coll.setTriEqnForms('2');
      },
    };

    commonContent = {
      setContent: 'This triangle is often called a |45-45-90| triangle. As angles in a triangle |add_to_180º|, any |right angle triangle| with an angle of |45º| will be a 45-45-90 triangle.',
      modifiers: {
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      },
    };
    this.addSection(common, commonContent, {
      // setSteadyState: () => { coll.setTriEqnForms('7'); },
    });

    commonContent = {
      setContent: style({ top: 0 }, 'Sometimes this triangle is shown with |A = 1| for simplicity. Remember, triangles with the same angles are |similar_triangles|, meaning their ratio between sides will be the same |no matter their size|.'),
      modifiers: {
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    };

    this.addSection(common, commonContent, {
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('2');
        coll.goToTriEqnForms('3', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('3');
      },
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('3');
        coll.goToTriEqnForms('4', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('4');
      },
    });
  }
}

export default Content;
