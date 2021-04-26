require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');
const {normalizeImage} = require('./app/normalizeImage');
const {bMap} = require('./app/bMap');
const {createFolderMoveFile} = require('./app/moveFile');
const {objToJson} = require('./app/objToJson');
const {listFiles} = require('./app/listFiles');

const main = async () => {
  const listImages = listFiles.filter((s) => new RegExp('.jpg', 'i').test(s));

  const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

  const imgList = await Bromise.map(listImages, readJpg);
  const model = await cocoSsd.load();
  const predictions = await Bromise.map(imgList, (x) => model.detect(x));
  const predictionList = R.flatten(predictions);

  const getProportionImages = await R.pipe(
    bMap(readJpg),
    R.andThen(R.map(R.pick(['width', 'height'])))
  )(listImages);

  const resultNormalize = normalizeImage(getProportionImages)(predictionList);

  const getClassName = R.map(R.prop('class'))(predictionList);

  const zipList = R.zip(getClassName, listImages);

  const createMove = R.map(createFolderMoveFile);

  createMove(zipList);
  objToJson('./predictions.json', resultNormalize);
};

main();
