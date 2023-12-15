const { check } = require("express-validator");

module.exports = [
  check("name", "Item này cần phải có tên").notEmpty(),
  check("slug", "Slug không hợp lệ").isSlug(),
  check("ordering", "Thứ tự có giá trị thấp nhất là 1")
    .isNumeric()
    .custom((value) => value > 0),
  check("status", "Trạng thái này không hợp lệ").custom((value) => {
    return ["active", "inactive"].includes(value);
  }),

  // check("file", "Vui lòng thêm hình ảnh").custom((value, { req }) => {
  //   if (!req.body.id && !req.file) {
  //     return false;
  //   }

  //   return true;
  // }),
];
