// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SinglePageLesson from '../../../../../../js/Lesson/SinglePageLesson';
import Content from './content';
import '../../../../../../css/singlePageLesson.scss';
import './style.scss';


const lesson = new SinglePageLesson(new Content());

renderLesson(lesson);
