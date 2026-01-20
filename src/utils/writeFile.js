const fs = require("fs/promises");
const path = require("path");

const writeDb = async (filename, data) => {
    await fs.writeFile(path.join(process.cwd(), "db", filename + ".json"), JSON.stringify(data, null, 4));
    return true;
};

module.exports = writeDb;