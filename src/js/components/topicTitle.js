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
    // let classText = 'lesson__title_container';
    // if (isTitle) {
    //   classText = 'navigator__lesson_tile_containter navigator__lesson_tile_containter_title';
    // }
    // if (props.state === 'disabled') {
    //   classText = `${classText} navigator__lesson_tile_disabled`;
    // }
    // if (props.state === 'selected') {
    //   classText = `${classText} navigator__lesson_tile_selected`;
    // }
    let imgLink = '/static/assets/defaultTile.png';
    if (this.props.imgLink != null) {
      imgLink = `${this.props.imgLink}`;
    }
    // const content = <div className={classText}>
    //     <img src={imgLink} className="navigator__lesson_tile_image" />
    //     <div className="navigator__lesson_tile_title_container">
    //       <div className="navigator__lesson_tile_title">
    //         {label}
    //       </div>
    //     </div>
    //   </div>;

    return <div className='lesson__title_container'>
      <div className='lesson__title_centering_container'>
        <div className='lesson__title_img_container'>
          <img src={imgLink} className="lesson__title_image"
            alt="Icon for lesson title"/>
        </div>
        <div className='lesson__title_text_container'>
          <div className='lesson__title_text'>
            <h1>
              {label}
            </h1>
          </div>
        </div>
      </div>
    </div>;
  }
}