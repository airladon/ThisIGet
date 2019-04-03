// @flow
import Fig from 'figureone';
import getLessonIndex from '../../Lessons/index';
import { loadRemote, loadRemoteCSS } from '../tools/misc';

const {
  Diagram, Transform,
} = Fig;


class SimpleLessonContent {
  title: string;
  sections: Array<Object>;
  iconLink: string;
  iconLinkGrey: string;
  htmlId: string;
  key: number;
  qrDiagram: Object;
  diagram: Object;

  constructor(htmlId: string = 'lesson__content') {
    this.htmlId = htmlId;
    this.sections = [];
    this.iconLink = '/';
    this.iconLinkGrey = '/';
    this.setTitle();
    this.key = 0;
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

  loadQRs(
    qrs: Array<string>,
  ) {
    if (this.qrDiagram == null) {
      this.qrDiagram = new Diagram({
        htmlId: 'id_qr_diagram',
        limits: this.diagram.limits,
      });
    }
    this.qrDiagram.updateFontSize = false;
    if (this.qrDiagram.elements._qr == null) {
      this.qrDiagram.addElements(
        this.qrDiagram.elements,
        [
          {
            name: 'qr',
            method: 'collection',
            options: { transform: new Transform('qr').translate(0, 0) },
          },
        ],
      );
    }
    // const index = getLessonIndex();
    qrs.forEach((combinedUid) => {
      const [uid, versionUid] = combinedUid.split('/');
      if (this.qrDiagram.elements._qr[`_${uid}`] == null) {
        this.qrDiagram.addElements(this.qrDiagram.elements._qr, [{
          name: `${uid}`, method: 'collection',
        }]);
      }
      this.getQR(uid, versionUid);
    });
    // this.qrDiagram.elements.hasTouchableElements = true;
    this.qrDiagram.setFirstTransform();
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideQR() {
  }

  getQR(
    uid: string,
    versionUid: string = '',
  ) {
    const index = getLessonIndex();
    let jsLink = '';
    let cssLink = '';
    const lesson = index[uid];
    if (lesson != null) {
      let versionUids = Object.keys(lesson.versions);
      if (versionUid != null && versionUid !== '') {
        versionUids = [versionUid];
      }
      versionUids.forEach((vUid) => {
        const version = lesson.versions[vUid];
        cssLink = `/static/dist/${lesson.path}/${version.path}/quickReference/lesson.css`;
        jsLink = `/static/dist/${lesson.path}/${version.path}/quickReference/lesson.js`;
        if (version.qr != null && version.qr.length > 0) {
          this.qrDiagram.elements._qr[`_${uid}`].add(vUid, this.qrDiagram.shapes.collection());
          version.qr.forEach((qrid) => {
            const loadingQR = this.qrDiagram.shapes.collection();
            loadingQR.hideAll();
            this.qrDiagram.elements._qr[`_${uid}`][`_${vUid}`][`_${qrid}`] = loadingQR;
          });
        }
        if (cssLink !== '') {
          loadRemoteCSS(`${uid}${vUid}CSS`, cssLink, () => {
            loadRemote(`${uid}${vUid}Script`, jsLink, () => {
              Object.keys(window.quickReference[uid][vUid]).forEach((qrid) => {
                const element = this.qrDiagram.elements._qr[`_${uid}`][`_${vUid}`][`_${qrid}`];
                const { isShown } = element;
                const qr = new window.quickReference[uid][vUid][qrid](this.qrDiagram);
                // console.log(qr)
                qr.prepareToHideAll = this.prepareToHideQR.bind(this);
                qr.prepareToShow = this.prepareToShowQR.bind(this);
                this.qrDiagram.elements._qr[`_${uid}`][`_${vUid}`].add(qrid, qr);
                if (isShown) {
                  qr.show();
                  qr.showAll();
                  element.hideAll();
                } else {
                  qr.hideAll();
                }
              });
            });
          });
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToShowQR() {
  }

  // eslint-disable-next-line class-methods-use-this
  // prepareToHideQR() {
  // }

  showQR(
    combinedUid: string,
    qrid: string,
  ) {
    this.prepareToShowQR();
    // this.qrDiagram.container.style.zIndex = '10';

    // eslint-disable-next-line prefer-const
    let [uid, vid] = combinedUid.split('/');
    if (vid == null) {
      vid = 'base';
    }

    let uidToUse = uid;
    if (!uid.startsWith('_')) {
      uidToUse = `_${uid}`;
    }
    let vidToUse = vid;
    if (!vid.startsWith('_')) {
      vidToUse = `_${vid}`;
    }

    let qridToUse = qrid;
    if (!qrid.startsWith('_')) {
      qridToUse = `_${qrid}`;
    }

    if (this.qrDiagram.elements._qr) {
      if (this.qrDiagram.elements._qr[uidToUse]) {
        if (this.qrDiagram.elements._qr[uidToUse][vidToUse]) {
          if (this.qrDiagram.elements._qr[uidToUse][vidToUse][qridToUse]) {
            this.qrDiagram.elements._qr.show();
            this.qrDiagram.elements._qr[uidToUse].show();
            this.qrDiagram.elements._qr[uidToUse][vidToUse].show();
            this.qrDiagram.elements._qr[uidToUse][vidToUse][qridToUse].show();
          }
        }
      }
    }
  }
}

export default SimpleLessonContent;
