import * as dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    ENV: process.env.APP_ENV,
    SEC: process.env.SECRET,
  },
  DB: {
    URL: process.env.DATABASE_URL,
  },
};
