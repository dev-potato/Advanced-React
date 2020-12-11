require('dotenv').config({ path: '.env' });
const createServer = require('./createServer.js');
const db = require('./db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT);
server.express.use(cookieParser())
// TODO Use express middleware to validate current user;

// Decode the jwt so we can get the user ID on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if(token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        // put userId onto the req for future requests to access
        req.userId = userId;
    }
    next();
})

//2. Create a middleware that populates the user on each request

server.express.use( async (req, res, next) => {
    // If they aren't logged in, skip this
    if(!req.userId) return next();
    const user = await db.query.user(
        { where: { id: req.userId } },
        '{id, permissions, email, name}'
        );
        req.user = user;
        next();
});

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
}, deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);