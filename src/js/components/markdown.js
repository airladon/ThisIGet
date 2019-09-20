// @flow
import * as React from 'react';

type Props = {
  content: string;
};

export default class Markdown extends React.Component
                                    <Props> {
  render() {
    return <div
      className="topic__markdown"
      dangerouslySetInnerHTML={ { __html: this.props.content } }
    />;
  }
}
