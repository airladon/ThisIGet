// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import SimpleFormat from '../../../../../../js/TopicFormat/SimpleFormat';
import Content from './content';
import '../../../../../../css/simpleFormat.scss';
import './style.scss';

const version = new SimpleFormat(new Content());
renderTopic(version);
