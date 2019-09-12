// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleFormat from '../../Lesson/SimpleFormat';
// import '../../css/singlePageLesson.scss';
import StaticQR from '../staticQR';
import PresentationQR from '../presentationQR';

type Props = {
  version: SimpleFormat;
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
  // element.classList.remove('lesson__hide');
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

  if (inputText.trim().startsWith('###')) {
    outputText = `<h3>${inputText.slice(3)}</h3>`;
  } else if (inputText.trim().startsWith('##')) {
    outputText = `<h2>${inputText.slice(2)}</h2>`;
  } else if (inputText.trim().startsWith('#')) {
    outputText = `<h1>${inputText.slice(1)}</h1>`;
  } else {
    outputText = `<p class="single_page_lesson__text">${applyModifiers(inputText, modifiers)}</p>`;
  }
  return outputText;
};

export default class SinglePageFormatComponent extends React.Component
                                    <Props, State> {
  version: SimpleFormat;
  key: number;
  contentChange: boolean;
  afterUpdate: ?() => void;

  constructor(props: Props) {
    super(props);
    this.version = props.version;
    this.key = 10;
    this.contentChange = false;
    this.state = {
      content: [],
      qr: <StaticQR content="Loading Reference" link="" title=""/>,
    };
    this.afterUpdate = null;
  }

  showStaticQR(id: string, parameters: string) {
    this.setState({ qr: window.quickReference[parameters] });
    const presQR = document.getElementById('id_topic__qr__pres_container');
    if (presQR != null) {
      presQR.classList.add('lesson__hide');
    }
    const element = document.getElementById('id_topic__qr__static_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }

    align('id_topic__qr__static_container', 'id_single_page_lesson__text_container', id);
    this.afterUpdate = () => {
      align('id_topic__qr__static_container', 'topic__content', id);
    };
  }

  showPresQR(id: string, parameters: string) {
    const container = document.getElementById('id_single_page_lesson__text_container');
    if (container != null) {
      const containerRect = container.getBoundingClientRect();
      const width = Math.min(containerRect.width - 40, 600);
      const doc = document.documentElement;
      if (doc != null) {
        doc.style.setProperty('--topic__qr__content_width', `calc(${width}px - 1em)`);
        doc.style.setProperty('--topic__qr__content_height', `calc((${width}px - 1em) / 1.5)`);
      }
    }
    const staticQR = document.getElementById('id_topic__qr__static_container');
    if (staticQR != null) {
      staticQR.classList.add('lesson__hide');
    }
    const element = document.getElementById('id_topic__qr__pres_container');
    if (element != null) {
      element.classList.remove('lesson__hide');
    }
    const path = parameters.split('/').slice(0, -1).join('/');
    const qrid = parameters.split('/').slice(-1)[0];
    this.version.content.showQR(path, qrid);
    align('id_topic__qr__pres_container', 'id_single_page_lesson__text_container', id);
    this.version.content.qrDiagram.resize();
    this.version.content.qrDiagram.animateNextFrame();
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
  //   // this.version.content.diagram.renderAllElementsToTiedCanvases(true);
  //   // console.log(this.version.content.diagram.webglLow)
  // }

  componentDidMount() {
    window.topicFunctions = {
      qr: (id, parameters) => {
        if (React.isValidElement(window.quickReference[parameters])) {
          this.showStaticQR(id, parameters);
        } else {
          this.showPresQR(id, parameters);
        }
      },
    };
    this.version.initialize();
    // this.version.content.setDiagram(this.version.content.diagramHtmlId);
    // this.version.content.diagram.resize();
    this.contentChange = true;
    this.setState({
      content: this.version.content.sections[0],
    });
    this.version.content.diagram.enableScrolling();
    // window.addEventListener('resize', this.resizer.bind(this));
    // window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  // }

  // handleScroll() {
  //   this.version.content.diagram.updateHTMLElementTie();
  //   this.version.content.diagram.animateNextFrame();
  // }

  // eslint-disable-next-line class-methods-use-this
  close() {
    let element = document.getElementById('id_topic__qr__content_static');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
    element = document.getElementById('id_topic__qr__content_pres');
    if (element != null) {
      element.classList.add('lesson__hide');
    }
  }

  componentDidUpdate() {
    if (this.afterUpdate != null) {
      this.afterUpdate();
      this.afterUpdate = null;
    }
    setOnClicks(this.version.content.modifiers);
    const d = this.version.content.diagram;

    if (this.contentChange) {
      this.version.content.diagram.resize();
      d.renderAllElementsToTiedCanvases();
      const loadingElements = d.elements.getLoadingElements();
      for (let i = 0; i < loadingElements.length; i += 1) {
        const element = loadingElements[i];
        if (element.drawingObject.state === 'loading') {
          element.drawingObject.onLoad = () => {
            element.unrender();
            d.renderAllElementsToTiedCanvases();
            this.version.content.diagram.setFirstTransform();
          };
        }
      }
      this.contentChange = false;
      // this.version.content.diagram.resize();
    }
    // console.log(this.version.content.diagram.elements)
    // console.log('1')
    this.version.content.diagram.setFirstTransform();
    this.version.content.diagram.updateHTMLElementTie();
    // console.log('2')
    d.animateNextFrame();
    // this.version.content.diagram.updateHTMLElementTie();

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

    // const dim2 = this.version.content.diagram.elements._fig2._dimensions;
    // const d = this.version.content.diagram.elements._fig2._dimensions._d;
    // const c = this.version.content.diagram.elements._fig2._dimensions._c;
    // dim2.updateContext(draw2D);
    // d.setScale(10, -80)
    // c.setScale(10, 80)


    // const dim4 = this.version.content.diagram.elements._fig4._dimensions;
    // const d4 = this.version.content.diagram.elements._fig4._dimensions._d;
    // const c4 = this.version.content.diagram.elements._fig4._dimensions._c;
    // dim4.updateContext(draw2D);
    // d4.setScale(10, -80)
    // c4.setScale(10, 80)
    // console.log(this.version.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm())
    // this.version.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
    //   1,
    //   'left',
    //   'baseline',
    // );
    // this.version.content.diagram.elements.resize();
    // this.version.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
    //   1,
    //   'left',
    //   'baseline',
    // );
    // console.log(this.version.content.diagram.elements._fig3._dimensions._eqn)
    // this.version.content.diagram.elements._fig3._dimensions._eqn.showForm('0');
  }


  renderContent() {
    let output = '';
    this.state.content.forEach((element) => {
      // if (typeof element === 'string' && element.charAt(0) === '<') {
      //   output += element.slice();
      //   // output.push(<div key={this.key}
      //   //   dangerouslySetInnerHTML={ {
      //   //     __html: element.slice(0, element.length - 1),
      //   //   } }>
      //   //   </div>);
      // } else if (typeof element === 'string') {
      //   output += applyMDModifiers(element, this.version.content.modifiers);
      //   // output.push(<div key={this.key}
      //   //   dangerouslySetInnerHTML={ {
      //   //     __html: applyMDModifiers(element, this.version.content.modifiers),
      //   //   } }>
      //   // </div>);
      // }

      if (typeof element === 'string') {
        output += applyMDModifiers(element, this.version.content.modifiers);
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
        <div id="id_topic__qr__static_container" className="topic__qr__container lesson__hide">
                  {this.state.qr}
        </div>
        <div id="id_topic__qr__pres_container" className="topic__qr__container lesson__hide">
          <PresentationQR id="id_topic__qr__content_pres__overlay"/>
        </div>
    </div>;
  }

  render() {
    return <div id={this.version.content.htmlId} className="single_page_lesson__container">
      {this.renderContent()}
      <canvas id="hidden_offscreen"></canvas>
      <div id={this.version.content.diagramHtmlId} className="diagram__container topic__diagram single_page_topic__diagram_container">
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
