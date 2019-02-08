// @flow

import * as React from 'react';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import NavbarSpacer from './navbarSpacer';
import Navbar from './navbar';
import LessonComponent from './lesson';
import Footer from './footer';
import { LessonContent } from '../Lesson/LessonContent';
import Lesson from '../Lesson/Lesson';

type Props = {
  content: LessonContent,
  lessonDetails: Object,
  versionDetails: Object
};

type State = {
  isLoggedIn: boolean;
  username: string;
};

export default class ViewLesson extends React.Component
                                    <Props, State> {
  state: State;
  lesson: Lesson;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
    };
    this.lesson = new Lesson(this.props.content);
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
    const props = Object.assign({}, this.props);
    delete props.active;
    return <div>
        <Navbar
          active='Single Page Lesson'
          isLoggedIn={this.state.isLoggedIn}
          username={this.state.username}
        />
        <NavbarSpacer/>
        <div>
          <div>
            <div>
              <LessonComponent
                lesson={this.lesson}
                lessonDetails={this.props.lessonDetails}
                versionDetails={this.props.versionDetails}
              />
            </div>
          </div>
        </div>
        <Footer/>
    </div>;
  }
}
