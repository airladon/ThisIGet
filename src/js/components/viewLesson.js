// @flow

import * as React from 'react';
import TopicComponent from './topic';

type Props = {
  topic: Object,
  isLoggedIn: boolean,
  username: string,
};

export default class ViewTopic extends React.Component
                                    <Props> {
  topic: Object;
  render() {
    return <TopicComponent
        topic={this.props.topic}
        isLoggedIn={this.props.isLoggedIn}
      />;
  }
}
