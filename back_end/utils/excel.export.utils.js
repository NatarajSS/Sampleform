const ftp = require("basic-ftp");
const excelJS = require("exceljs");
const { humanize } = require("./function.utils");
const path = require("path");
const fs = require("fs");

const exportUser = async (
  data,
  dir,
  host,
  ftp_location,
  username,
  password
) => {
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  let filename = dir + Date.now() + `.xlsx`;
  const location = path.join(__dirname, `../docs/${filename}.xlsx`); // Path to download excel
  // Column for data in excel. key must match data key
  const column = Object.keys(data[0]).map((string) => {
    let key = string;
    if (typeof data[0][string] === "object") {
      Object.keys(data[0][string]).map((objKey) => {
        key = key + "." + objKey;
      });
    }
    return {
      header: humanize(string),
      key: key,
    };
  });
  worksheet.columns = column;
  // Looping through User data
  worksheet.addRows(data.map((row) => Object.values(row).flat()));
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  let client;
  try {
    await workbook.xlsx.writeFile(`${location}`).then(() => {
      console.log("XlS uploaded");
    });
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
    console.log("error", err);
    client.close();
  }
};
module.exports = {
  exportUser,
};
