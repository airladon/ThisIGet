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
  // highlight,
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
    this.loadQRs([
      'congruent_triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'If two triangles have the same side lengths and angles, then they are |congruent|.',
        'Sometimes, only |three| of the 6 side lengths and angles are needed to show two triangles are congruent.',
      ]),
    });
    this.addSection({
      setContent: style({ centerV: true }, [
        'For instance, if two triangles share the same |two angles|, and |one relatively positioned side|, then they are |congruent|. These cases are called the |Angle-Side-Angle| and |Angle-Angle-Side| congruency tests.',
        'If the triangles share the same angle and adjacent two sides (|Side-Angle-Side|), they are also congruent.',
        'If triangles share the same angle, adjacent side and opposite side (|Side-Side-Angle|) they are congruent only when the adjacent side is shorter than or equal to the opposite side.',
        'If triangles share the same angles only, then they cannot be determined to be congruent (|Angle-Angle-Angle|).',
      ]),
      modifiers: {
        'Angle-Side-Angle': click(this.showQR, [this, 'congruent_triangles/base', 'Asa'], colors.diagram.action),
        'Angle-Angle-Side': click(this.showQR, [this, 'congruent_triangles/base', 'Aas'], colors.diagram.action),
        'Side-Angle-Side': click(this.showQR, [this, 'congruent_triangles/base', 'Sas'], colors.diagram.action),
        'Side-Side-Angle': click(this.showQR, [this, 'congruent_triangles/base', 'Ssa'], colors.diagram.action),
        'Angle-Angle-Angle': click(this.showQR, [this, 'congruent_triangles/base', 'Aaa'], colors.diagram.action),
      },
    });
    this.addSection({
      title: 'Side-Side-Side Congruency',
      setContent: style({}, [
        'The remaining combination of properties is when you only know |three side lengths|. How many triangles can be made?',
      ]),
      show: [coll._left, coll._base, coll._right],
      setSteadyState: () => {
        coll.setScenarios('initial');
        coll.hasTouchableElements = false;
      },
    });

    let common = {
      setContent: [
        'We can start by connecting two sides to the third.',
      ],
    };
    this.addSection(common, {
      show: [coll._left, coll._base, coll._right],
      setSteadyState: () => {
        coll.setScenarios('initial');
        coll.hasTouchableElements = false;
      },
    });
    this.addSection(common, {
      show: [coll._left, coll._base, coll._right],
      transitionFromPrev: (done) => {
        coll.animations.cancelAll();
        coll.animations.new()
          .scenarios({ target: 'center', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        coll.setScenarios('center');
        coll.hasTouchableElements = false;
      },
    });

    common = {
      setContent: 'We can then rotate the two end sides to see where they meet to form a triangle.'
    };
    this.addSection(common, {
      
    })
  }
}

export default Content;
