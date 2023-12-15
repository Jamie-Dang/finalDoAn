// const mySwiper = new Swiper(".swiper-container", {
//   slidesPerView: 1,
//   spaceBetween: 20,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

const myAlert = (type, message) => {
  Swal.fire({
    position: "center",
    icon: type, // success || error
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
