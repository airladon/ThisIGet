// @flow
import Fig from 'figureone';
import {
  LessonContent, interactiveItem,
} from '../../../../../js/Lesson/LessonContent';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import DiagramCollection from './diagramCollection';
import lessonLayout from './layout';
import imgLink from '../tile.png';
import imgLinkGrey from '../tile-grey.png';
import details from '../details';

const {
  click, centerV, highlight, highlightWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends LessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const shapes = diag._shapes;
    const meas = diag._measure;
    const size = diag._size;
    const rect = diag._rect;

    const mods = {
      m: highlight(colors.unit),
    };
    rect.eqns.rectEqn.changeDescription('0', 'Rectangle area is product of width and height.', mods);
    rect.eqns.rectEqn.changeDescription('1', 'Expand both 6|m| and 10|m| as 6|m| is the same as saying 6 lots of 1|m|.', mods);
    rect.eqns.rectEqn.changeDescription('2', 'Reorder equation so all |m| terms are on the right.', mods);
    rect.eqns.rectEqn.changeDescription('3', 'Calculate 6 ⨉ 10', mods);
    rect.eqns.rectEqn.changeDescription('4', 'Replace 6 ⨉ 10 with calculated result', mods);
    rect.eqns.rectEqn.changeDescription('5', 'Multiplying anything by 1 doesn\'t change the result.', mods);
    rect.eqns.rectEqn.changeDescription('6', 'Simplify by removing 1s', mods);
    rect.eqns.rectEqn.changeDescription('7', 'Multiplying something by itself is the same as squaring it.', mods);
    rect.eqns.rectEqn.changeDescription('8', 'Resulting area of rectangle', mods);

    const common = {
      setContent: [],
      setInfo: '',
      modifiers: {},
      infoModifiers: {},
      setEnterState: () => {},
      showOnly: [],
      show: [],
      hide: [],
      setSteadyState: () => {},
      setLeaveState: () => {},
    };
    this.addSection(common, {
      title: 'Introduction',
      setContent: centerV(`
        <p>Shape properties examined so far include |side lengths|, |angle sizes|, |width| (like diameter of a circle) and the |relationships| between them.<p>
      `),
    });

    this.addSection(common, {
      setContent: centerV(`
        <p>
          Another important property of shapes is |how much space they take up|.
        </p>
        <p>
          For instance, if you want to |cover| a |large rectangle wall| with |small square tiles|, then the amount of space the two shapes take up will tell you |how many| tiles you will need.
        </p>
      `),
    });
    this.addSection(common, {
      setContent: centerV(`
        <p>
          This property is named |area|.
        </p>
        <p>
          The word was originally |Latin| where it means a |vacant piece of level ground|. In the mid 16th century, the word was used to describe a |space allocated for a specific purpose|. And so today, we use it to describe |how much space a shape takes up|.
        </p>
      `),
    });
    this.addSection(common, {
      setContent: [
        'Shapes with |large_area| take up more space than shapes with |small_area|.',
      ],
      modifiers: {
        large_area: highlight(colors.square1),
        small_area: highlight(colors.square2),
      },
      showOnly: [
        shapes, shapes._square1, shapes._square2,
      ],
    });
    this.addSection(common, {
      setContent: [
        'Area is a property that any shape can have. So circles with |large_area|, take up more space than squares with |small_area|.',
      ],
      modifiers: {
        large_area: highlight(colors.square1),
        small_area: highlight(colors.square2),
      },
      showOnly: [
        shapes, shapes._circle, shapes._square2,
      ],
    });
    this.addSection(common, {
      title: 'Measurement',
      setContent: centerV(`
        <p>
          |Area| is a property that has now been |identified| and |named|.
        </p>
        <p>
          How can we |measure| it?
        </p>
      `),
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Measure
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common.showOnly = [meas];
    this.addSection(common, {
      setContent: [
        'Well, |length| is measured by counting |reference lengths|.',
        'A line of length |_4_meters|, has four |_1_meter| reference lengths.',
      ],
      modifiers: {
        _4_meters: highlight(colors.line),
        _1_meter: highlight(colors.reference),
      },
      show: [
        meas._length,
      ],
    });
    this.addSection(common, {
      setContent: [
        '|Angle| is measured by counting |reference angles|.',
        'An angle of |_60deg|, has sixty |_1deg| reference angles.',
      ],
      modifiers: {
        _60deg: highlightWord('60º', colors.line),
        _1deg: highlightWord('1º', colors.reference),
      },
      show: [
        meas._angle,
      ],
    });
    this.addSection(common, {
      setContent: [
        'Similarly, |area| is measured by counting |reference areas|.',
      ],
      show: [
        meas._squareGrid, meas._squareA,
        meas._circleA, meas._triangleA,
      ],
    });
    this.addSection(common, {
      setContent: [
        'But what reference |shape| should be used?',
      ],
      modifiers: {
        shape: click(meas.toggleGrid, [meas], colors.diagram.action),
      },
      setInfo: `<ul>
          <li>Touch |shape| to see different examples of reference shapes.</li>
          </ul>
      `,
      infoModifiers: {
        shape: highlight(colors.diagram.action),
      },
      show: [
        meas._squareGrid, meas._squareA,
        meas._circleA, meas._triangleA,
      ],
    });
    this.addSection(common, {
      setContent: [
        'There are many shapes to choose from, but some will be more |convenient| to use.',
      ],
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid,
      ],
    });

    common.setContent = [
      'For instance, selecting a shape that |completely fills in space| without gaps is needed to fully cover a space.',
      '|Circles can only be stacked with gaps|, and is therefore not the best choice.',
    ];
    this.addSection(common, {
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid,
      ],
    });
    this.addSection(common, {
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid, meas._crossCircle,
      ],
    });

    common.setContent = [
      'Selecting a shape that is |simple|, |symmetric| and |easy to analyze| will also be more convenient.',
      'The |curves| and |lack of symmetry| of the wavy shape will make it |harder| to work with.',
    ];
    this.addSection(common, {
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid, meas._crossCircle,
      ],
    });
    this.addSection(common, {
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid, meas._crossCircle,
        meas._crossGeneric,
      ],
    });

    this.addSection(common, {
      setContent: [
        'While this is only comparing a square to two other shapes, doing a similar analysis with any other shapes would still result in |squares as the most convenient shape|.',
      ],
      show: [
        meas._smallSquareGrid, meas._smallGenericGrid,
        meas._smallCircleGrid, meas._crossCircle,
        meas._crossGeneric,
      ],
    });

    this.addSection(common, {
      setContent: [
        'Therefore |area| is most often measured in |squares|.',
      ],
      show: [
        meas._squareGrid, meas._squareA,
        meas._circleA, meas._triangleA,
        meas._triLabel, meas._squareLabel, meas._circleLabel,
      ],
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Size
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common.showOnly = [size];
    this.addSection(common, {
      setContent: centerV(`
        <p>
          What |size| are the |reference squares| used to measure area?
        </p>
        <p>
          Similar to |length|, there are several common sizes used depending on the size of the shape you are measuring.
        </p>
        `),
    });
    this.addSection(common, {
      setContent: [
        'A square with side |1mm| would be used for small areas, like the size of silicon chips. This square is normally called a |square millimeter|',
      ],
      show: [
        size._mm,
      ],
    });
    this.addSection(common, {
      setContent: [
        'A square with side |1m| would be used for larger areas, like a house. This square is normally called a |square meter|.',
      ],
      show: [
        size._m,
      ],
    });

    this.addSection(common, {
      setContent: centerV([
        'A |reference square| is typically a |unit square|.',
        'This means its |side has a length of 1|.',
        'For example, a reference square would normally have a side length of |1m|, and |not 2m|.',
      ]),
    });

    common.showOnly = [size, size._row, size._row._grid];
    common.show = [size._row._square0];
    this.addSection(common, {
      setContent: [
        'A |unit reference square| makes it easy to |relate number of squares and length|.',
      ],
    });

    common.setContent = ['In this case, there are |four squares| with |1mm side| length, and therefore the total length is |4mm|.'];
    this.addSection(common);
    common.showOnly = [size];
    common.show = [size._row];
    this.addSection(common);
    this.addSection(common, {
      setContent: ['Therefore, the |number of squares| in a row, will be |equal| to the total |length| of the row.'],
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Rectangle
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    common.showOnly = [rect];
    this.addSection(common, {
      title: 'Rectangle',
      setContent: centerV(`
        <p>
          We can now examine the |area| of a |rectangle| and |square| and see if it is |related| to any other properties of the shape.
        </p>
        `),
    });

    common.show = [rect._grid, rect._line];
    this.addSection(common, {
      setContent: [
        'Using reference squares to measure area makes it particularly convenient to examine the |area of a rectangle|.',
      ],
    });

    this.addSection(common, {
      setContent: [
        'In this case, there are |six_rows| of |ten_squares|.',
      ],
      modifiers: {
        six_rows: click(rect.toggleRow, [rect, null], colors.row),
        ten_squares: click(rect.toggleRow, [rect, null], colors.row),
      },
      setInfo: `<ul>
          <li>Touch |six_rows| or |ten_squares| to highlight the rows.</li>
          </ul>
      `,
      infoModifiers: {
        six_rows: highlight(colors.row),
        ten_squares: highlight(colors.row),
      },
      setSteadyState: () => {
        rect.rowIndex = 5;
      },
    });

    this.addSection(common, {
      setContent: [
        'Therefore, the area of a rectangle can be calculated:',
      ],
      setSteadyState: () => {
        rect.eqns.simpleRectEqn.showForm('0');
      },
    });

    common.setContent = [
      '|Area| is calculated by |multiplying the number of squares| for two |adjacent sides|.',
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect.eqns.simpleRectEqn.showForm('0');
      },
    });

    common.show = [rect._grid, rect._line, rect._sideA, rect._sideB];
    this.addSection(common, {
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('0');
      },
    });

    common.setContent = [
      'We know the |number of squares| in a side |equals| the side\'s |length|.',
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('0');
      },
    });

    this.addSection(common, {
      transitionFromPrev: (done) => {
        rect.eqns.numSquaresEqn.showForm('0');
        rect.eqns.numSquaresEqn.getForm('1')
          .animatePositionsTo(0, 0.5, 1, 0.5, done);
      },
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('1');
      },
    });

    this.addSection(common, {
      setContent: [
        'So the area of a rectangle is also equal to the product of |two adjacent side lengths|.',
      ],
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('1');
      },
    });

    this.addSection(common, {
      setContent: [
        '|Length| is usually assumed, and so it can be removed from the equation for simplicity.',
      ],
      transitionFromPrev: (done) => {
        rect.eqns.numSquaresEqn.showForm('1');
        rect.eqns.numSquaresEqn.getForm('2')
          .animatePositionsTo(0, 0.5, 1, 0.5, done);
      },
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('2');
      },
    });

    common.setContent = [
      'Often, a rectangle\'s sides are renamed to be something more |intuitive|. For example maybe |width| and |height| for this case.',
    ];
    this.addSection(common, {
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('2');
      },
    });
    common.show = [rect._grid, rect._line, rect._sideWidth, rect._sideHeight];
    this.addSection(common, {
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('2');
      },
    });
    common.setContent = [
      'And so the area of a rectangle is the multiple of its |width| and |height|.',
    ];
    this.addSection(common, {
      transitionFromPrev: (done) => {
        rect.eqns.numSquaresEqn.showForm('2');
        rect.eqns.numSquaresEqn.getForm('3')
          .animatePositionsTo(0, 0.5, 1, 0.5, done);
      },
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('3');
      },
    });

    this.addSection(common, {
      setContent: ['We have found a |relationship| between a rectangle\'s |area| and its |side lengths|.'],
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('3');
      },
    });

    this.addSection(common, {
      setContent: ['If you |know two| of the three properties, you can |calculate the third|.'],
      setSteadyState: () => {
        rect.eqns.numSquaresEqn.showForm('3');
      },
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Area Units
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    this.addSection({
      title: 'Area Units',
      setContent: centerV([
        'So we know that |area of a rectangle| is the |product of two adjacent side lengths|.',
        'We also know area is measured in |reference squares|, that can have a specific side length such as |meters|.',
        'We can put these together to understand how the units for area are |normally written|.',
      ]),
    });

    common.show = [rect._grid, rect._line, rect._side6m, rect._side10m];
    this.addSection(common, {
      setContent: [
        'Lets assume the reference squares have |1m side| length. Therefore the rectangle\'s |height| is |6m| and |width| is |10m|.',
      ],
    });

    this.addSection(common, {
      setContent: [
        'Now we can |calculate area| and then rearrange the equation to see the |units| of area.',
      ],
      setInfo: `<ul>
          <li>Touch equation, the equation's right arrow or the NEXT text under the equation to progress forwards.</li>
          <li>Touch equation's left arrow to go to previous step.</li>
          </ul>
      `,
      interactiveElements: [
        interactiveItem(rect._rectEqn.next),
        interactiveItem(rect._rectEqn.nextDescription),
        interactiveItem(rect._rectEqn.prev),
      ],
      setSteadyState: () => {
        rect._rectEqn.showForm('0');
      },
    });

    this.addSection(common, {
      setContent: [
        'So the short hand way of writing units is to use the mathematical |square notation|.',
      ],
      setSteadyState: () => {
        rect.eqns.simpleUnitsEqn.showForm('0');
      },
    });

    this.addSection(common, {
      setContent: [
        'If the reference squares have side length |1m|, then we would say the area unit is |meters squared| or |m<sup>2</sup>|.',
      ],
      setSteadyState: () => {
        rect.eqns.simpleUnitsEqn.showForm('0');
      },
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Square
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    this.addSection(common, {
      title: 'Square',
      setContent: [
        'As a |square| is a special type of rectangle, so area can be calculated the same way. |Adjacent sides are multiplied|.',
      ],
      show: [rect._gridSquare, rect._square, rect._sideSquareA, rect._sideSquareB],
      setSteadyState: () => {
        rect.eqns.squareEqn.showForm('0');
      },
    });
  }
}

export default Content;
