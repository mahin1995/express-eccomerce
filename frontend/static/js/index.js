
// $(document).ready( async function () {
//     console.log("click")
//     await  get_products()
// });
var data;
$(window).on('load',async function () {
    const arr = localStorage.getItem('cart');
    if (!arr) {
        localStorage.setItem('cart',[])
    }
    await get_products().then((e) => data = e);
});
   async function get_products()  {
       const result =await $.ajax({
            url: 'https://fakestoreapi.com/products',
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $("#row_products1").html(`<div class="loader">Loading...</div>`)
                $("#row_products2").html(`<div class="loader">Loading...</div>`)
            },
            success:async function (data) {
                $("#row_products1").empty()
                $("#row_products2").empty()
                let divs =await data.map((e) => {
                let div= `<div class="col-4">
                <a href="product_details" id="details_page" onclick='get_products_details(${e.id})' ><img src="${e.image}"></a>
                <h4>${e.title}</h4>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                </div>
                <p>${e.price}Tk</p>
            </div>`
                    return div
                })
                let filtersData=data.filter((e)=>e.rating.rate>=4)
                      let filter_divs =await filtersData.map((e) => {
                let div= `<div class="col-4">
                <a href="product_details" onclick='get_products_details(${e.id})'><img src="${e.image}"></a>
                <h4>${e.title}</h4>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                </div>
                <p>$50.00</p>
            </div>`
                    return div
                })
                
                $("#row_products1").append(divs)
                $("#row_products2").append(filter_divs)
                return data
            }
       })
       return result;
    }


function get_products_details (id) {
    console.log("click")
    localStorage.setItem("id", id)  
}