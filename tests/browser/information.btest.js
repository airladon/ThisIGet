import singlePageTester from '../../src/content/testers/singlePageTester';
// const { singlePageTester } = require('../../src/content/testers/singlePageTester');


singlePageTester({
  width: 700,
  element: 'main',
  prefix: 'information-about-',
  endpoint: 'about',
},
// {
//   width: 700,
//   element: 'main',
//   prefix: 'information-privacy-',
//   endpoint: 'privacy',
// },
// {
//   width: 700,
//   element: 'main',
//   prefix: 'information-terms-',
//   endpoint: 'terms',
// },
{
  width: 700,
  element: 'main',
  prefix: 'information-contact-',
  endpoint: 'contact',
},
{
  width: 700,
  element: 'main',
  prefix: 'information-introduction-',
  endpoint: 'introduction',
},
{
  width: 700,
  element: 'main',
  prefix: 'information-copyright-',
  endpoint: 'copyright',
},
{
  width: 700,
  element: 'body',
  prefix: 'fullPage-home-',
  endpoint: '',
});
