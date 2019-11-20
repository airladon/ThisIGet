// @flow
import Fig from 'figureone';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import { loadRemote, loadRemoteCSS } from '../tools/misc';
import { Colors } from '../tools/colors';

const {
  Diagram,
  // Transform,
  Rect,
} = Fig;


class SimpleFormatContent {
  title: string;
  sections: Array<Object>;
  iconLink: string;
  iconLinkGrey: string;
  htmlId: string;
  key: number;
  qrDiagram: Object;
  diagram: Object;
  setVariables: () => {[name: string]: string | number };
  variables: { [name: string]: string | number };
  colors: Object;
  message: ?string;

  constructor(htmlId: string = 'topic__content') {
    this.colors = new Colors();
    this.htmlId = htmlId;
    this.sections = [];
    this.iconLink = '/';
    this.iconLinkGrey = '/';
    this.setTitle();
    this.key = 0;
    this.variables = {};
    this.setVariables = () => ({});
    this.message = null;
  }

  initialize() {
    this.setContent();
  }

  setTitle() {
    this.title = '';
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setContent() {
  }

  // eslint-disable-next-line class-methods-use-this
  loadQR(qr: string, path: string) {
    const link = `/qr/${path}`;
    fetchPolyfill(link, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          const jsFile = `/static/dist/${path}/${data.js}`;
          const cssFile = `/static/dist/${path}/${data.css}`;
          // loadRemoteCSS(`${qr}CSS`, cssFile, () => {
          //   loadRemote(`${qr}Script`, jsFile, () => {
          //   });
          // });
          loadRemoteCSS(`${qr}CSS`, cssFile, () => {});
          loadRemote(`${qr}Script`, jsFile, () => {});
        }
      })
      .catch(() => {});
  }

  // eslint-disable-next-line class-methods-use-this
  loadQRs(
    qrs: Array<string>,
  ) {
    qrs.forEach((qr) => {
      const splitQR = qr.replace(/^\//, '').replace(/\/$/, '').split('/');
      const versionUID = splitQR.slice(-1)[0];
      const topicUID = splitQR.slice(-2, -1)[0];
      const path = splitQR.slice(0, -2).join('/');
      this.loadQR(qr, `content/${path}/${topicUID}/quickReference/${versionUID}`);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToShowQR() {
    // this.qrDiagram.container.style.zIndex = '10';
    const overlay = document.getElementById('simple_topic__qr__overlay');
    if (overlay != null) {
      overlay.style.zIndex = '10';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideQR() {
    const overlay = document.getElementById('simple_topic__qr__overlay');
    if (overlay != null) {
      overlay.style.zIndex = '-1';
    }
  }


  showQR(
    qrPath: string,
    qrid: string,
  ) {
    const qr = document.getElementById('id_topic__qr__content_pres');
    if (qr != null) {
      qr.classList.remove('topic__hide');
    }
    if (this.qrDiagram == null) {
      this.qrDiagram = new Diagram({
        htmlId: 'id_qr_diagram',
        // limits: this.diagram.limits,
        limits: new Rect(-3, -2, 6, 4),
        updateFontSize: true,
      });
    }
    // this.qrDiagram.updateFontSize = false;
    this.prepareToShowQR();

    // const [uid, versionUid] = combinedUid.split('/');
    const collection = new window.quickReference[`${qrPath}/${qrid}`](this.qrDiagram);
    if (collection != null) {
      this.qrDiagram.elements.hide();
      this.qrDiagram.resize();
      this.qrDiagram.clearContext();
      this.qrDiagram.setElementsToCollection(collection);
      this.qrDiagram.elements.show();
      this.qrDiagram.elements.prepareToHideAll = this.prepareToHideQR.bind(this);
      this.qrDiagram.animateNextFrame();
    }
  }
}

export default SimpleFormatContent;
