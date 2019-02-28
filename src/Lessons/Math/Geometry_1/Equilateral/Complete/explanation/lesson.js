// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationLesson from '../../../../../../js/Lesson/PresentationLesson';
import Content from './content';
import '../common/style.scss';
import details from '../../details';
import version from '../version';

const lesson = new PresentationLesson(new Content());
renderLesson(lesson, details, version);
