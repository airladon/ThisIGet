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
      setContent: 'Now consider a |right_angle_triangle| with its |sides| named relative to an |angle_theta|.',
      modifiers: {
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        sides: coll.bindToggleGroups(tri, [['hyp'], ['opp'], ['adj']], colors.lines),
        right_angle_triangle: this.qr('Math/Geometry_1/RightAngleTriangles/base/DefinitionPres'),
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
      setContent: 'Therefore, |all| right angle triangles with the |same_angle_theta| must be |similar|.',
      modifiers: {
        similar: this.qr('Math/Geometry_1/SimilarTriangles/base/SimilarPres'),
        same_angle_theta: clickW('same angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
      },
    };

    this.addSection(common, commonShow, commonContent, {
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'And so the |ratio| of any two sides will be |constant| for |all| right angle triangles with |angle_theta|.',
      modifiers: {
        angle_theta: clickW('angle \u03b8', coll.accent, [coll, tri, ['theta'], null], colors.angles),
        ratio: click(coll.toggleConstant, [coll], colors.lines),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setEqnForms: [
        [coll._eqnCos, '0'],
        [coll._eqnTan, '0'],
        [coll._eqnSin, '0'],
      ],
      transitionFromPrev: (done) => {
        coll._eqnCos.hide();
        coll._eqnTan.hide();
        coll._eqnSin.hide();
        coll._tri.animations.new()
          .scenario({ target: 'right', duration: 1 })
          .trigger({
            duration: 0,
            callback: () => {
              coll._eqnCos.showForm('0');
              coll._eqnSin.showForm('0');
              coll._eqnTan.showForm('0');
            }
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll._tri.setScenario('right');
      },
    });
  }
}

export default Content;
