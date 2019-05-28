// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationLesson from '../../../../../../js/Lesson/PresentationLesson';
import Content from './content';
// import details from '../../details';
// import version from './version';
import '../../../geometry.scss';

const lesson = new PresentationLesson(new Content());

renderLesson(lesson);

