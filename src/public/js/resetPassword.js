const form = document.getElementById("resetPasswordForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  if (obj.newPassword === obj.newPassword2) {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    obj['token'] = token

    let response = await fetch("/api/sessions/resetPassword", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
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
        willClose: () => {
          window.location.href = "/"
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: result.error,
      });
    }
  } else{
    Swal.fire({
        icon: 'error',
        text: 'Verifique que las contraseñas coincidan y vuelve a intentarlo!',
    });
  }
});
