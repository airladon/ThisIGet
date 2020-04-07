// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import InteractiveVideoFormat from '../../../../../../js/TopicFormat/InteractiveVideoFormat';
import Content from './content';
import '../../../../../../css/presentationFormat.scss';
import './style.scss';


const version = new InteractiveVideoFormat(new Content());
renderTopic(version);
