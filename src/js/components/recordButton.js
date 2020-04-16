// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  label: 'Record' | 'Stop';
  saveStyle: Object,
  circleX: number,
}
type Props = {};

export default class RecordButton extends React.Component<Props, State> {
  touchState: 'up' | 'down';

  constructor() {
    super();
    this.touchState = 'up';
    this.state = {
      label: 'Record',
      saveStyle: {
        display: 'inline-block',
        color: 'lightGrey',
        padding: '10px',
      },
      circleX: 0,
    };
  }

  save() {
    if (this.state.label === 'Record') {
      const recorder = new Recorder();
      recorder.save();
    }
  }

  play() {
    if (this.state.label === 'Record') {
      const recorder = new Recorder();
      recorder.startPlayback();
    }
  }

  record() {
    const recorder = new Recorder();
    recorder.stopPlayback();
    if (this.state.label === 'Record') {
      this.setState({
        label: 'Stop',
        saveStyle: {
          display: 'inline-block',
          color: 'lightGrey',
          padding: '10px',
        },
      });
      recorder.start();
    } else if (this.state.label === 'Stop') {
      this.setState({
        label: 'Record',
        saveStyle: {
          display: 'inline-block',
          color: 'var(--color-site-text)',
          padding: '10px',
        },
      });
      recorder.stop();
    }
    // else if (this.state.label === 'show') {
    //   this.setState({ label: 'playback' });
    //   const recorder = new Recorder();
    //   recorder.show();
    // } else {
    //   this.setState({ label: 'record' });
    //   const recorder = new Recorder();
    //   recorder.startPlayback();
    // }
  }

  componentDidMount() {
    const element = document.getElementById('scrubber');
    if (element == null) {
      return;
    }
    element.addEventListener('mousedown', this.touchDown.bind(this), false);
    element.addEventListener('mouseup', this.touchUp.bind(this), false);
    element.addEventListener('mousemove', this.touchMove.bind(this), false);
  }

  touchDown(event: MouseEvent) {
    this.touchState = 'down';
    this.scrub(event.offsetX);
  }

  touchUp() {
    this.touchState = 'up';
  }

  touchMove(event: MouseEvent) {
    if (this.touchState === 'down') {
      this.scrub(event.offsetX)
    }
  }

  scrub(offsetX: number) {
    this.setState({ circleX: offsetX - 7 });
    const element = document.getElementById('scrubber');
    if (element == null) {
      return;
    }
    const { width } = element.getBoundingClientRect();
    let percentage = offsetX / width;
    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 1) {
      percentage = 1;
    }
  }


  render() {  // eslint-disable-line class-methods-use-this
    return <div style={{ backgroundColor: 'var(--color-topic-background)' }}>
      <div
        className='record-button'
        style={{display: 'inline-block', padding: '10px' }}
        onClick={this.record.bind(this)}
      >{this.state.label}
      </div>
      <div
        className='save-button'
        style={ this.state.saveStyle }
        onClick={this.save.bind(this)}
      >Save
      </div>
      <div
        className='play-button'
        style={ this.state.saveStyle }
        onClick={this.play.bind(this)}
      >Play
      </div>
      <div
        id='scrubber'
        style={{
          width: '500px',
          height: '20px',
          backgroundColor: 'lightGrey',
          padding: '10px',
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div
          id='scrubber-circle'
          style={{
            width: '15px',
            height: '15px',
            position: 'absolute',
            padding: '0',
            backgroundColor: 'var(--color-site-text)',
            borderRadius: '10px',
            top: '3px',
            left: this.state.circleX,
            pointerEvents: 'none',
          }}
        >
        </div>
      </div>
    </div>;
  }
}
