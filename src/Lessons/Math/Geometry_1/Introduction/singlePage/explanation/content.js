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
  // clickWord,
} = Fig.tools.html;

const layout = lessonLayout();
const { colors } = layout;

class Content extends SinglePageLessonContent {
  setTitle() {
    this.title = details.details.title;
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
  }

  // Array of strings, html or jsx
  // eslint-disable-next-line class-methods-use-this
  setContent() {
    const diag = this.diagram.elements;
    const dim2 = diag._fig2._dimensions;
    const dim3 = diag._fig3._dimensions;
    const dim4 = diag._fig4._dimensions;
    const dim5 = diag._fig5._dimensions;
    const dim6 = diag._fig6._dimensions;
    const dim7 = diag._fig7._dimensions;
    const dim8 = diag._fig8._dimensions;
    console.log(diag)

    // Set figure one initial conditions
    diag._fig1._wheel.setScenario('centerLeft');
    diag._fig1._circle.setScenario('centerRight');
    diag._fig1._wheel.isMovable = true;
    diag._fig1._wheel.isTouchable = true;
    diag._fig1.hasTouchableElements = true;
    diag._fig1._wheel.move.type = 'rotation';

    // Figure 2
    diag.circumferenceAtAngle(dim2._circumference, Math.PI * 2);
    dim2._eqn.setScenario('left');
    dim2._eqn.showForm('0');

    // figure 3
    diag.circumferenceAtAngle(dim3._circumference, Math.PI * 2);
    dim3.setScenario('left');
    dim3._eqn.setScenario('bottom');
    dim3._eqn.showForm('0');

    // figure 4
    diag.circumferenceAtAngle(dim4._circumference, Math.PI * 2);
    dim4.setScenario('left');
    dim4._eqn.setScenario('bottom');
    dim4._eqn.showForm('0');

    // figure 4
    diag.circumferenceAtAngle(dim5._circumference, Math.PI * 2);
    dim5.setScenario('left');
    dim5._eqn.setScenario('bottom');
    dim5._eqn.showForm('0');
    // figure 4
    diag.circumferenceAtAngle(dim6._circumference, Math.PI * 2);
    dim6.setScenario('left');
    dim6._eqn.setScenario('bottom');
    dim6._eqn.showForm('0');
    // figure 4
    diag.circumferenceAtAngle(dim7._circumference, Math.PI * 2);
    dim7.setScenario('left');
    dim7._eqn.setScenario('bottom');
    dim7._eqn.showForm('0');
    // figure 4
    diag.circumferenceAtAngle(dim8._circumference, Math.PI * 2);
    dim8.setScenario('left');
    dim8._eqn.setScenario('bottom');
    dim8._eqn.showForm('0');

    // diag._fig1.hide()
    // diag._fig2.hide()
    // diag._fig4.hide()
    // diag._fig5.hide()
    // diag._fig6.hide()
    // diag._fig7.hide()
    // diag._fig8.hide()


    this.modifiers = {
      shape: click(diag.appearCircleAndMoveWheel, [diag], colors.circle),
      _Properties: click(diag.pulseProperties, [diag, dim2], colors.dimensions),
      _analyzed: click(diag.growDimensions, [diag, dim2, 4, null], colors.dimensions),
      _found: click(diag.makeEqnFromProperties, [diag, dim2], colors.dimensions),
      _relationships: click(diag.pulseEquation, [diag, dim2], colors.dimensions),
      _other: click(diag.toggleProperties, [diag, dim3], colors.dimensions),
    };
    this.content = [
      '# Shapes',
      '|Mathematics is a powerful tool| that we use to |understand| and |predict| the world around us.',

      'Mathematics describes an object or phenomenon in a more |simple|, and more |general| way. Describing something more |simply|, makes it easier to study and understand. Describing something more |generally|, means the understanding can be reapplied to other scenarios. The process of describing something in a more general way is |abstraction|.',

      'A large area of mathematics is the study of |shapes|. Shapes are simple abstractions of |objects| and the |paths| they travel.',

      'For example, a |wheel| is a physical thing. It is made of different materials, has mass, size, location and smell. A wheel can be abstracted into a |shape| by removing a lot of these details, but keeping the outline.',

      makeFig('id_figure1_asdf', diag._fig1, 'fit', new Rect(-2, -1, 4, 2)),
      // makeFig('id_figure1', [], 'fit', new Rect(-2, -1, 4, 2)),

      'A shape can then be |_analyzed|. |_Properties| or characteristics of the shape can be determined, and |_relationships| between the properties |_found|.',

      makeFig('id_figure2_asdf', diag._fig2, 'fit', new Rect(-2, -1.3, 4, 2.6)),

      'The properties and relationships can then be applied to all |_other| objects, phenomenon or paths that have that same shape, no matter their size, material, location or smell.',

      makeFig('id_figure3_asdf', diag._fig3, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure3a_asdf', [], 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure4_asdf', diag._fig4, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure5_asdf', diag._fig5, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure6_asdf', diag._fig6, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure7_asdf', diag._fig7, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),
      makeFig('id_figure8_asdf', diag._fig8, 'fit', new Rect(-2.3, -1.5, 4.6, 3)),

      'Relationships between properties can be used to calculate one property from another.',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      '## Shapes here',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      <div key={this.key += 1}>{'hello there'}</div>,
      '<div>how are you</div>',
    ];
  }
}

export default Content;
