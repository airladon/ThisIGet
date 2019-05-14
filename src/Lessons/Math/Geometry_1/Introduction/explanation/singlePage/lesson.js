// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import SinglePageLesson from '../../../../../../js/Lesson/SinglePageLesson';
import Content from './content';
import './style.scss';
import details from '../../details';
import version from './version';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];
const topic = require.resolve('./version').split('/').slice(-3, -2)[0];

const lesson = new SinglePageLesson(new Content());

renderLesson(
  lesson, lessonUID, versionUID, topic, details.details, version.details,
);
