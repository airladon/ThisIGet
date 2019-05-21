// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import LinksLesson from '../../../../../../js/Lesson/LinksLesson';
import Content from './content';
import './style.scss';
// import details from '../../details';
// import version from './version';

const lesson = new LinksLesson(new Content());
renderLesson(lesson);
