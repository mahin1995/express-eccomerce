const express = require("express");
const path = require("path");
const db=require("./db/product")
const app = express();
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.use(express.json())
app.post("/products",async (req,res)=>{
    const result=await db.createProduct(req.body);
    console.log(result)
    console.log(req.body)
    res.status(201).json({id:`created product id ${result[0]}`})
})
app.get("/products",async (req,res)=>{
    const product=await db.getAllProducts()
    res.status(200).json({product})
})
app.patch("/products/:id",async (req,res)=>{
    const id=await db.updateProduct(req.params.id,req.body)
    res.status(200).json({id})
})
app.delete("/products/:id",async (req,res)=>{
    await db.deleteProduct(req.params.id);
    res.status(200).json({success:true})
})











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

app.listen(3000, () => console.log("Server running..."));