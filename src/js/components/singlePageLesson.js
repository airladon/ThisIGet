// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  content: Array<string | React.Element<'div'>>,
};

// let updates = 0;

// const { DrawContext2D, Point, Rect } = Fig;

const { applyModifiers, setOnClicks } = Fig.tools.html;

const applyMDModifiers = (inputText: string, modifiers: Object) => {
  let outputText = '';

  if (inputText.trim().startsWith('##')) {
    outputText = `<div class="single_page_lesson__header2">${inputText.slice(2)}</div>`;
  } else if (inputText.trim().startsWith('#')) {
    outputText = `<div class="single_page_lesson__header1">${inputText.slice(1)}</div>`;
  } else {
    outputText = `<p class="single_page_lesson__text">${applyModifiers(inputText, modifiers)}</p>`;
  }
  return outputText;
};

export default class SinglePageLessonComponent extends React.Component
                                    <Props, State> {
  lesson: SimpleLesson;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 10;
    this.state = {
      content: [],
    };
  }

  // shouldComponentUpdate() {
  //   // if (updates > 5) {
  //   //   return false;
  //   // }
  //   // updates += 1
  //   return true;
  // }
  // componentWillMount() {
  //   // Instantiate diagram now that the canvas elements have been
  //   // created.
  // }

  componentDidMount() {
    this.lesson.initialize();
    // this.lesson.content.setDiagram(this.lesson.content.diagramHtmlId);
    // this.lesson.content.diagram.resize();
    this.setState({
      content: this.lesson.content.sections[0],
    });
    this.lesson.content.diagram.enableScrolling();
    // window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  // }

  // handleScroll() {
  //   this.lesson.content.diagram.updateHTMLElementTie();
  //   this.lesson.content.diagram.animateNextFrame();
  // }

  componentDidUpdate() {
    this.lesson.content.diagram.resize();
    setOnClicks(this.lesson.content.modifiers);
    console.log(this.lesson.content.diagram);

    // const figs = [2, 3, 4, 5, 6, 7, 8];
    // figs.forEach((f) => {
    //   const canvas = document.getElementById(`id_figure${f}_asdf`);
    //   // console.log(canvas)
    //   const draw2D = new DrawContext2D(canvas)
    //   // console.log(draw2D2)

    //   const dim = this.lesson.content.diagram.elements[`_fig${f}`]._dimensions;
    //   const d = dim._d;
    //   const c = dim._c;
    //   dim.updateContext(draw2D);
    //   d.setScale(10, -80)
    //   c.setScale(10, 80)
    // });

    const d = this.lesson.content.diagram;
    // d.draw(-1);
    // const c = document.getElementById('id_figure3a_asdf');
    // c.width = c.clientWidth * 2;
    // c.height = c.clientHeight * 2;
    // const ctx = c.getContext('2d');
    // console.log(ctx)
    // console.log(d.webglLow.gl.canvas)
    // ctx.drawImage(d.webglLow.gl.canvas, 0, 0, d.webglLow.gl.canvas.width, d.webglLow.gl.canvas.height, 0, 0, c.width, c.height);
    // ctx.drawImage(document.getElementById(`id_figure2_asdf`), 0, 400);
    // document.addEventListener(
    //   'scroll',
    //   () => {
    //     // console.log(window.pageYOffset)
    //     d.scrolled = true;
    //     // if (d.scrollingFast === false) {
    //     //   d.renderAllElementsToTiedCanvases();
    //     //   d.animateNextFrame(true);
    //     // } else {
    //     d.animateNextFrame(false, 'scroll event');
    //     // }
    //   },
    //   false,
    // );
    // const fig1 = d.elements._fig1;
    // const fig2 = d.elements._fig2;
    // const fig3 = d.elements._fig3;
    // console.log(fig1)
    // console.log(fig3)
    // let oldPos = fig1.getPosition();
    // // const oldScale = fig1.getScale();
    // fig1.setPosition(new Point(0, 0));
    // // fig3.setScale(new Point(1, 1));
    // fig1.show()
    // fig2.hide()
    // fig3.hide()
    // // d.renderToCanvas(document.getElementById('id_figure1_asdf'), new Rect(-2.5, -1.25, 5, 2.5), 0, 0, d.webglLow.gl.canvas.width, 1000, 400, 200);
    // // const elementCanvas = document.getElementById('id_figure1_asdf')
    // // const glCanvas = d.webglLow.gl.canvas;
    // // const width = elementCanvas.clientWidth * 3;
    // // const height = elementCanvas.clientHeight * 3;
    // // console.log(glCanvas.height, height)
    // // d.renderToCanvas(document.getElementById('id_figure1_asdf'),
    // //   new Rect(-5, -1, 10, 2),
    // //   glCanvas.width / 2 - width / 2,
    // //   glCanvas.height / 2 - height / 2,
    // //   width, height,
    // //   width, height,
    // // );
    // d.renderToCanvas(document.getElementById('id_figure1_asdf'));
    // fig1.hide()
    // fig1.setPosition(oldPos);
    
    // fig1.hide();
    // fig2.hide();

    d.renderAllElementsToTiedCanvases();
    const loadingElements = d.elements.getLoadingElements();
    console.log(loadingElements)
    for (let i = 0; i < loadingElements.length; i += 1) {
      const element = loadingElements[i];
      if (element.drawingObject.state === 'loading') {
        element.drawingObject.onLoad = () => {
          element.unrender();
          d.renderAllElementsToTiedCanvases();
        };
      }
    }

    // d.renderElementToTiedCanvas('fig1');
    // d.renderElementToTiedCanvas('fig2');
    // d.renderElementToTiedCanvas('fig4');
    // d.renderElementToTiedCanvas('fig5');
    // d.renderElementToTiedCanvas('fig6');
    // d.renderElementToTiedCanvas('fig7');
    // d.renderElementToTiedCanvas('fig8');

    // fig1.hide()
    // fig2.hide()
    // fig3.hide();

    // d.drawQueued = true;
    // fig2.show()
    // oldPos = fig2.getPosition();
    // fig2.setPosition(0, 0);
    // d.renderToCanvas(document.getElementById('id_figure2_asdf'));
    // fig2.hide()
    // fig2.setPosition(oldPos);

    // d.drawQueued = true;
    // fig1.show()
    // oldPos = fig1.getPosition();
    // fig1.setPosition(0, 0);
    // d.renderToCanvas(document.getElementById('id_figure1_asdf'));
    // fig1.hide()
    // fig1.setPosition(oldPos);

    // fig2.show()
    // fig3.show()

    d.draw(-1);
    // console.log(d.elements)
    // fig3.setScale(oldScale);
    // d._fig2.hide();
    // d._fig3.hide();
    // d._fig4.hide();
    // d._fig5.hide();
    // d._fig6.hide();
    // d._fig7.hide();
    // d._fig8.hide();
    // const canvas2 = document.getElementById('id_figure2_asdf');
    // console.log(canvas2)
    // const draw2D2 = new DrawContext2D(canvas2)
    // console.log(draw2D2)

    // const dim2 = this.lesson.content.diagram.elements._fig2._dimensions;
    // const d = this.lesson.content.diagram.elements._fig2._dimensions._d;
    // const c = this.lesson.content.diagram.elements._fig2._dimensions._c;
    // dim2.updateContext(draw2D);
    // d.setScale(10, -80)
    // c.setScale(10, 80)


    // const dim4 = this.lesson.content.diagram.elements._fig4._dimensions;
    // const d4 = this.lesson.content.diagram.elements._fig4._dimensions._d;
    // const c4 = this.lesson.content.diagram.elements._fig4._dimensions._c;
    // dim4.updateContext(draw2D);
    // d4.setScale(10, -80)
    // c4.setScale(10, 80)
    // console.log(this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm())
    // this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
    //   1,
    //   'left',
    //   'baseline',
    // );
    // this.lesson.content.diagram.elements.resize();
    // this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
    //   1,
    //   'left',
    //   'baseline',
    // );
    // console.log(this.lesson.content.diagram.elements._fig3._dimensions._eqn)
    // this.lesson.content.diagram.elements._fig3._dimensions._eqn.showForm('0');
  }

  // renderContent() {
  //   const output = [];
  //   this.state.content.forEach((element) => {
  //     if (typeof element === 'string' && element.charAt(0) === '<') {
  //       output.push(<div key={this.key}
  //         dangerouslySetInnerHTML={ {
  //           __html: element.slice(0, element.length - 1),
  //         } }>
  //         </div>);
  //     } else if (typeof element === 'string') {
  //       output.push(<div key={this.key}
  //         dangerouslySetInnerHTML={ {
  //           __html: applyMDModifiers(element, this.lesson.content.modifiers),
  //         } }>
  //       </div>);
  //     } else {
  //       output.push(element);
  //     }
  //     this.key += 1;
  //   });
  //   return output;
  // }

  renderContent() {
    let output = '';
    this.state.content.forEach((element) => {
      if (typeof element === 'string' && element.charAt(0) === '<') {
        output += element.slice();
        // output.push(<div key={this.key}
        //   dangerouslySetInnerHTML={ {
        //     __html: element.slice(0, element.length - 1),
        //   } }>
        //   </div>);
      } else if (typeof element === 'string') {
        output += applyMDModifiers(element, this.lesson.content.modifiers);
        // output.push(<div key={this.key}
        //   dangerouslySetInnerHTML={ {
        //     __html: applyMDModifiers(element, this.lesson.content.modifiers),
        //   } }>
        // </div>);
      }
    });
    return <div
      className="single_page_lesson__text_container"
      dangerouslySetInnerHTML={ {__html: output} }>
    </div>;
  }

  render() {
    return <div id={this.lesson.content.htmlId} className="single_page_lesson__container">
      <div id={this.lesson.content.diagramHtmlId} className="diagram__container lesson__diagram single_page_lesson__diagram_container">
        <canvas id="id_diagram__text__low" className='diagram__text'>
        </canvas>
        <canvas id="id_diagram__gl__low" className='diagram__gl'>
        </canvas>
        <div id="id_diagram__html" className='diagram__html'>
        </div>
        <canvas id="id_diagram__text__high" className='diagram__text'>
        </canvas>
        <canvas id="id_diagram__gl__high" className='diagram__gl'>
        </canvas>
      </div>
      <div className="single_page_lesson__text_container">
        {this.renderContent()}
      </div>
    </div>;
  }
}
