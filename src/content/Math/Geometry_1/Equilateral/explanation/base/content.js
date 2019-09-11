// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationFormatContent';
import Definition from '../../../../../common/tools/definition';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';

const {
  click,
  centerV,
  highlight,
  highlightWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/Isosceles/base',
      'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tri = coll._triangle;

    this.addSection({
      title: 'Equilateral Triangle',
      setContent: [
        'A triangle that has all |three sides| the |same length| is called an |equilateral| triangle.',
        `${new Definition('Equilateral', 'Latin', ['aequilateralis', '', 'aequi', 'equal', 'lateralis', 'side']).html()}`,
      ],
      show: [tri],
      setSteadyState: () => {
        tri.hideAngles();
      },
    });
    this.addSection({
      setContent: [
        'As |any| two sides are equal, an |equilateral| triangle is a special case of an |isosceles| triangle.',
      ],
      modifiers: {
        isosceles: this.qr('Math/Geometry_1/Isosceles/base/Main'),
        any: click(coll.toggleIsoscelesSides, [coll], colors.highlight),
      },
      show: [tri],
      setSteadyState: () => {
        tri.hideAngles();
      },
    });

    this.addSection({
      setContent: [
        'As all pairs of sides are equal, then |all_pairs| of angles are also equal.',
      ],
      modifiers: {
        all_pairs: click(coll.toggleIsoscelesSidesAndAngles, [coll], colors.highlight),
      },
      show: [tri],
      setSteadyState: () => {
        tri.hideAngles();
      },
    });

    this.addSection({
      setContent: [
        'And so in an equilateral triangle |all_sides| and |all_angles| are equal.',
      ],
      modifiers: {
        all_sides: click(coll.pulseSides, [coll], colors.sides),
        all_angles: click(coll.pulseAngles, [coll, null], colors.angles),
      },
      show: [tri],
    });

    this.addSection({
      setContent: centerV([
        'As an equilateral triangle is a special case of an isosceles triangle, then the same method can be used to show |any triangle with equal angles| will also have |equal sides|.',
        'Therefore, if you |know| a triangle has |equal angles|, you will then know it will be an |equilateral| triangle with |equal sides|.',
      ]),
    });

    this.addSection({
      title: 'Angle Relationship',
      setContent: [
        'Next we can consider the |relationship| between an equilateral triangle\'s |angles|.',
      ],
      modifiers: {
        angles: highlight(colors.angles),
      },
      show: [tri],
    });

    const common = {
      setContent: [
        'We know all the angles of a |triangle| sum to |_180|. Therefore, each angle must be a |third_of_180|, which is |_60|.',
      ],
      modifiers: {
        _180: highlightWord('180º', colors.angles),
        _60: highlightWord('60º', colors.angles),
        third_of_180: highlightWord('third of 180º', colors.angles),
        triangle: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      },
      show: [tri],
    };
    this.addSection(common);
    this.addSection(common, {
      transitionFromAny: (done) => {
        tri._angle0.label.setText('60º');
        tri._angle1.label.setText('60º');
        tri._angle2.label.setText('60º');
        coll.pulseAngles(done);
      },
      setLeaveState: () => {
        tri._angle0.label.setText('a');
        tri._angle1.label.setText('a');
        tri._angle2.label.setText('a');
      },
    });
  }
}

export default Content;
