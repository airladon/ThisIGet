// @flow
import * as React from 'react';
import { attachStaticQuickReference } from '../../../../../../js/tools/misc';
import StaticQR from '../../../../../../js/components/staticQR';
import details from '../../details';
import version from './version';
import './style.scss';
import test1 from './test1.md';

const lessonUID = details.details.uid;
const versionUID = version.details.uid;

const content = <div>
  Hellow worldD.
</div>;

const Footer = <StaticQR
  content={content}
  title={'This is a Title'}
  link="Math/Geometry_1/Isosceles/summary/base"
/>;

const Footer2 = <StaticQR
  content={test1}
  title="title2"
  link="Math/Geometry_1/Isosceles/summary/base"
/>;

attachStaticQuickReference('Math', 'Geometry_1', lessonUID, versionUID, {
  simpleTest: Footer,
  simpleTest2: Footer2,
});
