const btnAddToCart = document.querySelectorAll('.product-button');


btnAddToCart.forEach(boton =>{
    boton.addEventListener('click', async(e)=>{
        e.preventDefault();
        const prodId = e.target.id;
        console.log(prodId)
        // const cid='643ca4ed9bc1ad74c25270c5'

        // fetch(`/api/${cid}/products/${prodId}`, {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     }
        // })
})})

