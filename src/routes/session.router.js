import { Router } from "express";
import SessionManager from "../dao/dbManagers/sessionsManager.js";
import { isValidPassword, creatHash } from "../utils.js";
import config from "../config.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

const sessionManager = new SessionManager();


router.post('/login', 
    async(req, res)=>{
        const {email, password} = req.body;
        const user = await sessionManager.getUser({email});
        if(!user) 
            return res
                .status(401)
                .send({status:'error', error:'Usuario inexistente'});

        if(!isValidPassword(user,password))
            return res.status(401).send({status:'error', error:'credenciales erroneass'})

        const jwtUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            rol: user.rol,
            cart: user.cart,
        };
        const token = jwt.sign(jwtUser, config.jwtSecret, {expiresIn: '24h'})
        
        return res
            .cookie('jwtCookie', token, {httpOnly:true})
            .send({
                status:'success', 
                payload: req.user
            });
});


router.get('/github', 
    passport.authenticate('githublogin', {scope:['user:email']}),
    (req, res)=>{}
)

router.get('/githubcallback', 
    passport.authenticate('githublogin', {session:false, failureRedirect:'/'}), 
    (req, res)=>{
        res.redirect('/products')
})

router.post('/register', 
    passport.authenticate('register', {session:false, failureRedirect:'/api/sessions/failRegister'}), 
    async (req, res)=>{
        if(req.user.email == 'adminCoder@coder.com') user.rol = 'admin'
        return res.send({status:'success', message:'Usuario registrado'})
});

router.get('/failRegister', (req, res)=>{
    return res.send({status:'status', error:'error de autenticacion'})
})

router.get('/current', (req, res)=>{
    return res.send({payload: req.user});
})

router.get('/logout', async(req, res)=>{
    return res
        .clearCookie('jwtCookie')
        .send({status:'success', message:'log out successful'})
});


export default router