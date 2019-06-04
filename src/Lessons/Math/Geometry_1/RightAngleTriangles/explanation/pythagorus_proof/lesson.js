// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SimpleLesson from '../../../../../../js/Lesson/SimpleLesson';
import Content from './content';
import '../../../../../../css/simpleLesson.scss';
import './style.scss';

const lesson = new SimpleLesson(new Content());
renderLesson(lesson);
