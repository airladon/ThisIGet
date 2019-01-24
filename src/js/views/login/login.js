// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './login.scss';

import Button from '../../components/button';
// import InputFormSubmit from '../../components/inputFormSubmit';
// import InputFormField from '../../components/inputFormField';
// import LoginTitle from '../../components/loginTitle';
// type Props = {};

// type State = {
//   loginFailed: string;
// };

class LoginForm extends React.Component {
  // state: State;
  // handleUsernameChange: Function;
  // handlePasswordChange: Function;
  // handleSubmit: Function;

  // constructor(props: Props) {
  //   super(props);
  //   this.state = { loginFailed: '' };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }


  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData();
  //   const usernameElement = document.getElementById('input_field__username');
  //   const passwordElement = document.getElementById('input_field__password');
  //   if (usernameElement && passwordElement) {
  //     data.append('username', usernameElement.value);
  //     data.append('password', passwordElement.value);
  //     fetch('/loginuser', {
  //       body: data,
  //       method: 'post',
  //       credentials: 'same-origin',
  //       redirect: 'follow',
  //     }).then((response) => {
  //       if (window.location.href !== response.url) {
  //         window.location.replace(response.url);
  //       } else {
  //         this.setState({ loginFailed: 'Login Failed: Username or Password incorrect.' });
  //       }
  //     });
  //   }
  // }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <div className="input_form__footer"/>
        <div className="input_form__centering_cell">
          <Button href="/create" className="input_form__link login_form__link_create">Create Accout</Button>
          <Button href="/reset" className="input_form__link login_form__link_forgot">Forgot Password</Button>
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
