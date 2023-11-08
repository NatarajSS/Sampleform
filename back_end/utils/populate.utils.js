const dataSetCartList = [
  { path: "corporate_user", select: "username email _id" },
  { path: "dataset", select: { __v: 0 } },
];

const userAppList = [
  {
    path: "user",
    select: { username: 1, email: 1, _id: 1 },
  },
];

const rewardsPopulate = [
  {
    path: "user",
    select: { username: 1, email: 1, _id: 1 },
  },
  {
    path: "dataset_id",
    // select: { corporate_user: 1, requestObject: 1 },
    populate: {
      path: "corporate_user",
      select: { username: 1 },
    },
  },
];

const subscriptionPopulate = [
  {
    path: "user",
    select: { username: 1, email: 1, _id: 1 },
  },
  {
    path: "cart",
    select: { requestObject: 1, _id: 1, start_date: 1, end_date: 1 },
  },
];

module.exports = {
  dataSetCartList,
  userAppList,
  rewardsPopulate,
  subscriptionPopulate,
};
