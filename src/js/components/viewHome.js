// @flow

import * as React from 'react';
import LessonNavigator from './lessonNavigator';
import HomeBanner from './homeBanner';

type Props = {
  isLoggedIn: boolean;
  username: string;
};

export default class ViewHome extends React.Component<Props> {
  render() {
    const props = Object.assign({}, this.props);
    delete props.active;
    return <div>
      <HomeBanner/>
      <div className='lesson__white_spacer'/>
      <LessonNavigator learningPath={'Geometry_1'}/>
      <div className='lesson__white_spacer'/>
      {/*
      <LessonNavigator learningPath={'Trigonometry_1'}/>
      */}
      <div className='lesson__white_spacer'/>
    </div>;
  }
}
