const form = document.getElementById('registerForm');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    const data= new FormData(form);
    const user = {};

    data.forEach((value, key)=>(user[key]=value));
    let response = await fetch('/api/sessions/register', {
        method:'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'applicatio/json',
        },
    });

    let result = await response.json();
    console.log(result); 
})