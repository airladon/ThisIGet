// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import LinksFormat from '../../../../../../js/Lesson/LinksFormat';
import Content from './content';
import '../../../../../../css/simpleLesson.scss';


const version = new LinksFormat(new Content());
renderTopic(version);
