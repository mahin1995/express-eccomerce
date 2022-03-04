const knex=require("./db")

function createProduct(product){
    console.log(product)
    return knex("product").insert(product)
}
function orderProduct(order){
    console.log(order)
    return knex("order").insert(order)
}
function getAllProducts(){
    return knex("product").select("*")
}
function getUserOrders(id){
    console.log(id)
    return knex("order").where("user",id)
}
function OrdersDelete(id){
    return knex("order").where("id",id).del()
}
function deleteProduct(id){
    return knex("product").where("id",id).del()
}
function updateProduct(id,product){
    return knex("product").where("id",id).update(product)
}
module.exports={
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    orderProduct,
    getUserOrders,
    OrdersDelete
}