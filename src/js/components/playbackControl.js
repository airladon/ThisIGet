// @flow
import * as React from 'react';
import Fig from 'figureone';
import ScrollBar from './scrollBar';
// import type Diagram from 'figureone';
// const {
//   Recorder, Diagram, FunctionMap
// } = Fig;
// const { getObjectDiff } = Fig.tools.misc;

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
  pauseClass: string,
  recordClass: string,
  recordPauseClass: string,
  volumeOnClass: string,
  volumeMuteClass: string,
  time: string,
  seek: number,
  timeValue: number,
  // animationFinishing: string,
  preparingToPlayClass: string,
  preparingToPauseClass: string,
}

type Props = {
  audioSrc: string;
  statesSrc: string;
  eventsSrc: string;
  slidesSrc: string;
  // getDiagram: () => Object;
  dev: boolean;
  duration: number;
  diagram: ?Object;
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
  // getDiagram: () => Diagram;
  timeoutID: TimeoutID;
  diagram: ?Diagram;

  constructor(props: Props) {
    super(props);
    this.seekTouchDown = false;
    this.volumeTouchDown = false;
    this.state = {
      playClass: '',
      pauseClass: 'figureone_playback__hidden',
      recordClass: '',
      recordPauseClass: 'figureone_playback__hidden',
      volumeOnClass: '',
      volumeMuteClass: '',
      time: '00:00 / 00:00',
      timeValue: 0,
      seek: 0,
      preparingToPlayClass: 'figureone_playback__hidden',
      preparingToPauseClass: 'figureone_playback__hidden',
    };
    // this.getDiagram = props.getDiagram;
    this.diagram = null;
    this.timeoutID = null;
    // this.props = props;
  }

  componentDidMount() {
    this.updateTime(this.props.duration);
    const element = document.getElementById('id__figureone_playback_control');
    if (element == null) {
      return;
    }
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => { supportsPassive = true; },
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    element.addEventListener('mousedown', this.showControls.bind(this), false);
    element.addEventListener('touchstart', this.showControls.bind(this), supportsPassive ? { passive: true } : false);
  }

  componentDidUpdate() {
    if (this.props.diagram != null && this.diagram == null) {
      this.diagram = this.props.diagram;
      const { subscriptions } = this.diagram.recorder;
      subscriptions.subscribe('playbackStarted', this.playbackStarted.bind(this));
      subscriptions.subscribe('preparingToPlay', this.preparingToPlay.bind(this));
      subscriptions.subscribe('playbackStopped', this.playbackStopped.bind(this));
      subscriptions.subscribe('preparingToPause', this.preparingToPause.bind(this));
      console.log(this.diagram)
      // console.log(this.diagram.elements.elements.circle.animationFinishedCallback);
      // console.log(this.diagram.elements.elements.circle.asdf)
    }
  }

  preparingToPlay() {
    console.log('Preparing to Play')
    this.setState({
      preparingToPlayClass: '',
      preparingToPauseClass: 'figureone_playback__hidden',
      pauseClass: 'figureone_playback__disabled',
      playClass: 'figureone_playback__hidden',
    });
  }

  playbackStarted() {
    console.log('Playback Started')
    let preparingToPlayClass = 'figureone_playback__hidden'
    // if (this.state.preparingToPlayClass === '') {
      // preparingToPlayClass = 'playback_fadeout_quick'
    // }
    this.setState({
      preparingToPlayClass,
      preparingToPauseClass: 'figureone_playback__hidden',
      pauseClass: 'playback_fade_out_partial',
      playClass: 'figureone_playback__hidden',
    });
    this.startFade();
  }

  preparingToPause() {
    console.log('Preparing to Pause')
    if (this.diagram != null) {
      const cursor = this.diagram.getElement('cursor');
      if (cursor != null) {
        cursor.hide();
      }
    }
    this.unfade();
    this.setState({
      preparingToPlayClass: 'figureone_playback__hidden',
      preparingToPauseClass: '',
      pauseClass: 'figureone_playback__hidden',
      playClass: 'figureone_playback__disabled',
    });
  }

  playbackStopped() {
    console.log('Playback Stopped')
    if (this.diagram != null) {
      const cursor = this.diagram.getElement('cursor');
      if (cursor != null) {
        cursor.hide();
      }
    }
    this.unfade();
    this.setState({
      preparingToPlayClass: 'figureone_playback__hidden',
      // preparingToPauseClass: 'playback_fadeout_quick',
      preparingToPauseClass: 'figureone_playback__hidden',
      pauseClass: 'figureone_playback__hidden',
      playClass: '',
    });
  }

  showControls() {
    // const diagram = this.getDiagram();
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    this.unfade();
    if (recorder.state === 'playing' || recorder.state === 'recording') {
      this.setState({
        pauseClass: '',
      });
    }
    setTimeout(() => {
      if (recorder.state === 'playing' || recorder.state === 'recording') {
        this.startFade();
        this.setState({
          pauseClass: 'playback_fade_out_partial',
        });
      }
    }, 300);
  }

  play() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    if (recorder.duration === 0) {
      return;
    }
    if (this.state.timeValue > 0) {
      recorder.resumePlayback();
    } else {
      recorder.startPlayback(this.state.timeValue);
    }
    this.queueTimeUpdate();
    // this.startFade();
  }

  // eslint-disable-next-line class-methods-use-this
  pause() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    this.unfade();
    recorder.pausePlayback();
  }

  startFade() {
    addClass('id_figureone_playback_control__time', 'playback_fade_out');
    addClass('id_figureone_playback_controll_seek_container', 'playback_fade_out');
    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(() => {
      addClass('id_figureone_playback_control__time', 'playback_faded');
      addClass('id_figureone_playback_controll_seek_container', 'playback_faded');
    }, 3000);
  }

  unfade() {
    removeClass('id_figureone_playback_control__time', 'playback_fade_out');
    removeClass('id_figureone_playback_controll_seek_container', 'playback_fade_out');
    removeClass('id_figureone_playback_control__time', 'playback_faded');
    removeClass('id_figureone_playback_controll_seek_container', 'playback_faded');
    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }
  }

  record() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    recorder.stateTimeStep = 1;
    recorder.startRecording(this.state.timeValue);
    if (this.state.timeValue === 0) {
      recorder.recordEvent('slide', ['goto', '', 0], 0);
    }
    this.queueTimeUpdate();
    this.setState({
      recordPauseClass: '',
      recordClass: 'figureone_playback__hidden',
    });
    this.startFade();
  }


  pauseRecording() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    recorder.stopRecording();
    this.setState({
      recordClass: '',
      recordPauseClass: 'figureone_playback__hidden',
    });
    this.unfade();
  }

  // eslint-disable-next-line class-methods-use-this
  showRecording() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    recorder.show();
  }

  // eslint-disable-next-line class-methods-use-this
  saveRecording() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    recorder.save();
  }

  queueTimeUpdate() {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    const currentTime = recorder.getCurrentTime();
    this.updateTime(currentTime);
    if (recorder.state !== 'idle') {
      setTimeout(this.queueTimeUpdate.bind(this), 20);
    }
  }

  updateTime(time: number) {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
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
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    const totalTime = recorder.duration;
    this.setState({ seek: percent });
    recorder.seekToPercent(percent);
    this.updateTime(percent * totalTime);
  }

  seek(toTime: number) {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    // const recorder = new Recorder();
    const totalTime = recorder.duration;
    const percent = toTime / totalTime;
    this.setState({ seek: percent });
    recorder.seek(percent);
    this.updateTime(toTime);
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
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
    return <div className="figureone_playback_control" id="id__figureone_playback_control">
      <div className="figureone_playback_control__h_space"/>
      <div
        className={`figureone_playback_control__play ${this.state.playClass}`}
        onClick={this.play.bind(this)}
      />
      {/* <div className="figureone_playback_control__h_space"/> */}
      <div
        id="id_figureone_playback_control__pause"
        className={`figureone_playback_control__pause ${this.state.pauseClass}`}
        onClick={this.pause.bind(this)}
      />
      <div id="id_figureone_playback_controll_seek_container"
        className="figureone_playback_controll_seek_container">
        <ScrollBar
          id='playback_control_seek'
          changed={this.seekToPercent.bind(this)}
          position={this.state.seek}
        />
      </div>
      <div id="id_figureone_playback_control__time" className="figureone_playback_control__time">
        {this.state.time}
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
      <div className={`figureone_playback__animation_finishing_container ${this.state.preparingToPauseClass}`}>
        <div className="ivid_animation_finishing_text">
          Animation Finishing before interaction
        </div>
      </div>
      <div className={`figureone_playback__animation_finishing_container ${this.state.preparingToPlayClass}`}>
        <div className="ivid_animation_finishing_text">
          Preparing to Play
        </div>
      </div>
    </div>;
  }
}
