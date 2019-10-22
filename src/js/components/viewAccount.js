// @flow
import * as React from 'react';

type Props = {
  isLoggedIn: boolean;
  username: string;
};

export default class ViewAccount extends React.Component<Props> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const props = Object.assign({}, this.props);
    // delete props.active;
    return <div>
      <main>
        <h1>Account Settings</h1>
        { }
        <div className='vertical_blank_space'/>
        { }
      </main>
    </div>;
  }
}
