const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const productRouter=require('./routers/products')
const authRouter=require('./routers/auth')
const app = express();
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.use(express.json())

const morgan = require("morgan");
app.use(morgan('dev'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/frontend/views'));



const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const db=require("./db/db")
const store = new KnexSessionStore({
    db,
    tablename: 'sessions', // optional. Defaults to 'sessions'
  });
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
   
    cookie: {
      sameSite: true,
      secure: false,
      expires: false
    },
    store,
  }));


app.get("/", (req, res) => {
    console.log('user',req.session.id)
   res.render('index',{title:"Home"})
});
app.get("/product_details", (req, res) => {
  res.render('product_details',{title:"Product details"})
});
app.get("/cart", (req, res) => {
  console.log('user',req.session.id)
  res.render('cart',{title:"Cart"})
});
app.get("/products", (req, res) => {
  res.render('products',{title:"Products"})
});
app.get("/account", (req, res) => {
  res.render('account',{title:"Account"}) 
});
app.use('/product',productRouter)
app.use('/auth/',authRouter)
app.listen(3000, () => console.log("Server running...3000"));