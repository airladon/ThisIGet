// @flow

import * as React from 'react';
import LearningPathNavigator from './learningPathNavigator';

type Props = {
  isLoggedIn: boolean;
  username: string;
};

export default class ViewLearningPaths extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    return <div>
      <h1 className='learning_paths__title'>Learning Paths</h1>
      <main>
      <div className='learning_paths__text'>Scroll horizontally through a path and select a topic to start.</div>
      <div className='vertical_blank_space'/>
      <LearningPathNavigator learningPath={'Geometry_1'} includeSubText={false}/>
      <div className='vertical_blank_space'/>
      <LearningPathNavigator learningPath={'Trigonometry_1'} includeSubText={false}/>
      <div className='vertical_blank_space'/>
      </main>
    </div>;
  }
}
