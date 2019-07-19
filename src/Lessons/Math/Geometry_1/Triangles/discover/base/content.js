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
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const tri = coll._triangle;
    const total = coll._total;

    let common = {
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
      },
      show: [tri],
    };
    this.addSection(common, {
      setContent: [
        'You can create a |shape| with |three| connected |straight lines|.',
        note({ label: 'Note:' }, 'You can change the shape by dragging its corners.'),
      ],
      modifiers: {
        shape: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
        test: click(coll.goToTri, [coll, 'random', 1, null, false], colors.lines),
      },
      setSteadyState: () => {
        tri.hideAngles();
        tri.hideSides();
      },
    });
    this.addSection(common, {
      setContent: [
        'This shape has three |angles| and |side_lengths|.',
      ],
      modifiers: {
        angles: click(coll.pulseAngles, [coll], colors.angles),
        side_lengths: click(coll.pulseSides, [coll], colors.lines),
      },
      setSteadyState: () => {
        coll.updateTri = true;
        coll.updateSides = true;
      },
    });
    this.addSection(common, {
      setContent: [
        'The common name for this shape is |Triangle|.',
        `${new Definition('Triangle', 'Latin', ['triangulus', '', 'tri', 'three', 'angulus', 'corner, angle']).html()}`,
      ],
      setSteadyState: () => {
        tri.hideSides();
        tri.hideAngles();
      },
    });

    this.addSection(common, {
      setContent: [
        'Looking at just the |angles|, can you find a |relationship| that the angles seem to obey? Is there a |pattern|?',
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
      show: [tri, coll._total],
      setSteadyState: () => {
        coll.updateTri = true;
        coll.updateTotal = true;
        tri.hideSides();
      },
    });
    // let content = {
    //   setContent: [
    //     'Such a shape has |three_angles|.',
    //   ],
    // };
    // this.addSection(common, content, {
    //   modifiers: {
    //     shape: click(coll.goToTri, [coll, 'random', null, false], colors.lines),
    //   },
    //   show: [tri],
    // });
    // this.addSection(common, {
      
    //   show: [tri, tri._angle0, tri._angle1, tri._angle2],
    // });
  }
}

export default Content;
