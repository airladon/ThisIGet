// // @flow

import renderTopic from '../../../../../../js/views/topic/topic';
import PresentationFormat from '../../../../../../js/TopicFormat/PresentationFormat';
import Content from './content';
import '../../../../../../css/presentationFormat.scss';
import './style.scss';


const version = new PresentationFormat(new Content());
renderTopic(version);
