// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';
import LinksTable from './linksTable';

type Props = {
  lesson: SimpleLesson;
  isLoggedIn: boolean;
};

export default class LinksLessonComponent extends React.Component
                                    <Props> {
  lesson: SimpleLesson;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
  }

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
  }

  renderSections() {
    const sections = [];
    this.lesson.content.sections.forEach((section, index) => {
      if (section.links != null) {
        sections.push(
          <div key={index}>
            <LinksTable links={section.links} isLoggedIn={this.props.isLoggedIn} />
          </div>,
        );
      } else {
        sections.push(
          <div key={index}>
            {section}
          </div>,
        );
      }
    });
    return sections;
  }

  render() {
    return <div id={this.lesson.content.htmlId} className="simple_lesson__container">
      {this.renderSections()}
      <div id="single_page_lesson__qr__overlay" className="lesson__qr__overlay">
        <div id="lesson__qr__container">
          <div id="id_qr_diagram" className="diagram__container lesson__diagram">
            <canvas id="id_qr_diagram__text" className='diagram__text'>
            </canvas>
            <canvas id="id_qr_diagram__gl" className='diagram__gl'>
            </canvas>
            <div id="id_diagram__html" className='diagram__html'>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // render() {
  //   return <div id={this.lesson.content.htmlId}>
  //     <div key={0} className="simple_lesson__container">
  //       <LinksTable links={version.details.links} />
  //     </div>,
  //     {this.lesson.content.sections[0]}
  //   </div>;
  // }
}
