// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  playClass: string,
  pauseClass: string,
  volumeOnClass: string,
  volumeMuteClass: string,
  time: string,
}

type Props = {
  audioSrc: string;
  statesSrc: string;
  eventsSrc: string;
  slidesSrc: string;
};

export default class PlaybackControl extends React.Component<Props, State> {
  isPlaying: boolean;
  currentTime: number;
  seekTouchDown: boolean;
  volumeTouchDown: boolean;
  recorder: Recorder;
  timer: TimeoutID;

  constructor() {
    super();
    this.seekTouchDown = false;
    this.volumeTouchDown = false;
    this.state = {
      playClass: '',
      pauseClass: 'figureone_playback_control__hide',
      volumeOnClass: '',
      volumeMuteClass: '',
      time: '00:00 / 00:00',
    };
  }

  componentDidMount() {
    // this.recorder = new Recorder();
  }

  play() {
    const recorder = new Recorder();
    recorder.startPlayback(0);
    // recorder.audio.play();
    this.setState({
      pauseClass: '',
      playClass: 'figureone_playback_control__hide',
    });
    // if (recorder.audio) {
    //   recorder.audio.addEventListener('timeupdate', this.updateTime.bind(this), false);
    // }
    this.queueTimeUpdate();
  }

  queueTimeUpdate() {
    const recorder = new Recorder();
    const currentTime = recorder.getCurrentTime();
    this.updateTime(currentTime);
    if (recorder.isPlaying) {
      const timeToNextSecond = 1 - (currentTime - Math.floor(currentTime));
      setTimeout(this.queueTimeUpdate.bind(this), timeToNextSecond * 1000);
    }
  }

  updateTime(time: number) {
    const recorder = new Recorder();
    const totalTime = recorder.getTotalTime();
    this.setState({
      time: `${this.timeToStr(time)} / ${this.timeToStr(totalTime)}`,
    });
  }

  timeToStr(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  seek(toTime:number) {
    const recorder = new Recorder();
    if (recorder.audio) {
    //   recorder.audio.removeEventListener('timeupdate', this.updateTime.bind(this), false);
      recorder.audio.seek(toTime);
    }
  }

  pause() {
    const recorder = new Recorder();
    recorder.stopPlayback();
    // recorder.audio.pause();
    this.setState({
      playClass: '',
      pauseClass: 'figureone_playback_control__hide',
    });
    // if (recorder.audio) {
    //   recorder.audio.removeEventListener('timeupdate', this.updateTime.bind(this), false);
    // }
  }

  getVolume() {

  }

  setVolume() {

  }

  skipForward() {

  }

  skipBackward() {

  }


  // save() {
  //   if (this.state.label === 'Record') {
  //     const recorder = new Recorder();
  //     recorder.save();
  //   }
  // }

  // startTime(fromTime: number) {
  //   this.currentTime = fromTime;
  //   this.incrementTime();
  // }

  // incrementTime() {
  //   this.setTime(this.currentTime);
  //   this.timer = setTimeout(() => {
  //     const recorder = new Recorder();
  //     this.currentTime += 1;
  //     if (this.currentTime < recorder.getTotalTime());
  //     this.incrementTime();
  //   }, 1000);
  // }

  // // pressPlay() {
  // //   if (this.state.label === 'Record') {
  // //     const recorder = new Recorder();
  // //     recorder.startPlayback();
  // //   }
  // // }

  // pressPlay() {
  //   const recorder = new Recorder();
  //   recorder.stop();
  //   if (this.state.playLabel === 'Play') {
  //     this.setState({
  //       playLabel: 'Stop',
  //     });
  //     recorder.startPlayback(this.currentTime);
  //     this.incrementTime();
  //   } else if (this.state.playLabel === 'Stop') {
  //     this.setState({
  //       playLabel: 'Play',
  //     });
  //     recorder.stopPlayback();
  //     clearTimeout(this.timer);
  //   }
  // }

  // pressRecord() {
  //   const recorder = new Recorder();
  //   recorder.stopPlayback();
  //   if (this.state.label === 'Record') {
  //     this.setState({
  //       label: 'Stop',
  //       saveStyle: {
  //         display: 'inline-block',
  //         color: 'lightGrey',
  //         padding: '10px',
  //       },
  //     });
  //     recorder.start();
  //     this.setTime(0);
  //     this.incrementTime();
  //   } else if (this.state.label === 'Stop') {
  //     this.setState({
  //       label: 'Record',
  //       saveStyle: {
  //         display: 'inline-block',
  //         color: 'var(--color-site-text)',
  //         padding: '10px',
  //       },
  //     });
  //     recorder.stop();
  //     clearTimeout(this.timer);
  //   }
  //   // else if (this.state.label === 'show') {
  //   //   this.setState({ label: 'playback' });
  //   //   const recorder = new Recorder();
  //   //   recorder.show();
  //   // } else {
  //   //   this.setState({ label: 'record' });
  //   //   const recorder = new Recorder();
  //   //   recorder.startPlayback();
  //   // }
  // }

  // componentDidMount() {
  //   const element = document.getElementById('scrubber');
  //   if (element == null) {
  //     return;
  //   }
  //   this.currentTime = 0;
  //   element.addEventListener('mousedown', this.touchDown.bind(this), false);
  //   element.addEventListener('mouseup', this.touchUp.bind(this), false);
  //   element.addEventListener('mousemove', this.touchMove.bind(this), false);
  // }

  // touchDown(event: MouseEvent) {
  //   this.touchState = 'down';
  //   this.scrub(event.offsetX);
  // }

  // touchUp() {
  //   this.touchState = 'up';
  // }

  // touchMove(event: MouseEvent) {
  //   if (this.touchState === 'down') {
  //     this.scrub(event.offsetX);
  //   }
  // }

  // setTime(timeInSeconds: number) {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   this.setState({
  //     time: `${(minutes + seconds / 100).toFixed(2)}`,
  //   });
  // }

  // scrub(offsetX: number) {
  //   const element = document.getElementById('scrubber');
  //   if (element == null) {
  //     return;
  //   }
  //   const { width } = element.getBoundingClientRect();
  //   let percentage = offsetX / width;
  //   if (percentage < 0) {
  //     percentage = 0;
  //   }
  //   if (percentage > 1) {
  //     percentage = 1;
  //   }
  //   const recorder = new Recorder();
  //   recorder.scrub(percentage);
  //   const totalTime = recorder.getTotalTime();
  //   this.currentTime = Math.floor(percentage * totalTime)
  //   this.setTime(this.currentTime);

  //   this.setState({
  //     circleX: offsetX - 7,
  //   });
  // }


  render() {  // eslint-disable-line class-methods-use-this
    return <div className="figureone_playback_control">
      <div className="figureone_playback_control__seek_container">
        <div className="figureone_playback_control__seek_total"></div>
        <div className="figureone_playback_control__seek_time"></div>
        <div className="figureone_playback_control__seek_circle"></div>
      </div>
      <div className="figureone_playback_control__control_container">
        <div
          className={`figureone_playback_control__play ${this.state.playClass}`}
          onClick={this.play.bind(this)}
        />
        <div
          className={`figureone_playback_control__pause ${this.state.pauseClass}`}
          onClick={this.pause.bind(this)}
        />
        <div className="figureone_playback_control__time">
          {this.state.time}
        </div>
        <div className="figureone_playback_control__volume_on"/>
        <div className="figureone_playback_control__volume_mute"/>
        <div className="figureone_playback_control__volume_change"/>
        <div className="figureone_playback_control__settings"/>
        <div className="figureone_playback_control__full_screen"/>
      </div>
    </div>;
  }
}
