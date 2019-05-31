// @flow
import Fig from 'figureone';
import * as React from 'react';
import {
  SinglePageLessonContent, makeFig,
} from '../../../../../../js/Lesson/SinglePageLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import lessonLayout from './layout';
import Collection from './collection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, Rect,
} = Fig;

const {
  click,
  // centerVH,
  // centerV,
  // highlight,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends SinglePageLessonContent {
  setTitle() {
    this.title = details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({
      htmlId,
      vertexShader: 'withTexture',
      fragmentShader: 'withTexture',
      gestureCanvas: 'lesson__content',
    }, layout);
    this.diagram.setElementsToCollection(new Collection(
      this.diagram,
      layout,
      new Transform('circles').scale(1, 1).translate(0, 0),
    ));
    this.loadQRs([
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/AdjacentAngles/base/',
      'Math/Geometry_1/Area/base/',
      'Math/Geometry_1/RightAngleTriangles/base/',
      'Math/Geometry_1/ImportantAngles/base/',
    ]);
  }

  redrawer() {
    this.diagram.renderAllElementsToTiedCanvases(true);
  }

  // Array of strings, html or jsx
  // eslint-disable-next-line class-methods-use-this
  setContent() {
    const diag = this.diagram.elements;
    const dim2 = diag._fig2._dimensions;
    const dim3 = diag._fig3._dimensions;

    // Set figure one initial conditions
    diag._fig1._wheel.setScenario('centerLeft');
    diag._fig1._circle.setScenario('centerRight');
    // diag._fig1._wheel.isMovable = true;
    // diag._fig1._wheel.isTouchable = true;
    // diag._fig1._wheel.move.type = 'rotation';
    diag._fig1._activator.onClick = diag.appearCircleAndMoveWheel.bind(diag);

    // Figure 2
    diag.circumferenceAtAngle(dim2._circumference, Math.PI * 2);
    dim2._eqn.setScenario('left');
    dim2._eqn.showForm('0');
    diag._fig2._activator.onClick = diag.makeDimensions.bind(diag, dim2);

    // figure 3
    diag.circumferenceAtAngle(dim3._circumference, Math.PI * 2);
    dim3.setScenario('left');
    dim3._eqn.setScenario('bottom');
    dim3._eqn.showForm('0');
    diag._fig3._activator.onClick = diag.toggleProperties.bind(diag, dim3);

    // figure 4
    diag._fig4.setScenario('center');

    this.modifiers = {
      shape: click(diag.appearCircleAndMoveWheel, [diag], colors.circle),
      _Properties: click(diag.pulseProperties, [diag, dim2], colors.dimensions),
      _analyzed: click(diag.growDimensions, [diag, dim2, 4, null], colors.dimensions),
      _relationships: click(diag.makeEqnFromProperties, [diag, dim2], colors.dimensions),
      // _relationships: click(diag.pulseEquation, [diag, dim2], colors.dimensions),
      _all_other: click(diag.toggleProperties, [diag, dim3], colors.dimensions),
      _test: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      test2: click(this.redrawer, [this]),
    };
    this.content = [
      '# Shapes',
      '1|Mathematics is a powerful tool|. We use to |understand| and |predict| the world around us. |_test|  |test2|',

      'Mathematics describes something like an object, path or phenomenon in a more |simple|, and more |general| way. Describing something more |simply|, makes it easier to study and understand. Describing something more |generally|, means the understanding can be reapplied to other scenarios.',

      'When an object is described in a more simple and general way, its main features are highlighted. The essence of the object is |drawn away| from its complexity. We use the word |abstract| to describe the action of drawing the essence from an object and creating a more simple, general description of it. The word |abstract| comes from the Latin word |abstractus| which means "drawn away". Thus, to simplify and generalize an object is to |abstract| an object, and something which is simplified and generalized is an |abstraction| of that object.',

      'A large area of mathematics is the study of |shapes|. Shapes are simple abstractions of |objects|, |phenomena| and the |paths| they travel.',

      'For example, a |wheel| is a physical thing. It is made of different materials, has mass, size, location and smell. A wheel can be abstracted into a |shape| by focusing just on its outline, and removing a lot of the details of how it is made.',

      makeFig('id_figure1', diag._fig1, 'fit', new Rect(-2, -1, 4, 2)),
      // makeFig('id_figure1', [], 'fit', new Rect(-2, -1, 4, 2)),

      'A shape can then be |_analyzed|. |_Properties| or characteristics of the shape can be identified, and |_relationships| between the properties found.',

      makeFig('id_figure2', diag._fig2, 'fit', new Rect(-2, -1.3, 4, 2.6)),

      'The properties and relationships can then be applied to |_all_other| objects, phenomenon or paths that have that same shape, no matter their size, material, location or smell.',

      makeFig('id_figure3', diag._fig3, 'fit', new Rect(-2.5, -1.5, 5, 3)),

      `<div class="container">
        <div class="inner">
        </div>
      </div>`,

      'Whether the object is as small as an atom, or as large as a star, if the shape is the same, then the relationship between properties of that shape will apply. This is very powerful, as it means we can understand objects that we could never actually measure as they are too large, too small, or not close enough.',

      'For instance, over |2000| years ago, the understanding of shapes allowed people to calculate the |size of our planet| to within 15% of the actual value.',

      makeFig('id_figure4', diag._fig4, 'fit', new Rect(-1, -1, 2, 2)),

      'The mathematics of shapes also helps us understand phenonmena we can\'t see like |sound|, |gravity|, |electricty|, |radio waves| and |magnetism|. It is the basis for, and used to develop most engineering and science disciplines.',

      'So |why| study shapes?',

      'Because doing so gives us |powerful tools| we can use to help |better understand| the world we live in.',
    ];
  }
}

export default Content;
