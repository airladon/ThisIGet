// @flow

import * as React from 'react';
// import '../../css/style.scss';
// import img from '../../tile.png';

type Props = {
  label: ?string,
  imgLink: ?string,
};

export default class LessonTitle extends React.Component
                                    <Props> {
  render() {
    // const props = Object.assign({}, this.props);
    // let isTitle = false;
    // if (props.title != null) {
    //   isTitle = props.title;
    // }

    // const Tag = props.href ? 'a' : 'button';
    const label = this.props.label || '';

    // const link = props.link || '/';
    // let classText = 'topic__title_container';
    // if (isTitle) {
    //   classText = 'navigator__topic_tile_containter navigator__topic_tile_containter_title';
    // }
    // if (props.state === 'disabled') {
    //   classText = `${classText} navigator__topic_tile_disabled`;
    // }
    // if (props.state === 'selected') {
    //   classText = `${classText} navigator__topic_tile_selected`;
    // }
    let imgLink = '/static/assets/defaultTile.png';
    if (this.props.imgLink != null) {
      imgLink = `${this.props.imgLink}`;
    }
    // const content = <div className={classText}>
    //     <img src={imgLink} className="navigator__topic_tile_image" />
    //     <div className="navigator__topic_tile_title_container">
    //       <div className="navigator__topic_tile_title">
    //         {label}
    //       </div>
    //     </div>
    //   </div>;

    return <div className='topic__title_container'>
      <div className='topic__title_centering_container'>
        <div className='topic__title_img_container'>
          <img src={imgLink} className="topic__title_image"
            alt="Icon for topic title"/>
        </div>
        <div className='topic__title_text_container'>
          <div className='topic__title_text'>
            <h1>
              {label}
            </h1>
          </div>
        </div>
      </div>
    </div>;
  }
}
