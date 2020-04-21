// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  x: number;
}
type Props = {
  changed: (number) => void,
  id: string,
  seek: number,
};

export default class SrollBar extends React.Component<Props, State> {
  touchState: 'up' | 'down';
  changed: (number) => void;
  id: string;
  initialSeek: number;

  constructor(props: Props) {
    super();
    this.changed = props.changed;
    this.id = props.id;
    this.touchState = 'up';
    this.initialSeek = props.seek;
    this.state = {
      x: 0,
    };
  }

  componentDidMount() {
    const element = document.getElementById(this.id);
    if (element == null) {
      return;
    }
    element.addEventListener('mousedown', this.touchDown.bind(this), false);
    window.addEventListener('mouseup', this.touchUp.bind(this), false);
    window.addEventListener('mousemove', this.touchMove.bind(this), false);
    this.seek(this.initialSeek);
  }

  touchDown(event: MouseEvent) {
    this.touchState = 'down';
    this.seekOffset(event.clientX);
  }

  touchUp() {
    this.touchState = 'up';
  }

  touchMove(event: MouseEvent) {
    if (this.touchState === 'down') {
      // this.seekOffset(event.clientX);
      this.seekOffset(event.clientX);
    }
  }

  seekOffset(offsetX: number) {
    const element = document.getElementById(this.id);
    if (element == null) {
      return;
    }
    const { width, left } = element.getBoundingClientRect();
    const percentage = (offsetX - left) / width;
    let percent = percentage;
    if (percent < 0) {
      percent = 0;
    }
    if (percent > 1) {
      percent = 1;
    }
    if (this.changed) {
      this.changed(percentage);
    }
    this.seek(percentage);
  }

  seek(percentIn: number) {
    const element = document.getElementById(this.id);
    if (element == null) {
      return;
    }
    const { width } = element.getBoundingClientRect();
    let percent = percentIn;
    if (percent < 0) {
      percent = 0;
    }
    if (percent > 1) {
      percent = 1;
    }
    this.setState({
      x: percent * width - 6,
    });
  }


  render() {  // eslint-disable-line class-methods-use-this
    return <div className='figureone_scrollbar' id={this.id}>
      <div
        className='figureone_scrollbar_totalTime'
        id={`${this.id}_totalTime`}
      />
      <div
        style={{
          width: `${this.state.x + 10}px`,
        }}
        className='figureone_scrollbar_currentTime'
        id={`${this.id}_currentTime`}
      />
      <div
        className='figureone_scrollbar_circle'
        id={`${this.id}_circle`}
        style={{
          left: `${this.state.x}px`,
        }}
      />
    </div>;
  }
}
