const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const productRouter=require('./routers/products')
const authRouter=require('./routers/auth')
const app = express();
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.use(express.json())
app.use('/products/',productRouter)
app.use('/auth/',authRouter)
const morgan = require("morgan");
app.use(morgan('dev'))

const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.get("/", (req, res) => {
    console.log('user',req.session.userid)
    console.log('user',req.session.name)
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});
app.get("/product_details", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "product_details.html"));
});
app.get("/cart", (req, res) => {
    console.log('user',req.session.name)
    // let session=req.session
    // session.name="mahin"
    res.sendFile(path.resolve(__dirname, "frontend", "cart.html"));
});
app.get("/products", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "products.html"));
});
app.get("/account", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "account.html"));
});

app.listen(3000, () => console.log("Server running..."));