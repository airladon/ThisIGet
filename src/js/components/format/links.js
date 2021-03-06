// @flow

import * as React from 'react';
import SimpleFormat from '../../TopicFormat/SimpleFormat';
import LinksTable from './linksTable';

type Props = {
  version: SimpleFormat;
  isLoggedIn: boolean;
};

export default class LinksFormatComponent extends React.Component
                                    <Props> {
  version: SimpleFormat;
  key: number;

  constructor(props: Props) {
    super(props);
    this.version = props.version;
    this.key = 0;
  }

  componentDidMount() {
    // Instantiate diagram now that the canvas elements have been
    // created.
    this.version.initialize();
  }

  renderSections() {
    const sections = [];
    this.version.content.sections.forEach((section, index) => {
      if (section.links != null) {
        sections.push(
          <div key={index}>
            <LinksTable links={section.links} isLoggedIn={this.props.isLoggedIn} />
          </div>,
        );
      } else {
        sections.push(
          <div key={index}>
            {section}
          </div>,
        );
      }
    });
    return sections;
  }

  render() {
    return <div id={this.version.content.htmlId} className="simple_topic__container">
      <div className="simple_topic__inner_container">
        {this.renderSections()}
      </div>
    </div>;
  }
}
