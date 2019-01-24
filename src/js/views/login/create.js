// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './login.scss';

import Button from '../../components/button';
import InputFormSubmit from '../../components/inputFormSubmit';
import InputFormField from '../../components/inputFormField';
import LoginTitle from '../../components/loginTitle';

type Props = {};

type State = {
  passwordFailed: string;
};

class LoginForm extends React.Component<Props, State> {
  state: State;
  handleUsernameChange: Function;
  handlePasswordChange: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);
    this.state = { passwordFailed: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const usernameElement = document.getElementById('input_field__username');
    const emailElement = document.getElementById('input_field__email');
    const passwordElement = document.getElementById('input_field__password');
    const repeatPasswordElement = document.getElementById('input_field__repeat_password');
    if (usernameElement && passwordElement && emailElement && repeatPasswordElement) {
      console.log(passwordElement.value, repeatPasswordElement.value)
      if (passwordElement.value !== repeatPasswordElement) {
        this.setState({ passwordFailed: 'Passwords do not match' });
        return;
      }
      data.append('username', usernameElement.value);
      data.append('email', emailElement.value);
      data.append('password', passwordElement.value);
      fetch('/createuser', {
        body: data,
        method: 'post',
        credentials: 'same-origin',
        redirect: 'follow',
      }).then((response) => {
        if (window.location.href !== response.url) {
          window.location.replace(response.url);
        } else {
          this.setState({ createFailed: 'Account creation failed.' });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div className="login_form">
          <div className="login_centering_cell">
          <LoginTitle title="Sign in to ItIGet"/>
            <form onSubmit={this.handleSubmit} id="login_form">
              <InputFormField
                label="Username:"
                onError=""
                autoComplete="username"
                type="text"
                id="input_field__username"
              />
              <InputFormField
                label="Email:"
                onError=""
                autoComplete="email"
                type="text"
                id="input_field__email"
              />
              <InputFormField
                label="Password:"
                onError={this.state.passwordFailed}
                autoComplete="password"
                type="password"
                id="input_field__password"
              />
              <InputFormField
                label="Repeat Password:"
                onError=""
                autoComplete="password"
                type="password"
                id="input_field__repeat_password"
              />
              <InputFormSubmit
                label="Create Account"
                onError={this.state.loginFailed}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const renderlogin = () => {
  const loginId: HTMLElement | null = document.getElementById('login_page');

  if (loginId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
      <LoginForm/>
      </div>,
      loginId,
    );
  }
};

renderlogin();
