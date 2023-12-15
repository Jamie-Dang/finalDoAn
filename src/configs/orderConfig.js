module.exports = {
  NAME_COLLECTION: "orders",
  NAME_DEFAULT_IMAGE: "default.png",

  // PATH
  LIST_PATH: "/admin/orders",
  LIST_VIEW_PATH: "backend/pages/orders/list",
  FORM_VIEW_PATH: "backend/pages/orders/form",

  // TITLE
  TITLE_LIST: "Danh sách đơn hàng",
  TITLE_EDIT_FORM: "Cập nhật đơn hàng",

  // ARR
  FILTER_STATUS_ARR: [
    {
      name: "Tất cả",
      value: "all",
      selected: true,
    },
    {
      name: "Chờ xử lý",
      value: "pending",
      selected: false,
    },
    {
      name: "Đã xác nhận",
      value: "confirmed",
      selected: false,
    },
    {
      name: "Đã hủy",
      value: "cancelled",
      selected: false,
    },
  ],
};
