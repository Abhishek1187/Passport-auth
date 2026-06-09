import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import messageRoutes from './src/routes/message.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './src/strategies/local-strategy.js';


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret : "anson dev",
        saveUninitialized : true,
        resave : false,
        cookie: {
            maxAge: 60000 * 60,
        },
    })
);

const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});