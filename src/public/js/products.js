const btnAddToCart = document.querySelectorAll('.product-button');
const cartsId = document.getElementsByName('option');
const btnCart = document.querySelector('.cart-button');
const btnLogout = document.querySelector('.logout-button');

const nextLink = document.getElementById('nextLink');
const prevLink = document.getElementById('prevLink');

const prevPage = prevLink?.getAttribute('prevPage');
const nextPage = nextLink?.getAttribute('nextPage');

const currentURL = new URL(window.location.href);
const searchParams = new URLSearchParams(currentURL.search);

searchParams.set('page', nextPage);
const nextURL = '/products?' + searchParams.toString();

searchParams.set('page',prevPage);
const prevURL = '/products?' + searchParams.toString();

nextLink?.setAttribute('href', nextURL);
prevLink?.setAttribute('href', prevURL);

btnAddToCart.forEach(boton =>{
    boton.addEventListener('click', async(e)=>{
        e.preventDefault();
        const prodId = e.target.id;
        console.log(prodId)
        let cid = '';

        for (const cartId of cartsId) {
            if (cartId.checked) {
            cid = cartId.value;
            break;
            }
        }
        fetch(`/api/carts/${cid}/products/${prodId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(()=>{
            if(!cid || !prodId){
                Swal.fire({
                    icon: 'error',
                    text: 'No se pudo añadir el producto! por favor verificar los campos',
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    text: 'se añadio un producto con exito',
                })    
            }
        })
})})

btnCart.addEventListener('click', async(e)=>{
    for (const cartId of cartsId) {
        if (cartId.checked) {
        cid = cartId.value;
        break;
        }else{
            cid=null
        }
    }
    if(!cid){
        Swal.fire({
            icon: 'error',
            text: 'Debe seleccionar el carrito',
        });
    return
    }    
    window.location.href = `/carts/${cid}`
})

btnLogout.addEventListener('click', ()=>{
    fetch('/api/sessions/logout', {
        method:'get',
    }).then(
        Swal.fire({
            icon: 'info',
            text: 'Cerrando sesion',
            allowOutsideClick: false,
            confirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            willClose: () => {
            window.location.href = "/";
            }
    }));
});



