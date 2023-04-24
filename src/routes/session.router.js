import { Router } from "express";
import userModel from "../dao/models/user.model.js";
const router = Router();

router.post('/login', (req, res)=>{

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
        }

        await userModel.create(user);
        return res.send({status:'success', message:'usuario registrado con éxito'})

    } catch (error) {
        console.log(error);
    }
});

export default router