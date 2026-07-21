import dotenv from "dotenv";

dotenv.config();

const env ={
    URL_MONGODB: process.env.URL_MONGODB,
    PORT: process.env.PORT
}

export default env;