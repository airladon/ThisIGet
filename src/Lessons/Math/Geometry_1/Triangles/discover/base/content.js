// @flow
import Fig from 'figureone';
import {
  PresentationLessonContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationLessonContent';
import Definition from '../../../../../LessonsCommon/tools/definition';
import { hint, note } from '../../../../../LessonsCommon/tools/note';
import lessonLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  style,
  click,
  // link,
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
      'Math/Geometry_1/AngleGroups/base',
      'Math/Geometry_1/AnglesAtIntersections/base',
      'Math/Geometry_1/AngleTypes/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tri = coll._triangle;
    const total = coll._total;
    const fixed = coll._fixed;

    const common = {
      transitionFromAny: (done) => {
        tri.hideAngles();
        tri.hideSides();
        coll.updateTri = false;
        const complete = () => {
          tri.showAngles();
          tri.showSides();
          coll.updateTri = true;
          coll.updatePoints();
          done();
        };
        coll.goToTri('default', 1, complete);
      },
      setEnterState: () => {
        coll.updateTotal = false;
        coll.updateSides = false;
        coll.updateTri = false;
        tri.setScenario('default');
      },
      show: [tri],
    };
    this.addSection(common, {
      title: 'triangle',
      setContent: [
        'A |Triangle| is a shape with three |sides| and |angles|.',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      modifiers: {
        angles: click(coll.pulseAngles, [coll], colors.angles),
        sides: click(coll.pulseSides, [coll], colors.lines),
        Triangle: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
      },
      setSteadyState: () => {
        coll.updateTri = true;
        coll.updateSides = true;
      },
    });

    this.addSection(common, {
      title: 'Angle Relationships',
      setContent: [
        'Looking at just the |angles|, can you find a |relationship| that the angles seem to obey? Is there a |pattern|? Drag the corners to create different triangles.',
        hint({ top: 88, label: 'Hint 1' }, 'For each triangle, write down all the angles - do you see a pattern?'),
        hint({ top: 93, label: 'Hint 2' }, 'Look at the |sum| of the angles'),
        note({ top: 93, right: 0, color: colors.diagram.text.note }, 'Answer on next page'),
      ],
      setSteadyState: () => {
        coll.updateTri = true;
        tri.hideSides();
      },
    });

    this.addSection(common, {
      setContent: [
        'All angles in a triangle always add to |180º|.',
      ],
      show: [tri, total],
      setSteadyState: () => {
        coll.updateTri = true;
        coll.updateTotal = true;
        coll.updatePoints();
        tri.hideSides();
      },
    });

    this.addSection(common, {
      setContent: [
        'Can you |prove| the angles of a triangle |always| add to 180º?',
        hint({ top: 88, label: 'Hint 1' }, 'Draw a |line| parallel to the base through the top point'),
        hint({ top: 93, label: 'Hint 2' }, 'Use |alternate| and |supplementary| angle relationships'),
        note({ top: 93, right: 0, color: colors.diagram.text.note }, 'Answer in |Explanation|'),
      ],
      modifiers: {
        line: click(coll.toggleParallelLine, [coll], colors.parallel),
        alternate: this.qr('Math/Geometry_1/AnglesAtIntersections/base/Alternate'),
        supplementary: this.qr('Math/Geometry_1/AngleGroups/base/SupplementaryPres'),
        Explanation: this.link('Math/Geometry_1/Triangles/explanation/base?page=7'),
      },
      setSteadyState: () => {
        coll.updateTri = false;
        tri.hideAll();
        fixed.showAll();
      },
    });

    this.addSection({
      title: 'Triangle Types',
      setContent: style({ centerV: true }, [
        'Triangles are |categorized| depending on their |side lengths| and |angles|.',
        'Knowing what category a triangle is in, or the |triangle type|, can sometimes simplify a problem as known relationships with that specific triangle type can be used to find unknown properties.',
        'Using triangle type names can also more efficiently |communicate| the properties of a triangle, so it is important to remember them.',
      ]),
    });

    this.addSection({
      setContent: [
        'Can you |research| the name of triangles that have the |properties|:',
        style({
          list: 'unordered', top: 6, left: 15, line: 2,
        }, [
          'All angles less than 90º',
          'One angle equal to 90º',
          'One angle more than 90º',
          'All side equal',
          'Two side equal',
          'No sides equal',
        ]),
        note({ top: 93, right: 0, color: colors.diagram.text.note }, 'Answer in |Explanation|'),
        hint({ top: 83, label: 'Hint 1' }, 'Angles less than 90º are also called |acute| angles'),
        hint({ top: 88, label: 'Hint 2' }, 'Angles equal to 90º are also called |right| angles'),
        hint({ top: 93, label: 'Hint 3' }, 'Angles greater than 90º are called |obtuse| angles'),
      ],
      modifiers: {
        acute: this.qr('Math/Geometry_1/AngleTypes/base/Acute'),
        right: this.qr('Math/Geometry_1/AngleTypes/base/Right'),
        obtuse: this.qr('Math/Geometry_1/AngleTypes/base/Obtuse'),
        Explanation: this.link('Math/Geometry_1/Triangles/explanation/base?page=26'),
      },
    });
  }
}

export default Content;
