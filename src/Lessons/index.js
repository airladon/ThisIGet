import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
    adjacent_angles: new LessonDescription({
      name: 'Adjacent Angles',
      path: '/Lessons/Math/Geometry_1/AdjacentAngles',
      uid: 'adjacent_angles',
      versions: {
      },
      dependencies: [
        'important_angles',
      ],
      enabled: true,
    }),
    angles: new LessonDescription({
      name: 'Angles',
      path: '/Lessons/Math/Geometry_1/Angle',
      uid: 'angles',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
        'circles',
      ],
      enabled: true,
    }),
    area_circle: new LessonDescription({
      name: 'Area of a Circle',
      path: '/Lessons/Math/Geometry_1/AreaCircle',
      uid: 'area_circle',
      versions: {
      },
      dependencies: [
        'area_triangle',
      ],
      enabled: true,
    }),
    circles: new LessonDescription({
      name: 'Circles',
      path: '/Lessons/Math/Geometry_1/Circle',
      uid: 'circles',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
        'why_study_shapes',
      ],
      enabled: true,
    }),
    important_angles: new LessonDescription({
      name: 'Important Angles',
      path: '/Lessons/Math/Geometry_1/ImportantAngles',
      uid: 'important_angles',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
        'measuring_angles',
      ],
      enabled: true,
    }),
    why_study_shapes: new LessonDescription({
      name: 'Why Study Shapes?',
      path: '/Lessons/Math/Geometry_1/Introduction',
      uid: 'why_study_shapes',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
      ],
      enabled: true,
    }),
    measuring_angles: new LessonDescription({
      name: 'Measuring Angles',
      path: '/Lessons/Math/Geometry_1/MeasuringAngles',
      uid: 'measuring_angles',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
        'angles',
      ],
      enabled: true,
    }),
    related_angles: new LessonDescription({
      name: 'Related Angles',
      path: '/Lessons/Math/Geometry_1/RelatedAngles',
      uid: 'related_angles',
      versions: {
      },
      dependencies: [
        'parallel_lines',
      ],
      enabled: true,
    }),
    right_angle_triangles: new LessonDescription({
      name: 'Right Angle Triangles',
      path: '/Lessons/Math/Geometry_1/ToDo/RightAngleTriangles',
      uid: 'right_angle_triangles',
      versions: {
      },
      dependencies: [
        'important_triangles',
        'area_triangle',
      ],
      enabled: false,
    }),
    test1: new LessonDescription({
      name: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1/test1',
      uid: 'test1',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
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
        base: {
          title: 'Base',
          description: 'First explanation of topic.',
          path: 'base',
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
    unit_circle: new LessonDescription({
      name: 'Unit Circle',
      path: '/Lessons/Math/Trigonometry_1/UnitCircle',
      uid: 'unit_circle',
      versions: {
      },
      dependencies: [
        'quadrangles',
      ],
      enabled: false,
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
