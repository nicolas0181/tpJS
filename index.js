require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const tab = ['./rawImages/kayou.jpeg', './rawImages/dog.jpg'];
const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

(async () => {
    const imgList = await Bromise.map(
        tab,
        readJpg
    );
    // Load the model.
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await Bromise.map(imgList, (x) => model.detect(x));

    let resultList = R.flatten(predictions)
    const main = R.pipe(
       R.map(R.prop('class')),
       R.tap(console.log)
    )
    main(resultList)

})();