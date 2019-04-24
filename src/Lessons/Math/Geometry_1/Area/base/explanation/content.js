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
  click,
  style,
  centerV,
  highlight,
  highlightWord,
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
    const examples = coll._examples;
    const meas = coll._measure;
    const unit = coll._unitShape;
    const shapes = coll._shapes;

    this.addSection({
      title: 'Introduction',
      setContent: centerV([
        'Shape properties examined so far include |side lengths|, |angle sizes|, |width| (like diameter of a circle), |perimeter| (like the circumference of a circle), and the |relationships| between them.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        'Another important property of shapes is |how much space they take up|.',
        'For instance, if you want to |cover| a |large rectangle wall| with |small square tiles|, then the amount of space the two shapes take up will tell you |how many| tiles you will need.',
      ]),
    });

    this.addSection({
      setContent: centerV([
        'This property is named |area|.',
        'The word was originally |Latin| where it means a |vacant piece of level ground|. In the mid 16th century, the word was used to describe a |space allocated for a specific purpose|. And so today, we use it to describe |how much space a shape takes up|.',
      ]),
    });

    this.addSection({
      setContent: [
        'Shapes with |large_area| take up more space than shapes with |small_area|.',
      ],
      modifiers: {
        large_area: highlight(colors.example1),
        small_area: highlight(colors.example2),
      },
      show: [examples._largeSquare, examples._smallSquare],
    });

    let common = {
      setContent: 'Area is a property that any shape can have. So |circles| with |large_area|, take up more space than |squares| with |small_area|.',
      modifiers: {
        large_area: highlight(colors.example1),
        circles: highlight(colors.example1),
        small_area: highlight(colors.example2),
        squares: highlight(colors.example2),
      },
    };
    this.addSection(common, {
      show: [examples._largeSquare, examples._smallSquare],
    });
    this.addSection(common, {
      show: [examples._largeCircle, examples._smallSquare],
    });

    this.addSection({
      setContent: centerV([
        '|Area| is a property that has now been |identified| and |named|.',
        'How can we |measure| it?',
      ]),
    });

    this.addSection({
      setContent: [
        'Well, |length| is measured by counting |reference lengths|.',
        'A |line| of length |4 meters|, has four |_1_meter| reference lengths.',
      ],
      modifiers: {
        _1_meter: highlight(colors.measure),
        line: click(coll.pulseMeasureLine, [coll], colors.sides),
      },
      show: [meas._length],
    });

    this.addSection({
      setContent: [
        '|Angle| is measured by counting |reference angles|.',
        'An angle of |_60deg|, has sixty |_1deg| reference angles.',
      ],
      modifiers: {
        _60deg: highlightWord('60º', colors.angles),
        _1deg: highlightWord('1º', colors.measure),
      },
      show: [
        meas._angle,
      ],
    });

    this.addSection({
      setContent: [
        'Similarly, |area| is measured by counting |reference areas|.',
      ],
      show: [meas._area, shapes._circle, shapes._square, shapes._triangle],
    });

    this.addSection({
      setContent: [
        'But what |shape| should the reference area be?',
      ],
      modifiers: {
        shape: click(coll.toggleGrid, [coll], colors.diagram.action),
      },
      show: [shapes._circle, shapes._square, shapes._triangle, unit._grid],
    });

    this.addSection({
      setContent: [
        'There are |many| shapes to choose from, but some will be more |convenient| than others.',
      ],
      show: [shapes._circle, shapes._square, shapes._triangle, unit._grid],
    });
    this.addSection({
      setContent: [
        'A |circle| reference shape has |gaps| when stacked. It would be more convenient to have a shape that can stack |without gaps|.',
      ],
      show: [shapes._circle, shapes._square, shapes._triangle, unit._circleGrid],
    });

    this.addSection({
      setContent: [
        'This shape can be stacked without gaps, but its |curves| make it hard to work with. Selecting a shape that is |simple|, |symmetric| and |easy to analyze| will be more convenient.',
      ],
      show: [shapes._circle, shapes._square, shapes._triangle, unit._genericGrid],
    });

    this.addSection({
      setContent: [
        'A square can be |stacked without gaps|, is |symmetric|, |simple| and |easy to analyze|. It is more convenient than other shapes including triangles.',
      ],
      show: [shapes._circle, shapes._square, shapes._triangle, unit._grid],
    });

    this.addSection({
      setContent: [
        'Therefore |area| is most commonly measured in |squares|.',
      ],
      show: [shapes, unit._grid],
      setSteadyState: () => {
        coll.setAreaToSquares();
      },
    });

    this.addSection({
      setContent: centerV([
        'What |size| are the |reference squares| used to measure area?',
        'Similar to |length|, there are several common sizes used depending on the size of the shape you are measuring.',
      ]),
    });
  }
}

export default Content;
