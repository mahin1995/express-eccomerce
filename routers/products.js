const express=require('express')
const db=require("../db/product")
const router=express.Router()

router.post("/",async (req,res)=>{
    const result=await db.createProduct(req.body);
    console.log(result)
    console.log(req.body)
    res.status(201).json({id:`created product id ${result[0]}`})
})
router.post("/order",async (req,res)=>{
    try{
        const result=await db.orderProduct(req.body);
        console.log(result)
        res.status(201).json({id:`created product id ${result.rowCount}`})
    }
catch(err){
    res.status(400).json({err:"error ocure"})
}
})
router.get("/",async (req,res)=>{
    const product=await db.getAllProducts()
    res.status(200).json({product})
})
router.patch("/:id",async (req,res)=>{
    const id=await db.updateProduct(req.params.id,req.body)
    res.status(200).json({id})
})
router.delete("/:id",async (req,res)=>{
    await db.deleteProduct(req.params.id);
    res.status(200).json({success:true})
})

module.exports=router