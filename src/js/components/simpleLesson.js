// @flow

import * as React from 'react';
import SimpleLesson from '../Lesson/SimpleLesson';

type Props = {
  lesson: SimpleLesson;
};

type State = {
  qr: React.Element<'div'>;
}

export default class SimpleLessonComponent extends React.Component
                                    <Props, State> {
  lesson: SimpleLesson;
  key: number;

  constructor(props: Props) {
    super(props);
    this.lesson = props.lesson;
    this.key = 0;
    this.state = { qr: <div id="testerqr"></div> };
  }

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.lesson.initialize();
    window.lessonFunctions = {
      tester: (id, parameters) => {
        console.log(id, parameters);
        console.log(window.quickReference[parameters])
        this.setState({ qr: window.quickReference[parameters] });
        const element = document.getElementById('testerqr');
        if (element != null) {
          element.classList.toggle('testerqr_hide');
        } else {
          console.log('no element');
        }
      },
    };
  }

  render() {
    return <div id={this.lesson.content.htmlId}>
      {this.lesson.content.sections}
      <div id="lesson__static_qrs">
        {this.state.qr}
      </div>
    </div>;
  }
}
