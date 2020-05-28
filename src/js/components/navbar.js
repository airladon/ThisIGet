// @flow

import * as React from 'react';
import { login, logout } from '../tools/misc';
import DropDownButton from './dropDownButton';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill


type Props = {
  active?: string;
  isLoggedIn: boolean;
  username: string;
  includeHome: boolean;
};

export default class Navbar extends React.Component
                                    <Props> {
  loginout() {
    if (this.props.isLoggedIn) {
      logout();
    } else {
      login();
    }
  }

  getLoginLabel() {
    if (this.props.isLoggedIn) {
      if (this.props.username !== '') {
        return <div>
          Signed In
        </div>;
      }
      return 'Sign Out';
    }
    return 'Sign In';
  }

  getLoginButton() {
    if (this.props.isLoggedIn) {
      return <div className="navbar-button navbar-right navbar_login navbar_logout">
        <DropDownButton
          label={this.getLoginLabel()}
          id="id_navbar_loginout"
          direction='down'
          xAlign='right'
          list={[
            {
              label: `Signed in as ${this.props.username}`,
              // active: false,
              separator: true,
            },
            {
              label: 'Account Settings',
              link: '/account',
              // active: true,
            },
            {
              label: 'Sign out',
              link: this.loginout.bind(this),
              // active: true,
            },
          ]}
          selected={false}
        />
      </div>;
    }
    return <div className="navbar-text navbar-right login_button">
        <div
          onClick={this.loginout.bind(this)}
          className="navbar_login"
          id="id_navbar_loginout"
        >
          {this.getLoginLabel()}
        </div>
      </div>;
  }

  renderHomeButton() {
    if (this.props.includeHome) {
      return <a className="navbar-icon-container"
         href="/">
        <img className="navbar-icon"
             src="/static/assets/logo20v3.svg"
             alt="navbar home icon"/>
      </a>;
    }
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  renderLearningPaths() {
    return <div className="navbar-text navbar-center">
        <a href="/paths"
          // onClick={this.loginout.bind(this)}
          // className="navbar_login"
          // id="id_navbar_loginout"
        >
          Learning Paths
        </a>
      </div>;
  }

  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;

    const body =
    <div id="id_navbar">
      <div className="navbar-container">
        {this.renderHomeButton()}
        {this.renderLearningPaths()}
        {this.getLoginButton()}
        {/*
        <div className="navbar-text navbar-left">
          Plus
        </div>
        <div className="navbar-text navbar-left">
         <DropDownButton
          className="navbar_topics_dropdown"
          label="topics"
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
