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
    const area1 = coll._area1;
    const area2 = coll._area2;
    const eqn = coll._eqn;

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

    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    this.addSection({
      setContent: ['Start with any triangle.'],
      show: [area1._tri],
    });

    content = { setContent: 'Draw a |rectangle| with the triangle\'s |top| point, and |left bottom| point and label its side lengths.' };
    this.addSection(content, { show: [area1._tri] });
    this.addSection(content, { show: [area1._tri, area1._leftRect] });
    this.addSection(content, {
      setContent: 'We use |h| as short hand for the |height| of the triangle',
      modifiers: { h: highlight(colors.construction1) },
      show: [area1._tri, area1._leftRect],
    });

    content = { setContent: 'Draw a |second rectangle| with the triangle\'s |top| point and |right bottom| point and label its side lengths.' };
    this.addSection(content, { show: [area1._tri, area1._leftRect] });
    this.addSection(content, {
      show: [area1._tri, area1._leftRect, area1._rightRect],
    });

    content = { setContent: 'The |area of the triangle| is the |sum| of the areas of the |two smaller triangles|.' };
    this.addSection(content, {
      show: [area1._tri, area1._leftRect, area1._rightRect],
    });
    common = {
      show: [
        area1._tri, area1._leftRect, area1._rightRect,
        area1._leftFill, area1._rightFill,
      ],
      setSteadyState: () => {
        eqn.setScenario('area1');
      },
    };
    this.addSection(common, content);
    this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, content);
    this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, content);
    this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, content);
    this.addSectionEqnStep({
      eqn, from: '2', to: '3', duration: 0,
    }, common, content);
    this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, content);
    this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, content);
    this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, content);
    this.addSectionEqnStep({ eqn, from: '6', to: '7' }, common, content);
    this.addSectionEqnStep({ eqn, from: '7', to: '8' }, common, content);
    this.addSectionEqnStep({ eqn, from: '8', to: '9' }, common, content);
    this.addSectionEqnStep({ eqn, from: '9', to: '10' }, common, content);

    this.addSectionEqnStep({ eqn, from: '20', to: '20' }, common, content);
    this.addSectionEqnStep({ eqn, from: '20', to: '21' }, common, content);
    this.addSectionEqnStep({ eqn, from: '21', to: '22' }, common, content);
    this.addSectionEqnStep({ eqn, from: '22', to: '23' }, common, content);
    this.addSectionEqnStep({ eqn, from: '23', to: '24' }, common, content);
    this.addSectionEqnStep({ eqn, from: '24', to: '25' }, common, content);
    this.addSectionEqnStep({ eqn, from: '25', to: '26' }, common, content);
    this.addSectionEqnStep({ eqn, from: '26', to: '27' }, common, content);
    this.addSectionEqnStep({ eqn, from: '27', to: '28' }, common, content);
    this.addSectionEqnStep({ eqn, from: '28', to: '29' }, common, content);
    this.addSectionEqnStep({ eqn, from: '29', to: '30' }, common, content);
  }
}

export default Content;
