// @flow
import * as React from 'react';
import Fig from 'figureone';
import ScrollBar from './scrollBar';

const { Recorder, Diagram, FunctionMap } = Fig;
const { getObjectDiff } = Fig.tools.misc;

type State = {
  playClass: string,
  playPauseClass: string,
  recordClass: string,
  recordPauseClass: string,
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
      playPauseClass: 'figureone_playback_control__hide',
      recordClass: '',
      recordPauseClass: 'figureone_playback_control__hide',
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
    if (recorder.duration === 0) {
      return;
    }
    recorder.startPlayback(this.state.timeValue);
    recorder.playbackStoppedCallback = this.playToPause.bind(this);
    this.setState({
      playPauseClass: '',
      playClass: 'figureone_playback_control__hide',
    });
    this.queueTimeUpdate();
  }

  playToPause() {
    this.setState({
      playClass: '',
      playPauseClass: 'figureone_playback_control__hide',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  pause() {
    const recorder = new Recorder();
    recorder.pausePlayback();
  }

  record() {
    const recorder = new Recorder();
    recorder.stateTimeStep = 1;
    recorder.startRecording(this.state.timeValue);
    if (this.state.timeValue === 0) {
      recorder.recordEvent('slide', ['goto', '', 0], 0);
    }
    this.queueTimeUpdate();
    this.setState({
      recordPauseClass: '',
      recordClass: 'figureone_playback_control__hide',
    });
  }


  pauseRecording() {
    const recorder = new Recorder();
    recorder.stopRecording();
    this.setState({
      recordClass: '',
      recordPauseClass: 'figureone_playback_control__hide',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showRecording() {
    const recorder = new Recorder();
    recorder.show();
  }

  // eslint-disable-next-line class-methods-use-this
  saveRecording() {
    const recorder = new Recorder();
    recorder.save();
  }

  queueTimeUpdate() {
    const recorder = new Recorder();
    const currentTime = recorder.getCurrentTime();
    this.updateTime(currentTime);
    if (recorder.state !== 'idle') {
      setTimeout(this.queueTimeUpdate.bind(this), 20);
    }
  }

  updateTime(time: number) {
    const recorder = new Recorder();
    let totalTime = recorder.duration;
    if (recorder.state === 'recording') {
      if (time > totalTime) {
        totalTime = time;
      }
    }
    this.setState({
      time: `${timeToStr(Math.floor(time))} / ${timeToStr(totalTime)}`,
      timeValue: time,
      seek: time / totalTime,
    });
  }


  seekToPercent(percent: number) {
    const recorder = new Recorder();
    const totalTime = recorder.duration;
    this.setState({ seek: percent });
    recorder.seekToPercent(percent);
    this.updateTime(percent * totalTime);
  }

  seek(toTime: number) {
    const recorder = new Recorder();
    const totalTime = recorder.duration;
    const percent = toTime / totalTime;
    this.setState({ seek: percent });
    recorder.seek(percent);
    this.updateTime(toTime);
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
      <div className="figureone_playback_control__h_space"/>
      <div
        className={`figureone_playback_control__play ${this.state.playClass}`}
        onClick={this.play.bind(this)}
      />
      <div
        className={`figureone_playback_control__pause ${this.state.playPauseClass}`}
        onClick={this.pause.bind(this)}
      />
      <div className="figureone_playback_control__time">
        {this.state.time}
      </div>
      <div className="figureone_playback_controll_seek_container">
        <ScrollBar
          id='playback_control_seek'
          changed={this.seekToPercent.bind(this)}
          position={this.state.seek}
        />
      </div>
      <div
        className={`figureone_playback_control__record ${this.state.recordClass}`}
        onClick={this.record.bind(this)}
      />
      <div
        className={`figureone_playback_control__pause_recording ${this.state.recordPauseClass}`}
        onClick={this.pauseRecording.bind(this)}
      />
      <div
        className={'figureone_playback_control__show_recording'}
        onClick={this.showRecording.bind(this)}
      >
        show
      </div>
      <div
        className={'figureone_playback_control__save_recording'}
        onClick={this.saveRecording.bind(this)}
      >
        save
      </div>
      <div className="figureone_playback_control__h_space"/>
      { /*
      <div className="figureone_playback_control__volume_on"/>
      <div className="figureone_playback_control__volume_mute"/>
      <div className="figureone_playback_control__volume_change"/>
      <div className="figureone_playback_control__settings"/>
      <div className="figureone_playback_control__full_screen"/>
      */ }
    </div>;
  }
}
