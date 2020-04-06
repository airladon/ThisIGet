// console.log(process.env.MAIL_RECEIVE_USERNAME)
const Imap = require('imap');
// const { inspect } = require('util');

const getEmail = () => new Promise((resolve) => {
  const imap = new Imap({
    user: process.env.MAIL_RECEIVE_USERNAME,
    password: process.env.MAIL_RECEIVE_PASSWORD,
    host: process.env.MAIL_RECEIVE_SERVER,
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  });

  function openInbox(cb) {
    imap.openBox('[Gmail]/All Mail', true, cb);
  }

  // function getBoxes(cb) {
  //   imap.getBoxes(cb);
  // }

  let bodyContent = '';
  let messageNumber = 0;

  /* eslint-disable max-len */
  imap.once('ready', () => {
    // getBoxes((err, boxes) => {
    //   console.log(boxes)
    // })
    openInbox((err, box) => {
      if (err) throw err;
      const f = imap.seq.fetch(`${box.messages.total}:*`, { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
      f.on('message', (msg, seqno) => {
        messageNumber = seqno;
        // eslint-disable-next-line no-unused-vars
        msg.on('body', (stream, info) => {
          // if (info.which === 'TEXT') {
          //   // console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
          // }
          // // let buffer = '';
          // let count = 0;
          stream.on('data', (chunk) => {
            // count += chunk.length;
            // buffer += chunk.toString('utf8');
            // bodyProcessor(seqno, chunk.toString('utf8'));
            bodyContent += chunk.toString('utf8');
            // if (info.which === 'TEXT') {
            //   console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
            // }
            // console.log(count, buffer)
          });
          // stream.once('end', () => {
          //   if (info.which !== 'TEXT') {
          //     // console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          //   } else {
          //     // console.log(prefix + 'Body [%s] Finished', inspect(info.which));
          //   }
          // });
        });
        // eslint-disable-next-line no-unused-vars
        msg.once('attributes', (attrs) => {
          // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        // msg.once('end', () => {
        //   // console.log(prefix + 'Finished');
        // });
      });
      // eslint-disable-next-line no-unused-vars
      f.once('error', (err1) => {
        resolve('error');
      });
      f.once('end', () => {
        // console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });

  // eslint-disable-next-line no-unused-vars
  imap.once('error', (err) => {
    resolve('error');
  });

  imap.once('end', () => {
    resolve([messageNumber, bodyContent]);
  });

  imap.connect();
});


// async function getToken() {
//   const [msg, body] = await getEmail();
//   console.log(msg, body)
//   const found = body.match(/confirmEmailChange\/[^\r]*/)
//   console.log(found);
// }

// getToken();


module.exports = {
  getEmail,
};
