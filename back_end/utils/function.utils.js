const moment = require("moment");

const generateOtp = (name, otp) => {
  const html = `<p><span style='font-weight:bold;'>Hi ${name},</span><br> Your one time password for <span style='font-weight:bold;'>Solo Secure</span> is<br><span style='font-weight:bold;font-size: 20px;'>${otp}</span><br>It will expire in 10 mins. do not share with any one!</p>`;
  return html;
};

const forgotHtml = (name, otp) => {
  const html = `<p><span style='font-weight:bold;'>Hi ${name},</span><br>You have requested to reset the password of your <span style='font-weight:bold;'>Solo Secure </span>account.<br>Please find the OTP to change your password.It will expire in 10 mins. do not share with any one!<br><span style='font-weight:bold;font-size: 20px;text-align: center;'>${otp}</span></p>`;
  return html;
};

const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

const getUserFilter = async (data) => {
  let query = { $match: { "user.user_type": "END_USER" } };
  if (data.gender && data.gender.length > 0) {
    query.$match["user.gender"] = { $in: data.gender };
  }
  if (data.blood_group && data.blood_group.length > 0) {
    query.$match["user.blood_group"] = { $in: data.blood_group };
  }
  if (data.occupation && data.occupation.length > 0) {
    query.$match["user.occupation"] = { $in: data.occupation };
  }
  if (data.marital_status && data.marital_status.length > 0) {
    query.$match["user.marital_status"] = { $in: data.marital_status };
  }
  if (data.user_location && data.user_location.length > 0) {
    query.$match["user.location"] = { $in: data.user_location };
  }
  if (data.age && data.age.length > 0) {
    query.$match["user.age"] = { $gte: data.age[0], $lte: data.age[1] };
  }
  if (data.height && data.height.length > 0) {
    query.$match["user.height_feet"] = {
      $gte: data.height[0],
      $lte: data.height[1],
    };
  }
  if (data.weight && data.weight.length > 0) {
    query.$match["user.weight"] = {
      $gte: data.weight[0],
      $lte: data.weight[1],
    };
  }
  return query;
};

const selectedFileds = async (data, isWearable) => {
  try {
    let arrToObj = {};
    for (let i = 0; i < data.length; ++i) arrToObj[data[i]] = "$" + data[i];
    arrToObj["added_at"] = {
      $dateToString: { format: "%Y-%m-%d", date: "$added_at" },
    };
    arrToObj["added_time"] = {
      $dateToString: { format: "%H-%M-%S", date: "$added_at" },
    };
    return arrToObj;
  } catch (err) {
    throw new Error(err);
  }
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function humanize(str) {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}

const checkFuture = async (start_date, end_date) => {
  try {
    let currentDate = new Date();
    let startDate = new Date(start_date);
    let endDate = new Date(end_date);
    console.log("startDate === currentDate", startDate === currentDate);
    if (
      startDate.getFullYear() === currentDate.getFullYear() &&
      startDate.getMonth() === currentDate.getMonth() &&
      startDate.getDate() === currentDate.getDate()
    ) {
      let daysBetween = endDate - startDate;
      let DayCount = daysBetween / (3600 * 24 * 1000);
      return {
        isFuture: true,
        noOfDays: DayCount,
      };
    } else if (startDate > currentDate && endDate > currentDate) {
      let daysBetween = endDate - startDate;
      let DayCount = daysBetween / (3600 * 24 * 1000);
      console.log(DayCount, "DayCount");
      return {
        isFuture: true,
        noOfDays: DayCount,
      };
    } else if (endDate > currentDate && startDate < currentDate) {
      let daysBetween = endDate - new Date();
      let DayCount = daysBetween / (3600 * 24 * 1000);
      console.log(DayCount, "DayCount");
      return {
        isFuture: true,
        noOfDays: parseInt(DayCount),
        past_future: true,
      };
    }
    return {
      isFuture: false,
      noOfDays: 0,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const startDate = (date) => {
  return moment.utc(date).add(1, "day").startOf("day").toDate();
};

const different = (start, end) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let daysBetween = endDate - startDate;
  let DayCount = daysBetween / (3600 * 24 * 1000);
  return parseInt(DayCount + 1);
};

// const getCartData = async (data) => {
//   let cartList = [];
//   const isFuture = await checkFuture(data.start_date, data.end_date);
//   if (isFuture.past_future) {
//     const from = startDate(data.start_date);
//     const to = moment.utc().endOf("day").local().toDate();
//     const cart = await assignCartDate(data, from, to);
//     const amount = await getCartAmount(cart.requestObject);
//     cart.amount = amount;
//     cart.purchased = "NEW";
//     cartList.unshift(cart);
//   }
//   if (isFuture.isFuture) {
//     if (isFuture.noOfDays <= 7) {
//       const date = isFuture.past_future
//         ? moment(cartList[cartList.length - 1].end_date)
//             .startOf("day")
//             .subtract(1, "day")
//             .format()
//         : data.start_date;
//       const from = startDate(date);
//       let end = moment(data.end_date).format("YYYY-MM-DD");
//       const to = moment.utc(end).endOf("day").local().toDate();
//       const cart = await assignCartDate(data, from, to);
//       cart.purchased = "INPROGRESS";
//       cartList.push(cart);
//     } else {
//       const date = isFuture.past_future
//         ? moment(cartList[cartList.length - 1].end_date)
//             .startOf("day")
//             .subtract(1, "day")
//             .format()
//         : data.start_date;
//       let fromDate = startDate(date);
//       let to = moment(date).add(7, "days").format("YYYY-MM-DD");
//       const end_date = moment(data.end_date).format("YYYY-MM-DD");
//       while (moment(to).isBefore(end_date)) {
//         let end = moment.utc(to).local().toDate();
//         const cart = await assignCartDate(data, fromDate, end);
//         cart.purchased = "INPROGRESS";
//         fromDate = moment.utc(to).local().toDate();
//         to = moment(fromDate).add(7, "day").format();
//         cartList.push(cart);
//       }
//       if (!moment(to).isSame(end_date) && moment(to).isAfter(end_date)) {
//         const start = moment
//           .utc(cartList[cartList.length - 1].end_date)
//           .local()
//           .toDate();
//         let end = moment.utc(end_date).endOf("day").local().toDate();
//         const cart = await assignCartDate(data, start, end);
//         cart.purchased = "INPROGRESS";
//         cartList.push(cart);
//       }
//     }
//   } else {
//     const cart = await assignCartDate(data, data.start_date, data.end_date);
//     cart.purchased = "NEW";
//     cartList.push(cart);
//   }
//   return cartList;
// };

const assignCartDate = async (data, from, to) => {
  let cartObject = { ...data };
  cartObject.start_date = from;
  cartObject.end_date = to;
  let newRequest = { ...cartObject.requestObject };
  newRequest.from = from;
  newRequest.to = to;
  cartObject.requestObject = newRequest;
  return cartObject;
};

module.exports = {
  generateOtp,
  forgotHtml,
  addMinutesToDate,
  getUserFilter,
  selectedFileds,
  timeout,
  humanize,
  checkFuture,
  startDate,
  assignCartDate,
  different,
  // getCartData,
};
