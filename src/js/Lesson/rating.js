// @flow
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

// getTopicRatings
//  {
//    explanation: {
//      base: {
//        numRatings:
//        aveRating:
//        numHighRatings:
//        userRating:
//      }
//    }
//  }
//
// getVersionRating
// setVersionRating
// getLinkRating
// setLinkRating

export type TypeTopicRatings = {
  [approachUID: string]: {
    [versionUID: string]: {
      ave: number,
      high: number,
      num: number,
      user: number | string,
    },
  },
};

function getTopicRatings(
  topicUID: string,
  callback: (?TypeTopicRatings) => void,
) {
  const endPoint = `/topicRatings/${topicUID}`;
  const topicRatings = {};
  fetchPolyfill(endPoint, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: {
      status: 'ok',
      ratings: {
        [approachUID: string]: {
          [versionUID: string]: {
            ave: number,
            high: number,
            num: number,
            user: number | string,
          }
        }
      }
    } | {
      status: 'fail',
      message: string
    }) => {
      if (data.status === 'ok') {
        if (data.ratings != null) {
          const { ratings } = data;
          Object.keys(ratings).forEach((approachUID) => {
            const approach = ratings[approachUID];
            if (topicRatings[approachUID] == null) {
              topicRatings[approachUID] = {};
            }
            Object.keys(approach).forEach((versionUID) => {
              const rating = approach[versionUID];
              topicRatings[approachUID][versionUID] = rating;
            });
          });
        }
      }
      callback(topicRatings);
    })
    .catch(() => {
      callback(topicRatings);
    });
}

export default getTopicRatings;
