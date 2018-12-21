// @flow

import * as React from 'react';
import '../css/style.scss';

type Props = {
  className?: string,
  children?: React.Node,
  fluid?: boolean,
  style?: Object;
};

export default class Container extends React.Component
                                    <Props> {
  render() {
    const props = Object.assign({}, this.props);
    const className = `container${props.fluid ? '-fluid' : ''} ${props.className || ''}`;

    return <div className={className} style={props.style}>
      {props.children}
    </div>;
  }
}
