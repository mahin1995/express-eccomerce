const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});
app.get("/product_details", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "product_details.html"));
});
app.get("/cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "cart.html"));
});
app.get("/products", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "products.html"));
});
app.get("/account", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "account.html"));
});

app.listen(3030, () => console.log("Server running..."));