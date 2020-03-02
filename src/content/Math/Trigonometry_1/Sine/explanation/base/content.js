// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import { note } from '../../../../../common/tools/note';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  clickW,
  highlight,
  highlightWord,
  // centerV,
} = Fig.tools.html;

// const  { Transform } = Fig;
// const { round } = Fig.tools.math;

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
      // 'Math/Geometry_1/AngleTypes/base',
      'Math/Trigonometry_1/Sine/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/SimilarTriangles/base',
      'Math/Geometry_1/RightAngleTriangles/base',
      // 'Math/Geometry_1/CongruentTriangles/base',
      // 'Math/Geometry_1/Radians/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tri = coll._tri;
    const sim = coll._similar;
    const eqn = coll._eqn;
    const tab = coll._table;
    // const tab = coll._table;

    let commonContent = {
      setContent: '|Triangles| with the |same_corresponding_angles| are |similar|, and thus |corresponding_sides| have the |same_scaling_factor|.',
      modifiers: {
        same_scaling_factor: coll.bindAccent(sim._tri2, [
          'side01.label.s', 'side12.label.s', 'side20.label.s',
        ]),
        same_corresponding_angles: coll.bindToggleGroups(sim, [
          ['tri1.angle0', 'tri2.angle0'],
          ['tri1.angle1', 'tri2.angle1'],
          ['tri1.angle2', 'tri2.angle2'],
        ]),
        corresponding_sides: coll.bindToggleGroups(sim, [
          ['tri1.side01.label', 'tri2.side01.label'],
          ['tri1.side12.label', 'tri2.side12.label'],
          ['tri1.side20.label', 'tri2.side20.label'],
        ], colors.lines),
        Triangles: coll.bindAccent(sim, ['tri1', 'tri2']),
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    };
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
        // console.log(sim)
        // tab.setScenario('default');
      },
      // transitionReset: (done) => {
      //   coll.updateRotation();
      //   if (this.comingFrom === 'goto') {
      //     coll.resetRotation(done, 0);
      //   } else {
      //     coll.resetRotation(done, 0.8);
      //   }
      // },
      // setSteadyState: () => {
      //   coll.updateRotation();
      // },
      // setLeaveState: () => {
      //   fig._line._line.isTouchable = true;
      // },
    };
    let commonShow = {
      show: [
        // fig._line, fig._h, fig._hypotenuse,
        // fig._v, fig._right,
        sim,
      ],
      setEqnForms: [
        [sim._tri1._angle0._label, '0'],
        [sim._tri1._angle1._label, '0'],
        [sim._tri1._angle2._label, '0'],
        [sim._tri2._angle0._label, '0'],
        [sim._tri2._angle1._label, '0'],
        [sim._tri2._angle2._label, '0'],
      ],
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Similar triangles',
      // setSteadyState: () => {
      //   // fig._line.setRotation(Math.PI / 18 * 4);
      //   // coll.updateRotation();
      //   // fig._line._line.isTouchable = false;
      //   console.log(sim)
      // },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'As all sides are equally scaled, the |ratio| of any two sides will be |constant| as the |scaling_factor| cancels itself.',
      modifiers: {
        ratio: click(coll.toggleSides, [coll], colors.lines),
        scaling_factor: coll.bindAccent(eqn, ['s_11', 's_12']),
        constant: click(coll.pulseConstant, [coll], colors.lines),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('BonA');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'So for |all similar triangles| the |ratio| of corresponding sides is |constant|.',
      modifiers: {
        ratio: click(coll.toggleSides, [coll], colors.lines),
        scaling_factor: coll.bindAccent(eqn, ['s_11', 's_12']),
        constant: click(coll.pulseConstant, [coll], colors.lines),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('BonA');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      title: 'Right Angle Triangles',
      setContent: 'Now consider a |right_angle_triangle| with a labelled |hypotenuse| and |sides_relative| to an |angle_theta|.',
      modifiers: {
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        sides_relative: coll.bindToggleGroups(tri, [['opp'], ['adj']], colors.lines),
        right_angle_triangle: this.qr('Math/Geometry_1/RightAngleTriangles/base/DefinitionPres'),
        hypotenuse: coll.bindAccent(tri._hyp),
      },
    };

    commonShow = {
      show: [tri],
      hide: [tri._complement],
    };

    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'Angles in a triangle always |add_to_180º|, so defining |two_angles| means |all_three| are actually defined.',
      modifiers: {
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        two_angles: coll.bindAccent(tri, ['theta', 'right']),
        all_three: coll.bindAccent({
          element: tri,
          children: ['complement'],
          style: ['pulse', 'show'],
        }),
      },
    };

    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'Therefore, |all| right angle triangles with the |same_angle_theta| are |similar| and have the |same_ratios| between |corresponding sides|.',
      modifiers: {
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
        same_angle_theta: clickW('same angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        same_ratios: this.bindNext(colors.lines),
        // same_ratios: this.bindNext(colors.lines),
      },
    };

    this.addSection(common, commonShow, commonContent, {
    });

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        same_ratios: click(coll.toggleConstancePhrase, [coll], colors.lines),
        // same_ratios: coll.bindAccent({
        //   element: coll._eqnSame,
        //   children: ['v', 'opp', 'hyp', 'adj'],
        //   centerOn: 'v',
        //   time: 1,
        //   scale: 1.5,
        // }, colors.lines),
      },
      transitionFromPrev: (done) => {
        coll._eqnSame.showForm('oppOnHyp');
        coll._eqnSame.pulse({ scale: 1.3, time: 1, done });
      },
      setSteadyState: () => {
        coll._eqnSame.showForm('oppOnHyp');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'In this topic we will focus on the |ratio| between the |opposite_side| and the |hypotenuse|.',
      modifiers: {
        ratio: coll.bindAccent({
          element: coll._eqnSame,
          children: ['v', 'opp', 'hyp'],
          centerOn: 'v',
          time: 1,
          scale: 1.5,
        }, colors.lines),
        opposite_side: coll.bindAccent(coll._tri._opp),
        hypotenuse: coll.bindAccent(coll._tri._hyp),
      },
    };

    commonShow = {
      show: [tri],
      hide: [tri._complement, tri._adj],
      setEqnForms: [
        [coll._eqnSame, 'oppOnHyp'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'This |ratio| is the same for |all| right angle triangles with the |same_angle_theta|. If this angle |changes|, then the ratio also changes.',
    };


    const initRotator = () => {
      coll._eqnSame.showForm('ratioValue');
      coll._tri._theta.setLabelToRealAngle();
      coll._rotator.showAll();
      coll._rotator._pad.show();
      const padPos = coll._rotator._pad.getPosition();
      coll._rotator._line.setRotation(Math.atan2(padPos.y, padPos.x));
      coll._rotator._line.setMovable(true, 'rotation');
      coll._rotator._pad.setMovable(true, 'translation');
      coll.updateRotation();
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        ratio: coll.bindAccent({ element: coll._eqnSame, scale: 1.5 }, colors.lines),
        changes: click(coll.goToRotation, [coll, null, null, null], colors.angles),
        same_angle_theta: click(coll.goToLength, [coll], colors.angles),
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
      },
      transitionFromPrev: (done) => {
        initRotator();
        coll._eqnSame.showForm('oppOnHyp');
        coll._eqnSame.goToForm({
          name: 'ratioValue',
          animate: 'move',
          duration: 2,
          callback: done,
        });
        coll._tri.animations.new()
          .inParallel([
            coll._tri.anim.scenario({ target: 'right', duration: 2 }),
            coll._eqnSame.anim.scenario({ target: 'left', duration: 2}),
          ])
          .start();
      },
      setSteadyState: () => {
        initRotator();
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
      },
      setLeaveState: () => {
        if (this.goingTo !== 'next') {
          coll._rotator._pad.setPosition(layout.points[2]);
        }
        coll._tri._hyp.setLabel('hypotenuse');
        coll._tri._opp.setLabel('opposite');
        coll._tri._adj.setLabel('adjacent');
        coll._tri._theta.setLabel('\u03b8');
        coll._rotator._pad.setMovable(false);
        coll._rotator._line.setMovable(false)
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'In other words, the ratio is a |function| of the |angle_theta|.',
      modifiers: {
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      transitionFromPrev: (done) => {
        initRotator();
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll.resetTri(done);
      },
      setSteadyState: () => {
        initRotator();
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
      },
      setLeaveState: () => {
        if (this.goingTo !== 'next') {
          coll._rotator._pad.setPosition(layout.points[2]);
        }
        coll._tri._hyp.setLabel('hypotenuse');
        coll._tri._opp.setLabel('opposite');
        coll._tri._adj.setLabel('adjacent');
        coll._tri._theta.setLabel('\u03b8');
        coll._rotator._pad.setMovable(false);
        coll._rotator._line.setMovable(false)
      },
    });

    this.addSection(common, commonShow, commonContent, {
      transitionFromPrev: (done) => {
        initRotator();
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.goToForm({
          name: 'function',
          animate: 'move',
          dissolveOutTime: 0.5,
          dissolveInTime: 0.5,
        });
        coll.resetTri(() => {
          coll.animations.new()
            .inParallel([
              coll._tri._hyp.anim.dissolveOut({ duration: 0.5 }),
              coll._tri._opp.anim.dissolveOut({ duration: 0.5 }),
              coll._tri._theta._label.anim.dissolveOut({ duration: 0.5 }),
            ])
            .trigger({ callback: () => {
              coll._tri._hyp.setLabel('hypotenuse');
              coll._tri._opp.setLabel('opposite');
              coll._tri._theta.setLabel('\u03b8');
            }})
            .inParallel([
              coll._tri._hyp.anim.dissolveIn({ duration: 0.5 }),
              coll._tri._opp.anim.dissolveIn({ duration: 0.5 }),
              coll._tri._theta._label.anim.dissolveIn({ duration: 0.5 }),
            ])
            .whenFinished(done)
            .start();
        });
      },
      setSteadyState: () => {
        coll._rotator._pad.setPosition(layout.points[2]);
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._tri._hyp.setLabel('hypotenuse');
        coll._tri._opp.setLabel('opposite');
        coll._tri._theta.setLabel('\u03b8');
        coll._rotator._pad.setMovable(false);
        coll._rotator._line.setMovable(false);
        coll._eqnSame.showForm('function');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'This function has been studied for |millennia|, and is now called the |sine_function|, often abbreviated to |sin|.',
    };

    commonShow = {
      show: [tri],
      hide: [tri._complement, tri._adj],
      setEqnForms: [
        [coll._eqnSame, 'function'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        sine_function: this.bindNext(colors.diagram.action),
        sin: this.bindNext(colors.diagram.action),
      },
      setSteadyState: () => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
      },
    });

    this.addSection(common, commonShow, commonContent, {
      title: 'Sine',
      modifiers: {
        sine_function: coll.bindAccent({
          element: coll._eqnSame,
          children: ['sin', 'lb', 'theta', 'rb'],
          centerOn: 'sin',
          scale: 2,
        }, colors.diagram.action),
        sin: coll.bindAccent({
          element: coll._eqnSame,
          children: ['sin', 'lb', 'theta', 'rb'],
          centerOn: 'sin',
          scale: 2,
        }, colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.goToForm({
          name: 'sin',
          animate: 'move',
          duration: 1.5,
          callback: done,
        });
      },
      setSteadyState: () => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.showForm('sin');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The |sine_function| is also sometimes written without the |brackets| for convenience or a clean look.',
      modifiers: {
        sine_function: coll.bindAccent({
          element: coll._eqnSame,
          children: ['sin', 'lb', 'theta', 'rb'],
          centerOn: 'sin',
          scale: 2,
        }, colors.diagram.action),
        brackets: coll.bindAccent({
          element: coll._eqnSame,
          children: ['lb', 'rb'],
          // centerOn: 'theta',
          // scale: 2,
        }, colors.diagram.action),
      },
    };

    commonShow = {
      show: [tri],
      hide: [tri._complement, tri._adj],
      setEqnForms: [
        [coll._eqnSame, 'sin'],
      ],
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
      },
    });

    const dissolveBrackets = (done: ?() => void) => {
      coll._eqnSame.showForm('sin');
      coll.accent({
        element: coll._eqnSame,
        children: ['lb', 'rb'],
        done: () => {
          coll._eqnSame.goToForm({
            name: 'sinNoBracket',
            animate: 'move',
            duration: 0.5,
            callback: done,
          });
        },
      });
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {    
        brackets: click(dissolveBrackets, [this, null], colors.diagram.action),
        // sin: coll.bindAccent({
        //   element: coll._eqnSame,
        //   children: ['sin', 'lb', 'theta', 'rb'],
        //   centerOn: 'sin',
        //   scale: 2,
        // }, colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        dissolveBrackets(done);
      },
      setSteadyState: () => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.showForm('sinNoBracket');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The word |sine| originates from the word for |bowstring|.',
      modifiers: {
        bowstring: this.bindNext(colors.lines),
      },
    };

    commonShow = {
      show: [tri],
      hide: [tri._complement, tri._adj],
      // setEqnForms: [
      //   [coll._eqnSame, 'sin'],
      // ],
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.showForm('sinNoBracket');
      },
    });

    const pulseBow = () => {
      coll._history._arc.pulseThickNow(1, 1.04, 8);
      coll.accent({
        element: coll._history, children: ['arc', 'bowString'], style: ['highlight'],
      });
      coll.accent({
        element: coll._history, children: ['bowString'], style: ['pulse'],
      });
      coll._history.toFront(['arc', 'bowString']);
    };

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        bowstring: click(pulseBow, [this], colors.lines),
      },
      // show: [coll._history],
      transitionFromPrev: (done) => {
        coll._rotator.showAll();
        coll._tri.setScenario('right');
        coll._eqnSame.setScenario('left');
        coll._eqnSame.showForm('sinNoBracket');
        coll.animations.new()
          .inParallel([
            coll._tri._theta.anim.dissolveOut({ duration: 0.8 }),
            coll._tri._opp.anim.dissolveOut({ duration: 0.8 }),
            coll._tri._hyp.anim.dissolveOut({ duration: 0.8 }),
            coll._eqnSame.anim.dissolveOut({ duration: 0.8 }),
          ])
          .inParallel([
            coll._tri.anim.trigger({
              callback: () => {
                coll.goToRotation(layout.historyAngle, 2, null);
              },
              duration: 1,
            }),
            coll._tri.anim.position({ target: coll._history.getPosition(), duration: 2 }),
            coll._tri.anim.scale({ target: layout.historyRadius / layout.triLen, duration: 2 }),
          ])
          
          .inParallel([
            coll._history.anim.dissolveIn({ duration: 1 }),
            coll._tri.anim.dissolveOut({ duration: 1 }),
            coll.anim.trigger({
              duration: 0,
              callback: () => {
                coll.accent({
                  element: coll._history,
                  children: ['bowString', 'arc'],
                  style: 'highlight',
                });
                coll._history.toFront(['arc', 'bowString']);
              },
            }),
          ])
          .trigger({
            duration: 1,
            callback: () => {
              coll._history.showAll();
              pulseBow();
            },
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        // coll._tri.showAll();
        // coll._rotator.showAll();
        // coll._tri.setScale(1, 1);
        // coll._rotator._pad.setPosition(layout.points[2]);
        // coll.updatePad();
        // coll._tri._hyp.setLabel('hypotenuse');
        // coll._tri._opp.setLabel('opposite');
        // coll._tri._theta.setLabel('\u03b8');
        // coll._rotator._pad.setMovable(false);
        // coll._rotator._line.setMovable(false);

        coll._eqnSame.hide();
        coll._history.showAll();
        coll._history.toFront(['arc', 'bowString']);
        coll.accent({
          element: coll._history,
          children: ['arc', 'bowString'],
          style: 'highlight',
        });
        coll._rotator.hideAll();
        coll._tri.hideAll();
        coll._tri._right.hideAll();
      },
      setLeaveState: () => {
        coll._tri.setScale(1, 1);
        coll._rotator._pad.setPosition(layout.points[2]);
        coll._tri._hyp.setLabel('hypotenuse');
        coll._tri._opp.setLabel('opposite');
        coll._tri._adj.setLabel('adjacent');
        coll._tri._theta.setLabel('\u03b8');
        coll._rotator._pad.setMovable(false);
        coll._rotator._line.setMovable(false)
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    
    const pulseChord = () => {
      coll.accent({
        element: coll._history, children: ['bowString'], style: ['highlight', 'pulse'],
      });
      coll._history.toFront(['bowString']);
    };

    const pulseRightAngle = () => {
      coll.accent({
        element: coll._history, children: ['tri'], style: ['highlight'],
      });
      coll._history._tri._line.pulseSettings.delta = [0.5, 0.2];
      coll._history._tri._line.pulseThickNow(1, 1.1, 8);
      coll._history.toFront(['tri']);
    };

    const pulseSineLine = () => {
      coll.accent({
        element: coll._history, children: ['sin'], style: ['highlight', 'pulse'],
      });
      coll._history.toFront(['sin']);
    };
    commonContent = {
      setContent: '|Ancient_Greeks| called the |line| between two points on a |circle| a |khordḗ| (chord or string of a |bow|). A |right_angle_triangle| splits this chord in two and is used to analyse its properties. The |sine_function| was first named in |Sanskrit| as |ardha-jya| (half chord) or |jya| (chord).',
    };

    const pulseCircle = () => {
      coll._history._circle.pulseThickNow(1, 1.02, 8);
      coll.accent({
        element: coll._history, children: ['circle'], style: ['highlight'],
      });
      coll._history.toFront(['circle']);
    };

    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        Ancient_Greeks: highlight(colors.diagram.text.greek),
        Sanskrit: highlight(colors.diagram.text.sanskrit),
        Arabic: highlight(colors.diagram.text.arabic),
        Latin: highlight(colors.diagram.text.latin),
        'khordḗ': click(pulseChord, [this], colors.lines),
        'right_angle_triangle': click(pulseRightAngle, [this], colors.lines),
        sine_function: click(pulseSineLine, [this], colors.lines),
        bow: click(pulseBow, [this], colors.lines),
        line: click(pulseChord, [this], colors.lines),
        circle: click(pulseCircle, [this], colors.angles),
      },
      show: [coll._history],
      setSteadyState: () => {
        coll.accent({
          element: coll._history,
          children: ['arc', 'bowString'],
          style: 'highlight',
        });
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ centerV: true }, [
        '|Jya| was translated into |Arabic| as |jiba|, which was then confused with |jaib| (meaning bay or bossom) when it was translated into |Latin| as |sinus| (bay or bossom).',
        'Our term |sine| comes from |sinus|.',
      ]),
    };
    this.addSection(common, commonContent);

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ centerV: true }, [
        'Now, what is the |value| of the sine function at |different angles|?',
      ]),
      modifiers: {
        angle_theta: highlightWord('\u03b8', colors.angles),
      },
      title: 'Value',
    };
    this.addSection(common, commonContent);

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'In the |first century| CE, |geometry| was used to find the sines of specific angles. A |table_of_sine_values| was then published that could then be referenced.',
      ]),
      modifiers: {
        angle_theta: highlightWord('\u03b8', colors.angles),
        table_of_sine_values: coll.bindAccent(tab, colors.diagram.action),
      },
    };
    commonShow = {
      show: [
        tab,
      ],
      setEqnForms: [
        ...coll.tableForm('base'),
        [tab._sineHeading, 'opp'],
      ],
    };
    this.addSection(common, commonShow, commonContent);

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'It was not until |1400| CE, that a |formula| was found that |precisely calculates| the sine of any angle.',
      ]),
      modifiers: {
        angle_theta: highlightWord('\u03b8', colors.angles),
        table_of_sine_values: coll.bindAccent(tab, colors.diagram.action),
        formula: this.bindNext(colors.diagram.action),
      },
    };
    commonShow = {
      show: [
        tab,
      ],
      setEqnForms: [
        ...coll.tableForm('base'),
        [tab._sineHeading, 'opp'],
      ],
    };
    this.addSection(common, commonShow, commonContent);

    commonShow = {
      // show: [
      //   tab,
      // ],
      setEqnForms: [
        // ...coll.tableForm('base'),
        // [tab._sineHeading, 'opp'],
        [coll._powerSeries, 'base'],
      ],
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        formula: coll.bindAccent(coll._powerSeries, colors.diagram.action),
      },
      transitionFromPrev: (done) => {
        coll.accent(coll._powerSeries, done);
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'But this |calculation| is |long and difficult| without a calculator, so |tables| were still primarily used up until the |late 20th century| when they were finally replaced with |calculators| and |computers|.',
      ]),
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        calculation: coll.bindAccent(coll._powerSeries, colors.diagram.action),
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ centerV: true }, [
        'So if you want to find the |sine value| of some angle, you can use the |sin| button or command on a calculator or computer, or reference a |table_of_sines|.',
      ]),
      modifiers: {
        table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
      },
    };
    this.addSection(common, commonContent, {
      // modifiers: {
      //   calculation: coll.bindAccent(coll._powerSeries, colors.diagram.action),
      // },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'The |relationship| between |angle|, |opposite_side| and |hypotenuse| can be |used| to find |unknown properties|.',
      ]),
      modifiers: {
        // table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
        relationship: coll.bindAccent({
          element: coll._eqnSame,
          color: colors.diagram.action,
          scale: 1.5,
        }),
        angle: coll.bindAccent({ element: tri._theta, scale: 1.5 }),
        opposite_side: coll.bindAccent({ element: tri._opp, scale: 1.5 }),
        hypotenuse: coll.bindAccent({ element: tri._hyp, scale: 1.5 }),
      },
    };
    commonShow = {
      show: [tri],
      hide: [tri._complement, tri._adj],
      setEqnForms: [
        [coll._eqnSame, 'sin'],
      ],
    };
    common = {
      setEnterState: () => {
        tri.setScenario('right');
        coll._eqnSame.setScenario('left');
      },
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Use',
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'If |two_sides_are_known|, then their |ratio| (the sine) can be calculated and found in a |table_of_sines| to see which |angle| is associated with it.',
      ]),
      modifiers: {
        table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
        angle: coll.bindAccent(coll._tri._theta),
        ratio: coll.bindAccent({
          element: coll._eqnSame,
          children: ['opp', 'hyp', 'v'],
          centerOn: 'v',
          x: 0.7,
          scale: 1.5,
        }),
        two_sides_are_known: coll.bindAccent({
          element: coll._tri,
          children: ['opp', 'hyp'],
          scale: 1.5,
        }),
      },
    };
    this.addSection(common, commonShow, commonContent);

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'Alternately, if the |angle| and |one side| are |known|, then the relationship can be |rearranged| to find the unknown side.',
      ]),
      modifiers: {
        // table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
        rearranged: click(coll.toggleEqn, [coll], colors.lines),
        angle: coll.bindAccent(coll._tri._theta),
        // angle: coll.bindAccent(tri._theta),
        // opposite_side: coll.bindAccent(tri._opp),
        // hypotenuse: coll.bindAccent(tri._hyp),
      },
    };
    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'And just knowing the |ratio| is |constant| for all triangles with the same |theta| is very |useful|. This leads to many other |relationships between properties| in triangles and circles and forms the basis of |trigonometry|.',
      ]),
      modifiers: {
        // table_of_sines: this.qr('Math/Trigonometry_1/Sine/base/TableOfSines'),
        ratio: coll.bindAccent(coll._eqnSame, colors.diagram.action),
        constant: coll.bindAccent({
          element: coll._eqnSame,
          children: ['sin', 'theta', 'lb', 'rb'],
          centerOn: 'sin',
          scale: 1.5,
          color: colors.diagram.action,
        }),
        theta: coll.bindAccent(coll, ['tri.theta', 'eqnSame.theta']),
        // rearranged: click(coll.toggleEqn, [coll], colors.lines),
        // angle: coll.bindAccent(tri._theta),
        // opposite_side: coll.bindAccent(tri._opp),
        // hypotenuse: coll.bindAccent(tri._hyp),
      },

    };
    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'This topic focused on the ratio between the |opposite side| and |hypotenuse|.',
      ]),
    };
    this.addSection(common, commonContent, {
      title: 'Other Ratios',
      setEnterState: () => {
        coll.setScenarios('default');
      },
      setEqnForms: [
        [coll._eqnSin, 'base'],
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({}, [
        'The |other ratios| are |constant| and have |functions| that describe them with names |cosine| and |tangent|, which are abbreviated to |cos| and |tan|.',
      ]),
    };
    this.addSection(common, commonContent, {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      setEqnForms: [
        [coll._eqnSin, 'base'],
      ],
    });
    this.addSection(common, commonContent, {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      setEqnForms: [
        [coll._eqnSin, 'base'],
      ],
      transitionFromPrev: (done) => {
        coll._eqnSin.setScenario('default');
        coll._eqnSin.animations.new()
          .scenario({ target: 'top', duration: 1 })
          .inParallel([
            coll._eqnCos.anim.dissolveIn({ duration: 1 }),
            coll._eqnTan.anim.dissolveIn({ duration: 1 }),
            coll.anim.trigger({
              callback: () => {
                coll._eqnCos.showForm('base');
                coll._eqnTan.showForm('base');
              },
            }),
          ])
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._eqnSin.setScenario('top');
        coll._eqnCos.showForm('base');
        coll._eqnTan.showForm('base');
      },
    });
  }
}

export default Content;
