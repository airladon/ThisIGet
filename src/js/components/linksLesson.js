// @flow

import * as React from 'react';
import SimpleFormat from '../Lesson/SimpleFormat';
import LinksTable from './linksTable';

type Props = {
  lesson: SimpleFormat;
  isLoggedIn: boolean;
};

export default class LinksLessonComponent extends React.Component
                                    <Props> {
  lesson: SimpleFormat;
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
    </div>;
  }

  // render() {
  //   return <div id={this.lesson.content.htmlId}>
  //     <div key={0} className="simple_lesson__container">
  //       <LinksTable links={version.links} />
  //     </div>,
  //     {this.lesson.content.sections[0]}
  //   </div>;
  // }
}
