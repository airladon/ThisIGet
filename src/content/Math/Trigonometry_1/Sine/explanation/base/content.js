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
    // const tab = coll._table;

    let commonContent = {
      setContent: '|Triangles| with the |same_corresponding_angles| are |similar|, and thus have |corresponding_sides| with the |same_scaling_factor|.',
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
        console.log(sim)
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
      // setEqnForms: [
      //   [fig._theta._label, 'real'],
      //   [fig._hypotenuse._label, 'real'],
      // ],
    };
    this.addSection(common, commonShow, commonContent, {
      title: 'Similar triangles',
      // setSteadyState: () => {
      //   fig._line.setRotation(Math.PI / 18 * 4);
      //   coll.updateRotation();
      //   fig._line._line.isTouchable = false;
      // },
    });

    commonContent = {
      setContent: 'Therefore, the |ratio| of any two corresponding sides will be the same for all similar triangles',
      modifiers: {
        ratio: click(coll.makeAOnB, [coll], colors.lines),
      },
    };

    this.addSection(common, commonShow, commonContent, {
      setSteadyState: () => {
        eqn.showForm('AonB');
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
  }
}

export default Content;
