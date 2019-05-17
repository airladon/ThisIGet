// @flow
import Fig from 'figureone';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

const { Point } = Fig;

export type TypeLessonDescription = {
  title: string;
  path: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  enabled: boolean;
  qr: Array<string>;
  versions: {[vuid: string]: {
    title: string;
    description: string;
    onPath: boolean;
    topics: Array<string>;
    qr: Array<string>;
  }};
  topics: {
    [versionName: string]: {
      title: string;
      description: string;
      onPath: boolean;
      qr: Array<string>;
      path: string,
      aveRating: number;
      numRatings: number;
      numHighRatings: number;
    };
  };
  numVersions: number;
  callbackCount: number;
  getRatings: (Function) => {};
};

export default class LessonDescription {
  title: string;
  path: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  topics: {
    [topicName: string]: Array<{
      title: string,
      description: string,
      uid: string,
      fullLesson: boolean,
      type: 'presentation' | 'singlePage' | 'video' | 'audio' | 'generic',
      aveRating: number;
      numRatings: number;
      numHighRatings: number;
    }>
  };

  // versions: {[vuid: string]: {
  //   title: string;
  //   description: string;
  //   onPath: boolean;
  //   topics: Array<string>;
  //   qr: Array<string>;
  //   path: string,
  // }};

  topics: Object;
  // topics: {
  //   [versionName: string]: {
  //     title: string;
  //     description: string;
  //     onPath: boolean;
  //     qr: Array<string>;
  //     path: string;
  //     aveRating: number;
  //     numRatings: number;
  //     numHighRatings: number;
  //   };
  // };

  numVersions: number;
  callbackCount: number;

  enabled: boolean;
  qr: Array<string>;

  constructor(
    lesson: {
      title: string,
      path: string,
      uid: string,
      topics: {
        [topicName: string]: Array<{
          title: string,
          description: string,
          uid: string,
          fullLesson: boolean,
          type: 'presentation' | 'singlePage' | 'video' | 'audio',
        }>
      },
      dependencies: Array<string>,
      enabled: boolean;
    },
    id: string = '',
  ) {
    this.title = lesson.title;
    this.path = lesson.path;
    this.uid = lesson.uid;
    this.dependencies = lesson.dependencies;
    this.location = new Point(0, 0);
    this.id = id;
    this.imgLink = `${this.path}/${this.uid}/tile.png`;
    if (id === '') {
      this.id = `id_lesson__navigator_tile_${lesson.uid}`;
    }
    // this.topics = {};
    // Object.keys(lesson.topics).forEach((topic) => {
    //   this.topics[topic] = lesson.topics[topic];
    // });
    this.topics = lesson.topics;

    // this.versions = {};       // Deprecate
    // Object.keys(lesson.versions).forEach((key) => {
    //   const version = lesson.versions[key];
    //   const {
    //     title, description, onPath, topics, qr, path,
    //   } = version;
    //   this.versions[key] = {
    //     title, description, onPath, topics, qr, path,
    //   };
    // });
    this.enabled = lesson.enabled;

    // this.topics = {};
    // this.numVersions = 0;
    // this.callbackCount = 0;
    // Object.keys(lesson.versions).forEach((versionName) => {
    //   const version = lesson.versions[versionName];
    //   const {
    //     title, description, onPath, topics, qr, path,
    //   } = version;
    //   topics.forEach((topicName) => {
    //     const v = {
    //       title,
    //       description,
    //       onPath,
    //       qr,
    //       path,
    //       aveRating: 0,
    //       numRatings: 0,
    //       numHighRatings: 0,
    //     };

    //     if (this.topics[topicName] == null) {   // $FlowFixMe
    //       this.topics[topicName] = {};
    //     }
    //     this.topics[topicName][versionName] = v;
    //     this.numVersions += 1;
    //   });
    // });
  }

  waitThenCallback(callback: Function) {
    this.callbackCount += 1;
    if (this.callbackCount === this.numVersions) {
      callback();
    }
  }

  getRatings(callback: Function) {
    this.callbackCount = 0;
    this.numVersions = 0;
    Object.keys(this.topics).forEach((topicName) => {
      const topic = this.topics[topicName];
      this.numVersions += Object.keys(topic).length;
      Object.keys(topic).forEach((versionUID) => {
        const version = topic[versionUID];
        const link = `/rating/${this.uid}/${topicName}/${versionUID}`;
        fetchPolyfill(link, { credentials: 'same-origin' })
          .then((response) => {
            if (!response.ok) {
              this.waitThenCallback(callback);
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data: {
            status: 'ok' | 'fail',
            message?: string,
            aveRating?: number,
            numRatings?: number,
            numHighRatings: number,
          }) => {
            if (data.status === 'ok') {
              version.aveRating = data.aveRating;
              version.numRatings = data.numRatings;
              version.numHighRatings = data.numHighRatings;
            }
            this.waitThenCallback(callback);
          })
          .catch(() => {
            this.waitThenCallback(callback);
          });
      });
    });
  }
}

