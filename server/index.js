

//env variable
require("dotenv").config();


//This is our main file. when we install any module, hen we install any of the package, then we require the package.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";


//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";
/** */



//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/orders";
import Review from "./API/reviews";


//Database connection
import ConnectDB from "./database/connection";

//initialize zomato with express
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());


//passport configuration
googleAuthConfig(passport);
routeConfig(passport);


//For application routes
//localhost:4000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Review);


//set up our root route //d:53 28:00
zomato.get("/", (req,res) => res.json({message: "SetUp Success!!"}));

zomato.listen(4000, ()=>
ConnectDB().then(()=>console.log("Server is up and running"))
.catch(()=>console.log("DB connection failed")));


/**
 GOOGLE_CLIENT_ID=150736450591-qku9fnr9nif2oee3k1tnnleldqvp3s0c.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
 */