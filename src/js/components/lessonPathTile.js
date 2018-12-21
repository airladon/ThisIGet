// @flow

import * as React from 'react';
// import '../../css/style.scss';

type Props = {
  label: ?string,
  id: ?string,
  link: ?string,
  state: '' | 'disabled' | 'selected',
};

export default class LessonTilePath extends React.Component
                                    <Props> {
  render() {
    const props = Object.assign({}, this.props);
    const label = props.label || '';
    const id = props.id || '';

    const link = props.link || '/';
    let classText = 'lesson__path_tile';
    if (props.state === 'disabled') {
      classText = `${classText} lesson__path_tile_disabled`;
    }
    if (props.state === 'selected') {
      classText = `${classText} lesson__path_tile_selected`;
    }
    return <a
        href={link}
        id={id}
        className={classText}>
          <div className="lesson__path_tile_label_container">
            <div className="lesson__path_tile_label">
              {label}
            </div>
          </div>
        </a>;
  }
}
