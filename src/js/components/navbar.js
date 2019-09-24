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

// type State = {
//   loginLink: string;
//   loginText: string;
// };

export default class Navbar extends React.Component
                                    <Props> {
  // state: State;

  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     // isLoggedIn: false,
  //     loginText: 'Login',
  //     loginLink: '/login',
  //   };
  // }

  // componentDidMount() {
  //   const handleVisibilityChange = () => {
  //     this.checkIsLoggedIn();
  //   };
  //   window.addEventListener('focus', handleVisibilityChange);
  //   this.checkIsLoggedIn();
  //   // this.checkIsLoggedIn();
  //   // this.checkLoggedInFromPage();
  // }

  // checkIsLoggedIn() {
  //   // // console.log('checking1')
  //   // fetchPolyfill('/isloggedin', { credentials: 'same-origin' })
  //   //   .then((response) => {
  //   //     if (!response.ok) {
  //   //       throw Error(response.statusText);
  //   //     }
  //   //     // console.log(response, response.json());
  //   //     return response.json();
  //   //   })
  //   //   .then(data => this.setLogin(data.username))
  //   //   .catch(() => {});
  //   // console.log(document.cookie)
  //   const { cookie } = document;
  //   if (cookie != null) {
  //     // $FlowFixMe
  //     let username = cookie.match(/username=[^;]*/);
  //     // console.log(username)
  //     if (username != null) {
  //       username = username[0].trim();
  //       if (username.slice(-1).charAt(0) === ';') {
  //         username = username.slice(0, -1);
  //       }

  //       this.setLogin(username.split('=')[1]);
  //     }
  //   }
  // }

  // // checkLoggedInFromPage() {
  // //   if (document.getElementById('logged_in')) {
  // //     this.setLogin(null);
  // //     this.checkIsLoggedIn();
  // //   } else {
  // //     this.setLogin('');
  // //   }
  // // }

  // setLogin(username: string | null) {
  //   if (username === '') {
  //     this.setState({
  //       loginText: 'Login',
  //       loginLink: '/login',
  //     });
  //   } else if (username !== null) {
  //     this.setState({
  //       loginText: `Logout ${username}`,
  //       loginLink: '/logout',
  //     });
  //   } else {
  //     this.setState({
  //       loginText: 'Logout',
  //       loginLink: '/logout',
  //     });
  //   }
  // }

  loginout() {
    if (this.props.isLoggedIn) {
      logout();
    } else {
      login();
    }
  }

  // getLoginLink() {
  //   let page = getCookie('page');
  //   if (page === '') {
  //     page = '0';
  //   }
  //   const next = `?next=${window.location.pathname}&page=${page}`;
  //   if (this.props.isLoggedIn) {
  //     return `/logout${next}`;
  //   }
  //   return `/login${next}`;
  // }

  getLoginLabel() {
    if (this.props.isLoggedIn) {
      if (this.props.username !== '') {
        return <div>
          Logged in as <span className="navbar_login__loggedin_label_username">{this.props.username}
          </span>
        </div>;
      }
      return 'Logout';
    }
    return 'Login';
  }

  getLoginButton() {
    if (this.props.isLoggedIn) {
      return <div className="navbar-button navbar-right navbar_login">
        <DropDownButton
          label={this.getLoginLabel()}
          id="id_navbar_loginout"
          direction='down'
          xAlign='right'
          list={[{
            label: 'Logout',
            link: this.loginout.bind(this),
            active: false,
          }]}
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

  renderLearningPaths() {
    return <div className="navbar-text navbar-center">
        <div
          // onClick={this.loginout.bind(this)}
          // className="navbar_login"
          // id="id_navbar_loginout"
        >
          Learning Paths
        </div>
      </div>;
  }

  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;

    const body =
    <div>
      <div className="navbar-container">
        {this.renderHomeButton()}
        {this.renderLearningPaths()}
        {this.getLoginButton()}
        { /*
        <div className="navbar-text navbar-right login_button">
          <div onClick={this.loginout.bind(this)} className="navbar_login">
            {this.getLoginLabel()}
          </div>
        </div>
        <div className="navbar-button navbar-right navbar_login">
          <DropDownButton
            label={this.getLoginLabel()}
            id="id_navbar_loginout"
            direction='down'
            xAlign='right'
            list={[{
              label: 'logout',
              link: this.loginout.bind(this),
              active: false,
            }]}
            selected={false}
          />
        </div>
        */ }
        {/*
        <div className="navbar-text navbar-left">
          Plus
        </div>
        <div className="navbar-text navbar-left">
         <DropDownButton
          className="navbar_topics_dropdown"
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
