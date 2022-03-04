
$(window).on('load',async function () {
   const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
    await get_products_detailsData().then((e) => data = e)
 
});
function alert(message, type) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
  }
var selected_product={}
async function get_products_detailsData () {
       const id=localStorage.getItem("id")
       const result =await $.ajax({
            url: `https://fakestoreapi.com/products/${id}`,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#col_product").html(`<div class="loader">Loading...</div>`)
                selected_product={}
            },
            success:async function (data) {
                $("#col_product").empty()
               
          selected_product=data
         
                let div= `          
             
                <div class="row" >
            <div class="col-2">
                <img src="${data.image}" width="100%" id="ProductImg">

                <div class="small-img-row">
                    <div class="small-img-col">
                        <img src="${data.image}" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="${data.image}" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="${data.image}" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img src="${data.image}" width="100%" class="small-img">
                    </div>
                </div>

            </div>
            <div class="col-2 " >
            <div id="liveAlertPlaceholder"></div>
                <p>Home / ${data.category}</p>
                <h1>Red Printed T-Shirt by HRX</h1>
                <h4>${data.price}Tk</h4>
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
    console.log(selected_product)
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    alert('Nice, you triggered this alert message!', 'success')
    setTimeout(() => {
        alertPlaceholder.remove()
    }, 3000);
    var price = $(element).data("price");
    var image = $(element).data("image");
    var data;
    var id = $(element).data("id");
    var quantity = $("#quantity").val();
    const object = {
        id: id,
        price: price,
        title:selected_product.title,
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