import mongoose from "mongoose";
import config from "../config/config.js";

export let persistance = undefined;

switch (config.persistance) {
  case "mongodb":
    mongoose.connect(config.dbUrl);
    const {cartMongo} = await import ("../dao/mongo/cart.mongo.js");
    const {productMongo} = await import("../dao/mongo/product.mongo.js");
    const {userMongo} = await import("./mongo/users.mongo.js");
    const {messageMongo} = await import ("../dao/mongo/messages.mongo.js");
    const {ticketMongo} = await import ("../dao/mongo/ticket.mongo.js");

    persistance = {
        cartDAO: cartMongo,
        productDAO: productMongo,
        userDAO: userMongo,
        messageDAO: messageMongo,
        ticketDAO: ticketMongo
    };
    break;

  case "memory":
    console.log("Using memory persistance. Not implemented yet");
    break;
}