/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';

const fetch = require('node-fetch');

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return { status: 'fetch error' };
  }
};

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';

export default ratingTester {
  describe('Ratings tester', () => {
    test('Lesson Rating', async () => {
      const result = await getData(`${sitePath}/rating/why_study_shapes/explanation/base`);
      expect(result.status).toBe('ok');
    });
  });
}
