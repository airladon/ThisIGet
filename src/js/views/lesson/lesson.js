// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
// import '../../../css/style.scss';
import Navbar from '../../components/navbar';
import LessonComponent from '../../components/lesson';
import Lesson from '../../Lesson/Lesson';
import { LessonContent } from '../../Lesson/LessonContent';
import NavbarSpacer from '../../components/navbarSpacer';
import Footer from '../../components/footer';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

function checkIsLoggedInCookie() {
  const { cookie } = document;
  if (cookie != null) {
    // $FlowFixMe
    const username = cookie.match(/username=[^;]*;/);
    if (username != null) {
      this.setLogin(username[0]
        .split('=')[1]
        .slice(0, -1));
    }
  }
}

function checkIsLoggedInAPI() {
  // console.log('checking1')
  fetchPolyfill('/isloggedin', { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // console.log(response, response.json());
      return response.json();
    })
    .then(data => this.setLogin(data.username))
    .catch(() => {});
}

const renderLesson = (content: LessonContent, lessonDetails: Object, versionDetails: Object) => {
  const lessonId: HTMLElement | null = document.getElementById('single-page-lesson');
  const lesson = new Lesson(content);
  if (lessonId instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Navbar active='Single Page Lesson'/>
        <NavbarSpacer/>
        <div>
          <div>
            <div>
              <LessonComponent
                lesson={lesson}
                lessonDetails={lessonDetails}
                versionDetails={versionDetails}
              />
            </div>
          </div>
        </div>
        <Footer/>
      </div>,
      lessonId,
    );
  }
};

export default renderLesson;
