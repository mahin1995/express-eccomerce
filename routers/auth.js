const express=require('express')
const db=require("../db/auth")
const router=express.Router()
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(sessions({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: false,
      expires: false
    }
  }));

router.post("/",async (req,res)=>{
    let sessionId=req.session.id
    console.log('user',req.session.id)
    req.body.session=sessionId
    console.log(req.body)
    try{
        result=await db.createAuth_user(req.body);
        console.log(result[0])
    }catch(e){
        console.log(e)
        res.status(400).json("error:"+e)
    }finally{
        if(result){
            let user_id = result;
            res.status(201).json({id:`user_id ${user_id}`})
        }
    }
})
router.post("/login",async (req,res)=>{
    console.log(req.body)
    const {username,password}=req.body
    const user= await db.userAuthenticateCheck(username,password)
    res.status(200).json({user:user})
})
router.get("/user",async (req,res)=>{
    console.log(req.query)
    let {sessiontoken}=req.query
    const user=await db.get_userDetails(sessiontoken)
    res.status(200).json({user:user})
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