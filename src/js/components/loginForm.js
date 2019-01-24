// // @flow

import React from 'react';
import LoginTitle from './loginTitle';
// import ReactDOM from 'react-dom';

type TypeField = {
  label: string,
  type: string,
  onChange: Function,
  onError: Function,
  autoComplete: string,
};

type Props = {
  title: string,
  onSubmit: Function,
  fields: Array<TypeField>,
  submit: string,
};

export default class LoginForm extends React.Component<Props> {
  key: number;

  constructor(props: Props) {
    super(props);
    this.key = 0;
  }

  makeEntries(fields: Array<TypeField>) {
    const entries = [];
    fields.forEach((field) => {
      this.key += 1;
      entries.push(<p>
        <label key={this.key}>
            <span className="login_label_text">{field.label}</span>
            <input
              type={field.type}
              onChange={field.onChange}
              autoComplete={field.autoComplete}
            />
            <div className="login_failed">
              {field.onError}
            </div>
          </label>
        </p>);
    });
  }

  render() {
    const props = Object.assign({}, this.props);
    return (
      <div className="login_form">
        <div className="login_centering_cell">
        <LoginTitle title={props.title}/>
          <form onSubmit={props.onSubmit} id="login_form">
            {this.makeEntries(props.fields)}
            <p>
              <div className="login_signin_box">
                <input type="submit" value={props.submit} className="login_submit" />
              </div>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
