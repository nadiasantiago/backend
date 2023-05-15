import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, creatHash } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/login', 
    passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin'}), 
    async(req, res)=>{
        const user = req.user;
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            age: user.age,
            email: user.email,
            cart: user.cart,
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
    passport.authenticate('register', {failureRedirect:'/api/sessions/failRegister'}), 
    async (req, res)=>{
        return res.send({status:'success', message:'Usuario registrado'})
});

router.get('/failRegister', (req, res)=>{
    return res.send({status:'status', error:'error de autenticacion'})
})

router.get('/current', (req, res)=>{
    return res.send({payload: req.session.user});
})

router.get('/logout', async(req, res)=>{
    req.session.destroy((err) => {
        if (!err) return res.send("logout ok!");
    
        return res.send({ status: "error", message: "logout error", body: err });
    });
});


export default router