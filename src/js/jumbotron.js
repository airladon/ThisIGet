// @flow

import * as React from 'react';
import '../css/style.scss';
import { classify } from './tools/misc';
import Container from './container';
// import ReactDOM from 'react-dom';

type Props = {
  className?: string,
  children?: React.Node,
  containerFluid?: boolean
};

export default class Jumbotron extends React.Component
                                    <Props> {
  render() {
    const CSS_NAME = 'jumbotron';
    const props = Object.assign({}, this.props);
    const containerFluid = props.containerFluid || false;
    delete props.containerFluid;

    props.className = classify(CSS_NAME, props.className || '');
    const body = props.className.includes(`${CSS_NAME}-fluid`)
      ? <Container fluid={containerFluid} style={{ color: 'yellow' }}>
          {props.children}
        </Container>
      : props.children;
    return <div {...props}>
      {body}
    </div>;
  }
}
