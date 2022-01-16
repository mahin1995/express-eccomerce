const knex=require("./db")

async function createAuth_user(auth_user){
    console.log(auth_user)
    const [id]=await knex("users").insert(auth_user).returning('id')
    return id
}
function getAllAuth_user(){
    return knex("users").select("*")
}
 async function userAuthenticateCheck(username,password){
    const user=await knex("users").where("username",username).select("*")
    console.log(user[0])
    console.log(password)
    if(user[0]){
        if(user[0].password===password.toString()){
            return {sessionUser:user[0].session}
        }
        else{
            return {error:"Password donot match"}
        }
    }
    else{
        return {error:"User not found"}
    }
}
function deleteAuth_user(id){
    return knex("users").where("id",id).del()
}
function updateAuth_user(id,auth_user){
    return knex("users").where("id",id).update(auth_user)
}
module.exports={
    getAllAuth_user,
    createAuth_user,
    deleteAuth_user,
    updateAuth_user,
    userAuthenticateCheck
}