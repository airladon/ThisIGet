// @flow

import * as React from 'react';
import LearningPathNavigator from './learningPathNavigator';
import HomeBanner from './homeBanner';

type Props = {
  isLoggedIn: boolean;
  username: string;
};

export default class ViewHome extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    return <div>
      <HomeBanner/>
      <main>
      <div className='vertical_blank_space'/>
      <LearningPathNavigator learningPath={'Geometry_1'}/>
      <div className='vertical_blank_space'/>
      <LearningPathNavigator learningPath={'Trigonometry_1'}/>
      <div className='vertical_blank_space'/>
      </main>
    </div>;
  }
}
