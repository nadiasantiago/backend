import mongoose from "mongoose";
import config from "../../src/config/config";

const {dbUrlTest} = config

export const database = {
    connect: async function(){
        try {
            await mongoose.connect(dbUrlTest);
            console.log('Database connected')
        } catch (error) {
            console.log(error)
        }
    }
}

export default database