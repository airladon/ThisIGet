// @flow
import * as React from 'react';
import Fig from 'figureone';
import ScrollBar from './scrollBar';

const { Recorder, Diagram, FunctionMap } = Fig;
const { getObjectDiff } = Fig.tools.misc;

type State = {
  playClass: string,
  pauseClass: string,
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
      volumeOnClass: '',
      volumeMuteClass: '',
      time: '00:00 / 00:00',
      timeValue: 0,
      seek: 0,
    };
    this.getDiagram = props.getDiagram;
  }

  // componentDidMount() {
  //   // this.recorder = new Recorder();
  // }

  play() {
    const recorder = new Recorder();
    recorder.playbackStopped = this.playbackStopped.bind(this);
    // console.log(this.state.time)
    if (this.state.seek < 1) {
      console.log('Before', this.getDiagram().elements.elements.circle.elements.line1.state.movement.previousTime)
      recorder.startPlayback(this.state.timeValue);
      console.log('After', this.getDiagram().elements.elements.circle.elements.line1.state.movement.previousTime)
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
    console.log("B", this.getDiagram().elements.elements.circle.elements.line1.state.movement.previousTime)
    this.setState({ seek: percent });
    console.log("A", this.getDiagram().elements.elements.circle.elements.line1.state.movement.previousTime)
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
        {/*<div className="figureone_playback_control__seek_total"></div>
        <div className="figureone_playback_control__seek_time"></div>
        <div className="figureone_playback_control__seek_circle"></div>
        */}
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
