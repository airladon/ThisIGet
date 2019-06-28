// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
// import Definition from '../../../../../LessonsCommon/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  // style,
  click,
  // clickW,
  // highlight,
  // centerV,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/PointLineDistance/base',
      'Math/Geometry_1/RectanglesAndSquares/base',
      'Math/Geometry_1/RelatedAngles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const fig = coll._fig;
    const topLine = fig._topLine;
    const bottomLine = fig._bottomLine;
    const point = fig._point;
    const leftLine = fig._leftLine;
    const rightLine = fig._rightLine;
    const bottomLeftAngle = fig._bottomLeftAngle;
    const topLeftAngle = fig._topLeftAngle;
    const bottomRightAngle = fig._bottomRightAngle;
    const topRightAngle = fig._topRightAngle;
    const topRightAngleInside = fig._topRightAngleInside;
    const bottomRightAngleInside = fig._bottomRightAngleInside;
    const middleLine = fig._middleLine;
    const topMiddleAngle = fig._topMiddleAngle;
    const bottomMiddleAngle = fig._bottomMiddleAngle;

    const common = {
      setEnterState: () => {
        coll.resetColors();
        point.setScenario('left');
      },
    };

    this.addSection(common, {
      title: 'Distance',
      setContent: [
        'Similar to the distance between a |point_and_a_line|, the distance between two parallel lines is the |smallest distance| between them.',
      ],
      modifiers: {
        point_and_a_line: this.qr('Math/Geometry_1/PointLineDistance/base/Main'),
        perpendicular_line: this.bindNext(colors.points),
      },
      show: [topLine, bottomLine],
    });

    let content = {
      setContent: 'To see if there are any special |properties| of this distance, we start by selecting a |point| on one of the lines.',
    };
    this.addSection(common, content, {
      title: 'Distance Properties',
      show: [topLine, bottomLine],
      modifiers: {
        point: this.bindNext(colors.points),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        point: click(coll.pulsePoint, [coll, null], colors.points),
      },
      show: [topLine, bottomLine, point],
      transitionFromPrev: (done) => {
        coll.pulsePoint(done);
      },
    });

    content = {
      setContent: 'Now we know from the distance between a |point_and_a_line|, that the shortest distance is the |perpendicular_line|.',
    };
    this.addSection(common, content, {
      show: [topLine, bottomLine, point],
      modifiers: {
        point_and_a_line: this.qr('Math/Geometry_1/PointLineDistance/base/Main'),
        perpendicular_line: this.bindNext(colors.points),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        point_and_a_line: this.qr('Math/Geometry_1/PointLineDistance/base/Main'),
        perpendicular_line: click(coll.pulseLeft, [coll, null], colors.points),
      },
      show: [topLine, bottomLine, point, leftLine, bottomLeftAngle],
      transitionFromPrev: (done) => {
        coll.pulseLeft(done);
      },
    });

    content = {
      setContent: 'As |interior_angles| between parallel lines add to |180º|, we can see this line is actually |perpendicular| to both |parallel_lines|.',
    };
    this.addSection(common, content, {
      show: [topLine, bottomLine, point, leftLine, bottomLeftAngle],
      modifiers: {
        interior_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Interior'),
        perpendicular: this.bindNext(colors.angles),
        parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.lines),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        interior_angles: this.qr('Math/Geometry_1/RelatedAngles/base/Interior'),
        perpendicular: click(coll.pulseTopLeftAngle, [coll, null], colors.angles),
        parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.lines),
      },
      show: [
        topLine, bottomLine, point, leftLine, bottomLeftAngle,
        topLeftAngle,
      ],
      transitionFromPrev: (done) => {
        coll.pulseTopLeftAngle(done);
      },
    });

    content = {
      setContent: 'Now the initial point could have been drawn |anywhere|, and the same process followed.',
    };
    this.addSection(common, content, {
      show: [
        topLine, bottomLine, point, leftLine, bottomLeftAngle,
        topLeftAngle,
      ],
      modifiers: {
        anywhere: this.bindNext(colors.points),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        anywhere: click(coll.pulseRightLineAndAngles, [coll, null], colors.points),
      },
      show: [
        topLine, bottomLine, point, leftLine, bottomLeftAngle,
        topLeftAngle,
      ],
      transitionFromPrev: (done) => {
        point.animations.cancelAll();
        point.animations.new()
          .scenario({ target: 'right', duration: 1.5 })
          .trigger({
            callback: coll.pulseRightLineAndAngles.bind(coll),
            duration: 1,
          })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        point.setScenario('right');
        rightLine.showAll();
        topRightAngle.showAll();
        bottomRightAngle.showAll();
      },
    });

    content = {
      setContent: 'While we have drawn the perpendicular line\'s angles on the right, we could just as easily have drawn them on the |left|.',
    };
    this.addSection(common, content, {
      show: [
        topLine, bottomLine, leftLine, bottomLeftAngle,
        topLeftAngle, rightLine, topRightAngle, topLeftAngle,
        bottomRightAngle,
      ],
      modifiers: {
        left: this.bindNext(colors.angles),
      },
    });
    this.addSection(common, content, {
      modifiers: {
        left: click(coll.pulseInsideAngles, [coll, null], colors.angles),
      },
      show: [
        topLine, bottomLine, leftLine, bottomLeftAngle,
        topLeftAngle, bottomRightAngleInside, topRightAngleInside,
        rightLine,
      ],
      transitionFromPrev: (done) => {
        coll.pulseInsideAngles(done);
      },
    });

    content = {
      setContent: 'A |four_sided_shape| where all angles are right angles is a |rectangle|, and has the properties of |opposite sides are parallel and equal|.',
    };
    this.addSection(common, content, {
      show: [
        topLine, bottomLine, leftLine, bottomLeftAngle,
        topLeftAngle, rightLine, bottomRightAngleInside, topLeftAngle,
        topRightAngleInside,
      ],
      modifiers: {
        four_sided_shape: click(coll.pulseRectangle, [coll, null], colors.rectangle),
        rectangle: this.qr('Math/Geometry_1/RectanglesAndSquares/base/Rectangle'),
      },
    });

    content = {
      setContent: 'This can be done for |any points|, so |any pair| of |perpendicular_lines| between the |parallel_lines| will have the |same length|.',
    };
    this.addSection(common, content, {
      show: [
        topLine, bottomLine, leftLine, bottomLeftAngle,
        topLeftAngle, rightLine, bottomRightAngleInside, topLeftAngle,
        topRightAngleInside,
      ],
      modifiers: {
        perpendicular_lines: click(coll.pulsePerpendicularLines, [coll, null], colors.distance),
        parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.lines),
      },
    });

    this.addSection({
      title: 'Summary',
      setContent: [
        'We can therefore conclude that the distance between |parallel_lines| is the length of a |line_perpendicular| to both lines, and is |constant| everywhere along the lines.',
      ],
      show: [
        topLine, bottomLine, middleLine, topMiddleAngle, bottomMiddleAngle,
      ],
      modifiers: {
        line_perpendicular: click(coll.pulseMiddleLineAndAngles, [coll], colors.distance),
        parallel_lines: click(coll.pulseParallelLines, [coll, null], colors.lines),
      },
    });
  }
}

export default Content;
