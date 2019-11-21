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

const { round, range } = Fig.tools.math;

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
      'Math/Geometry_1/RightAngleTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    // const fig = coll._fig;

    this.addSection({
      title: 'Introduction',
      setContent: [
        '|Trigonometry| is a branch of mathematics that studies the |relationship| between |side lengths| and |angles| of |triangles|.',
        style({ top: 40 }, 'The word |trigonometry| comes from the the |Greek| words |trigonon| (meaning triangle) and |metron| (to measure).'),
      ],
      show: [coll._tri],
      setSteadyState: () => {
        coll._tri.setScenario('default');
      },
    });
    this.addSection({
      setContent: style({ centerV: true, centerH: true }, [
        'So |why| study triangles? Are they really that |important|?',
      ]),
    });
    this.addSection({
      setContent: style({ centerV: true, centerH: true }, [
        'Well the |tools| we develop to analyze triangles are used in most | branches of engineering and science|.',
      ]),
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    };
    this.addSection(common, {
      setContent: 'Consider a |line| that is not |horizontal| or |vertical|.',
      modifiers: {
        horizontal: highlight(colors.components),
        vertical: highlight(colors.components),
      },
      show: [coll._line._line],
    });

    this.addSection(common, {
      setContent: 'As such, this line |spans| some |horizontal| distance, and spans some |vertical| distance.',
      modifiers: {
        horizontal: click(coll._line._h.grow, [coll._line._h, 0.05, 1, true, null], colors.components),
        vertical: click(coll._line._v.grow, [coll._line._v, 0.05, 1, true, null], colors.components),
      },
      show: [coll._line],
      transitionFromPrev: (done) => {
        coll._line._h.grow(0.05, 1, true, done);
        coll._line._v.grow(0.05, 1, true, null);
      }
      // transitionFromPrev: (done) => {
      //   if (this.message === 'h') {
      //     coll.accent(coll._line._h, done);
      //   } else if (this.message === 'v') {
      //     coll.accent(coll._line._v, done);
      //   } else {
      //     coll.accent(coll._line, ['v', 'h'], done);
      //   }
      // },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    let commonContent = {
      setContent: 'Now, this line can represent |many| things. For example, it might represent a |rafter| on a |house|.',
    };
    this.addSection(common, commonContent, {
      title: 'Object',
      modifiers: {
        rafter: this.bindNext(colors.line),
      },
      show: [coll._line],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        rafter: coll.bindAccent(coll._line._line),
      },
      show: [coll._line],
      transitionFromPrev: (done) => {
        coll._house.setScenario('house');
        coll._line.animations.new()
          .scenario({ target: 'house', duration: 1.5 })
          .dissolveIn({ element: coll._house, duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('house');
        coll._house.showAll();
      },
    });

    commonContent = {
      setContent: 'To cut a |rafter| to size, you need to know the relationship between its |length|, the |horizontal_span| and |vertical_span| spans.',
    };

    this.addSection(common, commonContent, {
      modifiers: {
        rafter: coll.bindAccent(coll._line._line),
        length: coll.bindAccent(coll._line._line),
        horizontal_span: click(coll._line._h.grow, [coll._line._h, 0.05, 1, true, null], colors.components),
        vertical_span: click(coll._line._v.grow, [coll._line._v, 0.05, 1, true, null], colors.components),
      },
      show: [coll._line, coll._house],
      setSteadyState: () => {
        coll.setScenarios('house');
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'This line could also represent a |direction_|. For instance, the |direction| of a |plane| coming in to |land|.',
    };

    this.addSection(common, commonContent, {
      title: 'Direction',
      modifiers: {
        direction_: this.bindNext(colors.line),
        direction: this.bindNext(colors.line),
      },
      show: [coll._line, coll._house],
      setSteadyState: () => {
        coll.setScenarios('house');
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        direction_: click(
          coll._arrow._line.grow, [coll._arrow._line, 0.05, 1, true, null],
          colors.line,
        ),
        direction: click(
          coll._arrow._line.grow, [coll._arrow._line, 0.05, 1, true, null],
          colors.line,
        ),
      },
      show: [coll._line, coll._house],
      transitionFromPrev: (done) => {
        coll._house.setScenario('house');
        coll._line.setScenario('house');
        coll._plane.setScenario('plane');
        coll._arrow.setScenario('plane');
        coll.animations.new()
          .inParallel([
            coll._house.anim.dissolveOut(0.8),
            coll._line._h.anim.dissolveOut(0.8),
            coll._line._v.anim.dissolveOut(0.8),
          ])
          .scenario({ element: coll._line, target: 'plane', duration: 1.5 })
          .dissolveIn({ element: coll._plane, duration: 1 })
          .dissolveIn({ element: coll._arrow._line, duration: 0 })
          .dissolveOut({ element: coll._line, duration: 0 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('plane');
        coll._house.hide();
        coll._line.hide();
        coll._arrow._line.showAll();
        coll._plane.showAll();
      },
    });

    commonContent = {
      setContent: 'To |land| on the runway, you need to |direct| the plane such that the |height_above_ground| and the |distance_to_the_runway| is covered in the same |time|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        height_above_ground: this.bindNext(colors.components, 'height'),
        distance_to_the_runway: this.bindNext(colors.components, 'distance'),
        time: this.bindNext(colors.lines, 'time'),
        direct: click(
          coll._arrow._line.grow, [coll._arrow._line, 0.05, 1, true, null],
          colors.line,
        ),
      },
      show: [coll._arrow._line, coll._plane],
      setSteadyState: () => {
        coll.setScenarios('plane');
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        distance_to_the_runway: click(
          coll._arrow._h.grow, [coll._arrow._h, 0.05, 1, true, null], colors.components,
        ),
        height_above_ground: click(
          coll._arrow._v.grow, [coll._arrow._v, 0.05, 1, true, null], colors.components,
        ),
        time: click(() => {
          coll._arrow._h.grow(0.05, 1, true, null);
          coll._arrow._v.grow(0.05, 1, true, null);
          coll._arrow._line.grow(0.05, 1, true, null);
        }, [this], colors.line),
      },
      show: [coll._arrow._line, coll._plane],
      transitionFromPrev: (done) => {
        if (this.message === 'distance') {
          coll._arrow._h.showAll();
          coll._arrow._h.grow(0.05, 1, true, done);
        } else if (this.message === 'height') {
          coll._arrow._v.showAll();
          coll._arrow._v.grow(0.05, 1, true, done);
        } else {
          coll._arrow.showAll();
          coll._arrow._h.grow(0.05, 1, true, done);
          coll._arrow._v.grow(0.05, 1, true, null);
          coll._arrow._line.grow(0.05, 1, true, null);
        }
      },
      setSteadyState: () => {
        coll.setScenarios('plane');
        coll._arrow.showAll();
      },
    });


    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('cart');
      },
    };
    commonContent = {
      setContent: 'This line could also represent a |phenomenum|. For instance, a |force| applied to a cart.',
    };
    this.addSection(commonContent, {
      title: 'Phenomenum',
      modifiers: {
        force: this.bindNext(colors.line),
      },
    });
    this.addSection(common, commonContent, {
      modifiers: {
        force: click(
          coll._arrow._line.grow, [coll._arrow._line, 0.05, 1, true, null], colors.line,
        ),
      },
      transitionFromPrev: (done) => {
        coll._arrow.show();
        coll.animations.new()
          .dissolveIn({ element: coll._cart, duration: 1 })
          .dissolveIn({ element: coll._arrow._line, duration: 0 })
          .trigger({
            callback: () => {
              coll._arrow._line.grow(0.05, 1, true, null);
            },
            duration: 1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._cart.showAll();
        coll._arrow._line.showAll();
      },
    });

    commonContent = {
      setContent: 'This |force| is made up of a |horizontal| and |vertical| force.',
      modifiers: {
        force: click(
          coll._arrow._line.grow, [coll._arrow._line, 0.05, 1, true, null], colors.line,
        ),
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        horizontal: this.bindNext(colors.components, 'h'),
        vertical: this.bindNext(colors.components, 'v'),
      },
      show: [coll._cart, coll._arrow._line],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        horizontal: click(
          coll._arrow._h.grow, [coll._arrow._h, 0.05, 1, true, null], colors.components,
        ),
        vertical: click(
          coll._arrow._v.grow, [coll._arrow._v, 0.05, 1, true, null], colors.components,
        ),
      },
      show: [coll._cart, coll._arrow._line],
      transitionFromPrev: (done) => {
        if (this.message === 'h') {
          coll._arrow._h.showAll();
          coll._arrow._h.grow(0.05, 1, true, done);
        } else if (this.message === 'v') {
          coll._arrow._v.showAll();
          coll._arrow._v.grow(0.05, 1, true, done);
        } else {
          coll._arrow.showAll();
          coll._arrow._v.grow(0.05, 1, true, done);
          coll._arrow._h.grow(0.05, 1, true, null);
        }
      },
      setSteadyState: () => {
        coll._arrow.showAll();
      },
    });

    commonContent = {
      setContent: 'Only the |horizontal| part of the force |moves| the cart as the |vertical| part just pushes it into the |ground|.',
    };

    this.addSection(common, commonContent, {
      modifiers: {
        horizontal: click(
          coll._arrow._h.grow, [coll._arrow._h, 0.05, 1, true, null], colors.components,
        ),
        vertical: click(
          coll._arrow._v.grow, [coll._arrow._v, 0.05, 1, true, null], colors.components,
        ),
      },
      show: [coll._cart, coll._arrow],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
    };
    this.addSection(common, {
      title: 'Triangle',
      setContent: 'This |line|, and its |horizontal| and |vertical| components are a |right_angle_triangle|.',
      modifiers: {
        line: coll.bindAccent(coll._rightTri._line),
        horizontal: coll.bindAccent(coll._rightTri._h),
        vertical: coll.bindAccent(coll._rightTri._v),
        right_angle_triangle: this.qr('Math/Geometry_1/RightAngleTriangles/base/DefinitionPres'),
      },
      show: [coll._rightTri],
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'In addition, a right angle triangle |relates| |triangles| to |circles|.',
    };
    this.addSection(common, commonContent, {
      title: 'Circles',
      show: [coll._rightTri],
    });

    this.addSection(common, commonContent, {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [coll._rightTri],
      transitionFromPrev: (done) => {
        coll._rotator._h.showAll();
        coll._rotator._v.showAll();
        coll._rotator._line.setRotation(Math.PI / 6);
        coll._rotator._h.hide();
        coll._rotator._v.hide();
        coll.animations.new()
          .scenario({ element: coll._rightTri, target: 'rotator', duration: 1 })
          .dissolveIn({ element: coll._rotator._circle, duration: 1 })
          .dissolveIn({ element: coll._rotator._line, duration: 0.3 })
          .dissolveIn({ element: coll._rotator._v, duration: 0 })
          .dissolveIn({ element: coll._rotator._h, duration: 0 })
          .dissolveOut({ element: coll._rightTri, duration: 0.3 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._rotator._line.showAll();
        coll._rotator._h.showAll();
        coll._rotator._v.showAll();
        coll._rotator._circle.showAll();
        coll._rotator._line.setRotation(Math.PI / 6);
        // coll._rightTri.setScenarios('rotator');
        coll._rightTri.hide();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
        // coll.setScenarios('rotator');
      },
    };

    this.addSection(common, commonContent, {
      setContent: 'As a circle\'s radius |sweeps| around the circle, its |horizontal| and |vertical| components change.',
      modifiers: {
        sweeps: click(coll.pushLine, [coll], colors.line),
        horizontal: coll.bindAccent(coll._rotator._h),
        vertical: coll.bindAccent(coll._rotator._v),
      },
      show: [
        coll._rotator._line, coll._rotator._h, coll._rotator._v, coll._rotator._circle,
      ],
      setSteadyState: () => {
        if (this.comingFrom !== 'prev') {
          coll._rotator._line.setRotation(Math.PI / 6);
        } else {
          coll.updateRotator();
        }
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    commonContent = {
      setContent: 'Now let\'s just track the |vertical| component, and |record| its position in time.',
    };

    this.addSection(common, commonContent, {
      modifiers: {
        vertical: coll.bindAccent(coll._rotator._v),
        record: this.bindNext(colors.components),
      },
      show: [
        coll._rotator._line, coll._rotator._h, coll._rotator._v, coll._rotator._circle,
      ],
      setSteadyState: () => {
        if (this.comingFrom !== 'prev') {
          coll._rotator._line.setRotation(Math.PI / 6);
        } else {
          coll.updateRotator();
        }
      },
    });


    this.addSection(common, commonContent, {
      modifiers: {
        vertical: coll.bindAccent(coll._rotator._v),
        record: click(coll.accentRecord, [coll], colors.components),
      },
      show: [
        coll._rotator._line, coll._rotator._h, coll._rotator._v, coll._rotator._circle,
      ],
      transitionFromPrev: (done) => {
        coll.resetSine();
        coll._rotator.animations.new()
          .scenario({ target: 'sine', duration: 1 })
          .inParallel([
            coll._rotator._sine.anim.dissolveIn(0.5),
            coll._rotator._h.anim.dissolveOut(0.5),
            coll._rotator._x.anim.dissolveIn(0.5),
            coll._rotator._y.anim.dissolveIn(0.5),
            coll._rotator._xExtension.anim.dissolveIn(0.5),
            coll._rotator._pause.anim.dissolveIn(0.5),
          ])
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.custom.recordState = 'record';
        coll._rotator.showAll();
        coll._rotator.setScenario('sine');
        coll._rotator._record.hide();
        coll._rotator._h.hide();
        if (this.comingFrom === 'goto') {
          coll._rotator._line.setRotation(Math.PI / 6);
        } else {
          coll.updateRotator();
        }
        coll.resetSine();
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************

    commonContent = {
      setContent: 'Now, try |rotating| the line |continuously|. For example, try rotating |slower| and |faster|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        rotating: click(coll.spinNow, [coll, 0.3, 100], colors.components),
        slower: click(coll.spinNow, [coll, 0.15, 100], colors.components),
        faster: click(coll.spinNow, [coll, 0.5, 100], colors.components),
      },
      show: [coll._rotator],
      hide: [coll._rotator._record, coll._rotator._h],
      setSteadyState: () => {
        coll.custom.recordState = 'record';
        coll._rotator.setScenario('sine');
        if (this.comingFrom === 'goto') {
          coll._rotator._line.setRotation(Math.PI / 6);
          coll.resetSine();
        } else {
          coll.updateRotator();
        }
      },
    });

    this.addSection(common, {
      setContent: 'An |example| recording of the |vertical| component of a spinning line is below.',
      modifiers: {
        example: coll.bindAccent(coll._sineExample),
        vertical: highlight(colors.components),
      },
      show: [coll._sineExample],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, 'This is commonly referred to as a |wave| and is found in many |natural| places including |sound|, |ocean waves|, |wind|, |heat|, |light|, |gravity| and |radiation|. It is present in phenomena as small as |atoms| and as large as |galaxies|.'),
      show: [coll._sineExample],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, 'We also use it everywhere in technology including |music|, |springs|, |motors|, |electricity|, |wireless communications|, |computers|, |lasers|, |voice recognition|, and |image compression| to name just a |few| examples.'),
      show: [coll._sineExample],
    });

    // this.addSection(common, {
    //   setContent: style({ top: 0 }, 'It is found in any rotating, vibrating, or oscillating machine.'),
    //   show: [coll._sineExample],
    // });

    commonContent = {
      setContent: 'And our |understanding| of it, and our ability to |analyze| and |use| it, comes from |trigonometry| and the study of |right angle triangles|.',
    };
    this.addSection(common, commonContent, {
      show: [coll._sineExample],
    });
    this.addSection(commonContent, {
      setEnterState: () => {
        coll._tri.setScenario('low');
      },
      show: [coll._tri],
      transitionFromPrev: (done) => {
        coll.accent(coll._tri, done);
      },
    });

    this.addSection(common, commonContent, {
      title: 'Summary',
      setContent: style({ centerV: true }, [
        'These are a |few examples| where the |tools| we develop with trigonometry extend to uses in an |abundance of applications|.',
        'But trigonometry is |more| than just the study of right angle triangles, and so its applications are |even more numerous|.',
      ]),
    });

    this.addSection(common, commonContent, {
      setContent: style({ centerV: true }, [
        'So |why study trigonometry?|',
        'It gives us the |insight| and |tools| to model and analyze the |natural world|.',
        'We need that understanding to |make| almost |every piece of modern technology| we have.',
      ]),
    });

    // this.addSection(common, {
    //   setContent: '|Trigonometry| studys the |relationship| between the angle of the |line|, and the size of the |components|.',
    //   modifiers: {
    //     line: coll.bindAccent(coll._rightTri._line),
    //     components: highlight(colors.components),
    //     horizontal: coll.bindAccent(coll._rightTri._h),
    //     vertical: coll.bindAccent(coll._rightTri._v),
    //     // horizontal: click(
    //     //   coll._arrow._h.grow, [coll._rightTri._h, 0.05, 1, true, null], colors.components,
    //     // ),
    //     // vertical: click(
    //     //   coll._arrow._v.grow, [coll._rightTri._v, 0.05, 1, true, null], colors.components,
    //     // ),
    //   },
    //   show: [coll._rightTri],
    // });

    // this.addSection(common, {
    //   setContent: style({ centerV: true }, [
    //     '|Trigonometry| can be applied to |all objects, scenarios and phenomena| where understanding |horizontal| and |vertical| components is useful.',
    //   ]),
    // });

    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // this.addSection(common, {
    //   setContent: 'This can be modelled with a right angle triangle, and any tools we have to analyze the right angle triangle can be used.',
    //   modifiers: {
    //     horizontal: coll.bindAccent(coll._line._h),
    //     vertical: coll.bindAccent(coll._line._v),
    //   },
    //   show: [coll._line],
    //   // transitionFromPrev: (done) => {
    //   //   if (this.message === 'h') {
    //   //     coll.accent(coll._line._h, done);
    //   //   } else if (this.message === 'v') {
    //   //     coll.accent(coll._line._v, done);
    //   //   } else {
    //   //     coll.accent(coll._line, ['v', 'h'], done);
    //   //   }
    //   // },
    // });

    // // ************************************************************************
    // // ************************************************************************
    // // ************************************************************************
    // this.addSection({
    //   setContent: 'Consider a |line| that is not |horizontal| or |vertical|.',
    //   setEnterState: () => {
    //     coll.setScenarios('default');
    //   },
    //   show: [coll._line._line],
    // });
    // this.addSection({
    //   setEnterState: () => {
    //     coll.setScenarios('house');
    //   },
    //   show: [coll._line, coll._house],
    // });
    // this.addSection({
    //   setEnterState: () => {
    //     coll.setScenarios('plane');
    //   },
    //   show: [coll._arrow, coll._plane],
    // });
    // this.addSection({
    //   setEnterState: () => {
    //     coll.setScenarios('cart');
    //   },
    //   show: [coll._arrow, coll._cart],
    // });

    // this.addSection({
    //   setContent: '|1|, |2|, |3|',
    //   modifiers: {
    //     '1': click(coll.spinNow, [coll, 0.1, 100]),
    //     '2': click(coll.spinNow, [coll, 0.25, 100]),
    //     '3': click(coll.spinNow, [coll, 0.5, 100]),
    //   },
    //   setEnterState: () => {
    //     coll.setScenarios('sine');
    //   },
    //   show: [coll._rotator],
    //   setSteadyState: () => {
    //     // coll._rotator._line.animations.new()
    //     //   .custom({ callback: coll.spin.bind(coll), duration: 10 })
    //     //   .start();
    //   },
    // });
  }
}

export default Content;
