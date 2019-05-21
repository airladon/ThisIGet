// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import LinksTable from '../../../../../../js/components/linksTable'

function makeTable(inputLinks: Array<{
    link: string;
    uid: string;
    description: string;
  }>) {
  const links = [];
  inputLinks.forEach((link, index) => {
    links.push(<tr key={index}>
      <td>{link.link}</td>
      <td>{link.description}</td>
      <td>3</td>
      <td>4</td>
    </tr>);
  });

  return 
}

class Content extends SimpleLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setContent() {
    this.sections = [
      <div key={0} className="simple_lesson__container">
        <LinksTable links={[
          {
            link: 'https://en.wikipedia.org/wiki/Right_triangle',
            description: 'Wikipedia',
            uid: 'wikipedia',
          },
        ]} />
      </div>,
    ];
  }
}

export default Content;
