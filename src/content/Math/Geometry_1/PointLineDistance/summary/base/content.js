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
    const fig = coll._fig;

    this.addSection({
      setContent: style({ size: 0.9 }, [
        'The distance between a |point| and a |line| is the |shortest distance|. When the |point_| is closest to a |line_end|, then the distance is between the |point_and_line_end|. When the |point__| is |not closest| to a line end, then the shortest distance is the |perpendicular_line| between |point___| and |line_|. ',
      ]),
      modifiers: {
        point: click(coll.pulsePoints, [coll], colors.points),
        point_: click(coll.pulsePointEnd, [coll], colors.points),
        point__: click(coll.pulsePoint, [coll], colors.points),
        point___: click(coll.pulsePoint, [coll], colors.points),
        line: click(coll.pulseLine, [coll], colors.lines),
        line_: click(coll.pulseLine, [coll], colors.lines),
        perpendicular_line: click(coll.pulsePerpendicularLabel, [coll, null], colors.distance),
        point_and_line_end: click(coll.pulseDistanceEnd, [coll], colors.distance2),
        line_end: click(coll.pulseEnd, [coll], colors.lines),
      },
      setEnterState: () => {
        fig.setScenario('low');
        fig._point.setScenario('default');
        coll.padUpdated();
        coll.hypotPadUpdated();
      },
      show: [
        fig._point, fig._line, fig._perpendicular, fig._rightAngle,
        fig._pointEnd, fig._distanceEnd, fig._end,
      ],
    });
  }
}

export default Content;
