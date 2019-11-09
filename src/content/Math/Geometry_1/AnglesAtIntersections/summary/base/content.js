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
  click,
  style,
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
    const opp = diag._opposite;
    const three = diag._threeLines;

    this.addSection({
      title: 'Opposite Angles',
      setContent: style({ left: 5, right: 55, centerV: true }, [
        'When two lines intersect, four angles are created.',
        '|Opposite_angles| at the intersection are |equal|.',
      ]),
      modifiers: {
        Opposite_angles: click(opp.toggleOpposite, [opp], colors.angle1),
      },
      setEnterState: () => {
        opp._fig.setScenarios('summary');
        opp.setAngle(1, colors.angle1, 'a');
        opp.setAngle(2, colors.angle1, 'b');
        opp.setAngle(3, colors.angle1, 'a');
        opp.setAngle(4, colors.angle1, 'b');
      },
      show: [
        opp._fig._line1, opp._fig._line2,
      ],
      setSteadyState: () => {
        opp._fig._angle1.showAll();
        opp._fig._angle3.showAll();
        opp.updateAngles();
      },
    });

    this.addSection({
      title: 'Corresponding Angles',
      setContent: style({
        left: 5, right: 55, centerV: true, size: 0.9,
      }, [
        '|Corresponding_angles| are the angles in the same relative position at the intersection of |two_lines| and an |intersecting_line|.',
        'When the two lines are |parallel|, corresponding angles are always |equal|.',
        'Similarly, if corresponding angles are |equal|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Corresponding_angles: click(three.toggleCorresponding, [three], colors.angle1),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
      },
      setEnterState: () => {
        three.setScenarios('summary');
        three.setAngle('A1', colors.angle1, 'a');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'b');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'c');
        three.setAngle('C2', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'd');
        three.setAngle('D2', colors.angle1, 'd');
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three._fig._angleA1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Alternate Angles',
      setContent: style({
        left: 5, right: 55, size: 0.9, centerV: true,
      }, [
        '|Alternate_angles| are the pair of inside angles, or pair of outside angles that are on |opposite| sides of the |intersecting_line| that crosses |two_lines|.',
        'When the two lines are |parallel|, the alternate angles are always |equal|.',
        'Similarly, if alternate angles are |equal|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Alternate_angles: click(three.toggleAlternate, [three], colors.angle1),
        intersecting_line: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three.setScenarios('summary');
        three.setAngle('A1', colors.angle1, 'c');
        three.setAngle('A2', colors.angle1, 'a');
        three.setAngle('B1', colors.angle1, 'd');
        three.setAngle('B2', colors.angle1, 'b');
        three.setAngle('C1', colors.angle1, 'a');
        three.setAngle('C2', colors.angle1, 'c');
        three.setAngle('D1', colors.angle1, 'b');
        three.setAngle('D2', colors.angle1, 'd');
        three._fig._angleC1.showAll();
        three._fig._angleA2.showAll();
        three.updateIntersectingLineAngle();
      },
    });

    this.addSection({
      title: 'Interior Angles',
      setContent: style({
        left: 5, right: 55, size: 0.9, centerV: true,
      }, [
        '|Interior_angles| are the inside angles on the same side of the |intersecting| line that crosses |two_lines|.',
        'When the two lines are |parallel|, the interior angles always add to |180º|.',
        'Similarly, if interior angles |add to 180º|, then the two lines are always |parallel_|.',
      ]),
      modifiers: {
        Interior_angles: click(three.toggleInterior, [three], colors.angle1),
        intersecting: click(three.pulseIntersecting, [three], colors.intersectingLine),
        two_lines: click(three.pulseParallel, [three], colors.lines),
        parallel: click(three.pulseParallel, [three], colors.lines),
        parallel_: click(three.pulseParallel, [three], colors.lines),
      },
      show: [three._fig._line1, three._fig._line3, three._fig._line2],
      setSteadyState: () => {
        three.setScenarios('summary');
        three.setAngle('A2', colors.angle1, '180º – a');
        three.setAngle('B2', colors.angle1, '180º – b');
        three.setAngle('C1', colors.angle1, 'b');
        three.setAngle('D1', colors.angle1, 'a');
        three._fig._angleA2.showAll();
        three._fig._angleD1.showAll();
        three.updateIntersectingLineAngle();
      },
    });
  }
}

export default Content;
