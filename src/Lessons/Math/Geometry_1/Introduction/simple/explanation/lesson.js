// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SimpleLesson from '../../../../../../js/Lesson/SimpleLesson';
import Content from './content';
import './style.scss';
// import '../../../geometry.scss';
import details from '../../details';
import version from '../version';

const lesson = new SimpleLesson(new Content());
renderLesson(lesson, details, version);
