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
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

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
    alert(`A name was submitted: ${this.state.username} ${this.state.password}`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="login_form">
        <div className="login_centering_cell">
          <form onSubmit={this.handleSubmit}>
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
