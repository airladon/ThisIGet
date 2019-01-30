// // @flow

import React from 'react';

type Props = {
  label: string,
  onError: string,
  autoComplete: string,
  type: string,
  id: string,
};

type State = {
  value: string;
};

export default class InputFormField extends React.Component<Props, State> {
  key: number;

  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  // $FlowFixMe
  handleFormChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const props = Object.assign({}, this.props);
    return <div className="input_form__field"><label>
      <span className="login_label_text">{props.label}</span>
      <input
        type={props.type}
        onChange={this.handleFormChange.bind(this)}
        autoComplete={props.autoComplete}
        value={this.state.value}
        id={props.id}
      />
      <div className="login_failed">
        {props.onError}
      </div>
    </label></div>;
  }
}
