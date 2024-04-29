import { createClient } from "redis"
import session from "express-session";
import RedisStore from "connect-redis";


const redisClient = createClient({ url: process.env.REDIS_URL });

const redisStore = new RedisStore({
    client: redisClient
});
async function connectRedis() {
    try {
        await redisClient.connect();

    } catch (error) {
        console.log(error);
    }
}
export default session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
})

export { connectRedis,redisClient }
