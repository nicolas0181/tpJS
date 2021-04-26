const R = require('ramda');
const Bromise = require('bluebird');

const bMap = R.curry((fn, x) => Bromise.map(x, fn));

module.exports = {bMap};
