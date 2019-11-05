// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import DiagramCollection from './diagramCollection';
// import Definition from '../../../../../common/tools/definition';

const {
  style,
  click,
//   clickW,
//   highlight,
//   centerV,
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
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    // const fig = coll._fig;

    this.addSection({
      title: 'Similar Triangles',
      setContent: style({ top: 0 }, [
        '|Similar triangles| have |corresponding_sides| that are proportional (have the same |scaling| factor, shown as |s| in the diagram).',
        'All |similar triangles| have equal |corresponding_angles|, and all triangles with equal |corresponding_angles_| angles are |similar|.',
      ]),
      modifiers: {
        corresponding_angles: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_angles_: click(coll.pulseAngles, [coll, null], colors.angles),
        corresponding_sides: click(coll.pulseTriRSide, [coll, null], colors.sides),
      },
      setEnterState: () => {
        coll.setScenarios('default');
      },
      show: [coll._tri1, coll._tri2],
    });

    this.addSection({
      title: 'AA',
      setContent: style({}, [
        'If any triangles have |two_corresponding_angles| that are |equal|, then the triangles are |similar|. This is often called the |AA| similarity test.',
      ]),
      modifiers: {
        two_corresponding_angles: click(coll.toggleAa, [coll, true], colors.angles),
      },
      setEnterState: () => {
        coll.setScenarios('default');
        coll.aaCounter = 0;
      },
      show: [coll._tri1, coll._tri2],
      setSteadyState: () => {
        coll.toggleAa(false);
      },
    });

    this.addSection({
      title: 'SAS',
      setContent: style({}, [
        'If |any_triangles| have |two_corresponding_sides| that are proportional and share an |equal_angle| between those sides, then the triangles are |similar|. This is often called the |SAS| similarity test.',
      ]),
      modifiers: {
        any_triangles: click(coll.toggleSas, [coll, true], colors.diagram.action),
        two_corresponding_sides: click(coll.pulseAllSides, [coll], colors.sides),
        equal_angle: click(coll.pulseAllAngles, [coll], colors.angles),
      },
      setEnterState: () => {
        coll.setScenarios('default');
        coll.sasCounter = 0;
      },
      show: [coll._tri1, coll._tri2],
      setSteadyState: () => {
        coll.toggleSas(false);
      },
    });

    this.addSection({
      title: 'SSA',
      setContent: style({}, [
        'If |any_triangles| have |two_corresponding_sides| that are proportional and share a corresponding |equal_angle| adjacent to just one of the sides, then the triangles are |only similar| if the side |opposite| the angle is |greater than or equal to| the |adjacent| side. This is often called the |SSA| similarity test.',
      ]),
      modifiers: {
        any_triangles: click(coll.toggleSsa, [coll, true], colors.diagram.action),
        two_corresponding_sides: click(coll.pulseAllSides, [coll], colors.sides),
        equal_angle: click(coll.pulseAllAngles, [coll], colors.angles),
        adjacent: click(coll.pulseAdjacent, [coll], colors.sides),
        opposite: click(coll.pulseOpposite, [coll], colors.sides),
      },
      setEnterState: () => {
        coll.setScenarios('default');
        coll.ssaCounter = 0;
      },
      show: [coll._tri1, coll._tri2],
      setSteadyState: () => {
        coll.toggleSsa(false);
      },
    });
  }
}

export default Content;
