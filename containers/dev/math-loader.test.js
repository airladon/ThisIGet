const mathloader = require('./mathjax.js');

const c = async () => {
  const a = 'asdf';
  const b = await mathloader(a);
  console.log(b)
};

c();