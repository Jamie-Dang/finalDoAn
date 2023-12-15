module.exports = {
  NAME_COLLECTION: "discounts",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/discounts",
  LIST_VIEW_PATH: "backend/pages/discounts/list",
  FORM_VIEW_PATH: "backend/pages/discounts/form",

  // TITLE
  TITLE_LIST: "Danh sách mã giảm giá",
  TITLE_ADD_FORM: "Thêm mã giảm giá",
  TITLE_EDIT_FORM: "Chỉnh sửa mã giảm giá",

  // ARR
  FILTER_STATUS_ARR: [
    {
      name: "Tất cả",
      value: "all",
      selected: true,
    },
    {
      name: "Đang hoạt động",
      value: "active",
      selected: false,
    },
    {
      name: "Không hoạt động",
      value: "inactive",
      selected: false,
    },
  ],
};
