// // @flow

import renderLesson from '../../../../../../js/views/lesson/lesson';
import Content from './content';
import '../common/style.scss';
import details from '../../details';
import version from '../version';

renderLesson(new Content(), details, version);
