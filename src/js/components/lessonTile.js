// @flow

import * as React from 'react';
// import '../../css/style.scss';
// import img from '../../tile.png';

type Props = {
  label: ?string,
  id: ?string,
  left?: ?string,
  top?: ?string,
  link: ?string,
  imgLink: ?string,
  state: '' | 'disabled' | 'selected',
  title: ?boolean,
};

export default class LessonTile extends React.Component
                                    <Props> {
  render() {
    const props = Object.assign({}, this.props);
    let isTitle = false;
    if (props.title != null) {
      isTitle = props.title;
    }

    // const Tag = props.href ? 'a' : 'button';
    const label = props.label || '';
    const id = props.id || '';
    let style = {};
    if (props.left != null || props.top != null) {
      const left = props.left || 0;
      const top = props.top || 0;
      style = {
        left,
        top,
      };
    }

    const link = props.link || '/';
    let classText = 'navigator__lesson_tile_containter navigator__lesson_shadow';
    if (isTitle) {
      classText = 'navigator__lesson_tile_containter navigator__lesson_tile_containter_title';
    }
    if (props.state === 'disabled') {
      classText = `${classText} navigator__lesson_tile_disabled`;
    }
    if (props.state === 'selected') {
      classText = `${classText} navigator__lesson_tile_selected`;
    }
    let imgLink = '/static/defaultTile.png';
    if (props.imgLink != null) {
      imgLink = `${'/static/dist'}${props.imgLink}`;
    }
    const content = <div className={classText}>
        <img src={imgLink} className="navigator__lesson_tile_image" />
        <div className="navigator__lesson_tile_title_container">
          <div className="navigator__lesson_tile_title">
            {label}
          </div>
        </div>
      </div>;

    if (isTitle || props.state === 'disabled') {
      return <div
        id={id}
        style={style}
        className="navigator__lesson_tile">
        {content}
    </div>;
    }
    return <a
        href={link}
        id={id}
        style={style}
        className="navigator__lesson_tile">
      {content}
    </a>;
  }
}
