// @flow
import Fig from 'figureone';
import * as React from 'react';
import SinglePageLessonContent from '../../../../../../js/Lesson/SinglePageLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import lessonLayout from './layout';
import Collection from './collection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const {
  Transform, Diagram, Rect, DiagramElement,
} = Fig;
const {
  generateUniqueId,
} = Fig.tools.misc;

const layout = lessonLayout();
// const { colors } = layout;

function makeFig(
  id: string = `id_figure__${generateUniqueId()}`,
  elements: DiagramElement | Array<DiagramElement>,
  scale: string = 'fit',
) {
  let elementsToUse;
  if (Array.isArray(elements)) {
    elementsToUse = elements;
  } else {
    elementsToUse = [elements];
  }
  elementsToUse.forEach((element) => {
    element.tieToHTMLElement = id;
    element.tieToHTMLElementScale = scale;
  });
  return `<div id="${id}"></div>`;
}

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
    }, layout);
    this.diagram.elements.add(
      'circles',
      new Collection(
        this.diagram,
        layout,
        new Transform('circles').scale(1, 1).translate(0, 0),
      ),
    );
  }

  // Array of strings, html or jsx
  // eslint-disable-next-line class-methods-use-this
  getContent() {
    const diag = this.diagram.elements;
    console.log(diag)

    const content = [
      '# Shapes',
      '|Mathematics is a powerful tool| that we use to |understand| and |predict| the world around us.',
      'Mathematics describes an object or phenomenon in a more |simple|, and more |general| way. Describing something more |simply|, makes it easier to study and understand. Describing something more |generally|, means the understanding can be reapplied to other scenarios.',
      'The process of describing something in a more general way is |abstraction|.',
      'A large area of mathematics is the study of |shapes|. Shapes are simple abstractions of |objects| and the |paths| they travel.',
      'For example, a |wheel| is a physical thing. It is made of different materials, has mass, size, location and smell. However, these details are ',
      makeFig('id_figure1', diag._circles._wheel),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Shapes are |amazing|',
      <div key={this.key += 1} id="wss_collection_1"></div>,
      'Shapes are |amazing|',
      '## Shapes here',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      <div key={this.key += 1} id="wss_collection_2"></div>,
      'Shapes are |amazing|',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius ipsum eget euismod vestibulum. Sed sit amet sollicitudin lacus. Fusce varius nisl non elementum dictum. Nulla tellus leo, aliquam eget facilisis vitae, pulvinar at magna. Praesent dignissim feugiat cursus. Maecenas convallis ac dolor nec luctus. Vestibulum sollicitudin ante eu nisl finibus, ut posuere tortor sagittis. Donec quam lectus, tristique at quam in, semper volutpat sapien. Mauris eu est mollis magna bibendum volutpat. Integer lacinia convallis euismod. Duis consectetur libero purus, vel molestie dui condimentum semper. In pretium enim accumsan neque egestas, non ultricies massa ultrices.',
      'Shapes are |amazing|',
      <div key={this.key += 1}>{'hello there'}</div>,
      '<div>how are you</div>',
    ];
    return content;
  }
}

export default Content;
