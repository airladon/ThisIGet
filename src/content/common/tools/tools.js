// @flow

function removeClass(ids: string | Array<string>, className: string) {
  let elementIds = ids;
  if (typeof ids === 'string') {
    elementIds = [ids];
  }
  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element == null) {
      return;
    }
    element.classList.remove(className);
  });
}

function addClass(ids: string | Array<string>, className: string) {
  let elementIds = ids;
  if (typeof ids === 'string') {
    elementIds = [ids];
  }
  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element == null) {
      return;
    }
    element.classList.add(className);
  });
}

export {
  removeClass,
  addClass,
};
