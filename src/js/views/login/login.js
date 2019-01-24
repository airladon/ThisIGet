// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './login.scss';

import Button from '../../components/button';
import LoginFormBase from '../../components/loginFormBase';
import InputFormField from '../../components/inputFormField';
import LoginTitle from '../../components/loginTitle';
// // import '../../../css/style.scss';
// import Navbar from '../../components/navbar';
// import LessonComponent from '../../components/lesson';
// import Lesson from '../../Lesson/Lesson';
// import { LessonContent } from '../../Lesson/LessonContent';
// import NavbarSpacer from '../../components/navbarSpacer';
// import Footer from '../../components/footer';
type Props = {};

type State = {
  // username: string;
  // password: string;
  loginFailed: boolean;
};

class LoginForm extends React.Component<Props, State> {
  state: State;
  handleUsernameChange: Function;
  handlePasswordChange: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);
    this.state = { username: '', password: '', loginFailed: false };

    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const usernameElement = document.getElementById('input_field__username');
    const passwordElement = document.getElementById('input_field__password');
    if (usernameElement && passwordElement) {
      // data.append('username', this.state.username);
    // data.append('password', this.state.password);
      data.append('username', usernameElement.value);
      data.append('password', passwordElement.value);
      console.log(usernameElement, passwordElement)
      fetch('/loginuser', {
        body: data,
        method: 'post',
        credentials: 'same-origin',
        redirect: 'follow',
      }).then((response) => {
        if (window.location.href !== response.url) {
          window.location.replace(response.url);
        } else {
          console.log('fail')
          this.setState({ loginFailed: true });
        }
      });
    }
  }

  renderLoginFailed() {
    if (this.state.loginFailed) {
      return 'Login Failed: Username or Password incorrect.';
    }
    return '';
  }

  // <LoginManagement
  //       title={Sign in to ItIGet}
  //       onSubmit=this.handleSubmit
  //       fields={[
  //         {
  //           lable: 'Username or Email:',
  //           type: 'text',
  //           value: this.state.username,
  //           onChange: this.handleUsernameChange,
  //           autoComplete: 'username',
  //           onError: 'Login Failed: Username or Password incorrect',
  //         }
  //       ]}
  //       submit="Sign in"
  //       />
  render() {
    return (
      <div>
        <div className="login_form">
          <div className="login_centering_cell">
          <LoginTitle title="Sign in to ItIGet"/>
            <form onSubmit={this.handleSubmit} id="login_form">
              <InputFormField
                label="Username or Email:"
                onError={() => {}}
                autoComplete="username"
                type="text"
                id="input_field__username"
              />
              <InputFormField
                label="Password:"
                onError={this.renderLoginFailed.bind(this)}
                autoComplete="password"
                type="password"
                id="input_field__password"
              />
              <div>
                <div className="login_signin_box">
                  <input type="submit" value="Sign in" className="login_submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
        { /*
        <LoginFormBase
          title="Sign in to ItIGet"
          onSubmit={this.handleSubmit}
          submit="Sign In"
          formValues={this.state}
          fields={[
            {
              label: 'Username or Email:',
              type: 'text',
              onError: '',
              autoComplete: 'username',
              stateName: 'username',
            },
            {
              label: 'Password:',
              type: 'password',
              // onError: this.renderLoginFailed(),
              onError: this.renderLoginFailed,
              autoComplete: 'current-password',
              stateName: 'password',
            },
          ]}
        />
        
        <div className="login_form">
          <div className="login_centering_cell">
            <LoginTitle title="Create Account in to ItIGet"/>
            <form onSubmit={this.handleSubmit} id="login_form">
              <p>
                <label>
                  <span className="login_label_text">Username or Email:</span>
                  <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    autoComplete="username"
                  />
                </label>
              </p>
              <p>
                <label>
                  <span className="login_label_text">Password:</span>
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    autoComplete="current-password"/>
                </label>
              </p>
              <p>
                <div className="login_signin_box">
                  {this.renderLoginFailed()}
                  <input type="submit" value="Sign in" className="login_submit" />
                </div>
              </p>
            </form>
          </div>
        </div>
      */ }
        <div className="login_centering_cell">
          <Button href="/" className="login_button login_button_create">Create Accout</Button>
          <Button href="/" className="login_button login_button_forgot">Forgot Password</Button>
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
