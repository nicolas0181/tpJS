const fs2 = require('fs');

const listFiles = fs2.readdirSync(`./`);
module.exports = {listFiles};
