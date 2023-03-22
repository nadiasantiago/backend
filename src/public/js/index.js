const socket = io();

const productsList = document.getElementById('productsList');

socket.on('products', (products)=>{
    console.log(products)
    let productsVisible = '';
    products.forEach(e => {
        productsVisible += `
        <p>${e.title}</p>
        <p>precio:$${e.price}</p>`
    });
    productsList.innerHTML = productsVisible
})