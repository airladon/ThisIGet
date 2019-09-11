// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import LinksLesson from '../../../../../../js/Lesson/LinksLesson';
import Content from './content';
import '../../../../../../css/simpleLesson.scss';


const lesson = new LinksLesson(new Content());
renderLesson(lesson);
