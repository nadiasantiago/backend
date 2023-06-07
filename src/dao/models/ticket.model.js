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
            require:true
        },
        subtotal:{
            type:Number,
            require:true
        }
    }],
    code:{
        type:String,
        unique:true,
        require:true
    },
    purchase_datetime:{
        type:Date,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    purchaser:{
        type:String,
        require:true
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