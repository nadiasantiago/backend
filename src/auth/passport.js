import passport from "passport";
import local from 'passport-local';
import userModel from "../dao/models/user.model.js";
import {cartModel} from '../dao/models/cart.model.js';
import { creatHash, isValidPassword } from "../utils.js";
import GithubStrategy from 'passport-github2';
import config from "../config.js";

const {clientID, clientSecret, callbackurl} = config;

const LocalStrategy = local.Strategy;

const initializePassport = ()=>{
    passport.use('register',
        new LocalStrategy(
            {passReqToCallback:true, usernameField:'email'}, 
            async (req, username, password, done)=>{
                try {
                    const {first_name, last_name, email, age, rol} = req.body;
                    let user = await userModel.findOne({email:username})
                    if (user){
                        return done(null, false);
                    }
                    
                    const cart = await cartModel.create({})
                    const newUser ={
                        first_name,
                        last_name,
                        email,
                        age,
                        rol: rol ?? 'user',
                        password: creatHash(password),
                        cart: cart._id
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result);

                } catch (error) {
                    return done('Error al intentar encontrar usuario' + error)
                }
            }
        )
    );
    passport.use('login', 
        new LocalStrategy({usernameField:'email'}, 
        async (username, password, done)=>{
            try {
                const user = await userModel.findOne({email: username});
                if(!user) return done(null, false);
                if(!isValidPassword(user, password)) return done(null, false);
                delete user.password;
                return done(null, user)
            } catch (error) {
                return done(error)
            }
    }));

    passport.use('githublogin', 
        new GithubStrategy({clientID, clientSecret, callbackurl},
        async(accessToke, refreshToke, profile, done)=>{
            try {
                let user = await userModel.findOne({email:profile._json.email})
                if(!user){
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: "",
                        email: profile._json.email,
                        password:'',
                    }
                    let result = await userModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user)

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });
    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id);
        done(null, user);
    })
};

export default initializePassport;