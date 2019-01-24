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
  loginFailed: string;
};

class LoginForm extends React.Component<Props, State> {
  state: State;
  handleUsernameChange: Function;
  handlePasswordChange: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);
    this.state = { loginFailed: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const usernameElement = document.getElementById('input_field__username');
    const passwordElement = document.getElementById('input_field__password');
    if (usernameElement && passwordElement) {
      data.append('username', usernameElement.value);
      data.append('password', passwordElement.value);
      fetch('/loginuser', {
        body: data,
        method: 'post',
        credentials: 'same-origin',
        redirect: 'follow',
      }).then((response) => {
        if (window.location.href !== response.url) {
          window.location.replace(response.url);
        } else {
          this.setState({ loginFailed: 'Login Failed: Username or Password incorrect.' });
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
                label="Username or Email:"
                onError=""
                autoComplete="username"
                type="text"
                id="input_field__username"
              />
              <InputFormField
                label="Password:"
                onError=""
                autoComplete="password"
                type="password"
                id="input_field__password"
              />
              <InputFormSubmit
                label="Sign in"
                onError={this.state.loginFailed}
              />
            </form>
          </div>
        </div>
        <div className="login_centering_cell">
          <Button href="/create" className="login_button login_button_create">Create Accout</Button>
          <Button href="/reset" className="login_button login_button_forgot">Forgot Password</Button>
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
