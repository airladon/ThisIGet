// @flow
import Fig from 'figureone';
// import getLessonIndex from '../../Lessons/LessonsCommon/lessonindex';
import { loadRemote, loadRemoteCSS } from '../tools/misc';

const {
  Diagram,
  // Transform,
  Rect,
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
  loadQRs(
    qrs: Array<string>,
  ) {
    qrs.forEach((qr) => {
      const splitQR = qr.replace(/^\//, '').replace(/\/$/, '').split('/');
      const versionUID = splitQR.slice(-1)[0];
      const lessonUID = splitQR.slice(-2, -1)[0];
      const path = splitQR.slice(0, -2).join('/');
      const jsFile = `/static/dist/Lessons/${path}/${lessonUID}/quickReference/${versionUID}/quickReference.js`;
      const cssFile = `/static/dist/Lessons/${path}/${lessonUID}/quickReference/${versionUID}/quickReference.css`;
      loadRemoteCSS(`${qr}CSS`, cssFile, () => {
        loadRemote(`${qr}Script`, jsFile, () => {
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToShowQR() {
    // this.qrDiagram.container.style.zIndex = '10';
    const overlay = document.getElementById('simple_lesson__qr__overlay');
    if (overlay != null) {
      overlay.style.zIndex = '10';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  prepareToHideQR() {
    const overlay = document.getElementById('simple_lesson__qr__overlay');
    if (overlay != null) {
      overlay.style.zIndex = '-1';
    }
  }


  showQR(
    qrPath: string,
    qrid: string,
  ) {
    const qr = document.getElementById('id_lesson__qr__content_pres');
    if (qr != null) {
      qr.classList.remove('lesson__hide');
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
      this.qrDiagram.elements.hideAll();
      this.qrDiagram.resize();
      this.qrDiagram.clearContext();
      this.qrDiagram.setElementsToCollection(collection);
      this.qrDiagram.elements.show();
      this.qrDiagram.elements.prepareToHideAll = this.prepareToHideQR.bind(this);
      this.qrDiagram.animateNextFrame();
    }
  }
}

export default SimpleLessonContent;
