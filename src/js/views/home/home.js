// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './home.scss';
import HomeBanner from './banner';
import Navbar from '../../components/navbar';
import LessonNavigator from '../../components/lessonNavigator';
import Footer from '../../components/footer';

const homePage = () => {
  const id: HTMLElement | null = document.getElementById('home');

  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
        <Navbar active=''/>
        <div className="navbar__spacer"/>
        <HomeBanner/>
        <div className='lesson__white_spacer'/>
        <LessonNavigator topic={'Geometry_1'}/>
        <div className='lesson__white_spacer'/>
        <LessonNavigator topic={'Trigonometry_1'}/>
        <div className='lesson__white_spacer'/>
        <Footer/>
      </div>,
      id,
    );
  }
};

export default homePage;
