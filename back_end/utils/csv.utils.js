const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");
const {
  Parser,
  transforms: { unwind },
} = require("json2csv");

const exportcsv = async (
  data,
  dir,
  host,
  ftp_location,
  username,
  password,
  fields,
  unwindPath
) => {
  let client;
  try {
    console.log(data);
    const transforms = [unwind({ paths: unwindPath })];
    const json2csvParser = new Parser({ fields, transforms });
    const csv = json2csvParser.parse(data);
    // console.log(csv);
    let filename = dir + Date.now() + `.csv`;
    const log_path = path.join(__dirname, "../docs");
    const location = path.join(__dirname, `../docs/${filename}`);
    let fileCreation = await fs.createWriteStream(log_path + `/${filename}`);
    fileCreation.write(csv, "utf-8");
    client = new ftp.Client();
    client.ftp.verbose = true;
    await client.access({
      host: host,
      user: username,
      password: password,
    });
    let fileTransfers = await client.uploadFrom(
      location,
      `${ftp_location}/${filename}`
    );
    fs.unlinkSync(location, (err) => {
      if (err) console.log(err);
      console.log(`${filename} log file deleted`);
      client.close();
    });
    return fileTransfers;
  } catch (err) {
    console.log(err);
    client.close();
  }
};
module.exports = {
  exportcsv,
};
