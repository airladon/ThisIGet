// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
// import '../../css/singlePageLesson.scss';
import StaticQR from './staticQR';
import PresentationQR from './presentationQR';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  content: Array<string | React.Element<'div'>>,
  qr: React.Element<'div'> | React.Element<typeof StaticQR>,
};

function align(elementId: string, containerId: string, linkId: string) {
  const element = document.getElementById(elementId);
  const container = document.getElementById(containerId);
  const link = document.getElementById(linkId);
  if (element == null || container == null || link == null) {
    return;
  }
  element.classList.remove('lesson__hide');
  const containerRect = container.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  if (windowWidth < containerRect.width) {
    element.style.left = '20px';
    return;
  }
  const linkLeft = linkRect.left - containerRect.left;
  element.style.left = '0';
  const newRect = element.getBoundingClientRect();
  const proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  const overFlow = containerRect.width - (proposedLeft + newRect.width);
  element.style.float = '';
  if (proposedLeft <= 20) {
    element.style.left = '20px';
  } else if (overFlow > 20) {
    element.style.left = `${proposedLeft}px`;
  } else {
    element.style.left = '';
    element.style.right = '20px';
  }
  const windowHeight = window.innerheight;
  if (windowHeight < containerRect.height) {
    element.style.top = '10px';
    return;
  }
  const linkTop = linkRect.top - containerRect.top;
  element.style.top = '0';
  const proposedTop = linkTop + linkRect.height;
  element.style.top = `${proposedTop}px`;
}

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
  contentChange: boolean;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 10;
    this.contentChange = false;
    this.state = {
      content: [],
      qr: <StaticQR content="Loading Reference" link="" title=""/>,
    };
  }

  showStaticQR(id: string, parameters: string) {
    this.setState({ qr: window.quickReference[parameters] });
    const presQR = document.getElementById('id_lesson__qr__content_pres');
    if (presQR != null) {
      presQR.classList.add('lesson__hide');
    }
    align('id_lesson__qr__content_static', 'id_single_page_lesson__text_container', id);
  }

  showPresQR(id: string, parameters: string) {
    const container = document.getElementById('id_single_page_lesson__text_container');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width - 40, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--lesson__qr__content_width', `calc(${width}px - 1em)`);
        doc.style.setProperty('--lesson__qr__content_height', `calc((${width}px - 1em) / 1.5)`);
      }
    }
    const staticQR = document.getElementById('id_lesson__qr__content_static');
    if (staticQR != null) {
      staticQR.classList.add('lesson__hide');
    }
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.lesson.content.showQR(path, qrid);
    align('id_lesson__qr__content_pres', 'id_single_page_lesson__text_container', id);
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
  // resizer() {
  //   console.log('resiser')
  //   // this.lesson.content.diagram.renderAllElementsToTiedCanvases(true);
  //   // console.log(this.lesson.content.diagram.webglLow)
  // }

  componentDidMount() {
    window.lessonFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
    this.lesson.initialize();
    // this.lesson.content.setDiagram(this.lesson.content.diagramHtmlId);
    // this.lesson.content.diagram.resize();
    this.contentChange = true;
    this.setState({
      content: this.lesson.content.sections[0],
    });
    this.lesson.content.diagram.enableScrolling();
    // window.addEventListener('resize', this.resizer.bind(this));
    // window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  // }

  // handleScroll() {
  //   this.lesson.content.diagram.updateHTMLElementTie();
  //   this.lesson.content.diagram.animateNextFrame();
  // }

  // eslint-disable-next-line class-methods-use-this
  close() {
    let element = document.getElementById('id_lesson__qr__content_static');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
    element = document.getElementById('id_lesson__qr__content_pres');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
  }

  componentDidUpdate() {
    setOnClicks(this.lesson.content.modifiers);
    const d = this.lesson.content.diagram;

    if (this.contentChange) {
      this.lesson.content.diagram.resize();
      d.renderAllElementsToTiedCanvases();
      const loadingElements = d.elements.getLoadingElements();
      for (let i = 0; i < loadingElements.length; i += 1) {
        const element = loadingElements[i];
        if (element.drawingObject.state === 'loading') {
          element.drawingObject.onLoad = () => {
            element.unrender();
            d.renderAllElementsToTiedCanvases();
            this.lesson.content.diagram.setFirstTransform();
          };
        }
      }
      this.contentChange = false;
      // this.lesson.content.diagram.resize();
    }
    // console.log(this.lesson.content.diagram.elements)
    // console.log('1')
    this.lesson.content.diagram.setFirstTransform();
    this.lesson.content.diagram.updateHTMLElementTie();
    // console.log('2')
    d.animateNextFrame();
    // this.lesson.content.diagram.updateHTMLElementTie();

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

    // d.draw(-1);
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
        id="id_single_page_lesson__text_container"
        className="single_page_lesson__text_container"
      >
        <div
          className="single_page_lesson__text_container_text"
          dangerouslySetInnerHTML={ { __html: output } }
        />
        {this.state.qr}
        <PresentationQR id="id_lesson__qr__content_pres__overlay"/>
    </div>;
  }

  render() {
    return <div id={this.lesson.content.htmlId} className="single_page_lesson__container">
      {this.renderContent()}
      <canvas id="hidden_offscreen"></canvas>
      <div id={this.lesson.content.diagramHtmlId} className="diagram__container lesson__diagram single_page_lesson__diagram_container">
        <canvas id="id_diagram__gl__offscreen" className="diagram__gl__offscreen">
        </canvas>
        <canvas id="id_diagram__text__offscreen" className="diagram__text__offscreen">
        </canvas>
        <canvas id="id_diagram__gl__low" className='diagram__gl'>
        </canvas>
        <canvas id="id_diagram__text__low" className='diagram__text'>
        </canvas>
        <div id="id_diagram__html" className='diagram__html'>
        </div>
      </div>
      
    </div>;
  }
}
