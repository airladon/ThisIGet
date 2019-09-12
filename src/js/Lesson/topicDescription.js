// @flow
import Fig from 'figureone';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import getTopicRatings from './rating';
import type TypeTopicRatings from './rating';

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
  approaches: {
    [approachUID: string]: {
      [versionUID: string]: {
        title: string,
        description: string,
        uid: string,
        fullTopic: boolean,
        type: 'presentation' | 'singlePage' | 'video' | 'audio' | 'generic',
        rating: {
          ave: number,
          num: number,
          high: number,
          user: number | string,
        }
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
        rating: {
          ave: number,
          num: number,
          high: number,
          user: number | string,
        }
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

  getRatings(callback: () => void) {
    const topicPath = this.path.replace('/content/', '');
    getTopicRatings(`${topicPath}/${this.uid}`, (ratings: ?TypeTopicRatings) => {
      if (ratings != null) {
        Object.keys(ratings).forEach((approachUID) => {
          const approach = ratings[approachUID];
          Object.keys(approach).forEach((versionUID) => {
            const rating = approach[versionUID];
            if (this.approaches[approachUID]
              && this.approaches[approachUID][versionUID]
            ) {
              this.approaches[approachUID][versionUID].rating = rating;
            }
          });
        });
      }
      callback();
    });
  }
}
