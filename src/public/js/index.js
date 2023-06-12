// const socket = io();

const addProd = document.getElementById('addProductForm')
const productsList = document.getElementById('productsList');
const productDelete = document.getElementById('deleteProductForm');
const thumbnailsName = document.getElementById('thumbnails').files[0]


addProd.addEventListener('submit', async(e) => {
    e.preventDefault()

    const files = document.getElementById('thumbnails').files
    const thumbnailsTotal = [];
    for (let i=0; i < files.length; i++){
        thumbnailsTotal.push(`http://localhost:8080/img/${files[i].name}`)
    }
    const newProd = { 
        title: title.value,
        description: description.value,
        price: parseInt(price.value),
        code: code.value,
        stock: parseInt(stock.value),
        category: category.value||undefined,
        thumbnails: thumbnailsTotal
    }

    const fileData = [];
    for(let i=0; i<files.length; i++){
        fileData.push({
            name: files[i].name,
            data:files[i]
        })
    }

    let response = await fetch('/api/products', {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProd)
    })


    let result = await response.json();
    console.log(result)
    if(result.status == 'success'){
        Swal.fire({
            icon: 'success',
            text: 'Producto creado con éxito!',
            allowOutsideClick: true,
            confirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            willClose: () => {
            }
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al crear el producto',
            text: result.error,
            allowOutsideClick: true,
            confirmButton: false,
        });
    }
    // socket.emit('upload', fileData)
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

// socket.on('products', (products)=>{
//     let productsVisible = '';
//     products.forEach(e => {
//         productsVisible += `
//         <p>${e.title}</p>
//         <p>precio:$${e.price}</p>`
//     });
//     productsList.innerHTML = productsVisible
// })