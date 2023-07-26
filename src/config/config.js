import dotenv from 'dotenv';
dotenv.config()

const config={
    dbUrl: process.env.DB_URL,
    dbUrlTest: process.env.DB_URL_TEST,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackurl: process.env.CALLBACK_URL,
    jwtSecret : process.env.JWT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    nodemailerConfig:{
        SERVICE: process.env.MAILING_SERVICE,
        PORT: process.env.MAILING_PORT,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD,
    }
};

export default config;