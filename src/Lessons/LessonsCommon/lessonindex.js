import LessonDescription from '../../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {
    Introduction: new LessonDescription({
      name: 'Why Study Shapes?',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Introduction',
      topics: {
        explanation: [
          {
            uid: 'base',
            type: 'presentation',
            title: 'Initial',
            description: 'Presentation form - interactive.',
            fullLesson: true,
          },
          {
            uid: 'simple',
            type: 'singlePage',
            title: 'Simple',
            description: 'Not interactive.',
            fullLesson: true,
          },
          {
            uid: 'singlePage',
            type: 'singlePage',
            title: 'Initial - Single Page',
            description: 'Single page form - interactive.',
            fullLesson: true,
          },
        ],
        quickReference: [
          {
            uid: 'base',
            type: 'presentation',
            references: [
              'Abstraction',
            ],
          },
        ],
      },
      dependencies: [
      ],
      enabled: true,
    }),
  };
  return lessonIndex;
}
