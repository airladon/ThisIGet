// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import Lesson from '../../../../../../js/Lesson/Lesson';
import Content from './content';
import '../common/style.scss';
import details from '../../details';
import version from '../version';

const lesson = new Lesson(new Content());
renderLesson(lesson, details, version);
