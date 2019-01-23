// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './login.scss';

// import Button from '../../components/button';

// // import '../../../css/style.scss';
// import Navbar from '../../components/navbar';
// import LessonComponent from '../../components/lesson';
// import Lesson from '../../Lesson/Lesson';
// import { LessonContent } from '../../Lesson/LessonContent';
// import NavbarSpacer from '../../components/navbarSpacer';
// import Footer from '../../components/footer';
type State = {
  username: string;
  password: string;
  loginFailed: boolean;
};

class LoginForm extends React.Component<props, State> {
  state: State;
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', loginFailed: false };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // alert(`A name was submitted: ${this.state.username} ${this.state.password}`);
    event.preventDefault();
    const data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    fetch('/loginuser', {
      body: data,
      method: 'post',
      credentials: 'same-origin',
      redirect: 'follow',
    }).then((response) => {
      console.log(window.location.href, response, response.url)
      if (window.location.href !== response.url) {
        window.location.replace(response.url)
      } else {
      //   this.setState({loginFailed: true});
        console.log('failed')
      }
    });
  }

  render() {
    return (
      <div className="login_form">
        <div className="login_centering_cell">
          <form onSubmit={this.handleSubmit} id="login_form">
            <h1>
              Sign in
            </h1>
            <p>
              <label>
                Name:
                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
              </label>
            </p>
            <p>
              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </label>
            </p>
            <p>
              <input type="submit" value="Submit" />
            </p>
          </form>
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
