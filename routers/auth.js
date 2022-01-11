const express=require('express')
const db=require("../db/auth")
const router=express.Router()
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

router.post("/",async (req,res)=>{
    console.log(req.body)
    let session=req.session
    session.name=req.body.user_name
    session.userid="1"
    let result
    try{
        result=await db.createAuth_user(req.body);
    }catch(e){
        console.log(e)
        res.status(400).json("error:"+e)
    }finally{
        if(result){
            let user_id = result[0];
            res.status(201).json({id:`user_id ${user_id}`})
        }
    }

})
router.get("/",async (req,res)=>{
    console.log('user',req.session.userid)
    console.log('user',req.session.name)
    const user=await db.getAllAuth_user()
    res.status(200).json({user})
})
router.patch("/:id",async (req,res)=>{
    const id=await db.updateAuth_user(req.params.id,req.body)
    res.status(200).json({id})
})
router.delete("/:id",async (req,res)=>{
    await db.deleteAuth_user(req.params.id);
    res.status(200).json({success:true})
})

module.exports=router