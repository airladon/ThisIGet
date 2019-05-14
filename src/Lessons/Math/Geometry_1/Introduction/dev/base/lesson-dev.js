// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationLesson from '../../../../../../js/Lesson/PresentationLesson';
import Content from './content';
import '../../quickReference/base/style.scss';
import details from '../../details';
import version from '../../quickReference/base/version';

const lesson = new PresentationLesson(new Content());
renderLesson(lesson, details, version);
