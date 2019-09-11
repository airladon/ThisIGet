// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SinglePageFormat from '../../../../../../js/Lesson/SinglePageFormat';
import Content from './content';
import '../../../../../../css/singlePageLesson.scss';
import './style.scss';


const lesson = new SinglePageFormat(new Content());

renderLesson(lesson);
