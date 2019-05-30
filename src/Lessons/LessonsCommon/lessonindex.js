import LessonDescription from '../../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
    AdjacentAngles: new LessonDescription({
      title: 'Adjacent Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AdjacentAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ImportantAngles',
      ],
      enabled: true,
    }),
    Angle: new LessonDescription({
      title: 'Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Angle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: 'Introduction to Angles.',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: 'Introduction to Angles.',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Circle',
      ],
      enabled: true,
    }),
    Area: new LessonDescription({
      title: 'Area and Rectangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Area',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RectanglesAndSquares',
      ],
      enabled: true,
    }),
    AreaCircle: new LessonDescription({
      title: 'Area of a Circle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
          static: {
            type: 'singlePage',
            title: 'Area of Circle',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'AreaTriangle',
      ],
      enabled: true,
    }),
    AreaTriangle: new LessonDescription({
      title: 'Area of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaTriangle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Area',
      ],
      enabled: true,
    }),
    Circle: new LessonDescription({
      title: 'Circles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Circle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Initial',
            description: 'Presentation form - interactive.',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          identifyProperties: {
            type: 'presentation',
            title: 'Identify Properties',
            description: 'Identify the properties of a circle.',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Initial',
            description: 'Presentation form - interactive.',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Introduction',
      ],
      enabled: true,
    }),
    CongruentTriangles: new LessonDescription({
      title: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'CongruentTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    }),
    Degrees: new LessonDescription({
      title: 'Degrees',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Degrees',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Angle',
      ],
      enabled: true,
    }),
    Equilateral: new LessonDescription({
      title: 'Equilateral Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Equilateral',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    }),
    ExternalAngles: new LessonDescription({
      title: 'External Angle of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ExternalAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    }),
    ImportantAngles: new LessonDescription({
      title: 'Important Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ImportantAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Degrees',
      ],
      enabled: true,
    }),
    Introduction: new LessonDescription({
      title: 'Why Study Shapes?',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Introduction',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Initial',
            description: 'Presentation form - interactive.',
            fullLesson: true,
          },
          simple: {
            type: 'singlePage',
            title: 'Simple',
            description: 'Not interactive.',
            fullLesson: true,
          },
          singlePage: {
            type: 'singlePage',
            title: 'Initial - Single Page',
            description: 'Single page form - interactive.',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
      },
      dependencies: [
      ],
      enabled: true,
    }),
    Isosceles: new LessonDescription({
      title: 'Isosceles Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Isosceles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'CongruentTriangles',
      ],
      enabled: true,
    }),
    ParallelLineDistance: new LessonDescription({
      title: 'Parallel Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'PointLineDistance',
      ],
      enabled: true,
    }),
    ParallelLines: new LessonDescription({
      title: 'Parallel Lines',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'AdjacentAngles',
      ],
      enabled: true,
    }),
    PointLineDistance: new LessonDescription({
      title: 'Point to Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'PointLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RightAngleTriangles',
      ],
      enabled: true,
    }),
    Quadrangles: new LessonDescription({
      title: 'Quadrangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Quadrangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    }),
    Radians: new LessonDescription({
      title: 'Radians',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Radians',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Degrees',
      ],
      enabled: true,
    }),
    RectanglesAndSquares: new LessonDescription({
      title: 'Rectangles and Squares',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RectanglesAndSquares',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Quadrangles',
        'CongruentTriangles',
      ],
      enabled: true,
    }),
    RelatedAngles: new LessonDescription({
      title: 'Related Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RelatedAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ParallelLines',
      ],
      enabled: true,
    }),
    RightAngleTriangles: new LessonDescription({
      title: 'Right Angle Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RightAngleTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
          pythagorus_proof: {
            type: 'singlePage',
            title: 'Derivation',
            description: 'Pythagorean Theorem Only',
            fullLesson: false,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: '',
            description: '',
            fullLesson: false,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
          static: {
            type: 'presentation',
            title: 'static',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'AreaTriangle',
      ],
      enabled: true,
    }),
    SideAngleRelationship: new LessonDescription({
      title: 'Side Angle Relationships',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideAngleRelationship',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    }),
    SideSideSide: new LessonDescription({
      title: 'Side-Side-Side Congruency',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideSideSide',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    }),
    CalculatingPi: new LessonDescription({
      title: 'Calculating Pi',
      path: '/Lessons/Math/Geometry_1/ToDo',
      uid: 'CalculatingPi',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RightAngleTriangles',
      ],
      enabled: false,
    }),
    SimilarTriangles: new LessonDescription({
      title: 'Similar Triangles',
      path: '/Lessons/Math/Geometry_1/ToDo',
      uid: 'SimilarTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ParallelLineDistance',
      ],
      enabled: false,
    }),
    Triangles: new LessonDescription({
      title: 'Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Triangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        dev: {
          base: {
            type: 'presentation',
            title: 'base',
            description: '',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RelatedAngles',
      ],
      enabled: true,
    }),
    Chord: new LessonDescription({
      title: 'Chord',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Chord',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Sine',
      ],
      enabled: false,
    }),
    Cosecant: new LessonDescription({
      title: 'Cosecant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosecant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Secant',
      ],
      enabled: false,
    }),
    Cosine: new LessonDescription({
      title: 'Cosine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Sine',
      ],
      enabled: false,
    }),
    Cotangent: new LessonDescription({
      title: 'Cotangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cotangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    }),
    LawOfCosines: new LessonDescription({
      title: 'Law of Cosines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfCosines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'LawOfSines',
      ],
      enabled: false,
    }),
    LawOfSines: new LessonDescription({
      title: 'Law of Sines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfSines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    }),
    Pythagoras: new LessonDescription({
      title: 'Pythagorean Identity',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Pythagoras',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Tangent',
      ],
      enabled: false,
    }),
    Secant: new LessonDescription({
      title: 'Secant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Secant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    }),
    Sine: new LessonDescription({
      title: 'Sine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Sine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'UnitCircle',
      ],
      enabled: false,
    }),
    Tangent: new LessonDescription({
      title: 'Tangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Tangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Chord',
      ],
      enabled: false,
    }),
    UnitCircle: new LessonDescription({
      title: 'Unit Circle',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'UnitCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
      ],
      enabled: false,
    }),
  };
  return lessonIndex;
}
