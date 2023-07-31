const btnAddToCart = document.querySelector(".product-button");
const btnCart = document.querySelector(".cart-button");

btnAddToCart.addEventListener("click", async (e) => {
  e.preventDefault();
  const prodId = e.target.id;
  let cid = btnCart.id;
  fetch(`/api/carts/${cid}/products/${prodId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    if (!cid || !prodId) {
      Swal.fire({
        icon: "error",
        text: "No se pudo añadir el producto! por favor verificar los campos",
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "se añadio un producto con exito",
      });
    }
  });
});

btnCart.addEventListener("click", async (e) => {
  let cid = btnCart.id;
  if (!cid) {
    Swal.fire({
      icon: "error",
      text: "Debe seleccionar el carrito",
    });
    return;
  }
  window.location.href = `/carts/${cid}`;
});
