// @flow

import * as React from 'react';
// import LoginTitle from './loginTitle';
// import LearningPathNavigator from './learningPathNavigator';
// import HomeBanner from './homeBanner';


type Props = {
  isLoggedIn: boolean;
  username: string;
  content: string;
  appendContent: ?React.Element<'div'>;
};

export default class ViewPolicy extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    console.log(this.props.appendContent)
    return <div>
      <main>
      <div className='information_text_container'>
        <div className="markdown" dangerouslySetInnerHTML={ { __html: this.props.content } }/>
      </div>
      {this.props.appendContent || ''}
      <div className='vertical_blank_space'/>
      <div className='vertical_blank_space'/>
      </main>
    </div>;
  }
}
