module.exports = {
  NAME_COLLECTION: "categories",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/articles/categories",
  LIST_VIEW_PATH: "backend/pages/articleCategories/list",
  FORM_VIEW_PATH: "backend/pages/articleCategories/form",

  // TITLE
  TITLE_LIST: "Danh sách danh mục",
  TITLE_ADD_FORM: "Thêm danh mục",
  TITLE_EDIT_FORM: "Chỉnh sửa danh mục",

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
