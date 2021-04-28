const fs = require('fs-extra');
const fs2 = require('fs');

const createFolderMoveFile = ([className, file]) => {
  fs.ensureDirSync(`./${className}`);

  let lengthFile = fs2.readdirSync(`./${className}`).length + 1;

  const fileName = className + lengthFile.toString() + '.jpg';

  fs2.copyFileSync(`./${file}`, `./${className}/${fileName}`);

  try {
    fs2.unlinkSync(`./${file}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {createFolderMoveFile};
