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
            title: 'Initial',
            description: 'Presentation form - interactive.',
            uid: 'base',
            fullLesson: true,
            type: 'presentation',
          },
          {
            title: 'Simple',
            description: 'Not interactive.',
            uid: 'simple',
            fullLesson: true,
            type: 'singlePage',
          },
          {
            title: 'Initial - Single Page',
            description: 'Single page form - interactive.',
            uid: 'singlePage',
            fullLesson: true,
            type: 'singlePage',
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
