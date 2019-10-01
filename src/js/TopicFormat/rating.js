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

export type TypeRating = {
  ave: number,
  high: number,
  num: number,
  user: number | string,
};

export type TypeTopicRatings = {
  [approachUID: string]: {
    [versionUID: string]: TypeRating,
  },
};

function getTopicRatings(
  topicUID: string,
  callback: (?TypeTopicRatings) => void,
) {
  const endPoint = `/getTopicRatings/${topicUID}`;
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

function getVersionRating(
  versionUID: string,
  callback: (?TypeRating) => void,
) {
  const endPoint = `/getVersionRating/${versionUID}`;
  fetchPolyfill(endPoint, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: {
      status: 'ok',
      rating: {
        ave: number,
        high: number,
        num: number,
        user: number | string,
      }
    } | {
      status: 'fail',
      message: string
    }) => {
      let rating = null;
      if (data.status === 'ok') {
        if (data.rating != null) {
          ({ rating } = data);
        }
      }
      callback(rating);
    })
    .catch(() => {
      callback();
    });
}

function setVersionRating(
  versionUID: string,
  ratingValue: number,
  callback: (?TypeRating) => void,
) {
  const endPoint = `/setVersionRating/${versionUID}?rating=${ratingValue}`;
  fetchPolyfill(endPoint, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: {
      status: 'ok',
      rating: {
        ave: number,
        high: number,
        num: number,
        user: number | string,
      }
    } | {
      status: 'fail',
      message: string
    }) => {
      let rating = null;
      if (data.status === 'ok') {
        if (data.rating != null) {
          ({ rating } = data);
        }
      }
      callback(rating);
    })
    .catch(() => {
      callback();
    });
}

function getLinkRatings(
  versionPath: string,
  callback: (Array<Array<number>>) => void,
) {
  const endPoint = `/getLinkRatings/${versionPath}`;
  fetchPolyfill(endPoint, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: {
      status: 'ok',
      ratings: Array<Array<number>>} | {
        status: 'fail',
        message: string
      }) => {
      let ratings = [];
      if (data.status === 'ok') {
        if (data.ratings != null) {
          ({ ratings } = data);
        }
      }
      callback(ratings);
    })
    .catch(() => {
      callback([]);
    });
}

function setLinkRating(
  versionPath: string,
  hash: string,
  rating: number,
  callback: (Array<number>) => void,
) {
  const endPoint = `/setLinkRating/${versionPath}?hash=${hash}&rating=${rating}`;
  fetchPolyfill(endPoint, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data: {
      status: 'ok',
      rating: Array<number>} | {
        status: 'fail',
        message: string
      }) => {
      let newRating = [];
      if (data.status === 'ok') {
        if (data.rating != null) {
          newRating = data.rating;
        }
      }
      callback(newRating);
    })
    .catch(() => {
      callback([]);
    });
}

export {
  getTopicRatings, getVersionRating, setVersionRating, getLinkRatings,
  setLinkRating,
};
