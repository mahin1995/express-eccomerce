$(window).on('load',async function () {
   const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
    await get_cart_item().then((e) => data = e)
 
});

async function get_cart_item () {
    let localst = localStorage.getItem('cart')
    if (localst) {
       let tabels= JSON.parse(localst).map((e) => {
            let trs=` <tr>
                <td>
                    <div class="cart-info">
                        <img src="${e.image}">
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price: $${parseInt(e.price)}.00</small>
                            <br>
                            <a href="">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${e.quantity}"></td>
                <td>${parseInt(e.price)*parseInt(e.quantity)}.00</td>
            </tr> `
           return trs
       })
        $("#tables_cart").append(tabels)
    }
}