// // @flow

import renderTopic from '../../../../../../js/views/lesson/lesson';
import PresentationFormat from '../../../../../../js/Lesson/PresentationFormat';
import Content from './content';
import '../../../../../../css/presentationFormat.scss';
import './style.scss';


const lesson = new PresentationFormat(new Content());
renderTopic(lesson);
