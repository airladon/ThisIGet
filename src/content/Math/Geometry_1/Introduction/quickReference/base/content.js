// @flow
import { PresentationFormatContent } from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
import details from '../../details';
import version from './version';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import { getCurrentPath } from '../../../../../../js/tools/misc';

const layout = diagramLayout();

const path = getCurrentPath().split('/');
const [topicUID] = path.slice(-3, -2);
const [versionUID] = path.slice(-1);

const qrids = version.references;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.loadQRs([
      `${details.path}/${topicUID}/${versionUID}`,
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
          out[qrid] = this.qr(`${details.path}/${topicUID}/${versionUID}/${qrid}`);
        });
        return out;
      },
    });
  }
}

export default Content;
