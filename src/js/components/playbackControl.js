// @flow
import * as React from 'react';
import Fig from 'figureone';
import ScrollBar from './scrollBar';

const { Recorder, Diagram, FunctionMap } = Fig;
const { getObjectDiff } = Fig.tools.misc;

type State = {
  playClass: string,
  pauseClass: string,
  recordClass: string,
  volumeOnClass: string,
  volumeMuteClass: string,
  time: string,
  seek: number,
  timeValue: number,
}

type Props = {
  audioSrc: string;
  statesSrc: string;
  eventsSrc: string;
  slidesSrc: string;
  getDiagram: () => Diagram;
  // diagram: Diagram;
};

function timeToStr(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default class PlaybackControl extends React.Component<Props, State> {
  isPlaying: boolean;
  currentTime: number;
  seekTouchDown: boolean;
  volumeTouchDown: boolean;
  recorder: Recorder;
  timer: TimeoutID;
  getDiagram: () => Diagram;

  constructor(props: Props) {
    super();
    this.seekTouchDown = false;
    this.volumeTouchDown = false;
    this.state = {
      playClass: '',
      pauseClass: 'figureone_playback_control__hide',
      recordClass: '',
      volumeOnClass: '',
      volumeMuteClass: '',
      time: '00:00 / 00:00',
      timeValue: 0,
      seek: 0,
    };
    this.getDiagram = props.getDiagram;
  }

  play() {
    const recorder = new Recorder();
    recorder.playbackStopped = this.playbackStopped.bind(this);
    // console.log(this.state.time)
    if (this.state.seek < 1) {
      recorder.startPlayback(this.state.timeValue);
    } else {
      recorder.startPlayback(0);
    }
    this.setState({
      pauseClass: '',
      playClass: 'figureone_playback_control__hide',
    });
    this.queueTimeUpdate();
  }

  queueTimeUpdate() {
    const recorder = new Recorder();
    const currentTime = recorder.getCurrentTime();
    this.updateTime(currentTime);
    if (recorder.isPlaying) {
      // console.log(recorder.isPlaying)
      // const timeToNextSecond = 1 - (currentTime - Math.floor(currentTime));
      // setTimeout(this.queueTimeUpdate.bind(this), timeToNextSecond * 1000);
      setTimeout(this.queueTimeUpdate.bind(this), 20);
    }
  }

  updateTime(time: number) {
    const recorder = new Recorder();
    const totalTime = recorder.getTotalTime();
    this.setState({
      time: `${timeToStr(time)} / ${timeToStr(totalTime)}`,
      timeValue: time,
      seek: time / totalTime,
    });
    // const progressBar = document.getElementById('playback_control_seek');
    // if (progressBar) {
    //   progressBar.seek(time / totalTime);
    // }
  }

  // getTimeStr(time: number) {
  //   const recorder = new Recorder();
  //   const totalTime = recorder.getTotalTime();
  //   return 
  // }

  seekToPercent(percent: number) {
    const recorder = new Recorder();
    const totalTime = recorder.getTotalTime();
    // console.log('STARTING ****', percent * totalTime)
    this.setState({ seek: percent });
    recorder.seek(percent);
    this.updateTime(percent * totalTime);
    // recorder.seek(34.5 / totalTime);
    // this.updateTime(34.5);
    // console.log(recorder.states)
    // console.log(recorder.slides)
    // console.log(this.getDiagram().elements._circle._line1)
    // this.getDiagram().elements._circle._line1._line.afterDrawCallback = () => {
    //   console.log('line1', this.getDiagram().elements._circle._line1)
    // }
    // this.getDiagram().elements._circle._line2._line.afterDrawCallback = () => {
    //   console.log('line2', this.getDiagram().elements._circle._line2)
    // }
    // recorder.setSlide(5);
    // recorder.setState(58);
    // console.log(getObjectDiff(recorder.states[57], recorder.states[58]));
    // this.getDiagram().animateNextFrame();
  }

  seek(toTime: number) {
    const recorder = new Recorder();
    const totalTime = recorder.getTotalTime();
    const percent = toTime / totalTime;
    this.setState({ seek: percent });
    recorder.seek(percent);
    this.updateTime(toTime);
  }

  playbackStopped() {
    this.setState({
      playClass: '',
      pauseClass: 'figureone_playback_control__hide',
    });
  }

  pause() {
    const recorder = new Recorder();
    recorder.pausePlayback();
    // recorder.audio.pause();
    // this.setState({
    //   playClass: '',
    //   pauseClass: 'figureone_playback_control__hide',
    // });
    // this.playbackStopped
    // if (recorder.audio) {
    //   recorder.audio.removeEventListener('timeupdate', this.updateTime.bind(this), false);
    // }
  }

  record() {
    console.log('asdf');
  }

  getVolume() {

  }

  setVolume() {

  }

  skipForward() {

  }

  skipBackward() {

  }



  render() {  // eslint-disable-line class-methods-use-this
    return <div className="figureone_playback_control">
      <div className="figureone_playback_control__seek_container">
        <ScrollBar
          id='playback_control_seek'
          changed={this.seekToPercent.bind(this)}
          position={this.state.seek}
        />
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
        <div
          className={`figureone_playback_control__record ${this.state.recordClass}`}
          onClick={this.record.bind(this)}
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
