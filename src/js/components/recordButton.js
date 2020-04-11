// @flow
import * as React from 'react';
import Fig from 'figureone';

const { Recorder } = Fig;

type State = {
  label: 'record' | 'stop' | 'show' | 'playback';
}
type Props = {};

export default class RecordButton extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { label: 'record' };
  }

  record() {
    if (this.state.label === 'record') {
      this.setState({ label: 'stop' });
      const recorder = new Recorder();
      recorder.start();
    } else if (this.state.label === 'stop') {
      this.setState({ label: 'show' });
      const recorder = new Recorder();
      recorder.stop();
    } else if (this.state.label === 'show') {
      this.setState({ label: 'playback' });
      const recorder = new Recorder();
      recorder.show();
    } else {
      this.setState({ label: 'record' });
      const recorder = new Recorder();
      recorder.startPlayback();
    }
  }

  render() {  // eslint-disable-line class-methods-use-this
    return <div
      className='record-button'
      onClick={this.record.bind(this)}
    >{this.state.label}</div>;
  }
}
