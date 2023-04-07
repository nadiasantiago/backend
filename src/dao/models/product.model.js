import mongoose from "mongoose";

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    stock:{
        type:Number,
        require:true
    },
    thumbnails:{
        type:Array,
        default:[]
    }

});

const productModel = mongoose.model(productsCollection, productSchema);

export {productModel}