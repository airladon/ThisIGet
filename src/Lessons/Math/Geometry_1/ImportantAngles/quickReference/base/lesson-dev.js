// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationLesson from '../../../../../../js/Lesson/PresentationLesson';
import Content from './content';
import '../../../../../../css/presentationLesson.scss';
import './style.scss';

const lesson = new PresentationLesson(new Content());

renderLesson(lesson);

