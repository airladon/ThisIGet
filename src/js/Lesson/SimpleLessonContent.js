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
  prepareToHideQR() {
  }


  // eslint-disable-next-line class-methods-use-this
  prepareToShowQR() {
  }


  showQR(
    qrPath: string,
    qrid: string,
  ) {
    if (this.qrDiagram == null) {
      this.qrDiagram = new Diagram({
        htmlId: 'id_qr_diagram',
        limits: this.diagram.limits,
      });
    }
    this.qrDiagram.updateFontSize = false;
    this.prepareToShowQR();
    // const [uid, versionUid] = combinedUid.split('/');
    const collection = new window.quickReference[`${qrPath}/${qrid}`](this.qrDiagram);
    if (collection != null) {
      this.qrDiagram.setElementsToCollection(collection);
      this.qrDiagram.elements.show();
      this.qrDiagram.elements.prepareToHideAll = this.prepareToHideQR.bind(this);
    }
  }
}

export default SimpleLessonContent;
