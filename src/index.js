import "dotenv/config";
import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { monsterTrio } from './utils/monsters.js';
import passport from 'passport';
// import "./strategies/localStrategy.js";
import "./strategies/discordStrategy.js";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
const app = express();
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Connected to database'))
    .catch((err)=>console.log(`Error:${err}`));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:true,
    cookie:{
        maxAge:60000*60
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient(),
    })
}));
const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method}-${req.url}`);
    next();
}
app.use(loggingMiddleWare);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.cookie("hello","world",{maxAge:60000});
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited=true;
    res.send("Hello bro!");
});
app.post('/api/auth',passport.authenticate('local'),(req,res)=>
{
    res.sendStatus(200);
});
app.get('/api/auth/status',(req,res)=>
{
    return req.user?res.send(req.user):res.sendStatus(401);
});
app.post('/api/auth/logout',(req,res)=>
{
    if(!req.user) return res.sendStatus(401);
    req.logOut((err)=>
    {
        if(err) return res.sendStatus(400);
        res.sendStatus(200);
    });
});
app.get('/api/auth/discord',passport.authenticate('discord'));
app.get('/api/auth/discord/redirect',passport.authenticate('discord'),(req,res)=>
{
    console.log(req.session);
    console.log(req.user);
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
}); 
