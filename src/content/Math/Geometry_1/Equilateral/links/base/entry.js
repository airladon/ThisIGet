// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import LinksFormat from '../../../../../../js/Lesson/LinksFormat';
import Content from './content';
import '../../../../../../css/simpleLesson.scss';
import './style.scss';


const lesson = new LinksFormat(new Content());
renderLesson(lesson);
