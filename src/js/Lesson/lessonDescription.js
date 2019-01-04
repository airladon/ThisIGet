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
  explanations: Array<{
    title: string;
    description: string;
    onPath: boolean;
    topics: Array<string>;
    qr: Array<string>;
  }>;
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
  explanations: Array<{
    title: string;
    description: string;
    onPath: boolean;
    topics: Array<string>;
    qr: Array<string>;
  }>;

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
      this.id = `id_lesson__navigator_tile_${this.name.toLowerCase()
        .replace(/ /gi, '_')
        .replace(/\?/gi, '')
        .replace(/!/gi, '')}`;
    }
    this.dependencies = lesson.dependencies;
    this.uid = lesson.uid;
    Object.keys(lesson.explanations).forEach((key) => {
      const explanation = lesson.explanations[key];
      const {
        title, description, onPath, topics, qr,
      } = explanation;
      this.explanations.push({
        title, description, onPath, topics, qr,
      });
    });
    this.enabled = lesson.enabled;
  }
}

