// @flow

import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill


type Props = {
  active?: string;
};

type State = {
  loginLink: string;
  loginText: string;
};

export default class Navbar extends React.Component
                                    <Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      // isLoggedIn: false,
      loginText: 'Login',
      loginLink: '/login',
    };

    const handleVisibilityChange = () => {
      this.checkIsLoggedIn();
    };
    window.addEventListener('focus', handleVisibilityChange);

    this.checkIsLoggedIn();
  }

  checkIsLoggedIn() {
    fetchPolyfill('/isloggedin', { credentials: 'same-origin' })
      .then((resonse) => {
        if (!resonse.ok) {
          throw Error(resonse.statusText);
        }
        return resonse.json();
      })
      .then(res => this.setLogin(res))
      .catch(() => {});
  }

  setLogin(login: number) {
    if (login === 1) {
      this.setState({
        loginText: 'Logout',
        loginLink: '/logout',
      });
    } else {
      this.setState({
        loginText: 'Login',
        loginLink: '/login',
      });
    }
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.active;

    const body =
    <div>
      <div className="navbar-container">
        <a className="navbar-icon-container"
           href="/">
          <img className="navbar-icon"
               src="/static/icon-lg.png"/>
        </a>
        <div className="navbar-text navbar-left login_button">
          <a href={this.state.loginLink}>{this.state.loginText}</a>
        </div>
        {/*
        <div className="navbar-text navbar-left">
          Plus
        </div>
        <div className="navbar-text navbar-left">
         <DropDownButton
          className="navbar_lessons_dropdown"
          label="lessons"
          direction="down"
          xAlign="left"
          list={[
            { label: 'item 1', link: '/' },
            { label: 'item 2', link: '/' },
            { label: 'item 3', link: '/' },
          ]}/>
        </div>
      */}
      </div>
    </div>;
    return <div>
      {body}
    </div>;
  }
}
