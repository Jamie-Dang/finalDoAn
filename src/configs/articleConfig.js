module.exports = {
  NAME_COLLECTION: "articles",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/articles",
  LIST_VIEW_PATH: "backend/pages/articles/list",
  FORM_VIEW_PATH: "backend/pages/articles/form",

  // TITLE
  TITLE_LIST: "Danh sách bài viết",
  TITLE_ADD_FORM: "Thêm bài viết",
  TITLE_EDIT_FORM: "Chỉnh sửa bài viết",

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
