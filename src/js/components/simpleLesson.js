// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';

type Props = {
  lesson: SimpleLesson;
};

export default class SimpleLessonComponent extends React.Component
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

  render() {
    return <div id={this.lesson.content.htmlId}>
      {this.lesson.content.sections[0]}
    </div>;
  }
}
