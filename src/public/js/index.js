const socket = io();

const productsList = document.getElementById('productsList');
const productDelete = document.getElementById('deleteProductForm');


productDelete.addEventListener('submit', (e)=>{
    // e.preventDefault();
    const prodId = document.getElementById('pid').value;
    fetch(`/api/products/${prodId}`,{
        method:'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })
})

socket.on('products', (products)=>{
    let productsVisible = '';
    products.forEach(e => {
        productsVisible += `
        <p>${e.title}</p>
        <p>precio:$${e.price}</p>`
    });
    productsList.innerHTML = productsVisible
})