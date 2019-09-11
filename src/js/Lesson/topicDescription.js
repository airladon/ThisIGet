// @flow
import Fig from 'figureone';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

const { Point } = Fig;

export type TypeTopicDescription = {
  title: string;
  path: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  enabled: boolean;
  qr: Array<string>;
  // versions: {[vuid: string]: {
  //   title: string;
  //   description: string;
  //   onPath: boolean;
  //   topics: Array<string>;
  //   qr: Array<string>;
  // }};
  approaches: {
    [approachUID: string]: {
      [versionUID: string]: {
        title: string,
        description: string,
        uid: string,
        fullTopic: boolean,
        type: 'presentation' | 'singlePage' | 'video' | 'audio' | 'generic',
        aveRating: number;
        numRatings: number;
        numHighRatings: number;
        userRating: number;
      },
    },
  };
  numVersions: number;
  callbackCount: number;
  getRatings: (Function) => {};
};

export default class TopicDescription {
  title: string;
  path: string;
  imgLink: string;
  imgLinkSelected: string;
  imgLinkDisabled: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  // Each approach has an array of versions
  approaches: {
    [approachUID: string]: {
      [versionUID: string]: {
        title: string,
        description: string,
        uid: string,
        fullTopic: boolean,
        type: 'presentation' | 'singlePage' | 'video' | 'audio' | 'generic',
        aveRating: number;
        numRatings: number;
        numHighRatings: number;
        userRating: number;
      },
    },
  };

  // topics: Object;

  numVersions: number;
  callbackCount: number;

  enabled: boolean;
  qr: Array<string>;

  constructor(
    topic: {
      title: string,
      path: string,
      uid: string,
      approaches: {
        [approachUID: string]: {
          [versionUID: string]: {
            title: string,
            description: string,
            uid: string,
            fullTopic: boolean,
            type: 'presentation' | 'singlePage' | 'video' | 'audio',
          },
        },
      },
      dependencies: Array<string>,
      enabled: boolean;
    },
    id: string = '',
  ) {
    this.title = topic.title;
    this.path = topic.path;
    this.uid = topic.uid;
    this.dependencies = topic.dependencies;
    this.location = new Point(0, 0);
    this.id = id;
    this.imgLink = `${this.path}/${this.uid}/tile.svg`;
    this.imgLinkSelected = `${this.path}/${this.uid}/tile_ffffff.svg`;
    this.imgLinkDisabled = `${this.path}/${this.uid}/tile_aaaaaa.svg`;
    if (id === '') {
      this.id = `id_content__navigator_tile_${topic.uid}`;
    }
    // $FlowFixMe
    this.approaches = topic.approaches;
    this.enabled = topic.enabled;
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
    Object.keys(this.approaches).forEach((approachUID) => {
      const topic = this.approaches[approachUID];
      this.numVersions += Object.keys(topic).length;
      Object.keys(topic).forEach((versionUID) => {
        const version = topic[versionUID];
        const link = `/rating/${this.uid}/${approachUID}/${versionUID}`;
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
            message: string,
            userRating: number,
            aveRating: number,
            numRatings: number,
            numHighRatings: number,
          }) => {
            if (data.status === 'ok') {
              version.aveRating = data.aveRating;
              version.numRatings = data.numRatings;
              version.numHighRatings = data.numHighRatings;
              version.userRating = data.userRating;
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

