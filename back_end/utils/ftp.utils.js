const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");

const uploadFtp = async (data, dir, host, ftp_location, username, password) => {
  let client;
  try {
    let filename = dir + Date.now() + `.log`;
    console.log(filename);
    const log_path = path.join(__dirname, "../docs");
    const stringify = JSON.stringify(data);
    let fileCreation = await fs.createWriteStream(log_path + `/${filename}`);
    fileCreation.write(stringify, "utf-8");
    let localPath = path.join(__dirname, `../docs/${filename}`);
    client = new ftp.Client();
    client.ftp.verbose = true;
    await client.access({
      host: host,
      user: username,
      password: password,
    });

    let fileTransfers = await client.uploadFrom(
      localPath,
      `${ftp_location}/${filename}`
    );
    fs.unlinkSync(localPath, (err) => {
      if (err) console.log(err);
      console.log(`${filename} log file deleted`);
      client.close();
    });
    return fileTransfers;
  } catch (err) {
    console.log("error in remove", err);
    client.close();
  }
};

const checkConnection = async (host, username, password) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: host,
      user: username,
      password: password,
    });
    client.close();
    return true;
  } catch (err) {
    console.log("error", err);
    client.close();
    // throw new Error("Invalid ftp credentials");
    return false;
  }
};

module.exports = {
  uploadFtp,
  checkConnection
};
