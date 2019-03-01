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
    console.log(diag)

    // Set figure one initial conditions
    diag._fig1._wheel.setScenario('centerLeft');
    diag._fig1._circle.setScenario('centerRight');
    diag._fig1._wheel.isMovable = true;
    diag._fig1._wheel.isTouchable = true;
    diag._fig1.hasTouchableElements = true;
    diag._fig1._wheel.move.type = 'rotation';

    // diag.circumferenceAtAngle(diag._fig2._dimensions._circumference, Math.PI * 2);
    // diag.growCircumference(diag._fig2._dimensions._circumference, 1);
    diag.growDimensions(diag._fig2._dimensions, 4);
    diag.appearCircleAndMoveWheel();

    this.modifiers = {
      shape: click(diag.appearCircleAndMoveWheel, [diag], colors.circle),
    };
    this.content = [
      '# Shapes',
      '|Mathematics is a powerful tool| that we use to |understand| and |predict| the world around us.',
      'Mathematics describes an object or phenomenon in a more |simple|, and more |general| way. Describing something more |simply|, makes it easier to study and understand. Describing something more |generally|, means the understanding can be reapplied to other scenarios. The process of describing something in a more general way is |abstraction|.',
      'A large area of mathematics is the study of |shapes|. Shapes are simple abstractions of |objects| and the |paths| they travel.',
      'For example, a |wheel| is a physical thing. It is made of different materials, has mass, size, location and smell. A wheel can be abstracted into a |shape| by removing a lot of these details, but keeping the outline.',
      makeFig('id_figure1', diag._fig1, 'fit', new Rect(-2, -1, 4, 2)),
      'A shape can then be analyzed. Properties or characteristics of the shape can be determined, and relationships between the properties found.',
      makeFig('id_figure2', diag._fig2, 'fit', new Rect(-2, -1.3, 4, 2.6)),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      '## Shapes here',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      <div key={this.key += 1}>{'hello there'}</div>,
      '<div>how are you</div>',
    ];
  }
}

export default Content;
