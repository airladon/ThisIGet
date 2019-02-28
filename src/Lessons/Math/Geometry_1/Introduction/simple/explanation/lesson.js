// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import LessonSinglePage from '../../../../../../js/Lesson/LessonSinglePage';
import Content from './content';
// import '../common/style.scss';
import '../../../geometry.scss';
import details from '../../details';
import version from '../version';

const content = new Content();
const lesson = new LessonSinglePage(content);
renderLesson(lesson, details, version);
