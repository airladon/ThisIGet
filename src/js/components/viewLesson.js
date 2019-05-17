// @flow

import * as React from 'react';
import LessonComponent from './lesson';
// import { LessonContent } from '../Lesson/LessonContent';
// import Lesson from '../Lesson/Lesson';

type Props = {
  lesson: Object,
  // lessonUID: string,
  // topicName: string,
  // versionUID: string,
  // lessonDetails: {
  //   uid: string,
  //   title: string,
  //   dependencies: Array<string>,
  //   enabled?: boolean,
  // },
  // versionDetails: {
  //   uid: string,
  //   topic: string,
  //   title: string,
  //   description: string,
  //   fullLesson: boolean,
  //   type: 'presentation' | 'singlePage' | 'generic',
  // },
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
        // lessonUID={this.props.lessonUID}
        // topicName={this.props.topicName}
        // versionUID={this.props.versionUID}
        // lessonDetails={this.props.lessonDetails}
        // versionDetails={this.props.versionDetails}
        isLoggedIn={this.props.isLoggedIn}
      />;
  }
}
