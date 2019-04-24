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
  // click,
  centerV,
  highlight,
  // clickWord,
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
  }
}

export default Content;
