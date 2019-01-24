// // @flow

import React from 'react';
import LoginTitle from './loginTitle';
// import ReactDOM from 'react-dom';

type TypeField = {
  label: string,
  type: string,
  // onChange: Function,
  onError: string,
  autoComplete: string,
  // value: string,
  stateName: string,
};

type Props = {
  title: string,
  onSubmit: Function,
  fields: Array<TypeField>,
  submit: string,
  formValues: {[name: string]: string},
};

type State = {
  fields: {[name: string]: string};
}

export default class LoginFormBase extends React.Component<Props, State> {
  key: number;

  constructor(props: Props) {
    super(props);
    this.key = 0;
    const newState = {};
    this.props.fields.forEach((field) => {
      newState[field.stateName] = '';
    });
    this.state = { fields: newState };
  }

  handleFormChange(event) {
    this.props.formValues[event.target.id] = event.target.value;
    this.setState({ [event.target.id]: event.target.value });
  }

  makeEntries(fields: Array<TypeField>) {
    const entries = [];
    fields.forEach((field) => {
      this.key += 1;
      entries.push(<div key={this.key}>
        <label>
            <span className="login_label_text">{field.label}</span>
            <input
              type={field.type}
              onChange={this.handleFormChange.bind(this)}
              autoComplete={field.autoComplete}
              value={this.state.fields[field.stateName]}
              id={field.stateName}
            />
            <div className="login_failed">
              {field.onError}
            </div>
          </label>
        </div>);
    });
    return entries;
  }

  render() {
    const props = Object.assign({}, this.props);
    return (
      <div className="login_form">
        <div className="login_centering_cell">
        <LoginTitle title={props.title}/>
          <form onSubmit={props.onSubmit} id="login_form">
            {this.makeEntries(props.fields)}
            <div>
              <div className="login_signin_box">
                <input type="submit" value={props.submit} className="login_submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
