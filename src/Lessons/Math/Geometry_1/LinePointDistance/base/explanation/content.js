// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from '../common/layout';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  // style,
  click,
  // clickW,
  highlight,
  // centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    // this.loadQRs([
    //   'qr_names_here',
    // ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;

    this.addSection({
      title: 'Introduction',
      setContent: 'It is often necessary to find the |distance| between a |point| and a |line|.',
      modifiers: {
        point: click(coll.pulsePoint, [coll], colors.points),
        line: click(coll.pulseLine, [coll], colors.lines),
        distance: highlight(colors.distance),
      },
      show: [fig._point, fig._line],
    });

    this.addSection({
      setContent: 'But from |where| on the line do you measure the distance?',
      modifiers: {
        where: click(coll.moveMeasurement, [coll, null, null], colors.distance),
      },
      show: [fig._point, fig._line, fig._distance],
      transitionFromPrev: (done) => {
        fig._distance._pad.setScenario('default');
        coll.moveMeasurement(0.5, done);
      },
      setSteadyState: () => {
        fig._distance._pad.setPosition(layout.mid.add(0.5, 0));
      },
    });

    this.addSection({
      setContent: 'The most common way is to define the distance as the |shortest| possible distance between the point and the line.',
      modifiers: {
        shortest: click(coll.moveMeasurement, [coll, 0, null], colors.distance),
      },
      show: [fig._point, fig._line, fig._distance],
      transitionFromPrev: (done) => {
        coll.moveMeasurement(0, done);
      },
      setSteadyState: () => {
        fig._distance._pad.setPosition(layout.mid);
      },
    });

    this.addSection({
      setContent: 'Are their any |relationships| between the point and line at the |shortest| distance?',
      modifiers: {
        shortest: click(coll.moveMeasurement, [coll, 0, null], colors.distance),
      },
      show: [fig._point, fig._line, fig._distance],
      transitionFromPrev: (done) => {
        coll.moveMeasurement(0, done);
      },
      setSteadyState: () => {
        fig._distance._pad.setPosition(layout.mid);
      },
    });

    let content = {
      setContent: 'To investigate this, lets start by |drawing_a_line| connecting the |point| to the |original_line| at a |right_angle|.',
    };
    this.addSection(content, {
      show: [fig._point, fig._line],
      modifiers: {
        drawing_a_line: this.bindNext(colors.distance),
        point: click(coll.pulsePoint, [coll], colors.points),
        original_line: click(coll.pulseLine, [coll], colors.lines),
        right_angle: this.bindNext(colors.distance),
      },
    });
    this.addSection(content, {
      modifiers: {
        drawing_a_line: click(coll.drawPerpendicular, [coll, null], colors.distance),
        point: click(coll.pulsePoint, [coll], colors.points),
        original_line: click(coll.pulseLine, [coll], colors.lines),
        right_angle: click(coll.pulseRightAngle, [coll], colors.distance),
      },
      show: [fig._point, fig._line, fig._perpendicular._line, fig._rightAngle],
      transitionFromPrev: (done) => {
        coll.drawPerpendicular(done);
      },
    });

    content = {
      setContent: 'Lets label this line |d|.',
    };
    this.addSection(content, {
      modifiers: {
        d: this.bindNext(colors.distance),
      },
      show: [fig._point, fig._line, fig._perpendicular._line, fig._rightAngle],
    });
    this.addSection(content, {
      modifiers: {
        d: click(coll.pulsePerpendicularLabel, [coll], colors.distance),
      },
      show: [fig._point, fig._line, fig._perpendicular, fig._rightAngle],
      transitionFromPrev: (done) => {
        coll.pulsePerpendicularLabel(done);
      },
    });
  }
}

export default Content;
