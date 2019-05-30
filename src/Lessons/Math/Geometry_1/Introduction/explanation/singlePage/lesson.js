// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SinglePageLesson from '../../../../../../js/Lesson/SinglePageLesson';
import Content from './content';
import '../../../../../../css/style.scss';
import '../../../../../../css/singlePageLesson.scss';
import './style.scss';
// import details from '../../details';
// import version from './version';

const lesson = new SinglePageLesson(new Content());

renderLesson(lesson);
