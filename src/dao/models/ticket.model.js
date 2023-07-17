import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    products:[{
        pid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        quantity:{
            type:Number,
            required:true
        },
        subtotal:{
            type:Number,
            required:true
        }
    }],
    code:{
        type:String,
        unique:true,
        required:true
    },
    purchase_datetime:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    purchaser:{
        type:String,
        required:true
    }
})

ticketSchema.pre("findOne", function () {
    this.populate("products.pid");
});

ticketSchema.pre("find", function () {
    this.populate("products.pid");
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export {ticketModel}