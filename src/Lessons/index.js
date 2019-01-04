import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
    test1: new LessonDescription({
      name: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1/test1',
      uid: 'test1',
      versions: {
        euclid: {
          title: 'Euclid',
          description: 'The way Euclid did it',
          path: 'euclid',
          onPath: false,
          topics: [
            'dev',
            'explanation',
            'quiz',
            'summary',
          ],
          qr: [
            'Asa',
            'Sss',
            'Sas',
            'Aas',
            'Aaa',
            'Ssa',
            'Main',
          ],
        },
        simple: {
          title: 'Simple Official',
          description: 'Official version',
          path: 'simple',
          onPath: false,
          topics: [
            'dev',
            'explanation',
            'quiz',
            'summary',
          ],
          qr: [
            'Asa',
            'Sss',
            'Sas',
            'Aas',
            'Aaa',
            'Ssa',
            'Main',
          ],
        },
      },
      dependencies: [
      ],
      enabled: true,
    }),
    test2: new LessonDescription({
      name: 'Congruent Triangles 2',
      path: '/Lessons/Math/Geometry_1/test2',
      uid: 'test2',
      versions: {
        simple: {
          title: 'Simple Official',
          description: 'Official version',
          path: 'simple',
          onPath: false,
          topics: [
            'dev',
            'explanation',
            'history',
            'implications',
            'quiz',
            'references',
            'summary',
          ],
          qr: [
            'Asa',
            'Sss',
            'Sas',
            'Aas',
            'Aaa',
            'Ssa',
            'Main',
          ],
        },
      },
      dependencies: [
        'test1',
      ],
      enabled: true,
    }),
    chord: new LessonDescription({
      name: 'Chord',
      path: '/Lessons/Math/Trigonometry_1/test3',
      uid: 'chord',
      versions: {
      },
      dependencies: [
      ],
      enabled: false,
    }),
  };
  return lessonIndex;
}
