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
    this.loadQRs([
      'congruent_triangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const intro = coll._intro;
    const rect = coll._rectangle;
    const rectEqn = coll._rectEqn;

    this.addSection({
      title: 'Introduction',
      setContent: [
        'The area of a |triangle| is more challenging to calculate as squares do not fit nicely into triangles.',
      ],
      show: [intro],
    });

    this.addSection({
      setContent: [
        'However, we can use our knowledge of |rectangles| to help calculate the area of a triangle.',
      ],
      show: [intro],
    });

    let common = {
      show: [rect._left, rect._right, rect._top, rect._bottom, rectEqn],
    };
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'rect' }, common, {
      setContent: 'We know the area of a rectangle is the |product of two adjacent sides|.',
    });
    let content = {
      setContent: 'We can halve the rectangle into |two triangles| by drawing a line between opposite corners.',
    };
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'rect' }, content, common);
    common = { show: [rect] };
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'rect' }, content, common);
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'rect' }, common, {
      setContent: 'These two triangles share the same side lengths, and are therefore |equal|.',
      modifiers: {
        equal: this.bindShowQR('congruent_triangles/base', 'Sss'),
      },
    });

    content = {
      setContent: 'As each triangle is equal, then each will have an |area| that is |half| of the rectangle.',
      modifiers: {
        area: highlight(colors.area),
      },
      setEnterState: () => {
        rect._right.setColor(colors.disabled);
        rect._top.setColor(colors.disabled);
      },
      setLeaveState: () => {
        rect._right.setColor(colors.sides);
        rect._top.setColor(colors.sides);
      },
    };
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'rect' }, common, content);
    this.addSectionEqnStep({ eqn: rectEqn, from: 'rect', to: 'tri' }, common, content);

    this.addSection({
      setContent: centerV(['We can now use this to calculate the area of |any triangle|, not just one that is part of a rectangle.']),
    });
  }
}

export default Content;
