// @flow
import * as React from 'react';
import Fig from 'figureone';
import ScrollBar from './scrollBar';

const { Recorder, Diagram, FunctionMap } = Fig;
const { getObjectDiff } = Fig.tools.misc;

function removeClass(ids: string | Array<string>, className: string) {
  let elementIds = ids;
  if (typeof ids === 'string') {
    elementIds = [ids];
  }
  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element == null) {
      return;
    }
    element.classList.remove(className);
  });
}

function addClass(ids: string | Array<string>, className: string) {
  let elementIds = ids;
  if (typeof ids === 'string') {
    elementIds = [ids];
  }
  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element == null) {
      return;
    }
    element.classList.add(className);
  });
}

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
  dev: boolean;
  duration: number;
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

  componentDidMount() {
    this.updateTime(this.props.duration);
  }

  play() {
    const recorder = new Recorder();
    if (recorder.duration === 0) {
      return;
    }
    recorder.startPlayback(this.state.timeValue);
    recorder.playbackStoppedCallback = this.playToPause.bind(this);
    this.setState({
      playPauseClass: 'playback_fade_out_partial',
      playClass: 'figureone_playback_control__hide',
    });
    this.queueTimeUpdate();
    addClass('id_figureone_playback_control__time', 'playback_fade_out');
    addClass('id_figureone_playback_controll_seek_container', 'playback_fade_out');
    // addClass('id_figureone_playback_control__pause', 'playback_fade_out_partial');
  }

  playToPause() {
    this.setState({
      playClass: '',
      playPauseClass: 'figureone_playback_control__hide',
    });
    removeClass('id_figureone_playback_control__time', 'playback_fade_out');
    removeClass('id_figureone_playback_controll_seek_container', 'playback_fade_out');
    // removeClass('id_figureone_playback_control__pause', 'playback_fade_out_partial');
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

  fullScreen() {
    const elem = document.getElementById('topic__container_name');
    if (elem == null) {
      return;
    }
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  // toggleFullScreen() {
  //   if (document.webkitFullscreenElement || document.fullScreenElement) {
  //     this.exitFullScreen();
  //   } else {
  //     this.fullScreen();
  //   }
  // }
  toggleFullScreen() {
    var doc = window.document;
    var docEl = document.getElementById('id_video');
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }  


  manualFullScreen() {
    const elements = [
      'id__topic_title_bar',
      'id_navbar',
      'id__share_bar',
    ]
    let addOrRemove = 'add';
    elements.forEach((elementName) => {
      const element = document.getElementById(elementName);
      if (element != null) {
        element.classList[addOrRemove]('hide__override');
      }
    });

    const classElements = [
      'learning_path_navigator',
      'vertical_blank_space',
      'footer__container',
    ]
    classElements.forEach((className) => {
      const list = document.getElementsByClassName(className);
      for (var i = 0; i < list.length; i++) {
        list[i].classList[addOrRemove]('hide__override');
      }
    })

    // const navbar = document.getElementById('id_navbar');
    // if (navbar != null) {
    //   navbar.classList[addOrRemove]('hide__override')
    // }
  }

  // manualFullScreenCancel() {
  //   const navbar = document.getElementById('id_navbar');
  //   if (navbar != null) {
  //     navbar.classList.remove('hide__override')
  //   }
  // }

  getVolume() {

  }

  setVolume() {

  }

  skipForward() {

  }

  skipBackward() {

  }

  renderDev() {
    if (!this.props.dev) {
      return '';
    }
    return <div className='figureone_playback_control__dev_container'>
      <div className='figureone_playback_control__dev_container__inner_table'>
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
      </div>
    </div>;
  }

  render() {  // eslint-disable-line class-methods-use-this
    return <div className="figureone_playback_control">
      <div className="figureone_playback_control__h_space"/>
      <div
        className={`figureone_playback_control__play ${this.state.playClass}`}
        onClick={this.play.bind(this)}
      />
      <div
        id="id_figureone_playback_control__pause"
        className={`figureone_playback_control__pause ${this.state.playPauseClass}`}
        onClick={this.pause.bind(this)}
      />
      <div id="id_figureone_playback_control__time" className="figureone_playback_control__time">
        {this.state.time}
      </div>
      <div id="id_figureone_playback_controll_seek_container"
        className="figureone_playback_controll_seek_container">
        <ScrollBar
          id='playback_control_seek'
          changed={this.seekToPercent.bind(this)}
          position={this.state.seek}
        />
      </div>
      {/* <div
        className={'figureone_playback_control__full_screen'}
        onClick={this.toggleFullScreen.bind(this)}
      >
        full
      </div> */}
      {this.renderDev()}
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
