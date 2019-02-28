// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';

type Props = {
  lesson: SimpleLesson;
};

const { applyModifiers } = Fig.tools.html;

const applyMDModifiers = (inputText: string) => {
  let outputText = '';

  if (inputText.trim().startsWith('##')) {
    outputText = `<div class="single_page_lesson__header2">${inputText.slice(2)}</div>`;
  } else if (inputText.trim().startsWith('#')) {
    outputText = `<div class="single_page_lesson__header1">${inputText.slice(1)}</div>`;
  } else {
    outputText = `<p class="single_page_lesson__text">${applyModifiers(inputText, {})}</p>`;
  }
  return outputText;
};

export default class SinglePageLessonComponent extends React.Component
                                    <Props> {
  lesson: SimpleLesson;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 10;
  }

  componentWillMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
  }

  componentDidMount() {
    this.lesson.content.setDiagram(this.lesson.content.diagramHtmlId);
  }

  renderContent() {
    const content = this.lesson.content.sections[0];
    const output = [];
    content.forEach((element) => {
      if (typeof element === 'string' && element.charAt(0) === '<') {
        output.push(<div key={this.key}
          dangerouslySetInnerHTML={ {
            __html: element.slice(0, element.length - 1),
          } }>
          </div>);
      } else if (typeof element === 'string') {
        output.push(<div key={this.key}
          dangerouslySetInnerHTML={ {
            __html: applyMDModifiers(element),
          } }>
        </div>);
      } else {
        output.push(element);
      }
      this.key += 1;
    });
    return output;
  }

  render() {
    return <div id={this.lesson.content.htmlId} className="single_page_lesson__container">
      {this.renderContent()}
      <div id={this.lesson.content.diagramHtmlId} className="diagram__container lesson__diagram single_page_lesson__diagram_container">
        <canvas id="id_diagram__text__low" className='diagram__text'>
        </canvas>
        <canvas id="id_diagram__gl__low" className='diagram__gl'>
        </canvas>
        <div id="id_diagram__html" className='diagram__html'>
          {/*this.renderContent(this.state.htmlText)*/}
        </div>
        <canvas id="id_diagram__text__high" className='diagram__text'>
        </canvas>
        <canvas id="id_diagram__gl__high" className='diagram__gl'>
        </canvas>
      </div>
    </div>;
  }
}
