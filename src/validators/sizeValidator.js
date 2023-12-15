const { check } = require("express-validator");

module.exports = [
  check("name", "Màu sắc cần phải có tên").notEmpty(),
  check("ordering", "Thứ tự có giá trị thấp nhất là 1").custom(
    (value) => value > 0
  ),
  check("status", "Trạng thái này không hợp lệ").custom((value) => {
    return ["active", "inactive"].includes(value);
  }),
];
