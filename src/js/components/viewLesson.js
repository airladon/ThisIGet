// @flow

import * as React from 'react';
import LessonComponent from './lesson';
// import { LessonContent } from '../Lesson/LessonContent';
// import Lesson from '../Lesson/Lesson';

type Props = {
  lesson: Object,
  lessonDetails: Object,
  versionDetails: Object,
  isLoggedIn: boolean,
  username: string,
};

export default class ViewLesson extends React.Component
                                    <Props> {
  lesson: Object;

  // constructor(props: Props) {
  //   super(props);
  //   this.lesson = new Lesson(this.props.lesson);
  // }

  render() {
    const props = Object.assign({}, this.props);
    delete props.active;
    return <LessonComponent
        lesson={this.props.lesson}
        lessonDetails={this.props.lessonDetails}
        versionDetails={this.props.versionDetails}
        isLoggedIn={this.props.isLoggedIn}
      />;
  }
}
