const btnFinalizarCompra = document.querySelector(".purchase-button");
const btnDeleteProduct = document.querySelectorAll(".delete-button");
const cid = document.getElementById("cid").textContent;
const productsDeletedList = document.getElementById("productsDeletedList");

// This is your test publishable API key.
const stripe = Stripe(
  "pk_test_51NjsFeJoig2SaN0vQFJubohxeeGvq341DvOQcRwq2FMXDY8bSs9Lp5dIcJlAatcGwXBPyyoiWTyFKj8YHo9tOne100A9MgVKe7"
);

// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];
let elements;

let emailAddress = "";

async function initialize() {
  const response = await fetch("/api/payments/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const result = await response.json();
  if (result.statusCode == 400) {
    const productsDeleted = result.payload;

    window.location.reload();
    productsDeletedList.innerHTML = `
      <h2>Productos Eliminados </h2>
      <ul>`;
    productsDeleted.forEach((product) => {
      productsDeletedList.innerHTML += `
        <div class="product">
            <p>${product.category}</p>
            <p>${product.title}</p>
            <p>${product.code}</p>
            <p>Precio:${product.price}</p>
            <p>stock:${product.stock}</p>
        </div>`;
    });
    productsDeletedList.innerHTML += "</ul>";

    Swal.fire({
      icon: "error",
      text: result.message,
      allowOutsideClick: false,
      confirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  } else if (result.statusCode == 500) {
    Swal.fire({
      icon: "error",
      text: result.message,
      allowOutsideClick: false,
      confirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
  const { clientSecret} = result;
  const appearance = {
    theme: "night",
  };
  if (clientSecret) {
    elements = stripe.elements({ appearance, clientSecret });

    const paymentBodyContainer = document.getElementById("payment-body");
    paymentBodyContainer.style.display = "flex";

    const linkAuthenticationElement = elements.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");

    linkAuthenticationElement.on("change", (event) => {
      emailAddress = event.value.email;
    });

    const paymentElementOptions = {
      layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);
  }
}
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  const result = await stripe.confirmPayment({
    elements,
    redirect: "if_required",
    confirmParams: {
      receipt_email: emailAddress,
    },
  });
  if (
    result.error?.type === "card_error" ||
    result.error?.type === "validation_error"
  )
    Swal.fire({
      icon: "error",
      title: "No se pudo realizar el pago",
      text: `${result.error.message}`,
    });
  if (result.paymentIntent?.status == "succeeded") {
    Swal.fire({
      icon: "success",
      title: "Pago realizado con éxito",
      text: `A continuacion resibirá un correo con la compra`,
    });
    createTicket();
  }
  setLoading(false);
  checkStatus();
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  if (!clientSecret) {
    return;
  }
  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#payment-submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#payment-submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}
async function createTicket() {
  const response = await fetch(`/api/carts/${cid}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if(result.status == 'error'){
    Swal.fire({
      icon: "error",
      text: result.message,
      allowOutsideClick: false,
      confirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });  
  }

}
btnFinalizarCompra.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    initialize();
  } catch (error) {
    console.log(error);
  }
});

btnDeleteProduct.forEach(function (btn) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const pid = btn.id;
      const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
            location.reload();
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          text: result.message,
          allowOutsideClick: false,
          confirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});
