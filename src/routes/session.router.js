import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, creatHash } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/login', 
    passport.authenticate('login', {failureRedirect: '/failLogin'}), 
    async(req, res)=>{
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
        };
        req.session.user.email == 'adminCoder@coder.com'
            ?(req.session.user.rol= 'admin')
            :(req.session.user.rol='user');

        return res.send({status:'success', payload: req.session.user});
});

router.get('/failLogin', (req, res)=>{
    res.send({status:'error', error:'error de autenticacion'})
})

router.get('/github', 
    passport.authenticate('githublogin', {scope:['user:email']}),
    (req, res)=>{}
)

router.get('/githubcallback', 
    passport.authenticate('githublogin', {failureRedirect:'/'}), 
    (req, res)=>{
        req.session.user = req.user;
        req.session.user.email == 'adminCoder@coder.com'
        ?(req.session.user.rol= 'admin')
        :(req.session.user.rol='user');
        console.log(req.session.user.email)
        console.log(req.session.user.rol)
        
        res.redirect('/products')
})

router.post('/register', 
    passport.authenticate('register', {failureRedirect:'/failRegister'}), 
    async (req, res)=>{
        return res.send({status:'success', message:'Usuario registrado'})
});

router.get('/failRegister', (req, res)=>{
    return res.send({status:'status', error:'error de autenticacion'})
})

router.get('/logout', async(req, res)=>{
    req.session.destroy((err) => {
        if (!err) return res.send("logout ok!");
    
        return res.send({ status: "error", message: "logout error", body: err });
    });
});


export default router