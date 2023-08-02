const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  let response = await fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  if (result.status == "success") {
    Swal.fire({
      icon: "success",
      text: "Usuario creado con éxito! Será redirigido para iniciar sesion",
      allowOutsideClick: false,
      confirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      willClose: () => {
        window.location.href = "/";
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      text: "Algo salio mal!",
    });
  }
});
