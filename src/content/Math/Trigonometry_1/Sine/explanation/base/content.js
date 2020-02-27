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
    const eqn1 = coll._eqn1;
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
      setContent: 'Now consider a |right_angle_triangle| with a |hypotenuse| and |sides| named relative to an |angle_theta|.',
      modifiers: {
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        sides: coll.bindToggleGroups(tri, [['opp'], ['adj']], colors.lines),
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
      setContent: 'While this |ratio| is the same for |all| right angle triangles with |angle_theta|, if this angle |changes|, then the ratio also changes.',
      // 'As the |angle_is_changed|, these ratios change. In other words, these ratios are a |function of| |theta|.',
      modifiers: {
        ratio: coll.bindAccent({
          element: coll._eqnSame,
          children: ['v', 'opp', 'hyp'],
          centerOn: 'v',
          time: 1,
          scale: 1.5,
        }, colors.lines),
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        changes: this.bindNext(colors.angles, 'fromChanged'),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        // coll._tri.setScenario('right');
      },
    });

    const initRotator = () => {
      // coll._tri.setScenario('right');
      coll._eqnSame.showForm('ratioValue');
      coll._tri._theta.setLabelToRealAngle();
      coll._rotator.showAll();
      coll._rotator._pad.show();
      coll._rotator._line.setRotation(Math.atan2(layout.points[2].y, layout.points[2].x));
      coll._rotator._line.setMovable(true, 'rotation');
      coll._rotator._pad.setMovable(true, 'translation');
      // coll._rotator._v.setMovable(true, 'translation');
      coll.updateRotation();
      console.log(coll._tri._theta)
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        changes: click(coll.goToRotation, [coll, null, null], colors.angles),
      },
      transitionFromPrev: (done) => {
        initRotator();
        coll._eqnSame.showForm('oppOnHyp');
        coll._eqnSame.goToForm({
          name: 'ratioValue',
          animate: 'move',
          duration: 2,
          callback: () => {
            if (this.message === 'fromChanged') {
              coll.goToRotation(null, done);
            } else {
              done();
            }
          },
        });
      },
      setSteadyState: () => {
        if (this.message == null) {
          initRotator();
        }
      },
      setLeaveState: () => {
        coll.updateRotation(Math.atan2(layout.points[2].y, layout.points[2].x));
        coll._tri._hyp.setLabel('hypotenuse');
        coll._tri._opp.setLabel('opposite');
        coll._tri._adj.setLabel('adjacent');
        coll._tri._theta.setLabel('\u03b8');
        coll._eqnSin._const.drawingObject.setText('constant');
        coll._eqnCos._const.drawingObject.setText('constant');
        coll._eqnTan._const.drawingObject.setText('constant');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'We call these functions the |sine|, |cosine| and |tangent| functions - often abreviated to |sin|, |cos| and |tan|.',
      modifiers: {
        // theta: clickW('\u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        // angle_is_changed: this.bindNext(colors.angles, 'fromChanged'),
      },
    };
    commonShow = {
      show: [tri],
      hide: [tri._complement],
      setEqnForms: [
        [coll._eqnCos, 'function'],
        [coll._eqnTan, 'function'],
        [coll._eqnSin, 'function'],
      ],
    };

    const pulseSine = () => {
      coll.accent({
        element: coll._eqnSin,
        centerOn: 'sin',
        x: 'center',
        children: ['lb', 'rb', 'theta', 'sin'],
        scale: 1.5,
      });
    };
    const pulseTangent = () => {
      coll.accent({
        element: coll._eqnTan,
        centerOn: 'tan',
        x: 'center',
        children: ['lb', 'rb', 'theta', 'tan'],
        scale: 1.5,
      });
    };
    const pulseCosine = (done) => {
      coll.accent({
        element: coll._eqnCos,
        centerOn: 'cos',
        x: 'center',
        children: ['lb', 'rb', 'theta', 'cos'],
        scale: 1.5,
        done,
      });
    };
    this.addSection(common, commonShow, commonContent, {
      modifiers: {
        angle_is_changed: click(coll.goToRotation, [coll, null, null], colors.angles),
        sine: click(pulseSine, [this], colors.lines),
        tangent: click(pulseTangent, [this], colors.lines),
        cosine: click(pulseCosine, [this, null], colors.lines),
        sin: click(pulseSine, [this], colors.lines),
        tan: click(pulseTangent, [this], colors.lines),
        cos: click(pulseCosine, [this, null], colors.lines),
      },
      transitionFromPrev: (done) => {
        coll._tri.setScenario('right');
        this.diagram.setFirstTransform();
        pulseCosine(done);
        pulseSine();
        pulseTangent();
      },
      setSteadyState: () => {
        coll._tri.setScenario('right');
      },
    });
  }
}

export default Content;
