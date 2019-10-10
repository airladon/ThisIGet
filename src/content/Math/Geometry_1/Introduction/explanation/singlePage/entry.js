// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import SinglePageFormat from '../../../../../../js/TopicFormat/SinglePageFormat';
import Content from './content';
import '../../../../../../css/singlePageFormat.scss';
import './style.scss';


const version = new SinglePageFormat(new Content());
renderTopic(version);
