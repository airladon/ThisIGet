// @flow

import * as React from 'react';
// import LoginTitle from './loginTitle';
// import LearningPathNavigator from './learningPathNavigator';
// import HomeBanner from './homeBanner';


type Props = {
  isLoggedIn: boolean;
  username: string;
  content: string;
};

export default class ViewPolicy extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    return <div>
      <main>
      <div className='lesson__white_spacer'/>
      <div className='information_text_container'>
        <div className="markdown" dangerouslySetInnerHTML={ { __html: this.props.content } }/>
      </div>
      <div className='lesson__white_spacer'/>
      <div className='lesson__white_spacer'/>
      </main>
    </div>;
  }
}
