module.exports = {
  NAME_COLLECTION: "users",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/users",
  LIST_VIEW_PATH: "backend/pages/users/list",
  FORM_VIEW_PATH: "backend/pages/users/form",

  // TITLE
  TITLE_LIST: "Danh sách người dùng",
  TITLE_ADD_FORM: "Thêm người dùng",
  TITLE_EDIT_FORM: "Chỉnh sửa người dùng",

  // ARR
  FILTER_ROLE_ARR: [
    {
      name: "Tất cả",
      value: "all",
      selected: true,
    },
    {
      name: "Nhân viên",
      value: "staff",
      selected: false,
    },
    {
      name: "Người dùng",
      value: "user",
      selected: false,
    },
  ],
};
