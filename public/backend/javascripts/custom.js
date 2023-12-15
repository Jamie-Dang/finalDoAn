const myAlert = (type, message) => {
  Swal.fire({
    position: "center",
    icon: type, // success || error
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

const changeStatusHandler = (collection, id, status) => {
  const currentBtn = document.getElementById(`change-status-${id}`);

  $.ajax({
    type: "GET",
    url: `/admin/${collection}/change-status-ajax/${id}/${status}`,
    dataType: "json",
    success: (response) => {
      console.log(response);
      if (response.data == "success") {
        const typeButtonClass =
          response.status == "active" ? "success" : "secondary";
        const statusText =
          response.status == "active" ? "Đang hoạt động" : "Không hoạt động";
        currentBtn.outerHTML = `<a
            id="change-status-${id}"
            href="javascript:changeStatusHandler('${collection}','${id}','${response.status}')"
            class="btn btn-sm btn-${typeButtonClass}"
          >
            ${statusText}
          </a>`;

        myAlert("success", "Thay đổi trạng thái thành công");
      } else {
        myAlert("error", "Có lỗi xảy ra");
      }
    },
  });
};

const changeOrderingHandler = (collection, id, ordering) => {
  const currentInput = document.getElementById(`change-ordering-${id}`);

  $.ajax({
    type: "GET",
    url: `/admin/${collection}/change-ordering-ajax/${id}/${currentInput.value}`,
    dataType: "json",
    success: (response) => {
      console.log(response);
      if (response.data == "success") {
        currentInput.parentElement.innerHTML = `
					<input
						id="change-ordering-${id}"
						type="number"
						class="form-control text-center"
						style="height: 32px; width: 100px"
						value="${response.ordering}"
						onchange="changeOrderingHandler('${collection}','${response.id}', '${response.ordering}')"
					/>
				`;
        Swal.fire({
          position: "center",
          icon: "success", // success || error
          title: "Thay đổi thứ tự thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        myAlert("success", "Thay đổi thứ tự thành công");
      } else {
        currentInput.parentElement.innerHTML = `
        <input
          id="change-ordering-${id}"
          type="number"
          class="form-control text-center"
          style="height: 32px; width: 100px"
          value="${ordering}"
          onchange="changeOrderingHandler('${collection}', '${id}', '${ordering}')"
        />
        `;
        myAlert("error", "Thứ tự có giá trị thấp nhất là 1");
      }
    },
  });
};

const deleteItemHandler = (deletePath) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa không?",
    text: "Bạn sẽ không thể hoàn tác hành động này",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(deletePath);
      location.reload();
    }
  });
};

const changeNameHandler = (e) => {
  const nameInput = e.target;
  const slugInput = document.getElementById("slug");

  slugInput.value = slugify(nameInput.value, { lower: true, strict: true });
};

const changeImageHandler = () => {
  const input = document.getElementById("image");
  const label = input.nextElementSibling;
  const preview = document.querySelector(".preview-image");

  const fileName = input.value.split("\\").pop();
  if (fileName) {
    label.innerHTML = fileName;
  } else {
    label.innerHTML = "Chọn file";
  }

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute("src", "");
  }
};
