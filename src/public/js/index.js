const socket = io();

const addProd = document.getElementById('addProductForm')
const productsList = document.getElementById('productsList');
const productDelete = document.getElementById('deleteProductForm');
const thumbnailsName = document.getElementById('thumbnails').files[0]

addProd.addEventListener('submit', (e) => {
    e.preventDefault()

    // if(product.thumbnails){product.thumbnails.forEach(e=>product.thumbnails.push(`http://localhost:8080/img/${e.filename}`))}    

    const newProd = { 
        title: title.value,
        description: description.value,
        price: parseInt(price.value),
        code: code.value,
        stock: parseInt(stock.value),
        category: category.value,
        thumbnails: thumbnails.value
    }

    // .forEach(e=>thumbnails.push(`http://localhost:8080/img/${e.filename}`))
    socket.emit('addProduct', newProd);
    addProd.reset();
})


productDelete.addEventListener('submit', (e)=>{
    e.preventDefault();
    const prodId = document.getElementById('pid').value;
    productDelete.reset();
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