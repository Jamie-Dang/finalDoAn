const { check } = require("express-validator");

module.exports = [
  check("name", "Tên không được để trống").notEmpty(),
  check("slug", "Slug không hợp lệ").isSlug(),
  check("ordering", "Thứ tự có giá trị thấp nhất là 1")
    .isNumeric()
    .custom((value) => value > 0),
  check("status", "Trạng thái này không hợp lệ").custom((value) => {
    return ["active", "inactive"].includes(value);
  }),
  check("isPriority", "Ưu tiên hiển thị có giá trị không hợp lệ").isBoolean(),
  // check("content", "Nội dung không được để trống").notEmpty(),

  // check("file", "Vui lòng thêm hình ảnh").custom((value, { req }) => {
  //   if (!req.body.id && !req.file) {
  //     return false;
  //   }

  //   return true;
  // }),
];
