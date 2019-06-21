// @flow
import * as React from 'react';
import { classify } from '../tools/misc';

type Props = {
  label?: string,
  href?: string,
  className?: string,
  children?: React.Node,
};

export default class Button extends React.Component
                                    <Props> {
  render() {
    const props = Object.assign({}, this.props);
    const Tag = props.href ? 'a' : 'button';
    const label = props.label || props.children || '';
    const className = classify('btn', props.className || '');
    // delete props.label;

    return <Tag {...props} className={className}>
      {label}
    </Tag>;

    //   if (props.href != null) {
    //     return <a href={props.href} className={className}>
    //       {label}
    //     </a>;
    //   }

    //   return <button className={className}>
    //     {label}
    //   </button>;
  }
}
