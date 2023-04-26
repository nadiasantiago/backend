import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, creatHash } from "../utils.js";

const router = Router();

router.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email}).lean();
        if(!user){
            return res.status(400).send({status:'error', message:'usuario inexistente'});
        };

        if(!isValidPassword(user, password)){
            return res.status(401).send({status:'error', error:'contraseña incorrecta'})
        }
        
        user.email == 'adminCoder@coder.com'
            ?(user.rol= 'admin')
            :(user.rol='user');

        delete user.password;
        req.session.user= user;

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
            password: creatHash(password),
        };

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