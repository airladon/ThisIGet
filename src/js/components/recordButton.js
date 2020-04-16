// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  label: 'Record' | 'Stop';
  saveStyle: Object,
}
type Props = {};

export default class RecordButton extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      label: 'Record',
      saveStyle: {
        display: 'inline-block',
        color: 'lightGrey',
        padding: '10px',
      },
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

  render() {  // eslint-disable-line class-methods-use-this
    return <div style={{ backgroundColor: 'var(--color-topic-background)' }}>
      <div
        className='record-button'
        style={{display: 'inline-block', padding: '10px' }}
        onClick={this.record.bind(this)}
      >{this.state.label}</div>
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
    </div>
  }
}
