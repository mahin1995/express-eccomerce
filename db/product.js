const knex=require("./knex")

function createProduct(product){
    console.log(product)
    return knex("product").insert(product)
}
function getAllProducts(){
    return knex("product").select("*")
}
function deleteProduct(id){
    return knex("product").where("id",id).del()
}
function updateProduct(id,product){
    return knex("cars").where("id",id).update(product)
}
module.exports={
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
}