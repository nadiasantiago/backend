import { Router } from "express";
import passport from "passport";
import { current, failRegister, githubcallback, login, logout, register } from "../controllers/sessions.controller.js";

const router = Router();

router.post('/login', login);

router.get('/github', 
    passport.authenticate('githublogin', {scope:['user:email']}),
    (req, res)=>{}
);

router.get('/githubcallback', 
    passport.authenticate('githublogin', {session:false, failureRedirect:'/'}), 
    githubcallback
);

router.post('/register', 
    passport.authenticate('register', {session:false, failureRedirect:'/api/sessions/failRegister'}), 
    register
);

router.get('/failRegister', failRegister)

router.get('/current', current)

router.get('/logout', logout);

export default router