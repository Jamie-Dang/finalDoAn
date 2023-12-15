module.exports = {
  NAME_COLLECTION: "products",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/products",
  LIST_VIEW_PATH: "backend/pages/products/list",
  FORM_VIEW_PATH: "backend/pages/products/form",

  // TITLE
  TITLE_LIST: "Danh sách sản phẩm",
  TITLE_ADD_FORM: "Thêm sản phẩm",
  TITLE_EDIT_FORM: "Chỉnh sửa sản phẩm",

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
