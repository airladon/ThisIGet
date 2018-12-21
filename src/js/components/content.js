// @flow

import * as React from 'react';
// import '../../css/style.scss';

type Props = {
};

type State = {
  content?: string;
};

export default class Content extends React.Component
                                    <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: 'default content',
    };
  }

  componentDidMount() {
    fetch('/lessons/chapter1')
      .then(response => response.text())
      .then((response) => {
        this.setState({
          content: response,
        });
      });
  }

  render() {
    return <div>
      {this.state.content}
    </div>;
  }
}
