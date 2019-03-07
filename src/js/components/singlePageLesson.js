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

let updates = 0;

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
