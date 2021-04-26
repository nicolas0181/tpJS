const fs = require('fs-extra');

const objToJson = async (filenameToCreate, resultNormalize) => {
  await fs.writeJson(filenameToCreate, resultNormalize);
};
module.exports = {objToJson};
