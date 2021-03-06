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
  click,
  // style,
  centerV,
  highlight,
  highlightWord,
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
    const rect = coll._rectangle;
    const square = coll._square;
    const eqn = coll._eqn;
    const nav = coll._nav;

    const mods = {
      m: highlight(colors.highlight),
      m2: highlightWord('m<sup>2</sup>', colors.highlight),
    };
    // eqn.changeDescription('10', 'Rectangle area is product of width and height.', mods);
    eqn.changeDescription('11', 'Expand both 6|m| and 10|m| as 6|m| is the same as saying 6 lots of 1|m|.', mods);
    eqn.changeDescription('12', 'Reorder equation so all |m| terms are on the right.', mods);
    eqn.changeDescription('13', 'Calculate 6 x 10 and remove redundant 1s.', mods);
    eqn.changeDescription('14', ' Calculate 6 x 10 and remove redundant 1s.', mods);
    eqn.changeDescription('15', 'Multiplying something by itself is the same as squaring it.', mods);
    // eqn.changeDescription('16', 'Resulting area of rectangle has units of |m2|.', mods);

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

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Measurement
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    this.addSection({
      title: 'Measurement',
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
      show: [
        shapes._circle, shapes._square, shapes._triangle, unit._grid,
        shapes._circleLabel, shapes._squareLabel, shapes._triangleLabel,
      ],
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

    this.addSection({
      setContent: [
        'A square with side |1mm| would be used for small areas, like the size of silicon chips. This square is normally called a |square millimeter|.',
      ],
      show: [unit._mmSquare],
    });

    this.addSection({
      setContent: [
        'A square with side |1m| would be used for larger areas, like a house. This square is normally called a |square meter|.',
      ],
      show: [unit._mSquare],
    });

    this.addSection({
      setContent: centerV([
        'A |reference square| is typically a |unit square|.',
        'This means its |side has a length of 1|.',
        'For example, a reference square would normally have a side length of |1m|, and |not 2m|.',
      ]),
    });

    this.addSection({
      setContent: [
        'A |unit reference square| makes it easy to |relate number of squares and length|.',
      ],
      show: [unit._squareLength._squares, unit._squareLength._unitDimension],
    });

    this.addSection({
      setContent: [
        'In this case, there are |four squares| with |1mm side| length, and therefore the total length is |4mm|.',
      ],
      show: [unit._squareLength],
    });

    this.addSection({
      setContent: [
        'Therefore, the |number of squares| in a row, will be |equal| to the total |length| of the row.',
      ],
      show: [unit._squareLength],
    });

    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    // Rectangle
    // ******************************************************************
    // ******************************************************************
    // ******************************************************************
    this.addSection({
      title: 'Rectangle',
      setContent: [
        'We can now examine the |area| of a |rectangle| and |square| and see if it is |related| to any other properties of the shape.',
      ],
      show: [rect._grid, rect._line],
    });

    this.addSection({
      setContent: [
        'Using reference squares to measure area makes it particularly convenient to examine the |area of a rectangle|.',
      ],
      show: [rect._grid, rect._line],
    });

    this.addSection(common, {
      setContent: [
        'In this case, there are |six_rows| of |ten_squares|.',
      ],
      modifiers: {
        six_rows: click(coll.toggleRow, [coll], colors.row),
        ten_squares: click(coll.toggleRow, [coll], colors.row),
      },
      show: [rect._grid, rect._line],
      setSteadyState: () => {
        coll.row = 5;
      },
    });

    common = {
      show: [rect._grid, rect._line],
      setEnterState: () => {
        eqn.setScenario('top');
      },
    };
    this.addSection(common, {
      setContent: [
        'Therefore, the area of a rectangle can be calculated:',
      ],
      setSteadyState: () => {
        eqn.showForm('0');
      },
    });

    let content = {
      setContent:
        '|Area| is calculated by |multiplying the number of squares| for two |adjacent sides|.',
    };
    this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, content, {});
    this.addSectionEqnStep({
      eqn, from: '0', to: '1', duration: 0, animate: 'dissolve',
    }, common, content, {
      show: [rect._grid, rect._line, rect._labelA, rect._labelB],
    });

    common = {
      show: [rect._grid, rect._line, rect._labelA, rect._labelB],
      setEnterState: () => {
        eqn.setScenario('top');
      },
    };
    content = {
      setContent:
        'We know the |number of squares| in a side |equals| the side\'s |length|.',
    };
    this.addSectionEqnStep({ eqn, from: '1', to: '1' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '2', to: '3' }, common, content, {});

    content = {
      setContent:
        'So the area of a rectangle is also equal to the product of |two adjacent side lengths|.',
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});

    content = {
      setContent:
        'The word |length| is usually assumed, and so it can be removed from the equation for simplicity.',
    };
    this.addSectionEqnStep({ eqn, from: '3', to: '3' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, content, {});

    content = {
      setContent:
        'Often, a rectangle\'s sides are renamed to be something more |intuitive|. For example maybe |width| and |height| for this case.',
    };
    this.addSectionEqnStep({ eqn, from: '4', to: '4' }, common, content, {});
    this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, content, {
      show: [rect._grid, rect._line, rect._labelWidth, rect._labelHeight],
    });
    this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, content, {
      show: [rect._grid, rect._line, rect._labelWidth, rect._labelHeight],
    });

    common = {
      show: [rect._grid, rect._line, rect._labelWidth, rect._labelHeight],
      setSteadyState: () => {
        eqn.setScenario('top');
        eqn.showForm('6');
      },
    };
    this.addSection(common, {
      setContent:
        'And so the area of a rectangle is the multiple of its |width| and |height|.',
    });
    this.addSection(common, {
      setContent:
        'We have found a |relationship| between a rectangle\'s |area| and its |side lengths|.',
      modifiers: {
        area: highlight(colors.highlight),
      },
    });
    this.addSection(common, {
      setContent:
        'If you |know two| of the three properties, you can |calculate the third|.',
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

    common = {
      show: [rect._grid, rect._line, rect._label10, rect._label6, coll._nav],
      setSteadyState: () => {
        eqn.setScenario('top');
        nav.setScenario('nav');
      },
    };

    content = {
      setContent: 'Lets assume the reference squares have |1m side| length. Therefore the rectangle\'s |height| is |6m| and |width| is |10m|.',
    };
    this.addSectionEqnStep({ eqn: nav, from: '10', to: '10' }, common, content, {});
    content = {
      setContent: 'We can |simplify| and |rearrange| this equation to find the units of area.',
    };
    this.addSectionEqnStep({ eqn: nav, from: '10', to: '10' }, common, content, {});
    content = { setContent: '' };
    this.addSectionEqnStep({ eqn: nav, from: '10', to: '11' }, common, content, {});
    this.addSectionEqnStep({
      eqn: nav, from: '11', to: '12', duration: 1.1,
    }, common, content, {});
    this.addSectionEqnStep({ eqn: nav, from: '12', to: '13' }, common, content, {});
    this.addSectionEqnStep({ eqn: nav, from: '13', to: '14' }, common, content, {});
    this.addSectionEqnStep({ eqn: nav, from: '14', to: '15' }, common, content, {});

    this.addSectionEqnStep({ eqn: nav, from: '15', to: '16' }, common, {
      setContent: 'So the short hand way of writing units is to use the mathematical |square notation|.',
    });

    this.addSectionEqnStep({ eqn: nav, from: '16', to: '16' }, common, {
      setContent: 'If the reference squares have side length |1m|, then we would say the area unit is |meters squared| or |m<sup>2</sup>|.',
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
        'As a |square| is a special type of rectangle, so area can be calculated the same way: |adjacent sides are multiplied|.',
      ],
      show: [square],
      setSteadyState: () => {
        eqn.setScenario('square');
        eqn.showForm('square');
      },
    });
  }
}

export default Content;
