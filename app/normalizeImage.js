const R = require('ramda');

const divideBy = R.flip(R.divide);

const applyNormalize = ([dims]) =>
  R.applySpec({
    startX: R.pipe(R.nth(0), divideBy(dims.width)),
    startY: R.pipe(R.nth(1), divideBy(dims.height)),
    width: R.pipe(R.nth(2), divideBy(dims.width)),
    height: R.pipe(R.nth(3), divideBy(dims.height))
  });

const normalizeImage = (imageDimensions) =>
  R.map(R.over(R.lensProp('bbox'), applyNormalize(imageDimensions)));

module.exports = {normalizeImage};
