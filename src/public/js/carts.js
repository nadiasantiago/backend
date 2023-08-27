const btnFinalizarCompra = document.querySelector(".purchase-button");
const btnDeleteProduct = document.querySelectorAll('.delete-button')
const cid = document.getElementById("cid").textContent;
const productsDeletedList = document.getElementById("productsDeletedList");

btnFinalizarCompra.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/carts/${cid}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result)
    if (result.statusCode == 400) {
      const productsDeleted = result.payload;
      productsDeletedList.innerHTML = `
      <h2>Productos Eliminados </h2>
      <ul>`;
      productsDeleted.forEach(product => {
        productsDeletedList.innerHTML += `
        <div class="product">
            <p>${product.category}</p>
            <p>${product.title}</p>
            <p>${product.code}</p>
            <p>Precio:${product.price}</p>
            <p>stock:${product.stock}</p>
        </div>`
      });
      productsDeletedList.innerHTML += '</ul>';
      
      Swal.fire({
        icon: "error",
        text: result.message,
        allowOutsideClick: false,
        confirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(()=>{
        window.focus()
      })
      
    }else if(result.statusCode == 500){
      Swal.fire({
        icon: "error",
        text: result.message,
        allowOutsideClick: false,
        confirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }else{
      Swal.fire({
        icon: "success",
        text: result.message,
        allowOutsideClick: false,
        confirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          location.reload()
        }  
      })
    }
  } catch (error) {
    console.log(error);
  }
});


btnDeleteProduct.forEach(function(btn){
  btn.addEventListener('click', async(e)=>{
    e.preventDefault();
    try {
      const pid = btn.id
      const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    if (result.status === "success") {
      Swal.fire({
        icon: "success",
        text: result.message,
        allowOutsideClick: false,
        confirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          location.reload()
        }  
      })
    }else{
      Swal.fire({
        icon: "error",
        text: result.message,
        allowOutsideClick: false,
        confirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
    } catch (error) {
      console.log(error)
    }
  })

})