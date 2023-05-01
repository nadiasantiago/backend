import dotenv from 'dotenv';
dotenv.config()

const config={
    dbUrl: process.env.DB_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackurl: process.env.CALLBACK_URL,
};

export default config;