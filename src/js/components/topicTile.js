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
  imgLinkSelected: ?string,
  imgLinkDisabled: ?string,
  state: '' | 'disabled' | 'selected',
  title: ?boolean,
};

export default class TopicTile extends React.Component
                                    <Props> {
  render() {
    const { props } = this;
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
    let classText = 'navigator__topic_tile_containter navigator__topic_shadow';
    if (isTitle) {
      classText = 'navigator__topic_tile_containter navigator__topic_tile_containter_title';
    }
    let imgLink = '/static/assets/defaultTile.png';
    if (props.imgLink != null) {
      imgLink = `${'/static/dist'}${props.imgLink}`;
    }
    if (props.state === 'disabled') {
      classText = `${classText} navigator__topic_tile_disabled`;
      if (props.imgLinkDisabled != null) {
        imgLink = `${'/static/dist'}${props.imgLinkDisabled}`;
      }
    }
    if (props.state === 'selected') {
      classText = `${classText} navigator__topic_tile_selected`;
      if (props.imgLinkSelected != null) {
        imgLink = `${'/static/dist'}${props.imgLinkSelected}`;
      }
    }

    const content = <div className={classText}>
        <img src={imgLink} className="navigator__topic_tile_image" alt={`Icon for ${label}`}/>
        <div className="navigator__topic_tile_title_container">
          <div className="navigator__topic_tile_title">
            {label}
          </div>
        </div>
      </div>;

    if (isTitle || props.state === 'disabled') {
      return <div
        id={id}
        style={style}
        className="navigator__topic_tile">
        {content}
    </div>;
    }
    return <a
        href={link}
        id={id}
        style={style}
        className="navigator__topic_tile">
      {content}
    </a>;
  }
}
