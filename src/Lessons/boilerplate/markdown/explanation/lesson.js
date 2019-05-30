// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SimpleLesson from '../../../../../../js/Lesson/SimpleLesson';
import Content from './content';
import '../../../../../../css/style.scss';
import '../../../../../../css/presentationLesson.scss';
import './style.scss';
import details from '../../details';
import version from '../version';

const lesson = new SimpleLesson(new Content());
renderLesson(lesson, details, version);
