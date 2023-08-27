import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  rol: {
    type: String,
    enum: ["user", "premium", "admin"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  documents: [
    {
      _id: false,
      name: {type: String},
      reference: {type: String}
    }
  ],
  last_connection: Date,
  status: Array
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
