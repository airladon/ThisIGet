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
      setContent: 'We can now use the |Pythagorean_Theorem| to solve for |D|.',
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

    // this.addSection(common, commonContent, {
    //   show: [
    //     equil._equil,
    //     equil._a60, equil._a60Left, equil._a60Top,
    //     equil._A, equil._ALeft, equil._ABottom,
    //     equil._split, equil._H,
    //     equil._Aon2, equil._Aon2Left,
    //     equil._a30, equil._a30Left, equil._a90, equil._a90Left,
    //   ],
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('0');
    //     equil._ABottom.dim();
    //     equil._a60Top.dim();
    //     coll.animations.new()
    //       .inParallel([
    //         equil._a30Left.anim.dissolveOut(1),
    //         equil._ALeft.anim.dissolveOut(1),
    //         equil._ABottom.anim.dissolveOut(1),
    //         equil._a60Left.anim.dissolveOut(1),
    //         equil._a60Top.anim.dissolveOut(1),
    //         equil._Aon2Left.anim.dissolveOut(1),
    //         equil._equil.anim.dissolveOut(1),
    //         equil._a90Left.anim.dissolveOut(1),
    //         equil._tri.anim.dissolveIn(0.8),
    //       ])
    //       .inParallel([
    //         equil.anim.scenario({ target: 'side', duration: 1 }),
    //       ])
    //       .whenFinished(done)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     equil._ABottom.dim();
    //     equil._a60Top.dim();
    //     equil._a30Left.hide();
    //     equil._ALeft.hide();
    //     equil._ABottom.hide();
    //     equil._a60Left.hide();
    //     equil._a60Top.hide();
    //     equil._Aon2Left.hide();
    //     equil._a90Left.hide();
    //     equil._equil.hide();
    //     equil._tri.showAll();
    //     equil.setScenario('side');
    //     coll._eqn.showForm('0');
    //     coll._eqn.setScenario('side');
    //     coll.setTriEqnForms('0');
    //   },
    // });

    // // ************************************************************
    // // ************************************************************
    // // ************************************************************
    // common = {
    //   setEnterState: () => {
    //     coll.setScenarios('side');
    //   },
    //   show: [
    //     equil._a60, equil._a30, equil._a90,
    //     equil._A, equil._Aon2, equil._H,
    //     equil._tri,
    //   ],
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('0');
    //   },
    //   beforeTransitionFromPrev: () => {
    //     console.log('asdf')
    //     coll.setTriEqnForms('0');
    //   },
    // };
    // commonContent = {
    //   setContent: 'And now we can |rearrange| and |simplify|.',
    // };
    // this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '2', to: '3' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '6', to: '7' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '7', to: '8' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '8', to: '9' }, common, commonContent);
    // this.addSectionEqnStep({ eqn, from: '9', to: '10' }, common, commonContent);

    // this.addSection(common, commonContent, {
    //   show: [
    //     equil._a60, equil._a30, equil._a90,
    //     equil._A, equil._Aon2, equil._r32,
    //     equil._tri,
    //   ],
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('0');
    //     coll._eqn.showForm('10');
    //     coll.accent(equil._r32, done);
    //   },
    //   setSteadyState: () => {
    //     coll._eqn.showForm('10');
    //     coll.setTriEqnForms('0');
    //   },
    // });

    // // ************************************************************
    // // ************************************************************
    // // ************************************************************
    // commonContent = {
    //   setContent: 'Rather than dealing with |fractions|, it is often more convenient to |multiply all sides by 2|.',
    // };
    // this.addSection(common, commonContent, {
    //   title: 'Simplify',
    //   show: [
    //     equil._a60, equil._a30, equil._a90,
    //     equil._A, equil._Aon2, equil._r32,
    //     equil._tri,
    //   ],
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('0');
    //     equil.animations.new()
    //       .scenario({ target: 'sideCenter', duration: 1 })
    //       .whenFinished(done)
    //       .start();
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('0');
    //     equil.setScenario('sideCenter');
    //   },
    // });
    // common = {
    //   setEnterState: () => {
    //     equil.setScenarios('sideCenter');
    //   },
    //   show: [
    //     equil._a60, equil._a30, equil._a90,
    //     equil._A, equil._Aon2, equil._r32,
    //     equil._tri,
    //   ],
    //   setLeaveState: () => {
    //     coll.setTriEqnForms('0');
    //   },
    // };
    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('0');
    //     coll.goToTriEqnForms('1', done);
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('1');
    //   },
    // });
    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('1');
    //     coll.goToTriEqnForms('2', done);
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('2');
    //   },
    // });

    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('2');
    //     coll.goToTriEqnForms('3', done);
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('3');
    //   },
    // });

    // commonContent = {
    //   setContent: 'This triangle is often called a |30-60-90| triangle. As angles in a triangle |add_to_180º|, any |right angle triangle| with an angle of |30º|, or |60º|, will be a 30-60-90 triangle.',
    // };
    // this.addSection(common, commonContent, {
    //   setSteadyState: () => { coll.setTriEqnForms('3'); },
    // });

    // commonContent = {
    //   setContent: style({ top: 0 }, 'Sometimes this triangle is shown with |A = 1| for simplicity. Remember, triangles with the same angles are |similar_triangles|, meaning their ratio between sides will be the same |no matter their size|.'),
    //   modifiers: {
    //     similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
    //   },
    // };

    // this.addSection(common, commonContent, {
    //   setSteadyState: () => { coll.setTriEqnForms('3'); },
    // });

    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('3');
    //     coll.goToTriEqnForms('4', done);
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('4');
    //   },
    // });
    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.setTriEqnForms('4');
    //     coll.goToTriEqnForms('5', done);
    //   },
    //   setSteadyState: () => {
    //     coll.setTriEqnForms('5');
    //   },
    // });

  }
}

export default Content;
