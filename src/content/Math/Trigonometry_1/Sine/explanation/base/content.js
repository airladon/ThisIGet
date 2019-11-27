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

const { rand } = Fig.tools.math;

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
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const tri = coll._tri;
    // const eqn = coll._eqn;

//     this.addSection({
//       title: 'Introduction',
//       setContent: style({ centerV: true }, [
//         'A goal in studying triangles is to find |relationships between sides and angles|.',
//         // 'We already have some knowledge of',
//         // 'Different problems have different |unknowns|, so the more relationships we find, the more problems we will be able to solve.',
//       ]),
//     });

//     this.addSection({
//       setContent: style({}, [
//         'Any triangle can be split into two right angle triangles, which share the same height.',
//       ]),
//       show: [tri._line, tri._height, tri._right],
//     });

//     this.addSection({
//       setContent: style({}, [
//         'Therefore, if we can find a relationship between the hypotenuse, .
// .',
//       ]),
//       show: [tri._line, tri._height, tri._right],
//     });

    let commonContent = {
      setContent: 'Start with a |line| that can |rotate| up to 90º.',
    };
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
      },
      transitionFromAny: (done) => {
        coll.updateRotation();
        if (this.comingFrom === 'goto') {
          coll.resetRotation(done, 0);
        } else {
          coll.resetRotation(done, 0.8);
        }
      },
    };
    this.addSection(common, commonContent, {
      title: 'Introduction',
      modifiers: {
        rotate: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
        line: coll.bindAccent(fig._line),
      },
      show: [
        fig._line, fig._x, fig._real,
      ],
      setSteadyState: () => {
        fig._line.setRotation(Math.PI / 4);
      },
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'The |line| has |horizontal| and |vertical| components, that change with |rotation| |angle|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        rotation: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
        angle: coll.bindAccent(fig._real),
        horizontal: this.bindNext(colors.components, 'h'),
        vertical: this.bindNext(colors.components, 'v'),
        line: coll.bindAccent(fig._line),
      },
      show: [
        fig._line, fig._x, fig._real,
      ],
    });
    this.addSection(common, commonContent, {
      modifiers: {
        rotation: click(coll.gotoRotation, [coll, null, 0.8, null], colors.lines),
        angle: coll.bindAccent(fig._real),
        horizontal: coll.bindAccent(fig._h),
        vertical: coll.bindAccent(fig._v),
        line: coll.bindAccent(fig._line),
      },
      show: [
        fig._line, fig._x, fig._real,
      ],
      transitionFromPrev: (done) => {
        coll.resetRotation(() => {
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
        }, 0.8);
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
      setContent: style({ top: 0 }, 'Each component\'s length is |depends| on the |angle|. For example, a |larger_angle| makes the |vertical_component_longer|, while a |smaller_angle| makes it |shorter|.'),
    };
    this.addSection(common, commonContent, {
      modifiers: {
        smaller_angle: click(coll.gotoSmallAngle, [coll], colors.angles),
        larger_angle: click(coll.gotoLargeAngle, [coll], colors.angles),
        angle: coll.bindAccent(fig._real),
        vertical_component_longer: highlight(colors.components),
        shorter: highlight(colors.components),
      },
      show: [
        fig._line, fig._x, fig._real, fig._h, fig._v,
      ],
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
        fig._line, fig._x, fig._real, fig._h, fig._v,
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
        fig._line, fig._x, fig._real, fig._h, fig._v,
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
      setContent: 'When we |rotate| the line between |0º_to_90º|, we are actually forming |every possible combination of angles| for a right angle triangle.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        '0º_to_90º': click(coll.rotateFrom0To90, [coll], colors.angles),
        // angles: highlight(colors.angles),
      },
      show: [
        fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
      ],
    });

    // **********************************************************************
    // **********************************************************************
    // **********************************************************************
    commonContent = {
      setContent: 'This is because a a triangle\'s angles |sum_to_180º|, so when |one angle is 90º| then other two angles must be |less than 90º|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        sum_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      },
      show: [
        fig._line, fig._x, fig._real, fig._h, fig._v, fig._right,
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
