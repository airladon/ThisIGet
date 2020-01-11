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
  // clickW,
  highlight,
  highlightWord,
  // centerV,
} = Fig.tools.html;

const { round } = Fig.tools.math;

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
      'Math/Geometry_1/AngleTypes/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/SimilarTriangles/base',
      'Math/Geometry_1/RightAngleTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const eqn = coll._eqn;

    let commonContent = {
      setContent: 'Start with a |line| of |length 1| that can be rotated between |0º_and_90º|.',
    };
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      transitionReset: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
      ],
      setSteadyState: () => {
        coll.updateRotation();
      },
    };
    this.addSection(common, commonContent, {
      title: 'Introduction',
      modifiers: {
        '0º_and_90º': click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
        line: coll.bindAccent(fig._line),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse, //  fig._arc,
      ],
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 4);
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The line has |horizontal| and |vertical| components, that change with |rotation_angle|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        rotation_angle: click(coll.gotoRotation, [coll, null, 0.8, null], colors.angles),
        horizontal: this.bindNext(colors.components, 'h'),
        vertical: this.bindNext(colors.components, 'v'),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        rotation_angle: click(coll.gotoRotation, [coll, null, 0.8, null], colors.angles),
        horizontal: coll.bindAccent(fig._h),
        vertical: coll.bindAccent(fig._v),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
      ],
      transitionFromPrev: (done) => {
        fig._h.showAll();
        fig._v.showAll();
        coll.updateRotation();
        if (this.message === 'h') {
          coll.accent(fig, ['h'], done);
        } else if (this.message === 'v') {
          coll.accent(fig, ['v'], done);
        } else {
          coll.accent(fig, ['h', 'v'], done);
        }
      },
      setSteadyState: () => {
        fig._h.showAll();
        fig._v.showAll();
        coll.updateRotation();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'These |components| and the |line| are a |right_angle_triangle|. |Rotating| the line |changes the shape| of the right angle triangle.',
      modifiers: {
        components: coll.bindAccent(fig, ['h', 'v']),
        line: coll.bindAccent(fig._line),
        Rotating: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        right_angle_triangle: this.bindNext(colors.lines),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._h, fig._v,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        right_angle_triangle: coll.bindAccent(fig, ['line', 'h', 'v', 'right']),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._h, fig._v,
      ],
      transitionFromPrev: (done) => {
        fig._right.showAll();
        coll.updateRotation();
        coll.accent(fig, ['h', 'v', 'line', 'right'], done);
      },
      setSteadyState: () => {
        fig._right.showAll();
        coll.updateRotation();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'Now let’s consider just the |vertical| component.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        vertical: this.bindNext(colors.components),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._h, fig._v, fig._right,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        vertical: coll.bindAccent(fig._v),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._h, fig._v, fig._right,
      ],
      transitionFromPrev: (done) => {
        coll.accent(fig._v);
        fig.animations.new()
          .dissolveOut({ element: fig._h, duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        fig._h.hide();
        coll.updateRotation();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'As the angle gets |closer_to_90º|, the vertical component gets |longer|. As it gets |closer_to_0º|, the vertical component gets |shorter|.'),
    };
    this.addSection(common, commonContent, {
      modifiers: {
        closer_to_0º: click(coll.gotoSmallAngle, [coll], colors.angles),
        closer_to_90º: click(coll.gotoLargeAngle, [coll], colors.angles),
        longer: highlight(colors.components),
        shorter: highlight(colors.components),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._v, fig._right,
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'Therefore we can say the |vertical| component is |related to|, |dependent on|, or |a function of| the rotation |angle|.'),
    };
    this.addSection(common, commonContent, {
      modifiers: {
        vertical: highlight(colors.components),
        angle: highlight(colors.angles),
      },
      show: [
        fig._line, fig._x, fig._real, fig._hypotenuse,
        fig._v, fig._right,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        vertical: highlight(colors.components),
        angle: highlight(colors.angles),
      },
      show: [
        fig._line, fig._x, fig._theta, fig._hypotenuse,
        fig._v, fig._right, fig._sineTheta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '0'],
        [eqn, '0'],
        [fig._theta._label, '0'],
      ],
      transitionFromPrev: (done) => {
        coll.resetRotation(() => {
          coll.accent(eqn, done);
          // coll.accent(fig._theta);
        }, 0.8);
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'Moving forward, we will call the vertical component the side |opposite| the angle, and call the angle |theta|.'),
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        theta: coll.bindAccent(fig._theta),
        // theta: click(() => {
        //   eqn.showForm('0');
        //   eqn.goToForm({
        //     name: 'asd',
        //     duration: 2,
        //     animate: 'move',
        //   });
        //   this.diagram.animateNextFrame();
        // }, [this], colors.angles),
      },
    };
    this.addSection(common, commonContent, {
      show: [
        fig._line, fig._x, fig._theta, fig._hypotenuse,
        fig._v, fig._right, fig._sineTheta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '0'],
        [eqn, '0'],
        [fig._theta._label, '0'],
      ],
      // setSteadyState: () => {
      //   console.log(eqn)
      // }
    });

    this.addSection(common, commonContent, {
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        angle: coll.bindAccent(fig._real),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta, fig._sineTheta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '0'],
        [eqn, '0'],
        [fig._theta._label, '0'],
      ],
      transitionFromPrev: (done) => {
        // coll.accent(fig, ['theta', 'sineTheta'], done);
        eqn.goToForm({
          name: '1',
          duration: 2,
          animate: 'move',
          callback: done,
        });
        fig._sineTheta._label.goToForm({ name: '0b', duration: 2, animate: 'move' });
        fig._theta._label.goToForm({ name: '1', duration: 2, animate: 'move' });
      },
      setSteadyState: () => {
        eqn.showForm('1');
        fig._sineTheta._label.showForm('0b');
        fig._theta._label.showForm('1');
        coll.updateRotation();
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        vertical: highlight(colors.components),
        angle: coll.bindAccent(fig._theta),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '0b'],
        [eqn, '1'],
        [fig._theta._label, '1'],
      ],
      transitionFromPrev: (done) => {
        eqn.goToForm({
          name: '2',
          duration: 2,
          animate: 'move',
          callback: done,
        });
        fig._sineTheta._label.goToForm({
          name: '1',
          duration: 2,
          animate: 'move',
        });
        fig._theta._label.goToForm({
          name: '2',
          duration: 2,
          animate: 'move',
        });
      },
      setSteadyState: () => {
        eqn.showForm('2');
        fig._sineTheta._label.showForm('1');
        fig._theta._label.showForm('2');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The |hypotenuse| has length 1. If it |changes| length, then the |opposite_side| length will also change.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite_side: coll.bindAccent(fig._v),
        hypotenuse: click(coll.setLineLength, [coll, layout.r, true, null, true], colors.lines),
        changes: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '1'],
        [eqn, '2'],
        [fig._theta._label, '2'],
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The |hypotenuse| has length 1. If it |changes| length, then the |opposite_side| length will also change.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite_side: coll.bindAccent(fig._v),
        hypotenuse: click(coll.setLineLength, [coll, layout.r, true, null, true], colors.lines),
        changes: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '1'],
        [eqn, '2'],
        [fig._theta._label, '2'],
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: '|Changing| the hypotenuse doesn’t change the |angles| of the triangle - therefore triangles with different hypotenuse lengths are |similar|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        angles: coll.bindAccent(fig, ['right', 'theta']),
        Changing: click(coll.setLineLength, [coll, null, true, null, true], colors.lines),
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '1'],
        [eqn, '2'],
        [fig._theta._label, '2'],
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'The corresponding sides of |similar_triangles| are all |scaled by the same factor|. Thus if we scale the hypotenuse by |r|, then the |opposite| side must also be scaled by |r|.'),
      modifiers: {
        opposite: highlight(colors.components),
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._sineTheta._label, '1'],
        [fig._theta._label, '2'],
      ],
    };
    // this.addSection(common, commonContent, {
    //   show: [
    //     fig._line, fig._x, fig._hypotenuse,
    //     fig._v, fig._right, fig._theta,
    //   ],
    //   setEqnForms: [
    //     [fig._hypotenuse._label, '0'],
    //     [fig._sineTheta._label, '1'],
    //     [eqn, '2'],
    //     [fig._theta._label, '2'],
    //   ],
    // });
    this.addSectionEqnStep({
      eqns: [
        { eqn, from: '2', to: '2' },
        { eqn: fig._hypotenuse._label, from: '0', to: '0' },
      ],
    }, common, commonContent);
    // this.addSectionEqnStep({
    //   eqns: [
    //     { eqn, from: '2', to: '2a', duration: 2 },
    //     { eqn: fig._hypotenuse._label, from: '0', to: '1', duration: 2 },
    //   ],
    // }, common, commonContent);
    this.addSectionEqnStep({
      eqns: [
        [eqn, '2', '2a'],
        [fig._hypotenuse._label, '0', '1'],
      ],
      duration: 2,
    }, common, commonContent);

    // this.addSection(common, commonContent, {
    //   show: [
    //     fig._line, fig._x, fig._hypotenuse,
    //     fig._v, fig._right, fig._theta,
    //   ],
    //   setEqnForms: [
    //     [fig._hypotenuse._label, '0'],
    //     [fig._sineTheta._label, '1'],
    //     [eqn, '2'],
    //     [fig._theta._label, '2'],
    //   ],
    //   transitionFromPrev: (done) => {
    //     eqn.goToForm({
    //       name: '2a',
    //       duration: 2,
    //       animate: 'move',
    //       callback: done,
    //     });
    //     fig._hypotenuse._label.goToForm({
    //       name: '1',
    //       duration: 2,
    //       animate: 'move',
    //     });
    //   },
    //   setSteadyState: () => {
    //     eqn.showForm('2a');
    //     fig._hypotenuse._label.showForm('1');
    //   },
    // });

    this.addSection(common, commonContent, {
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '1'],
        [fig._sineTheta._label, '1'],
        [eqn, '2a'],
        [fig._theta._label, '2'],
      ],
      transitionFromPrev: (done) => {
        eqn.goToForm({
          name: '2b',
          duration: 2,
          animate: 'move',
          callback: done,
        });
        fig._hypotenuse._label.goToForm({
          name: '2',
          duration: 2,
          animate: 'move',
        });
      },
      setSteadyState: () => {
        eqn.showForm('2b');
        fig._hypotenuse._label.showForm('2');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'This is a |general relationship|, as |r| (the hypotenuse) can be |any length|.',
      modifiers: {
        opposite: highlight(colors.components),
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    };

    this.addSection(common, commonContent, {
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '2'],
        [fig._sineTheta._label, '1'],
        [eqn, '2b'],
        [fig._theta._label, '2'],
      ],
    });

    this.addSection(common, commonContent, {
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '2'],
        [fig._sineTheta._label, '1'],
        [eqn, '2b'],
        [fig._theta._label, '2'],
      ],
      transitionFromPrev: (done) => {
        eqn.goToForm({
          name: '2c',
          duration: 2,
          animate: 'move',
          callback: done,
        });
      },
      setSteadyState: () => {
        eqn.showForm('2c');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'As the |horizontal| and |vertical| components are |perpendicular|, we have a |right_angle_triangle|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        horizontal: coll.bindAccent(fig._h),
        vertical: coll.bindAccent(fig._v),
        perpendicular: this.qr('Math/Geometry_1/AngleTypes/base/Perpendicular'),
        right_angle_triangle: this.bindNext(colors.lines),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '1'],
        [eqn, '2'],
        [fig._theta._label, '2'],
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        horizontal: coll.bindAccent(fig._h),
        vertical: coll.bindAccent(fig._v),
        perpendicular: this.qr('Math/Geometry_1/AngleTypes/base/Perpendicular'),
        right_angle_triangle: coll.bindAccent(fig, ['line', 'v', 'h']),
      },
      show: [
        fig._line, fig._x, fig._hypotenuse,
        fig._v, fig._right, fig._theta,
      ],
      setEqnForms: [
        [fig._hypotenuse._label, '0'],
        [fig._sineTheta._label, '1'],
        [eqn, '2'],
        [fig._theta._label, '2'],
      ],
      transitionFromPrev: (done) => {
        coll.resetRotation(() => {
          fig._right.showAll();
          coll.updateRotation();
          coll.accent(fig, ['h', 'v', 'line', 'right'], done);
        }, 0.8);
      },
      setSteadyState: () => {
        fig._right.showAll();
        coll.updateRotation();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        'Now, when we |rotate| the line between |0º_to_90º|, we are actually forming |every possible combination of angles| for a right angle triangle.',
        note('Note: a triangle\'s angles |sum_to_180º|, so when |one angle is 90º| then the other two angles must be |less than 90º|. Therefore is we sweep one angle from 0 to 90º, '),
      ]
    };
    this.addSection(common, commonContent, {
      modifiers: {
        '0º_to_90º': click(coll.rotateFrom0To90, [coll], colors.angles),
        sum_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
        // angles: highlight(colors.angles),
      },
      show: [
        fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
      ],
    });

    this.addSection({
      setContent: [
        'Our setup can create all possible angle combinations of right angle triangles',
      ],
    });
    this.addSection({
      setContent: [
        'Our setup creates right angle triangles with all the possible angle combinations.',
        'Triangles with the same corresponding angles are similar triangles, and the sides of similar triangles all have the same proportion or relatipnship between other sides of',
        'Similar triangles are just scaled - their corresponding sides all have the same proportion to each other',
        'Therefore, any relationship we find in out setup between angles and sides, will translate '
      ],
      fadeInFromPrev: false,
    });
    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [
        fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    };
    commonContent = {
      setContent: 'We also know from |similar_triangles| that any triangles with the |same corresponding angles| will be |similar|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        similar_triangles: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'In other words, we can create a triangle .',
    };
    this.addSection(common, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: style({ top: 0 }, 'This also means that |any relationship we find| between angle and side length in our setup, will be |valid for all right angle triangles| with the |same corresponding angles|.'),
    };
    this.addSection(common, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        'We will focus on just the |vertical| component, which is the side |opposite| to the angle.',
        note('Note: we will see in |future topics| that the horiztonal and vertical components are |closely related| and can be |calculated| from each other.'),
      ],
      modifiers: {
        vertical: coll.bindAccent(fig._v),
        opposite: coll.bindAccent(fig._v),
      },
    };
    this.addSection(common, commonContent, {
    });
    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        coll.resetRotation(() => {
          fig._opposite.showAll();
          coll.labelForm('0');
          coll.updateRotation();
          coll.accent(fig, ['opposite'], done);
        }, 0.8);
      },
      setSteadyState: () => {
        fig._opposite.showAll();
        coll.updateRotation();
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, [
          'We will also label the angle |theta|, and set the |hypotenuse| to length |1|.',
        ]),
        note('Note: setting the hypotenuse to 1 will make scaling the triangle easier in the future.'),
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        angle: coll.bindAccent(fig._real),
        theta: highlightWord('\u03B8', colors.angles),
        hypotenuse: this.qr('Math/Geometry_1/RightAngleTriangles/base/Hypotenuse'),
      },
      show: [
        fig._line, fig._x, fig._real, fig._v, fig._right, fig._opposite,
      ],
    });

    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [
        fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
        fig._opposite,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    };
    commonContent = {
      setContent: [
        style({}, [
          'We will also label the angle |theta|, and set the |hypotenuse| to length |1|.',
        ]),
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        angle: coll.bindAccent(fig._real),
        theta: highlightWord('\u03B8', colors.angles),
        hypotenuse: this.qr('Math/Geometry_1/RightAngleTriangles/base/Hypotenuse'),
      },
      fadeInFromPrev: false,
      transitionFromPrev: (done) => {
        fig._theta.hide();
        fig._hypotenuse.hide();
        fig._real.showAll();
        coll.updateRotation();
        coll.labelForm('0');
        coll.resetRotation(() => {
          fig._theta.showAll();
          fig._hypotenuse.showAll();
          fig._real.hide();
          coll.labelForm('0');
          coll.updateRotation();
          coll.accent(fig, ['theta', 'hypotenuse'], done);
        }, 0.8);
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'So, can we find a |relationship| between the |angle| and |opposite| side?.'),
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        angle: coll.bindAccent(fig._theta),
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'Ideally we would find a |mathematical formula| or |function| that can be used to |calculate| one from the other.'),
      ],
    };
    this.addSection(common, commonContent, {
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        coll.resetRotation(() => {
          eqn.showForm('0');
          coll.labelForm('0');
          // eqn.animations.new()
          //   .dissolveIn(1)
          //   .whenFinished(done)
          //   .start();
          coll.accent(eqn, done);
        }, 0.8);
      },
      setSteadyState: () => {
        eqn.showForm('0');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [
        fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
        fig._opposite,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('0');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      setSteadyState: () => {
        eqn.showForm('0');
      },
    };
    commonContent = {
      setContent: [
        style({}, 'We use the name |sine| for this function. Often the name is shortened to |sin| and the brackets are sometimes not used.'),
      ],
    };
    this.addSection(common, commonContent, {
    });

    this.addSection(common, commonContent, {
      transitionFromPrev: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('0');
        coll.resetRotation(() => {
          // eqn.showForm('0a');
          coll.labelForm('0');
          eqn.goToForm({
            name: '0a',
            animate: 'move',
            duration: 1,
            // callback: done,
            callback: () => {
              eqn.goToForm({
                name: '0b',
                animate: 'move',
                duration: 1,
                callback: done,
              });
            },
          });
        }, 0.8);
      },
      setSteadyState: () => {
        eqn.showForm('0b');
      },
    });

    // this.addSection(common, commonContent, {
    //   transitionFromPrev: (done) => {
    //     coll.updateRotation();
    //     coll.labelForm('0');
    //     eqn.showForm('0a');
    //     coll.resetRotation(() => {
    //       // eqn.showForm('0b');
    //       coll.labelForm('0');
    //       // coll.accent(eqn, ['sin1', 'theta1', 'lb1', 'rb1'], done);
    //       eqn.goToForm({
    //         name: '0b',
    //         animate: 'move',
    //         duration: 1,
    //         callback: done,
    //         // callback: () => {
    //         //   eqn.goToForm({
    //         //     name: '0c',
    //         //     animate: 'move',
    //         //     duration: 1,
    //         //     callback: done,
    //         //   });
    //         // },
    //       });
    //     }, 0.8);
    //   },
    //   setSteadyState: () => {
    //     eqn.showForm('0b');
    //   },
    // });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [
        fig._line, fig._x, fig._theta, fig._v, fig._right, fig._hypotenuse,
        fig._opposite,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('0');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    };
    commonContent = {
      setContent: [
        style({}, 'However, for over one |thousand| years, such a formula or function couldn\'t be found.'),
      ],
    };
    this.addSection(common, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'In the |first century| AD, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were then published in |large tables|.'),
      ],
    };

    this.addSection(common, commonContent, {
    });

    const row = (angle, prec = 3) => `<tr><td>${angle}º</td><td>${round(Math.sin(angle * Math.PI / 180), prec)}</td></tr>`;
    const dots = '<tr><td>\u22EE</td><td>\u22EE</td></tr>';
    this.addSection(common, commonContent, {
      setContent: [
        'In the |first century| AD, |geometry| was used to calculate the opposite side length for a selection of angles. These calculations were then published in |large tables|.',
        `
        <table>
          <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
          ${dots}
          ${row(20)}
          ${row(21)}
          ${row(22)}
          ${row(23)}
          ${row(24)}
          ${row(25)}
          ${row(26)}
          ${row(27)}
          ${row(28)}
          ${row(29)}
          ${dots}
        </table>
        `,
      ],
      show: [
        fig._line, fig._x, fig._real, fig._v, fig._right, fig._hypotenuse,
        fig._sine,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('0');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
      fadeInFromPrev: false,
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'By the |7th century|, the first formulas that |approximated| the side length were discovered.'),
      ],
    };
    this.addSection(common, commonContent, {
    });
    this.addSection(common, commonContent, {
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('1');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else if (this.comingFrom === 'prev') {
          coll.resetRotation(() => {
            coll.accent(eqn, done);
          }, 0.8);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'And in |1400 AD|, a formula that |exactly modeled| the relationship was found.'),
      ],
    };
    this.addSection(common, commonContent, {
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('1');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    });
    this.addSection(common, commonContent, {
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('2');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else if (this.comingFrom === 'prev') {
          coll.resetRotation(() => {
            coll.accent(eqn, done);
          }, 0.8);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: [
        style({}, 'But the formulas are |complex|, and for most uses it was still more convenient to use a |table of values|.'),
        note({ top: 22, id: 'id_computer_note' }, 'Note: it wasn\'t till the |late 20<sup>th</sup> century| when tables were superseded by personal calculators and computers.'),
      ],
    };
    this.addSection(common, commonContent, {
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('2');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    });
    // this.addSection(common, commonContent, {
    //   setContent: [
    //     style({}, 'These formulas provided insight into the properties of the relationship, but were also used to generate more |accurate| tables.'),
    //     `<table>
    //       <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
    //       ${dots}
    //       ${row(20, 8)}
    //       ${row(21, 8)}
    //       ${row(22, 8)}
    //       ${row(23, 8)}
    //       ${row(24, 8)}
    //       ${row(25, 8)}
    //       ${row(26, 8)}
    //       ${row(27, 8)}
    //       ${row(28, 8)}
    //       ${row(29, 8)}
    //       ${dots}
    //     </table>`,
    //   ],
    //   transitionFromAny: (done) => {
    //     coll.updateRotation();
    //     coll.labelForm('0');
    //     eqn.showForm('2');
    //     if (this.comingFrom === 'goto') {
    //       coll.resetRotation(done, 0);
    //     } else {
    //       coll.resetRotation(done, 0.8);
    //     }
    //   },
    // });

    this.addSection(common, commonContent, {
      setContent: [
        style({}, 'In fact, tables were used by most people until '),
        `<table>
          <tr><th><i>\u03B8</i></th><th>Opposite</th></tr>
          ${dots}
          ${row(20, 8)}
          ${row(21, 8)}
          ${row(22, 8)}
          ${row(23, 8)}
          ${row(24, 8)}
          ${row(25, 8)}
          ${row(26, 8)}
          ${row(27, 8)}
          ${row(28, 8)}
          ${row(29, 8)}
          ${dots}
        </table>`,
      ],
      transitionFromAny: (done) => {
        coll.updateRotation();
        coll.labelForm('0');
        eqn.showForm('2');
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    });


    commonContent = {
      setContent: [
        'So, can we find a |relationship| between the |angle| and |opposite| side?. Ideally we would find a |mathematical formula| or |function| that can be used to |calculate| one from the other.',
      ],
    };
    this.addSection(common, commonContent, {
      modifiers: {
        opposite: coll.bindAccent(fig._v),
        angle: coll.bindAccent(fig._real),
      },
      show: [
        fig._line, fig._x, fig._real, fig._v, fig._right,
      ],
    });


    this.addSection({
      show: [coll],
      setSteadyState: () => {
        coll.setScenarios('default');
        coll._fig._line.setMovable(true);
        coll.labelForm('2');
      },
    });
  }

  // this.addSectionEqnStep({ eqn: eqn, from: '0', to: '1' }, common, commonContent);
}

export default Content;
