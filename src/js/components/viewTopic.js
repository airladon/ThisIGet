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

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    const element = document.getElementById('id_navigator__scroll_container_Geometry_1');
    const left = 0;
    const right = 2200;
    let pos = left;
    let direction = 1;
    const scroll = () => {
      if (direction === 1) {
        pos += 1.5;
        if (pos >= right) {
          direction = -1;
          pos = right;
        }
      } else {
        pos -= 1.5;
        if (pos <= left) {
          direction = 1;
          pos = left;
        }
      }
      element.scrollLeft = pos;
      window.requestAnimationFrame(scroll);
    }
    window.requestAnimationFrame(scroll);
    console.log(right);
    element.scrollLeft += 1000;
  }

  render() {
    return <TopicComponent
        version={this.props.version}
        isLoggedIn={this.props.isLoggedIn}
      />;
  }
}
