// @flow
import Fig from 'figureone';
import { PresentationLessonContent } from '../../../../../../js/Lesson/PresentationLessonContent';
import lessonLayout from '../quickReference/layout';
import details from '../../details';
import version from '../version';
import imgLink from '../../tile.png';
import imgLinkGrey from '../../tile-grey.png';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';

const { click } = Fig.tools.html;
const layout = lessonLayout();

const { uid } = details.details;
const vid = 'base';
const qrids = version.details.qr;

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
    });
  }
}

export default Content;
