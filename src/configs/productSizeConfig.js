module.exports = {
  NAME_COLLECTION: "sizes",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/products/sizes",
  LIST_VIEW_PATH: "backend/pages/productSizes/list",
  FORM_VIEW_PATH: "backend/pages/productSizes/form",

  // TITLE
  TITLE_LIST: "Danh sách kích cỡ",
  TITLE_ADD_FORM: "Thêm kích cỡ",
  TITLE_EDIT_FORM: "Chỉnh sửa kích cỡ",

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
