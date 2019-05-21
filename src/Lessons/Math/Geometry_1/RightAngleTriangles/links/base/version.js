// @flow

// eslint-disable-next-line no-var
var details = {
  uid: 'base',
  topic: 'links',
  title: 'Base',
  fullLesson: true,
  links: [
    {
      url: 'https://en.wikipedia.org/wiki/Right_triangle',
      publisher: 'Wikipedia',
      type: 'generic',
    },
    {
      url: 'https://www.mathsisfun.com/right_angle_triangle.html',
      publisher: 'Math is Fun',
      type: 'generic',
    },
    {
      url: 'https://www.mathplanet.com/education/pre-algebra/right-triangles-and-algebra/the-pythagorean-theorem',
      publisher: 'Math Planet',
      type: 'generic',
    },
  ],
};

module.exports = {
  details,
};

/*
  Links live in database

  On load page,

  * Links exist in version files in each lesson/links/version folder
  * Script 1 - Checker:
      - Find all links version files
      - Scrape lessonUID, topic, versionUID (links), and individual links
      - Check lesson/topic/version/link exists in vlinks table
      - Check link exists in link table
  * Script 2 - Updater:
      - Same as script 1, but make changes to links and vlinks table
*/
