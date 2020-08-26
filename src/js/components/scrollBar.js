// @flow
import * as React from 'react';
import Fig from 'figureone';
import { supportsPassive } from '../tools/misc';

// const { Recorder } = Fig;

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
    const page = document.getElementById('single-page-content');
    if (page == null) {
      return;
    }

    element.addEventListener('mousedown', this.mouseDownHandler.bind(this), false);
    window.addEventListener('mouseup', this.mouseUpHandler.bind(this), false);
    window.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    page.addEventListener('mouseleave', this.mouseUpHandler.bind(this), false);
    element.addEventListener('touchstart', this.touchStartHandler.bind(this), supportsPassive() ? { passive: false } : false);
    window.addEventListener('touchend', this.touchEndHandler.bind(this), supportsPassive() ? { passive: false } : false);
    window.addEventListener('touchmove', this.touchMoveHandler.bind(this), supportsPassive() ? { passive: false } : false);

    // element.addEventListener('touchstart', this.touchStartHandler.bind(this), false);
    // window.addEventListener('touchend', this.touchEndHandler.bind(this), false);
    // window.addEventListener('touchmove', this.touchMoveHandler.bind(this), false);
  }

  touchHandler(x: number) {
    if (this.changed) {
      const percent = this.clientXToPercent(x);
      this.changed(percent);
    }
  }

  touchStartHandler(event: TouchEvent) {
    this.touchState = 'down';
    const touch = event.touches[0];
    this.touchHandler(touch.clientX);
  }

  mouseDownHandler(event: MouseEvent) {
    this.touchState = 'down';
    this.touchHandler(event.clientX);
  }

  touchMoveHandler(event: TouchEvent) {
    if (this.touchState === 'down') {
      const touch = event.touches[0];
      this.touchHandler(touch.clientX);
      event.preventDefault();
    }
  }

  mouseMoveHandler(event: MouseEvent) {
    if (this.touchState === 'down') {
      this.touchHandler(event.clientX);
      event.preventDefault();
    }
  }

  mouseUpHandler() {
    this.endHandler();
  }

  touchEndHandler() {
    this.endHandler();
  }

  endHandler() {
    this.touchState = 'up';
  }

  getValue() {
    const bar = document.getElementById(this.id);
    if (bar == null) {
      return 0;
    }
    // let circleWidth = 10;
    const circle = document.getElementById(`${this.id}_circle`);
    if (circle == null) {
      return 0;
    }
    const circleRect = circle.getBoundingClientRect();
    const seekRect = bar.getBoundingClientRect();
    const x = circleRect.left - seekRect.left + circleRect.width / 2;
    return this.clientXToPercent(x);
  }

  // percentToCirclePosition(percentIn: number) {
  //   let percent = percentIn;
  //   if (percent > 1) {
  //     percent = 1;
  //   } else if (percent < 0) {
  //     percent = 0;
  //   }
  //   const bar = document.getElementById(this.id);
  //   const circle = document.getElementById(`${this.id}_circle`);
  //   if (bar == null || circle == null) {
  //     return 0;
  //   }
  //   const circleWidth = circle.getBoundingClientRect().width;
  //   const { width } = bar.getBoundingClientRect();
  //   console.log(width)
  //   return circleWidth / 2 + (width - circleWidth) * percent - circleWidth / 2;
  // }

  clientXToPercent(x: number) {
    const bar = document.getElementById(this.id);
    const circle = document.getElementById(`${this.id}_circle`);
    if (bar == null || circle == null) {
      return 0;
    }
    const circleWidth = circle.getBoundingClientRect().width;
    const { left, width } = bar.getBoundingClientRect();
    let percent = (x - (left + circleWidth / 2)) / (width - circleWidth);
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
          width: `calc(${this.props.position * 100}%`,
        }}
        className='figureone_scrollbar_currentTime'
        id={`${this.id}_currentTime`}
      />
      <div
        className='figureone_scrollbar_circle'
        id={`${this.id}_circle`}
        style={{
          left: `calc((100% - 12px) * ${this.props.position})`
        }}
      />
    </div>;
  }
}
