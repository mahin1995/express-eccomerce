$(window).on('load',async function () {
   const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
     get_cart_item()
 
});

 function get_cart_item () {
     console.log("hello")
     $("#tables_cart").html("")
    let localst = localStorage.getItem('cart')
    console.log(localst)
    if (localst.length>0) {
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
                <td><input type="number" value="${e.quantity}"></td>
                <td>${parseInt(e.price)*parseInt(e.quantity)}.00</td>
            </tr> `
           return trs
       })
        $("#tables_cart").html(tabels)
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
    localStorage.setItem('cart',JSON.stringify(new_arr))
     get_cart_item()
}
