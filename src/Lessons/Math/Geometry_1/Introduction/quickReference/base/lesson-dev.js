// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import PresentationLesson from '../../../../../../js/Lesson/PresentationLesson';
import Content from './content';
// import '../../quickReference/base/style.scss';
import details from '../../details';
import version from './version';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];
const topic = require.resolve('./version').split('/').slice(-3, -2)[0];

console.log('asdfd');
const lesson = new PresentationLesson(new Content());
version.details.description = '-';
version.details.title = '-';
version.details.fullLesson = false;
renderLesson(lesson, lessonUID, versionUID, topic, details.details, version.details);
