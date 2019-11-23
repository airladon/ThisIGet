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
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/RightAngleTriangles/base',
      'Math/Geometry_1/SimilarTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const equil = coll._equil;
    const eqn = coll._eqn;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'Some triangles have |side relationships| that are relatively easy to |calculate| and therefore make problems easier whenever the triangles are |identified|.',
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
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'This explanation will find |two| more triangles where |side lengths can be calculated from any side|.',
      ]),
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
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
      setContent: 'We start by |splitting| the equilateral triangle in |half|.',
    }
    this.addSection(common, commonContent, {
      title: '30-60-90 Triangle',
      modifiers: {
        splitting: this.bindNext(colors.sides),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        splitting: click(
          coll._equil._split.grow, [coll, 0.05, 1, true, null], colors.sides,
        ),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        equil._split.grow(0.05, 1, true, () => {
          equil._Aon2.showAll();
          equil._Aon2Left.showAll();
          coll.setTriEqnForms('0');
          equil._ABottom.dim();
          equil._a60Top.dim();
          equil._H.showAll();
          coll.accent(equil, ['Aon2', 'Aon2Left'], done);
        });
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        equil._Aon2.showAll();
        equil._Aon2Left.showAll();
        equil._H.showAll();
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Each half triangle has the |same_side_lengths|, and from |SSS| is therefore |congruent|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        same_side_lengths: coll.bindToggleGroups(
          equil, [['Aon2', 'A', 'H'], ['Aon2Left', 'ALeft', 'H']],
        ),
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'This means the top two |angles| must be half of 60º, or |30º|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        angles: this.bindNext(colors.angles),
        '30º': highlight(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        angles: this.bindNext(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.accent(equil, ['a30', 'a30Left'], done);
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'As a triangle\'s angles |add_to_180º|, the remaining angles must be |right_angles|.',
      modifiers: {
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        right_angles: this.bindNext(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        right_angles: coll.bindAccent(equil, ['a90', 'a90Left']),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.accent(equil, ['a90', 'a90Left'], done);
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Now let\'s |focus| on just |one half| and solve for |H| using the |Pythagorean_Theorem|.',
      modifiers: {
        Pythagorean_Theorem: this.qr('Math/Geometry_1/RightAngleTriangles/base/PythagorusPres'),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.setTriEqnForms('0');
      },
    });
    this.addSection(common, commonContent, {
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.animations.new()
          .inParallel([
            equil._a30Left.anim.dissolveOut(1),
            equil._ALeft.anim.dissolveOut(1),
            equil._ABottom.anim.dissolveOut(1),
            equil._a60Left.anim.dissolveOut(1),
            equil._a60Top.anim.dissolveOut(1),
            equil._Aon2Left.anim.dissolveOut(1),
            equil._equil.anim.dissolveOut(1),
            equil._a90Left.anim.dissolveOut(1),
            equil._tri.anim.dissolveIn(0.8),
          ])
          .inParallel([
            equil.anim.scenario({ target: 'side', duration: 1 }),
          ])
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        equil._a30Left.hide();
        equil._ALeft.hide();
        equil._ABottom.hide();
        equil._a60Left.hide();
        equil._a60Top.hide();
        equil._Aon2Left.hide();
        equil._a90Left.hide();
        equil._equil.hide();
        equil._tri.showAll();
        equil.setScenario('side');
        coll._eqn.showForm('0');
        coll._eqn.setScenario('side');
        coll.setTriEqnForms('0');
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
        equil._a60, equil._a30, equil._a90,
        equil._A, equil._Aon2, equil._H,
        equil._tri,
      ],
      setSteadyState: () => {
        coll.setTriEqnForms('0');
      },
      beforeTransitionFromPrev: () => {
        console.log('asdf')
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
    this.addSectionEqnStep({ eqn, from: '7', to: '8' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '8', to: '9' }, common, commonContent);
    this.addSectionEqnStep({ eqn, from: '9', to: '10' }, common, commonContent);

    this.addSection(common, commonContent, {
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._A, equil._Aon2, equil._r32,
        equil._tri,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        coll._eqn.showForm('10');
        coll.accent(equil._r32, done);
      },
      setSteadyState: () => {
        coll._eqn.showForm('10');
        coll.setTriEqnForms('0');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Rather than dealing |with| fractions, it is often more convenient to |multiply all sides by 2|.',
      modifiers: {
        with: coll.bindAccent(equil._a60),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._A, equil._Aon2, equil._r32,
        equil._tri,
      ],
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        equil.animations.new()
          .scenario({ target: 'sideCenter', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setTriEqnForms('0');
        equil.setScenario('sideCenter');
      },
    });
    common = {
      setEnterState: () => {
        equil.setScenarios('sideCenter');
      },
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._A, equil._Aon2, equil._r32,
        equil._tri,
      ],
      setLeaveState: () => {
        coll.setTriEqnForms('0');
      },
    };
    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('0');
        coll.goToTriEqnForms('1', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('1');
      },
    });
    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('1');
        coll.goToTriEqnForms('2', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('2');
      },
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
    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.setTriEqnForms('4');
        coll.goToTriEqnForms('5', done);
      },
      setSteadyState: () => {
        coll.setTriEqnForms('5');
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'This triangle is often called a |30-60-90| triangle. As angles in a triangle |add_to_180º|, any |right angle triangle| with an angle of |30º|, or |60º|, will be a 30-60-90 triangle.',
    };

    this.addSection(common, commonContent, {
      modifiers: {
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres')
      },
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._2A, equil._ARight, equil._r3,
        equil._tri,
      ],
    });

    commonContent = {
      setContent: style({ top: 0 }, 'Sometimes this triangle is shown with |A = 1| for simplicity. Remember, triangles with the same angles are |similar_triangles|, meaning their ratio between sides will be the same |no matter their size|.'),
    };

    this.addSection(common, commonContent, {
      modifiers: {
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._2A, equil._ARight, equil._r3,
        equil._tri,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
      show: [
        equil._a60, equil._a30, equil._a90,
        equil._2, equil._1Right, equil._r3,
        equil._tri,
      ],
      transitionFromPrev: (done) => {
        coll.accent(equil, ['2', '1Right'], done);
        equil._r3._label.goToForm({ name: '1', duration: 1, animate: 'move' });
      },
      setSteadyState: () => {
        // equil._r3._label.setForm('1');
      }
    });
  }
}

export default Content;
