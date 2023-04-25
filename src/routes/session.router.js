import { Router } from "express";
import userModel from "../dao/models/user.model.js";
const router = Router();

router.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email, password});
        if(!user){
            return res.status(400).send({status:'error', message:'credenciales incorrectas'});
        };
        
        user.email == 'adminCoder@coder.com'
            ?(user.rol= 'admin')
            :(user.rol='user');

        req.session.user={
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol:user.rol
        };

        return res.send({status:'success', message:'Logged in', payload: req.session.user});
    } catch (error) {
        console.log(error);
    }
});
router.post('/register', async (req, res)=>{
    try {
        const {first_name, last_name, email, age, password} = req.body;
        const userExist = await userModel.findOne({email});
        if (userExist){
            return res.status(400).send({status:'error', error: 'ya existe un usuario con ese correo'})
        }

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
        };

        console.log(user)

        await userModel.create(user);
        return res.send({status:'success', message:'usuario registrado con éxito'})

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', async(req, res)=>{
    req.session.destroy((err) => {
        if (!err) return res.send("logout ok!");
    
        return res.send({ status: "error", message: "logout error", body: err });
    });
});


export default router