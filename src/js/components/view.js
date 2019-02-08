// @flow

// This is a React Higher order component pattern where a component can be
// wrapped by another component that will look after login state and send
// through the state information as props to the wrapped component.

import * as React from 'react';
import NavbarSpacer from './navbarSpacer';
import Navbar from './navbar';
import Footer from './footer';

type Props = {
};

type WrappedComponentProps = {
  username: string;
  isLoggedIn: boolean;
};

type State = {
  isLoggedIn: boolean;
  username: string;
};

const withLoginManager = function loginManager(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) {
  return class ViewBase extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        username: '',
      };
    }

    componentDidMount() {
      const handleVisibilityChange = () => {
        this.checkIsLoggedInFromCookie();
      };
      window.addEventListener('focus', handleVisibilityChange);
      this.checkIsLoggedInFromCookie();
    }

    // function checkIsLoggedInCookie() {
    //   const { cookie } = document;
    //   if (cookie != null) {
    //     // $FlowFixMe
    //     const username = cookie.match(/username=[^;]*;/);
    //     if (username != null) {
    //       this.setLogin(username[0]
    //         .split('=')[1]
    //         .slice(0, -1));
    //     }
    //   }
    // }

    checkIsLoggedInFromCookie() {
      const { cookie } = document;
      if (cookie != null) {
        // $FlowFixMe
        let username = cookie.match(/username=[^;]*/);
        // console.log(username)
        if (username != null) {
          username = username[0].trim();
          if (username.slice(-1).charAt(0) === ';') {
            username = username.slice(0, -1);
          }

          this.setLogin(username.split('=')[1]);
        }
      }
    }

    setLogin(username: string | null) {
      if (username === '') {
        this.setState({
          isLoggedIn: false,
          username: '',
        });
      } else if (username !== null) {
        this.setState({
          isLoggedIn: true,
          username,
        });
      } else {
        this.setState({
          isLoggedIn: true,
          username: '',
        });
      }
    }

    render() {
      return (
        <div>
          <Navbar
              active='Single Page Lesson'
              isLoggedIn={this.state.isLoggedIn}
              username={this.state.username}
            />
          <NavbarSpacer/>
          <WrappedComponent
            {...this.props}
            username={this.state.username}
            isLoggedIn={this.state.isLoggedIn}
          />
          <Footer/>
        </div>
      );
    }
  };
};

export default withLoginManager;
