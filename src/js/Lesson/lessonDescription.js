// @flow
import Fig from 'figureone';

const { Point } = Fig;

export type TypeLessonDescription = {
  name: string;
  path: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  enabled: boolean;
  qr: Array<string>;
  explanations: {[euid: string]: {
    title: string;
    description: string;
    onPath: boolean;
    topics: Array<string>;
    qr: Array<string>;
  }};
};

export default class LessonDescription {
  name: string;
  path: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  // explanations: Array<string>;
  explanations: {[euid: string]: {
    title: string;
    description: string;
    onPath: boolean;
    topics: Array<string>;
    qr: Array<string>;
    path: string,
  }};

  enabled: boolean;
  qr: Array<string>;

  constructor(
    lesson: {
      name: string,
      path: string,
      uid: string,
      explanations: {[name: string]: {
        title: string,
        description: string,
        onPath: boolean,
        topics: Array<string>,
        qr: Array<string>,
        path: string,
      }},
      dependencies: Array<string>,
      enabled: boolean;
    },
    id: string = '',
  ) {
    this.name = lesson.name;
    this.path = lesson.path;
    this.location = new Point(0, 0);
    this.id = id;
    this.imgLink = `${this.path}/tile.png`;
    if (id === '') {
      this.id = `id_lesson__navigator_tile_${lesson.uid}`;
    }
    this.dependencies = lesson.dependencies;
    this.uid = lesson.uid;
    this.explanations = {};
    Object.keys(lesson.explanations).forEach((key) => {
      const explanation = lesson.explanations[key];
      const {
        title, description, onPath, topics, qr, path,
      } = explanation;
      this.explanations[key] = {
        title, description, onPath, topics, qr, path,
      };
    });
    this.enabled = lesson.enabled;
  }
}

