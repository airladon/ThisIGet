import singlePageTester from '../../src/content/testers/singlePageTester';
import presentationTester from '../../src/content/testers/presentationFormatTester';

singlePageTester({
  width: 700,
  element: 'body',
  prefix: 'fullSinglePage-',
  endpoint: 'content/Math/Geometry_1/AnglesAtIntersections/examples/base',
});

presentationTester(
  {
    endpoint: 'content/Math/Geometry_1/AnglesAtIntersections/discover/base',
    prefix: 'fullPagePresentation-',
    element: 'body',
  },
  1,
);

singlePageTester({
  width: 700,
  element: 'main',
  prefix: 'about-',
  endpoint: 'about',
},
// {
//   width: 700,
//   element: 'main',
//   prefix: 'privacy-',
//   endpoint: 'privacy',
// },
// {
//   width: 700,
//   element: 'main',
//   prefix: 'terms-',
//   endpoint: 'terms',
// },
{
  width: 700,
  element: 'main',
  prefix: 'contact-',
  endpoint: 'contact',
},
{
  width: 700,
  element: 'main',
  prefix: 'introduction-',
  endpoint: 'introduction',
},
// {
//   width: 700,
//   element: 'main',
//   prefix: 'copyright-',
//   endpoint: 'copyright',
// },
{
  width: 700,
  element: 'body',
  prefix: 'home-',
  endpoint: '',
});
