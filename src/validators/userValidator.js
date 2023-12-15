const { check } = require("express-validator");

module.exports = [
  check("name", "Người dùng cần phải có tên").notEmpty(),
  check("email", "Người dùng cần phải có email").notEmpty(),
  check("role", "Vai trò này không hợp lệ").custom((value) => {
    return ["user", "staff"].includes(value);
  }),
];
