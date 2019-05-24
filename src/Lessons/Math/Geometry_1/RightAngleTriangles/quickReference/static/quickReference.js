// @flow
import * as React from 'react';
import { attachStaticQuickReference } from '../../../../../../js/tools/misc';
import StaticQR from '../../../../../../js/components/staticQR';
import details from '../../details';
import version from './version';
import './style.scss';
import test1 from './test1.md';
import test2 from './test2.md';

attachStaticQuickReference(
  'Math',
  'Geometry_1',
  details.uid,
  version.uid,
  {
    simpleTest: <StaticQR
      title={'This is a Title'}
      content={test2}
      link={`${details.path}/${details.uid}/explanation/base?page=4`}
    />,
    simpleTest2: <StaticQR
      title="title2"
      content={test1}
      link={`${details.path}/${details.uid}/summary/base?page=3`}
    />,
  },
);
