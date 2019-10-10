// @flow

import * as React from 'react';

export default function linkTable(
  links: Array<{
    url?: string;
    hash?: string;
    publisher?: string;
    type?: string;
    description?: string;
  }>,
) {
  return [
    { links },
    <div key="1" className="approach__links_table__disclaimer">
      <p style={{ marginTop: '3em' }}>
        {'The external websites above describe at least part of this topic. These websites are not administered by This I Get.'}
      </p>
    </div>,
  ];
}
