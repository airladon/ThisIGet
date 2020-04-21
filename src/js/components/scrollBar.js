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
  position: number,
};

export default class SrollBar extends React.Component<Props, State> {
  touchState: 'up' | 'down';
  changed: (number) => void;
  id: string;
  // initialSeek: number;

  constructor(props: Props) {
    super();
    this.changed = props.changed;
    this.id = props.id;
    this.touchState = 'up';
    // this.initialSeek = props.seek;
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
  }

  touchDown(event: MouseEvent) {
    this.touchState = 'down';
    this.touchHandler(event.clientX);
  }

  touchUp() {
    this.touchState = 'up';
  }

  touchMove(event: MouseEvent) {
    if (this.touchState === 'down') {
      this.touchHandler(event.clientX);
    }
  }

  touchHandler(x: number) {
    if (this.changed) {
      const percent = this.clientXToPercent(x);
      this.changed(percent);
    }
  }

  getValue() {
    const element = document.getElementById(this.id);
    if (element == null) {
      return 0;
    }
    // let circleWidth = 10;
    const circle = document.getElementById(`${this.id}_circle`);
    if (circle == null) {
      return  0;
    }
    const circleRect = circle.getBoundingClientRect();
    const seekRect = element.getBoundingClientRect();
    const x = circleRect.left - seekRect.left + circleRect.width / 2;
    return this.clientXToPercent(x);
  }

  percentToX(percentIn: number) {
    let percent = percentIn;
    if (percent > 1) {
      percent = 1;
    } else if (percent < 0) {
      percent = 0;
    }
    const element = document.getElementById(this.id);
    if (element == null) {
      return 0;
    }
    const circle = document.getElementById(`${this.id}_circle`);
    if (circle == null) {
      return 0;
    }
    const circleWidth = circle.getBoundingClientRect().width;
    const { width } = element.getBoundingClientRect();
    return width * percent - circleWidth / 2;
  }

  clientXToPercent(x: number) {
    const element = document.getElementById(this.id);
    if (element == null) {
      return 0;
    }
    const circle = document.getElementById(`${this.id}_circle`);
    if (circle == null) {
      return 0;
    }
    const circleWidth = circle.getBoundingClientRect().width;
    const { left, width } = element.getBoundingClientRect();
    let percent = (x - left + circleWidth / 2) / width;
    if (percent > 1) {
      percent = 1;
    } else if (percent < 0) {
      percent = 0;
    }
    return percent;
  }

  render() {  // eslint-disable-line class-methods-use-this
    return <div className='figureone_scrollbar' id={this.id}>
      <div
        className='figureone_scrollbar_totalTime'
        id={`${this.id}_totalTime`}
      />
      <div
        style={{
          width: `${this.percentToX(this.props.position) + 10}px`,
        }}
        className='figureone_scrollbar_currentTime'
        id={`${this.id}_currentTime`}
      />
      <div
        className='figureone_scrollbar_circle'
        id={`${this.id}_circle`}
        style={{
          left: `${this.percentToX(this.props.position)}px`,
        }}
      />
    </div>;
  }
}
