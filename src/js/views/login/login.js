// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import Button from '../../components/button';

// // import '../../../css/style.scss';
// import Navbar from '../../components/navbar';
// import LessonComponent from '../../components/lesson';
// import Lesson from '../../Lesson/Lesson';
// import { LessonContent } from '../../Lesson/LessonContent';
// import NavbarSpacer from '../../components/navbarSpacer';
// import Footer from '../../components/footer';

const renderlogin = () => {
  const loginId: HTMLElement | null = document.getElementById('login_page');
  // const lesson = new Lesson(content);

  if (loginId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
      hello world
      { /*}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form> */}
      </div>,
      loginId,
    );
  }
};

renderlogin();
