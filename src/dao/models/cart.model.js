import mongoose from "mongoose";

const Schema = mongoose.Schema.Types;
const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products:[
        {
            type: Schema.ObjectId,
            ref:'products',
            // quantity:{
            //     type:Number,
            //     require: true
            // } //no sabia si habia que definir la cantidad dentro del model
        }],
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export {cartModel}