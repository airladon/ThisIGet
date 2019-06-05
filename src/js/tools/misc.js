// @flow
import Fig from 'figureone';

const { Point } = Fig;
const { joinObjects } = Fig.tools.misc;

const classify = (key: string, value: string) => {
  const nonEmpty = value || key;
  const withKey = nonEmpty[0] === '-' || nonEmpty.startsWith(`${key}-`)
    ? `${key} ${nonEmpty}` : nonEmpty;
  const joinStr = ` ${key}-`;
  return `${withKey.split(' -').join(joinStr)}`;
};

function loadRemote(
  scriptId: string,
  url: string,
  callback: null | (string, string) => void = null,
) {
  const existingScript = document.getElementById(scriptId);
  if (!existingScript) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = scriptId; // e.g., googleMaps or stripe
    if (document.body) {
      document.body.appendChild(script);
    }
    script.onload = () => {
      if (callback != null) {
        callback(scriptId, url);
      }
    };
  } else if (callback != null) {
    callback(scriptId, url);
  }
}

function loadRemoteCSS(
  id: string,
  url: string,
  callback: null | (string, string) => void = null,
) {
  const existingScript = document.getElementById(id);
  if (!existingScript) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.id = id; // e.g., googleMaps or stripe
    if (document.body) {
      document.body.appendChild(link);
    }
    link.onload = () => {
      if (callback != null) {
        callback(id, url);
      }
    };
  } else if (callback != null) {
    callback(id, url);
  }
}

function getCookie(key: string) {
  const { cookie } = document;
  if (cookie != null) {
    const re = RegExp(`${key}=[^;]*`);
    // $FlowFixMe
    let keyValue = cookie.match(re);
    // console.log(username)
    if (keyValue != null) {
      keyValue = keyValue[0].trim();
      if (keyValue.slice(-1).charAt(0) === ';') {
        keyValue = keyValue.slice(0, -1);
      }

      return keyValue.split('=')[1];
    }
  }
  return '';
}

function createCookie(
  name: string,
  value: string | number,
  minutes: number = 0,
  path: string = '/',
) {
  let expires = '';
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=${path}`;
}

function logInOut(isLoggedIn: boolean) {
  // let page = getCookie('page');
  // if (page === '') {
  //   page = '0';
  // }
  let logText = '/logout';
  if (isLoggedIn === false) {
    logText = '/login';
  }
  const next = `?next=${window.location.pathname}`;
  window.location = `${logText}${next}`;
}
function login() {
  logInOut(false);
}

function logout() {
  logInOut(true);
}

function activator(
  width: number | Object,
  height?: number | Object,
  ...inputOptions: Array<Object>
  // color: [number, number, number, number] = [0, 0, 0, 0],
) {
  const defaultOptions = {
    color: [0, 0, 0, 0],
    position: new Point(0, 0),
    width: 1,
    height: 1,
  };
  let options = joinObjects({}, defaultOptions);
  if (typeof width === 'number') {
    options.width = width;
  } else {
    options = joinObjects({}, options, width);
  }
  if (height) {
    if (typeof height === 'number') {
      options.height = height;
    } else {
      options = joinObjects({}, options, height);
    }
  }
  if (inputOptions != null && inputOptions.length > 0) {
    options = joinObjects({}, options, ...inputOptions);
  }

  const points: Array<Point> = [
    new Point(-options.width / 2, -options.height / 2),
    new Point(-options.width / 2, options.height / 2),
    new Point(options.width / 2, options.height / 2),
    new Point(options.width / 2, -options.height / 2),
  ].map(p => p.add(options.position));

  return {
    name: 'activator',
    method: 'polyLine',
    options: {
      points,
      color: options.color,
    },
    mods: {
      isTouchable: true,
    },
  };
}

function attachQuickReference(
  lessonPath: string,
  lessonUID: string,
  versionUID: string,
  qrs: {
    [name: string]: Object,
  },
) {
  // if (window.quickReference == null) {
  //   window.quickReference = {};
  // }
  // if (window.quickReference[lessonUID] == null) {
  //   window.quickReference[lessonUID] = {};
  // }
  // window.quickReference[lessonUID][versionUID] = qrs;
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  Object.keys(qrs).forEach((name) => {
    window.quickReference[`${lessonPath}/${lessonUID}/${versionUID}/${name}`] = qrs[name];
  });
}

// function attachStaticQuickReference(
//   lessonPath: string,
//   lessonUID: string,
//   versionUID: string,
//   qrs: {
//     [name: string]: Object,
//   },
// ) {
//   if (window.quickReference == null) {
//     window.quickReference = {};
//   }
//   Object.keys(qrs).forEach((name) => {
//     window.quickReference[`${lessonPath}/${lessonUID}/${versionUID}/${name}`] = qrs[name];
//   });
// }

export {
  classify, loadRemote, loadRemoteCSS, getCookie, login, logout, logInOut,
  createCookie, activator, attachQuickReference,
};

