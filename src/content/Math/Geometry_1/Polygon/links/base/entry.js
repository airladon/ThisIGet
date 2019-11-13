// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import LinksFormat from '../../../../../../js/TopicFormat/LinksFormat';
import Content from './content';
import '../../../../../../css/simpleFormat.scss';
import './style.scss';


const version = new LinksFormat(new Content());
renderTopic(version);
