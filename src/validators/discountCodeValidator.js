const { check } = require("express-validator");

module.exports = [
  check("code", "Mã giảm giá không được bỏ trống").notEmpty(),
  check("type", "Loại giảm giá không hợp lệ").custom((value) => {
    return ["fixed", "percentage"].includes(value);
  }),
  check("discount", "Giá trị giảm không hợp lệ")
    .isNumeric()
    .custom((value) => value > 0),
  check("quantity", "Số lượng mã không hợp lệ")
    .isNumeric()
    .custom((value) => value > 0),
  // check("startedAt", "Ngày bắt đầu không hợp lệ")
  //   .notEmpty()
  //   .custom((value) => {
  //     const startedAt = new Date(value);
  //     const yesterday = new Date();
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     return startedAt >= yesterday;
  //   }),
  check("startedAt", "Ngày bắt đầu không hợp lệ")
    .notEmpty()
    .custom((value, { req }) => {
      const startedAt = new Date(value);
      const expiredAt = new Date(req.body.expiredAt);
      return startedAt < expiredAt;
    }),
  check("expiredAt", "Ngày kết thúc không hợp lệ")
    .notEmpty()
    .custom((value, { req }) => {
      const startedAt = new Date(req.body.startedAt);
      const expiredAt = new Date(value);
      return expiredAt > startedAt;
    }),
];
