// @flow
import Fig from 'figureone';
import { PresentationLessonContent } from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from '../quickReference/layout';
import details from '../../details';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
// import DiagramCollection from './diagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const { click } = Fig.tools.html;
const layout = lessonLayout();

const uid = 'related_angles';
const vid = 'base';
const qrids = [
  'Alternate',
  'Interior',
  'Opposite',
  'Corresponding',
];

class Content extends PresentationLessonContent {
  setTitle() {
    this.title = details.details.title;
    this.iconLink = imgLink;
    this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonLessonDiagram({ htmlId }, layout);
    this.loadQRs([
      `${uid}/${vid}`,
    ]);
  }

  addSections() {
    // const diag = this.qrDiagram.elements._qr['_related_angles']['_base'];
    this.addSection({
      title: 'QR Test',
      setContent: () => {
        let out = '<p>Quick Reference Popups</p><p></p>';
        qrids.forEach((qrid) => {
          out += `<p>|${qrid}|</p>`;
        });
        return out;
      },
      modifiers: () => {
        const out = {};
        qrids.forEach((qrid) => {
          out[qrid] = click(this.showQR, [this, uid, qrid]);
        });
        return out;
      },
      // setContent: [
      //   '<p>Quick Reference Popups</p><p></p>',
      //   '<p>|Alternate|</p>',
      //   '<p>|Interior|</p>',
      //   '<p>|Opposite|</p>',
      //   '<p>|Corresponding|</p>',
      // ],
      // modifiers: {
      //   Alternate: click(this.showQR, [this, 'related_angles', 'Alternate']),
      //   Alternate: click(this.showQR, [this, 'related_angles', 'Alternate']),
      //   Alternate: click(this.showQR, [this, 'related_angles', 'Alternate']),
      //   Alternate: click(this.showQR, [this, 'related_angles', 'Alternate']),
      // },
    });
  }
}

export default Content;
