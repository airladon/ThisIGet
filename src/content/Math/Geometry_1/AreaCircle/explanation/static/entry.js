// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import SimpleFormat from '../../../../../../js/Lesson/SimpleFormat';
import Content from './content';
import '../../../../../../css/simpleLesson.scss';
import './style.scss';


const lesson = new SimpleFormat(new Content());
renderTopic(lesson);
