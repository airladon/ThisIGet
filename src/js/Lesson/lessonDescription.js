// @flow
import Fig from 'figureone';

const { Point } = Fig;

export default class LessonDescription {
  name: string;
  link: string;
  imgLink: string;
  location: Point;
  id: string;
  uid: string;
  dependencies: Array<string>;
  paths: Array<string>;
  enabled: boolean;
  qr: Array<string>;

  constructor(
    name: string,
    link: string = '',
    uid: string = '',
    paths: Array<string> = [],
    dependencies: Array<string> = [],
    enabled: boolean = true,
    qr: Array<string>,
    id: string = '',
  ) {
    this.name = name;
    this.link = link;
    this.location = new Point(0, 0);
    this.id = id;
    this.imgLink = `${link}/tile.png`;
    if (id === '') {
      this.id = `id_lesson__navigator_tile_${name.toLowerCase()
        .replace(/ /gi, '_')
        .replace(/\?/gi, '')
        .replace(/!/gi, '')}`;
    }
    this.dependencies = dependencies;
    this.uid = uid;
    this.paths = paths;
    this.enabled = enabled;
    this.qr = qr;
  }
}

// const lessonIndex = [
//   new LessonDescription('Why study shapes?', '/Lessons/Math/Introduction'),
//   new LessonDescription('Circles', '/Lessons/Math/Circle'),
//   new LessonDescription('Angles', '/Lessons/Math/Angle'),
//   new LessonDescription('Measuring Angles', '/Lessons/Math/MeasuringAngles'),
//   new LessonDescription('Important Angles', '/Lessons/Math/ImportantAngles'),
//   new LessonDescription('Adjacent Angles', '/Lessons/Math/AdjacentAngles'),
//   new LessonDescription('Related Angles', '/Lessons/Math/RelatedAngles'),
//   new LessonDescription('Triangles'),
//   [
//     new LessonDescription('Similar Triangles'),
//     new LessonDescription('Pythagoras'),
//     new LessonDescription('Calculating &pi;'),
//     new LessonDescription('Triangle Area'),
//     new LessonDescription('Circle Area'),
//   ],
//   new LessonDescription('Sine (work in progress)', '/Lessons/Math/Sine'),
//   [
//     new LessonDescription('cosine'),
//     new LessonDescription('tan'),
//   ],
// ];
