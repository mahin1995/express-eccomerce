
$(window).on('load',async function () {
   const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
     get_cart_item()
 
});
var sub_total=0
 function get_cart_item () {
     console.log("hello")
     $("#tables_cart").html("")
    let localst = localStorage.getItem('cart')
    console.log(localst)
    if (JSON.parse(localst) && JSON.parse(localst).length>0) {
       let tabels= JSON.parse(localst).map((e) => {
            let trs=` <tr>
                <td>
                    <div class="cart-info">
                        <img src="${e.image}">
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price: $${parseInt(e.price)}.00</small>
                            <br>
                            <button onclick="cartRemove(${e.id})">Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" id="id_cart_value_cureent_${e.id}" onchange=priceChange(${e.id},${e.price},${e.quantity}) value="${e.quantity}"></td>
                <td><p id="id_total_product_price_${e.id}">${parseFloat(e.price).toFixed(2)*parseInt(e.quantity)}</p></td>
            </tr> `
            sub_total =sub_total+(parseFloat(e.price).toFixed(2)*parseInt(e.quantity))

           return trs
       })

       console.log(JSON.parse(localst))
        $("#tables_cart").html(tabels)
        $("#id_total").html(parseFloat(sub_total).toFixed(2))
        $("#id_total2").html(parseFloat(sub_total).toFixed(2))
        $("#id_totalwithDelivery").html((parseFloat(sub_total)+100))
    }
}
 function cartRemove(e){
    console.log(e)
   const arr = localStorage.getItem('cart');
   let new_arr= JSON.parse(arr).filter(data=>{
        console.log(data.id)
        return data.id!=e
    })
    console.log(new_arr)
    new_arr.map(e=>{
        sub_total =sub_total+(parseFloat(e.price).toFixed(2)*parseInt(e.quantity))
        $("#id_total").html(parseFloat(sub_total).toFixed(2))
    })
    localStorage.setItem('cart',JSON.stringify(new_arr))
     get_cart_item()
     window.location.reload();
}
function priceChange(id,price,quantity){
    console.log(quantity)
    let current_quantity=$(`#id_cart_value_cureent_${id}`).val()
    console.log(current_quantity)
    let total_new_quantity=current_quantity-quantity
    let add_in_sub=price*parseInt(total_new_quantity)
    sub_total=sub_total+add_in_sub
    $("#id_total").html(parseFloat(sub_total).toFixed(2))
    let new_total=price*parseInt(current_quantity)
    if(current_quantity<0){
        alert("Quantity not a negetive value")
    }else{
        $(`#id_total_product_price_${id}`).html(parseFloat(new_total).toFixed(2))

    }
}
function placeOrder(){
    let user = localStorage.getItem('user')
    console.log(user)
    if(!user){
        window.location.replace("/account")
    }
    else{
        console.log("place order")
        var myModal = document.getElementById('myModal')

        $('#myModal').modal('show');
myModal.addEventListener('shown.bs.modal', function () {

})
    }


}
function alert(message, type,id='') {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    if(id.length>0){
        alertPlaceholder = document.getElementById('alert_msg')   
    }
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
    setTimeout(() => {
        document.getElementById('liveAlertPlaceholder').innerHTML=""
    }, 3000);
  }
async function postOrder(){
    console.log("ordered")
    let user = localStorage.getItem('user')
    let product = localStorage.getItem('cart')
    let name=$('#exampleInputCustomerName').val()
    let phone=$('#exampleInputPhone').val()
    let address=$('#exampleFormControlAddress').val()
    if(name.length<=0||phone.length<=0||address.length<=0){
        if(name.length<=0){
            alert("Name not be empty")
        }else if(phone.length<=0){
            alert("Phone not be empty")
        }else if(address.length<=0){
            alert("address not be empty")
            
        }else{
            alert("something is wrong")
        }
    }
    let data=JSON.stringify(
        {
user,product,name,phone,address
        }
    )
    console.log(data)
    // await $.ajax({
    //     url: '/product/order',
    //     method: 'POST',
    //     crossDomain: true,
    //     dataType: 'json',
    //     crossOrigin: true,
    //     async: true,
    //     contentType: 'application/json',
    //     data: data,
    //     headers: {
    //         'Access-Control-Allow-Methods': '*',
    //         "Access-Control-Allow-Credentials": true,
    //         "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //         "Access-Control-Allow-Origin": "*",
    //         "Control-Allow-Origin": "*",
    //         "cache-control": "no-cache",
    //         'Content-Type': 'application/json'
    //     },
    //     beforeSend: function () {
       
    //     },
    //     success:function (data) {
    //         console.log(data)
    //         if(data.id){
    // localStorage.removeItem('cart');
    // $('#myModal').modal('hide');
    // // window.location.reload();
    // alert("Your order is posted. Our Officer will contact you in a minuite!!","success")
    // get_cart_item()
  
    // $("#id_total").html('')
    // $("#id_total2").html('')
    //         }
    //     },
    //     error:function(err){
    //         console.log(err)
    //     }
    // })
}