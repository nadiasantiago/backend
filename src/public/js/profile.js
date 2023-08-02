const form = document.getElementById("addDocumentForm");
const identificacion = document.getElementById('identificacion').files;
const direccion = document.getElementById('direccion').files;
const resumen = document.getElementById('resumen').files;
const uid = document.getElementById("uid").innerText;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  for (let i = 0; i<identificacion.length; i++){
    data.append('identifiacion', identificacion[i])
  }
  for (let i = 0; i<direccion.length; i++){
    data.append('direccion', direccion[i])
  }
  for (let i = 0; i<resumen.length; i++){
    data.append('resumen', resumen[i])
  }
  let response = await fetch(`/api/user/${uid}/documents`, {
    method: "POST",
    body: data,
  });
  let result = await response.json();
    
  if (result.status == "success") {
    Swal.fire({
      icon: "success",
      text: result.message,
      allowOutsideClick: false,
      confirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } else {
    Swal.fire({
      icon: "error",
      text: result.error,
    });
  }
});
