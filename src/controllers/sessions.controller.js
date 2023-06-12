import { isValidPassword, creatHash } from "../utils.js";
import config from "../config.js";
import jwt from "jsonwebtoken";
import { sessionService } from "../services/sessions.service.js";
import outputUserDto from "../dao/dto/outputUser.dto.js";


export const login = async(req, res)=>{
    const {email, password} = req.body;
    const user = await sessionService.getUser({email});
    if(!user) 
        return res
            .status(401)
            .send({status:'error', error:'Usuario inexistente'});

    if(!isValidPassword(user,password))
        return res.status(401).send({status:'error', error:'credenciales erroneass'})

    const userDto = new outputUserDto(user);
    const jwtUser = JSON.parse(JSON.stringify(userDto))
    const token = jwt.sign(jwtUser, config.jwtSecret, {expiresIn: '24h'})
    
    return res
        .cookie('jwtCookie', token, {httpOnly:true})
        .send({
            status:'success', 
            payload: req.user
        });
}

export const githubcallback = (req, res)=>{
    const user = req.user;
    const userToken = {
       id: user._id,
       rol: user.rol
    }
    const token = jwt.sign(userToken, config.jwtSecret, {expiresIn: '24h'});
    
    res    
    .cookie('jwtCookie', token, {httpOnly:true})
    .redirect('/products')
}

export const register = async (req, res)=>{
    return res.send({status:'success', message:'Usuario registrado'})
}

export const failRegister = (req, res)=>{
    return res.send({status:'status', error:'error de autenticacion'})
}

export const current = (req, res)=>{
    const user = sessionService.getUser(req.user)
    return res.send({payload: user});
}

export const logout = async(req, res)=>{
    return res
        .clearCookie('jwtCookie')
        .send({status:'success', message:'log out successful'})
}