// @flow
import Fig from 'figureone';
import getLessonIndex from '../../Lessons/LessonsCommon/lessonindex';
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

  // eslint-disable-next-line class-methods-use-this
  loadStaticQRs(qrs: Array<string>) {
    // const defaultPath = defaultPathIn
    //   .replace(/^\//, '').replace(/\/$/, '')
    //   .split('/');
    qrs.forEach((qr) => {
      const splitQR = qr.replace(/^\//, '').replace(/\/$/, '').split('/');
      // if (splitQR.length < 2) {
      //   return;
      // }
      const versionUID = splitQR.slice(-1)[0];
      const topic = 'quickReference';
      const lessonUID = splitQR.slice(-2, -1)[0];
      const learningPath = splitQR.slice(-3, -2)[0];
      const subject = splitQR.slice(-4, -3)[0];
      // let subject = defaultPath[0];
      // let learningPath = defaultPath[1];
      // if (splitQR.length > 2) {
      //   learningPath = splitQR.slice(-3, -2)[0];
      // }
      // if (splitQR.length > 3) {
      //   subject = splitQR.slice(-4, -3)[0];
      // }
      const jsFile = `/static/dist/Lessons/${subject}/${learningPath}/${lessonUID}/quickReference/${versionUID}/quickReference.js`;
      const cssFile = `/static/dist/Lessons/${subject}/${learningPath}/${lessonUID}/quickReference/${versionUID}/quickReference.css`;
      loadRemoteCSS(`${qr}CSS`, cssFile, () => {
        loadRemote(`${qr}Script`, jsFile, () => {
          Object.keys(window.quickReference[lessonUID][versionUID]).forEach((qrid) => {
            console.log(`loaded ${lessonUID} ${versionUID}`)
            // const element = this.qrDiagram.elements._qr[`_${uid}`][`_${versionUID}`][`_${qrid}`];
            // const { isShown } = element;
            // const qr = new window.quickReference[uid][versionUID][qrid](this.qrDiagram);
            // // console.log(qr)
            // qr.prepareToHideAll = this.prepareToHideQR.bind(this);
            // qr.prepareToShow = this.prepareToShowQR.bind(this);
            // this.qrDiagram.elements._qr[`_${uid}`][`_${versionUID}`].add(qrid, qr);
            // if (isShown) {
            //   qr.show();
            //   qr.showAll();
            //   element.hideAll();
            // } else {
            //   qr.hideAll();
            // }
          });
        });
      });
    });
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
    // this.qrDiagram.elements.updateLimits(this._qrDiagram.limits);
    this.qrDiagram.setFirstTransform();
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideQR() {
  }

  getQR(
    uid: string,
    versionUidToLoad: string = '',
  ) {
    const index = getLessonIndex();
    let jsLink = '';
    let cssLink = '';
    const lesson = index[uid];
    // console.log(lesson)
    if (lesson != null && lesson.topics.quickReference != null) {
      const versions = Object.keys(lesson.topics.quickReference);
      if (versions.length > 0) {
        versions.forEach((versionUID) => {
          if (versionUidToLoad !== '' && versionUidToLoad !== versionUID) {
            return;
          }
          const version = lesson.topics.quickReference[versionUID];
          cssLink = `/static/dist/${lesson.path}/${uid}/quickReference/${versionUID}/quickReference.css`;
          jsLink = `/static/dist/${lesson.path}/${uid}/quickReference/${versionUID}/quickReference.js`;
          if (version.references != null && version.references.length > 0) {
            this.qrDiagram.elements._qr[`_${uid}`].add(versionUID, this.qrDiagram.shapes.collection());
            version.references.forEach((qrid) => {
              const loadingQR = this.qrDiagram.shapes.collection();
              loadingQR.hideAll();
              this.qrDiagram.elements._qr[`_${uid}`][`_${versionUID}`][`_${qrid}`] = loadingQR;
            });
          }
          if (cssLink !== '') {
            loadRemoteCSS(`${uid}${versionUID}CSS`, cssLink, () => {
              loadRemote(`${uid}${versionUID}Script`, jsLink, () => {
                Object.keys(window.quickReference[uid][versionUID]).forEach((qrid) => {
                  const element = this.qrDiagram.elements._qr[`_${uid}`][`_${versionUID}`][`_${qrid}`];
                  const { isShown } = element;
                  const qr = new window.quickReference[uid][versionUID][qrid](this.qrDiagram);
                  // console.log(qr)
                  qr.prepareToHideAll = this.prepareToHideQR.bind(this);
                  qr.prepareToShow = this.prepareToShowQR.bind(this);
                  this.qrDiagram.elements._qr[`_${uid}`][`_${versionUID}`].add(qrid, qr);
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
