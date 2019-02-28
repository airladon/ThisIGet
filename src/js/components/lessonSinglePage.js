// @flow

import * as React from 'react';
import LessonSinglePage from '../Lesson/LessonSinglePage';

type Props = {
  lesson: LessonSinglePage;
};

export default class LessonSinglePageComponent extends React.Component
                                    <Props> {
  lesson: LessonSinglePage;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
    console.log(this.lesson)
  }

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
  }

  render() {
    return <div>
      {this.lesson.content.sections[0]}
    </div>;
  }
}
