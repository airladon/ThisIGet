import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
    adjacent_angles: new LessonDescription({
      name: 'Adjacent Angles',
      path: '/Lessons/Math/Geometry_1/AdjacentAngles',
      uid: 'adjacent_angles',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'dev',
            'explanation',
            'summary',
          ],
          qr: [
            'Complementary',
            'Supplementary',
            'Explementary',
          ],
        },
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
    area_introduction: new LessonDescription({
      name: 'Area and Rectangles',
      path: '/Lessons/Math/Geometry_1/Area',
      uid: 'area_introduction',
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
            'Main',
            'Square',
            'Rectangle',
          ],
        },
      },
      dependencies: [
        'quadrangles',
      ],
      enabled: true,
    }),
    area_circle: new LessonDescription({
      name: 'Area of a Circle',
      path: '/Lessons/Math/Geometry_1/AreaCircle',
      uid: 'area_circle',
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
          ],
        },
      },
      dependencies: [
        'area_triangle',
      ],
      enabled: true,
    }),
    area_triangle: new LessonDescription({
      name: 'Area of a Triangle',
      path: '/Lessons/Math/Geometry_1/AreaTriangle',
      uid: 'area_triangle',
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
            'Main',
          ],
        },
      },
      dependencies: [
        'area_introduction',
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
    congruent_triangles: new LessonDescription({
      name: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1/CongruentTriangles',
      uid: 'congruent_triangles',
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
      },
      dependencies: [
        'triangle_introduction',
      ],
      enabled: true,
    }),
    equilateral_triangles: new LessonDescription({
      name: 'Equilateral Triangle',
      path: '/Lessons/Math/Geometry_1/Equilateral',
      uid: 'equilateral_triangles',
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
          ],
        },
      },
      dependencies: [
        'isosceles_triangles',
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
    isosceles_triangles: new LessonDescription({
      name: 'Isosceles Triangle',
      path: '/Lessons/Math/Geometry_1/Isosceles',
      uid: 'isosceles_triangles',
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
            'Main',
          ],
        },
      },
      dependencies: [
        'quadrangles',
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
    parallel_lines: new LessonDescription({
      name: 'Parallel Lines',
      path: '/Lessons/Math/Geometry_1/ParallelLines',
      uid: 'parallel_lines',
      versions: {
        base: {
          title: 'Base',
          description: 'First explanation of Topic.',
          path: 'base',
          onPath: false,
          topics: [
            'explanation',
            'quiz',
            'summary',
          ],
          qr: [
          ],
        },
      },
      dependencies: [
        'adjacent_angles',
      ],
      enabled: true,
    }),
    quadrangles: new LessonDescription({
      name: 'Quadrangles',
      path: '/Lessons/Math/Geometry_1/Quadrangles',
      uid: 'quadrangles',
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
            'Main',
            'Rectangle',
            'Square',
          ],
        },
      },
      dependencies: [
        'congruent_triangles',
      ],
      enabled: true,
    }),
    related_angles: new LessonDescription({
      name: 'Related Angles',
      path: '/Lessons/Math/Geometry_1/RelatedAngles',
      uid: 'related_angles',
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
            'Opposite',
            'Interior',
            'Alternate',
            'Corresponding',
          ],
        },
      },
      dependencies: [
        'parallel_lines',
      ],
      enabled: true,
    }),
    calculating_pi: new LessonDescription({
      name: 'Calculating Pi',
      path: '/Lessons/Math/Geometry_1/ToDo/Calculating Pi',
      uid: 'calculating_pi',
      versions: {
      },
      dependencies: [
        'right_angle_triangles',
      ],
      enabled: false,
    }),
    pythagoras: new LessonDescription({
      name: 'Pythagorean Theorm',
      path: '/Lessons/Math/Geometry_1/ToDo/Pythagoras',
      uid: 'pythagoras',
      versions: {
      },
      dependencies: [
        'right_angle_triangles',
      ],
      enabled: false,
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
    similar_triangles: new LessonDescription({
      name: 'Similar Triangles',
      path: '/Lessons/Math/Geometry_1/ToDo/SimilarTriangles',
      uid: 'similar_triangles',
      versions: {
      },
      dependencies: [
        'congruent_triangles',
      ],
      enabled: false,
    }),
    triangle_introduction: new LessonDescription({
      name: 'Triangles',
      path: '/Lessons/Math/Geometry_1/Triangles',
      uid: 'triangle_introduction',
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
            'Main',
          ],
        },
      },
      dependencies: [
        'related_angles',
      ],
      enabled: true,
    }),
    chord: new LessonDescription({
      name: 'Chord',
      path: '/Lessons/Math/Trigonometry_1/Chord',
      uid: 'chord',
      versions: {
      },
      dependencies: [
        'sine_introduction',
      ],
      enabled: false,
    }),
    cosecant_introduction: new LessonDescription({
      name: 'Cosecant',
      path: '/Lessons/Math/Trigonometry_1/Cosecant',
      uid: 'cosecant_introduction',
      versions: {
      },
      dependencies: [
        'secant_introduction',
      ],
      enabled: false,
    }),
    consine_introduction: new LessonDescription({
      name: 'Cosine',
      path: '/Lessons/Math/Trigonometry_1/Cosine',
      uid: 'consine_introduction',
      versions: {
      },
      dependencies: [
        'sine_introduction',
      ],
      enabled: false,
    }),
    cotangent_introduction: new LessonDescription({
      name: 'Cotangent',
      path: '/Lessons/Math/Trigonometry_1/Cotangent',
      uid: 'cotangent_introduction',
      versions: {
      },
      dependencies: [
        'pythagorean_identity',
      ],
      enabled: false,
    }),
    law_of_cosines: new LessonDescription({
      name: 'Law of Cosines',
      path: '/Lessons/Math/Trigonometry_1/Law of Cosines',
      uid: 'law_of_cosines',
      versions: {
      },
      dependencies: [
        'law_of_sines',
      ],
      enabled: false,
    }),
    law_of_sines: new LessonDescription({
      name: 'Law of Sines',
      path: '/Lessons/Math/Trigonometry_1/Law of Sines',
      uid: 'law_of_sines',
      versions: {
      },
      dependencies: [
        'pythagorean_identity',
      ],
      enabled: false,
    }),
    pythagorean_identity: new LessonDescription({
      name: 'Pythagorean Identity',
      path: '/Lessons/Math/Trigonometry_1/Pythagoras',
      uid: 'pythagorean_identity',
      versions: {
      },
      dependencies: [
        'tangent_introduction',
      ],
      enabled: false,
    }),
    secant_introduction: new LessonDescription({
      name: 'Secant',
      path: '/Lessons/Math/Trigonometry_1/Secant',
      uid: 'secant_introduction',
      versions: {
      },
      dependencies: [
        'pythagorean_identity',
      ],
      enabled: false,
    }),
    sine_introduction: new LessonDescription({
      name: 'Sine',
      path: '/Lessons/Math/Trigonometry_1/Sine',
      uid: 'sine_introduction',
      versions: {
      },
      dependencies: [
        'unit_circle',
      ],
      enabled: false,
    }),
    tangent_introduction: new LessonDescription({
      name: 'Tangent',
      path: '/Lessons/Math/Trigonometry_1/Tangent',
      uid: 'tangent_introduction',
      versions: {
      },
      dependencies: [
        'chord',
      ],
      enabled: false,
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
  };
  return lessonIndex;
}
