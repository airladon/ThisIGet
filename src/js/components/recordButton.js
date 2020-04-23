// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  label: 'Record' | 'Stop';
  saveStyle: Object,
  circleX: number,
  playLabel: 'Play' | 'Stop';
  time: string,
}
type Props = {};

export default class RecordButton extends React.Component<Props, State> {
  touchState: 'up' | 'down';
  currentTime: number;
  timer: TimeoutID;

  constructor() {
    super();
    this.touchState = 'up';
    this.state = {
      label: 'Record',
      playLabel: 'Play',
      saveStyle: {
        display: 'inline-block',
        color: 'lightGrey',
        padding: '10px',
      },
      circleX: 0,
      time: '00:00',
    };
  }

  save() {
    if (this.state.label === 'Record') {
      const recorder = new Recorder();
      recorder.save();
    }
  }

  startTime(fromTime: number) {
    this.currentTime = fromTime;
    this.incrementTime();
  }

  incrementTime() {
    this.setTime(this.currentTime);
    this.timer = setTimeout(() => {
      const recorder = new Recorder();
      this.currentTime += 1;
      if (this.currentTime < recorder.getTotalTime());
      this.incrementTime();
    }, 1000);
  }

  // pressPlay() {
  //   if (this.state.label === 'Record') {
  //     const recorder = new Recorder();
  //     recorder.startPlayback();
  //   }
  // }

  pressPlay() {
    const recorder = new Recorder();
    recorder.stop();
    if (this.state.playLabel === 'Play') {
      this.setState({
        playLabel: 'Stop',
      });
      recorder.startPlayback(this.currentTime);
      this.incrementTime();
    } else if (this.state.playLabel === 'Stop') {
      this.setState({
        playLabel: 'Play',
      });
      recorder.pausePlayback();
      clearTimeout(this.timer);
    }
  }

  pressRecord() {
    const recorder = new Recorder();
    recorder.pausePlayback();
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
      this.setTime(0);
      this.incrementTime();
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
      clearTimeout(this.timer);
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
    this.currentTime = 0;
    element.addEventListener('mousedown', this.touchDown.bind(this), false);
    element.addEventListener('mouseup', this.touchUp.bind(this), false);
    element.addEventListener('mousemove', this.touchMove.bind(this), false);
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
      this.seek(event.offsetX);
    }
  }

  setTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    this.setState({
      time: `${(minutes + seconds / 100).toFixed(2)}`,
    });
  }

  seek(offsetX: number) {
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
    const recorder = new Recorder();
    recorder.seek(percentage);
    const totalTime = recorder.getTotalTime();
    this.currentTime = Math.floor(percentage * totalTime)
    this.setTime(this.currentTime);

    this.setState({
      circleX: offsetX - 7,
    });
  }


  render() {  // eslint-disable-line class-methods-use-this
    return <div style={{ backgroundColor: 'var(--color-topic-background)' }}>
      <div
        className='record-button'
        style={{display: 'inline-block', padding: '10px' }}
        onClick={this.pressRecord.bind(this)}
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
        onClick={this.pressPlay.bind(this)}
      >{this.state.playLabel}
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
      <div
        style={{
          color: 'var(--color-site-text)',
          padding: '10px',
          width: '100%',
          textAlign: 'center',
        }}
      >{this.state.time}
      </div>
    </div>;
  }
}
