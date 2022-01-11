const knex=require("./knex")

function createAuth_user(auth_user){
    console.log(auth_user)
    return knex("auth").insert(auth_user)
}
function getAllAuth_user(){
    return knex("auth").select("*")
}
function deleteAuth_user(id){
    return knex("auth").where("id",id).del()
}
function updateAuth_user(id,auth_user){
    return knex("auth").where("id",id).update(auth_user)
}
module.exports={
    getAllAuth_user,
    createAuth_user,
    deleteAuth_user,
    updateAuth_user
}