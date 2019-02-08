// @flow

import * as React from 'react';
import LessonComponent from './lesson';
import { LessonContent } from '../Lesson/LessonContent';
import Lesson from '../Lesson/Lesson';

type Props = {
  content: LessonContent,
  lessonDetails: Object,
  versionDetails: Object,
  isLoggedIn: boolean,
  username: string,
};

export default class ViewLesson extends React.Component
                                    <Props> {
  lesson: Lesson;

  constructor(props: Props) {
    super(props);
    this.lesson = new Lesson(this.props.content);
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.active;
    return <div>
      <LessonComponent
        lesson={this.lesson}
        lessonDetails={this.props.lessonDetails}
        versionDetails={this.props.versionDetails}
      />
    </div>;
  }
}
