import dotenv from "dotenv";

dotenv.config();

const env ={
    URL_MONGODB: process.env.URL_MONGODB,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIREIN: process.env.EXPIREIN,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS)
}

export default env;