// @flow
import Fig from 'figureone';
import {
  SinglePageLessonContent, makeFig,
} from '../../../../../../js/Lesson/SinglePageLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import lessonLayout from './layout';
import Collection from './collection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import part1 from './part1.md';

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
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
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
    // this.loadQRs([
    //   'Math/Geometry_1/Triangles/base',
    //   'Math/Geometry_1/AngleGroups/base/',
    //   'Math/Geometry_1/Area/base/',
    //   'Math/Geometry_1/RightAngleTriangles/base/',
    //   'Math/Geometry_1/AngleNames/base/',
    // ]);
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
      _Properties: click(diag.pulseProperties, [diag, dim2], colors.dimensionsDark),
      _analyzed: click(diag.growDimensions, [diag, dim2, 4, null], colors.dimensionsDark),
      _relationships: click(diag.makeEqnFromProperties, [diag, dim2], colors.dimensionsDark),
      _all_other: click(diag.toggleProperties, [diag, dim3], colors.dimensionsDark),
      // test: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      // test2: this.qr('Math/Geometry_1/Triangles/base/AngleSum'),
      figure1: makeFig(
        'id_figure1',
        diag._fig1,
        'fit',
        new Rect(-2, -1.1, 4, 2.2),
        'Diagram showing a wheel abstracted into a circle',
        500,
      ),
    };
    this.content = [
      '## Shapes',

      part1,

      'A shape can then be |_analyzed|. |_Properties| or characteristics of the shape can be identified, and |_relationships| between the properties found.',

      makeFig(
        'id_figure2',
        diag._fig2,
        'fit',
        new Rect(-2, -1.3, 3.2, 2.8),
        'Diagram showing a circle, its properties of diameter and circumference and the relationship between the properties',
        400,
      ),

      'The properties and relationships can then be applied to |_all_other| objects, phenomenon or paths that have that same shape, no matter their size, material, location or smell.',

      makeFig(
        'id_figure3',
        diag._fig3,
        'fit',
        new Rect(-2.5, -1.5, 5, 3),
        'Diagram showing a clock and a ball can both be abstracted to circles, and have the same properties and relationships between properties',
        500,
      ),

      'Whether the object is as small as an atom, or as large as a star, if the shape is the same, then the relationship between properties of that shape will apply. This is very powerful, as it means we can understand objects that we could never actually measure as they are too large, too small, or not close enough.',

      'For instance, over |2000| years ago, the understanding of shapes allowed people to calculate the |size of our planet| to within 15% of the actual value.',

      makeFig('id_figure4', diag._fig4, 'fit', new Rect(-1, -1, 2, 2), 'Image of planet earth', 400),

      'The mathematics of shapes also helps us understand phenonmena we can\'t see like |sound|, |gravity|, |electricty|, |radio waves| and |magnetism|. It is the basis for, and used to develop most engineering and science disciplines.',

      'So |why| study shapes?',

      'Because doing so gives us |powerful tools| we can use to help |better understand| the world we live in.',
    ];
  }
}

export default Content;
