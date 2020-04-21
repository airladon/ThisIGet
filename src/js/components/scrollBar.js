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
};

export default class SrollBar extends React.Component<Props, State> {
  touchState: 'up' | 'down';
  changed: (number) => void;
  id: string;

  constructor(props: Props) {
    super();
    this.changed = props.changed;
    this.id = props.id;
    this.touchState = 'up';
    this.state = {
      x: 0,
    };
  }

  componentDidMount() {
    const element = document.getElementById(this.id);
    if (element == null) {
      return;
    }
    this.currentTime = 0;
    element.addEventListener('mousedown', this.touchDown.bind(this), false);
    window.addEventListener('mouseup', this.touchUp.bind(this), false);
    window.addEventListener('mousemove', this.touchMove.bind(this), false);
  }

  touchDown(event: MouseEvent) {
    this.touchState = 'down';
    this.seek(event.offsetX);
  }

  touchUp() {
    this.touchState = 'up';
  }

  touchMove(event: MouseEvent) {
    if (this.touchState === 'down') {
      this.seek(event.clientX);
    }
  }

  // setCircle()

  seek(offsetX: number) {
    const element = document.getElementById(this.id);
    if (element == null) {
      return;
    }
    const { width, left } = element.getBoundingClientRect();
    let percentage = (offsetX - left)/ width;
    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 1) {
      percentage = 1;
    }
    // const recorder = new Recorder();
    // recorder.seek(percentage);
    // const totalTime = recorder.getTotalTime();
    // this.currentTime = Math.floor(percentage * totalTime)
    // this.setTime(this.currentTime);
    if (this.changed) {
      this.changed(percentage);
    }
    this.setState({
      x: offsetX - 7,
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
