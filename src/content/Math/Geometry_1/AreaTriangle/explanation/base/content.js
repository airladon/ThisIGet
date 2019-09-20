// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/Lesson/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';

const {
  click,
  centerV,
  highlight,
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
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
    this.loadQRs([
      'Math/Geometry_1/CongruentTriangles/base',
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
    const implications = coll._implications;
    const height1 = coll._height1;
    const height2 = coll._height2;

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
        equal: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
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
    common = { setSteadyState: () => { coll.setScenarios('default'); } };
    this.addSection(common, {
      title: 'Calculate Area',
      setContent: ['Start with any triangle.'],
      show: [area1._tri],
    });

    content = { setContent: 'Draw a |rectangle| with the triangle\'s |top| point, and |left bottom| point and label its side lengths.' };
    this.addSection(common, content, { show: [area1._tri] });
    this.addSection(common, content, { show: [area1._tri, area1._leftRect] });
    this.addSection(common, content, {
      setContent: 'We use |h| as short hand for the |height| of the triangle',
      modifiers: { h: highlight(colors.construction1) },
      show: [area1._tri, area1._leftRect],
    });

    content = { setContent: 'Draw a |second rectangle| with the triangle\'s |top| point and |right bottom| point and label its side lengths.' };
    this.addSection(common, content, { show: [area1._tri, area1._leftRect] });
    this.addSection(common, content, {
      show: [area1._tri, area1._leftRect, area1._rightRect],
    });

    content = { setContent: 'The |area of the triangle| is the |sum| of the areas of the |two smaller triangles|.' };
    this.addSection(content, {
      show: [area1._tri, area1._leftRect, area1._rightRect],
      setSteadyState: () => { coll.setScenarios('default'); },
    });
    common = {
      show: [
        area1._tri, area1._leftRect, area1._rightRect,
        area1._leftFill, area1._rightFill,
      ],
      setSteadyState: () => { coll.setScenarios('default'); },
    };
    this.addSection(common, content);
    this.addSectionEqnStep({ eqn, from: '0', to: '0' }, common, content);
    this.addSectionEqnStep({ eqn, from: '0', to: '1' }, common, content);
    this.addSectionEqnStep({ eqn, from: '1', to: '2' }, common, content);
    content = { setContent: 'We can |rearrange| the right hand side to separate the height |h|.' };
    this.addSectionEqnStep({ eqn, from: '2', to: '2' }, common, content);
    this.addSectionEqnStep({
      eqn, from: '2', to: '3', duration: 0,
    }, common, content);
    this.addSectionEqnStep({ eqn, from: '3', to: '4' }, common, content);
    this.addSectionEqnStep({ eqn, from: '4', to: '5' }, common, content);
    content = {
      setContent: 'Sides |B| and |C| form one side of the triangle. As it\'s the bottom side, we call it the |base|.',
      modifiers: {
        B: highlight(colors.construction1),
        C: highlight(colors.construction2),
      },
    };
    this.addSectionEqnStep({ eqn, from: '5', to: '5' }, common, content);
    common = {
      show: [
        area1._tri, area1._leftRect, area1._rightRect,
        area1._leftFill, area1._rightFill, area1._base,
      ],
      setSteadyState: () => { coll.setScenarios('default'); },
    };
    this.addSectionEqnStep({ eqn, from: '5', to: '5' }, common, content);
    this.addSectionEqnStep({ eqn, from: '5', to: '6' }, common, content);
    this.addSectionEqnStep({ eqn, from: '6', to: '7' }, common, content);
    content = { setContent: '|h| is rewritten as the |height| of the triangle.' };
    this.addSectionEqnStep({ eqn, from: '7', to: '7' }, common, content);
    common = {
      show: [
        area1._tri, area1._leftRect, area1._rightRect,
        area1._leftFill, area1._rightFill, area1._base, area1._height,
      ],
      setSteadyState: () => { coll.setScenarios('default'); },
    };
    this.addSectionEqnStep({ eqn, from: '7', to: '7' }, common, content);
    this.addSectionEqnStep({ eqn, from: '7', to: '8' }, common, content);
    this.addSectionEqnStep({ eqn, from: '8', to: '9' }, common, content);
    this.addSectionEqnStep({ eqn, from: '9', to: '10' }, common, content);
    content = { setContent: 'And so the area of a triangle is |half its height times its base|.' };
    this.addSectionEqnStep({ eqn, from: '10', to: '10' }, common, content);
    this.addSectionEqnStep({ eqn, from: '10', to: '10' }, common, content, {
      show: [area1._tri, area1._base, area1._height],
    });

    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    common = {
      setContent: ['This works for |any triangle|, and you can make |any side| the |base|.'],
      show: [area1._tri],
    };
    this.addSection(common, {
      title: 'Rotate Triangle',
      setSteadyState: () => {
        area1.setScenario('default');
      },
    });
    this.addSection(common, {
      transitionFromPrev: (done) => {
        area1.animations.cancelAll();
        area1.animations.new()
          .scenario({ target: 'area2', duration: 1 })
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        area1.setScenario('area2');
      },
      setLeaveState: () => {
        area1.setScenario('area1');
      },
    });

    common = {
      setContent: 'Once again draw |two rectangles| between the |top| point and the |two bottom| points.',
      setSteadyState: () => { coll.setScenarios('area2'); },
    };
    this.addSection(common, {
      show: [area2._tri],
    });
    this.addSection(common, {
      show: [area2._tri, area2._leftRect],
    });
    this.addSection(common, {
      show: [area2._tri, area2._leftRect, area2._rightRect],
    });

    content = {
      setContent: 'In this case, the |triangle_area| is the area of |triangle_hC| minus the area of |triangle_hB|.',
      modifiers: {
        triangle_area: click(coll.showTriFill, [coll], colors.sides),
        triangle_hC: click(coll.showRightFill, [coll], colors.construction2),
        triangle_hB: click(coll.showLeftFill, [coll], colors.construction1),
      },
    };
    common = {
      show: [area2._tri, area2._leftRect, area2._rightRect],
      setSteadyState: () => { coll.setScenarios('area2'); },
    };
    this.addSection(common, content, {});
    this.addSectionEqnStep({ eqn, from: '20', to: '20' }, common, content);
    content = { setContent: 'We can now work through similar steps to before to find the area.' };
    this.addSectionEqnStep({ eqn, from: '20', to: '20' }, common, content);
    this.addSectionEqnStep({ eqn, from: '20', to: '21' }, common, content);
    this.addSectionEqnStep({ eqn, from: '21', to: '22' }, common, content);
    this.addSectionEqnStep({
      eqn, from: '22', to: '23', duration: 0,
    }, common, content);
    this.addSectionEqnStep({ eqn, from: '23', to: '24' }, common, content);
    this.addSectionEqnStep({ eqn, from: '24', to: '25' }, common, content);
    content = {
      setContent: 'In this case, the |base| is length |C| minus length |B|',
      modifiers: {
        C: highlight(colors.construction2),
        B: highlight(colors.construction1),
      },
    };
    this.addSectionEqnStep({ eqn, from: '25', to: '25' }, common, content);
    common = {
      show: [area2._tri, area2._leftRect, area2._rightRect, area2._base],
      setSteadyState: () => { coll.setScenarios('area2'); },
    };
    this.addSectionEqnStep({ eqn, from: '25', to: '25' }, common, content);
    this.addSectionEqnStep({ eqn, from: '25', to: '26' }, common, content);
    this.addSectionEqnStep({ eqn, from: '26', to: '27' }, common, content);
    content = { setContent: 'And |h| is again the |height|.' };
    this.addSectionEqnStep({ eqn, from: '27', to: '27' }, common, content);
    common = {
      show: [
        area2._tri, area2._leftRect, area2._rightRect,
        area2._base, area2._height,
      ],
      setSteadyState: () => { coll.setScenarios('area2'); },
    };
    this.addSectionEqnStep({ eqn, from: '27', to: '27' }, common, content);
    this.addSectionEqnStep({ eqn, from: '27', to: '28' }, common, content);
    this.addSectionEqnStep({ eqn, from: '28', to: '29' }, common, content);
    this.addSectionEqnStep({ eqn, from: '29', to: '30' }, common, content);
    content = { setContent: 'And so the area of a triangle is |half its height times its base|.' };
    this.addSectionEqnStep({ eqn, from: '30', to: '30' }, common, content);
    this.addSectionEqnStep({ eqn, from: '30', to: '30' }, common, content, {
      show: [area2._tri, area2._base, area2._height],
    });

    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    this.addSection({
      title: 'Height',
      setContent: [
        'The height of the triangle came from the rectangles formed between the top point of the triangle and it\'s base points',
      ],
      show: [
        area1._tri, area1._leftRect, area1._rightRect, area1._height,
      ],
      hide: [
        area1._leftRect._side30._label, area1._rightRect._side30._label,
      ],
      setSteadyState: () => {
        coll.setScenarios('default');
      },
    });

    this.addSection({
      setContent: [
        'As a rectangle\'s sides are |perpendicular| to each other, and one of the sides is |aligned with the base| of the triangle, then the triangle |height| must be equal to the |perpendicular line between the base and the top| point.',
      ],
      show: [height1, height2],
      hide: [height1._base, height2._base],
      setSteadyState: () => {
        height1.setScenario('default');
        height2.setScenario('default');
      },
    });

    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    // //////////////////////////////////////////////////////////////////
    this.addSection({
      title: 'Different triangles',
      setContent: centerV([
        'When we find a relationship, it can be useful to think about what some of the |implications| of the relationship are.',
        'In this case, we have found that |triangle area| is calculated from |base side length| and |height|.',
        'Another way to say this, is |area is only dependent| on the base side length and height.',
      ]),
    });

    this.addSection({
      setContent: [
        'This means |all triangles| with the |same base| and |height| will have the |same_area|.',
      ],
      modifiers: {
        same_area: click(coll.moveTopPad, [coll], colors.diagram.action),
      },
      show: [implications],
      setSteadyState: () => {
        coll.update();
      },
    });
  }
}

export default Content;
