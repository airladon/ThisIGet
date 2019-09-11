// // @flow

import renderTopic from '../../../../../../js/views/lesson/lesson';
import SinglePageFormat from '../../../../../../js/Lesson/SinglePageFormat';
import Content from './content';
import '../../../../../../css/singlePageFormat.scss';
import './style.scss';


const lesson = new SinglePageFormat(new Content());

renderTopic(lesson);
