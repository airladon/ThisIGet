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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Complementary',
              'Supplementary',
              'Explementary',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Main',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Diameter',
              'Radius',
              'Circumference',
              'Circle',
              'Pi',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Main',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Acute',
              'Right',
              'Obtuse',
              'Straight',
              'Reflex',
              'Full',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Abstraction',
            ],
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
        quickReference: {
          base: {
            type: 'presentation',
            references: [
              'Main',
            ],
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
  };
  return lessonIndex;
}
