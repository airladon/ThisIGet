// @flow
import Fig from 'figureone';
import * as React from 'react';
import { SinglePageLessonContent } from '../../../../../../js/Lesson/SinglePageLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const { Diagram, Transform, Rect } = Fig;

class Content extends SinglePageLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new Diagram({
      htmlId,
      limits: new Rect(-1, -1, 2, 2),
    });
    const fig1 = this.diagram.shapes.polygon({
      radius: 1,
      color: [1, 0, 0, 1],
      sides: 8,
      transform: new Transform().scale(1, 1).translate(0, 0),
    });
    fig1.tieToHTML.element = 'wss_collection_1';
    fig1.tieToHTML.scale = 'fit';
    const fig2 = this.diagram.shapes.polygon({
      radius: 1,
      // fill: true,
      color: [1, 0, 0, 1],
      sides: 6,
      transform: new Transform().scale(1, 1).translate(0, 0),
    });
    fig2.tieToHTML.element = 'wss_collection_2';
    fig2.tieToHTML.scale = 'max';
    const eqn1 = this.diagram.equation.addEquation(
      this.diagram.elements,
      'eqn1',
      {
        color: [0, 0, 0.4, 1],
        scale: 1,
        defaultFormAlignment: {
          alignH: 'center',
          alignV: 'middle',
        },
        elements: {
          c: 'c',
          pi: 'π',
          'd': 'd',
          'equals': ' = ',
        },
        forms: {
          'base': ['c', 'equals', 'pi', 'space', 'd'],
        },
      },
    );
    eqn1.tieToHTML.element = 'wss_collection_1';
    const eqn2 = this.diagram.equation.addEquation(
      this.diagram.elements,
      'eqn2',
      {
        color: [0, 0, 0.4, 1],
        scale: 1,
        defaultFormAlignment: {
          alignH: 'center',
          alignV: 'middle',
        },
        elements: {
          c: 'hello this is a test',
          // pi: 'π',
          // 'd': 'd',
          // 'equals': ' = ',
        },
        forms: {
          // 'base': ['c', 'equals', 'pi', 'space', 'd'],
          nase: ['c'],
        },
      },
    );
    eqn2.tieToHTML.element = 'wss_collection_2';
    eqn2.tieToHTML.scale = '1em';
    // const eqn2 = eqn1._dup();
    // eqn2.tieToHTMLElement = 'wss_collection_2';
    this.diagram.elements.add('fig1', fig1);
    this.diagram.elements.add('fig2', fig2);
    // this.diagram.elements.add('eqn2', eqn2);
    // this.diagram.elements.add('test', this.diagram.shapes.polygon({
    //   radius: 1,
    //   // fill: true,
    //   color: [1, 0, 0, 1],
    //   transform: new Transform().scale(1, 1).translate(0, 0),
    // }));
    // this.diagram.elements._test.tieToHTMLElement = 'wss_collection_1';
    this.diagram.animateNextFrame();
    // this.diagram.setElementsToCollection(new DiagramCollection(this.diagram));
  }

  // Array of strings, html or jsx
  // eslint-disable-next-line class-methods-use-this
  setContent() {
    this.content = [
      '# Shapes',
      'Shapes are |amazing|',
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
  }
}

export default Content;
