import LessonDescription from '../../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
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
  };
  return lessonIndex;
}
