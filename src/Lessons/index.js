import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = [];

  lessonIndex.push(new LessonDescription(
    'Congruent Triangles',
    '/Lessons/Math/Geometry_1/test1',
    'test1',
    {
      euclid: [
        'Euclid',
        'The way Euclid did it',
        false,
        [
          'euclid/dev',
          'euclid/explanation',
          'euclid/quiz',
          'euclid/summary',
        ],
        [
          'Asa',
          'Sss',
          'Sas',
          'Aas',
          'Aaa',
          'Ssa',
          'Main',
        ],
      ],
      simple: [
        'Simple Official',
        'Official version',
        false,
        [
          'simple/dev',
          'simple/explanation',
          'simple/quiz',
          'simple/summary',
        ],
        [
          'Asa',
          'Sss',
          'Sas',
          'Aas',
          'Aaa',
          'Ssa',
          'Main',
        ],
      ],
    },
    [
    ],
    true,
  ));
  lessonIndex.push(new LessonDescription(
    'Congruent Triangles 2',
    '/Lessons/Math/Geometry_1/test2',
    'test2',
    {
      simple: [
        'Simple Official',
        'Official version',
        false,
        [
          'simple/dev',
          'simple/explanation',
          'simple/quiz',
          'simple/summary',
        ],
        [
          'Asa',
          'Sss',
          'Sas',
          'Aas',
          'Aaa',
          'Ssa',
          'Main',
        ],
      ],
    },
    [
      'test1',
    ],
    true,
  ));
  lessonIndex.push(new LessonDescription(
    'Chord',
    '/Lessons/Math/Trigonometry_1/test3',
    'chord',
    {
    },
    [
    ],
    false,
  ));
  return lessonIndex;
}
