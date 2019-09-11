// @flow

import * as React from 'react';
import TopicComponent from './topic';

type Props = {
  version: Object,
  isLoggedIn: boolean,
  username: string,
};

export default class ViewTopic extends React.Component
                                    <Props> {
  topic: Object;
  render() {
    return <TopicComponent
        version={this.props.version}
        isLoggedIn={this.props.isLoggedIn}
      />;
  }
}
