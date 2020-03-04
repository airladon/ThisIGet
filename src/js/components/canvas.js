// @flow

import * as React from 'react';
// import '../../css/style.scss';

type Props = {
  id?: string;
  didMountFn?: (string) => mixed;
};

export default class Canvas extends React.Component
                                    <Props> {
  componentDidMount() {
    if (this.props.didMountFn) {
      const id = this.props.id || '';
      this.props.didMountFn(id);
    }
  }

  render() {
    const id = this.props.id || '';
    return <div id={`${id}`} className="diagram__container">
        <canvas className='figureone__text'>
        </canvas>
        <canvas className='figureone__gl'>
        </canvas>
        <div className='figureone__html'>
        </div>
      </div>;
  }
}
