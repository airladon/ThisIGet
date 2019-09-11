// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationFormat from '../../../../../../js/Lesson/PresentationFormat';
import Content from './content';
import '../../../../../../css/presentationLesson.scss';
import './style.scss';


const lesson = new PresentationFormat(new Content());
renderLesson(lesson);
