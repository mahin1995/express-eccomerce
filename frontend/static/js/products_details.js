
$(window).on('load',async function () {
   const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
    await get_products_detailsData().then((e) => data = e)
 
});
async function get_products_detailsData () {
       const id=localStorage.getItem("id")
       const result =await $.ajax({
            url: `https://fakestoreapi.com/products/${id}`,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#col_product").html(`<div class="loader">Loading...</div>`)
          
            },
            success:async function (data) {
                $("#col_product").empty()
               
              
         
                let div= `           <div class="row" >
            <div class="col-2">
                <img src="${data.image}" width="100%" id="ProductImg">

                <div class="small-img-row">
                    <div class="small-img-col">
                        <img src="images/gallery-1.jpg" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="images/gallery-2.jpg" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="images/gallery-3.jpg" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="images/gallery-4.jpg" width="100%" class="small-img">
                    </div>
                </div>

            </div>
            <div class="col-2 " >
                <p>Home / ${data.category}</p>
                <h1>Red Printed T-Shirt by HRX</h1>
                <h4>${data.price}.00</h4>
                <select>
                    <option>Select Size</option>
                    <option>XXL</option>
                    <option>XL</option>
                    <option>L</option>
                    <option>M</option>
                    <option>S</option>
                </select>
                <input type="number" id="quantity" value="1" >

                <button onclick="add_to_cart(this)" data-id=${data.id} data-price=${data.price} data-image=${data.image} class="btn">
                <a  >Add To Cart</a></button>

                <h3>Product Details <i class="fa fa-indent"></i></h3>
                <br>
                <p>${data.description}.</p>
            </div>
        </div>`
                
          
                
                $("#col_product").append(div)
            
                return data
            }
       })
       return result;
}

    
function add_to_cart (element) {
  
    var price = $(element).data("price");
    var image = $(element).data("image");
    var data;
    var id = $(element).data("id");
    var quantity = $("#quantity").val();
    const object = {
        id: id,
        price: price,
        quantity: parseInt(quantity),
        image:image
    };
    var arr;
    let localst = localStorage.getItem('cart')
    console.log(localst)
    if (localst!='') {
         arr = JSON.parse(localst)
    }
    // console.log(arr.map((e) => e.id).includes(object.id))
    let productexist = arr!=undefined?arr.map((e) => e.id).includes(object.id):false
    if (productexist) {
        arr.forEach(element => {
            element.id===object.id?element.quantity=parseInt(element.quantity)+parseInt(object.quantity):parseInt(element.quantity)
        });
    data = [...(arr!==undefined?arr:[])];

    } else {
        
        data = [...(arr!==undefined?arr:[]), ...[object]];
    }
    localStorage.setItem('cart',JSON.stringify( data))
 
}