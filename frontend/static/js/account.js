

$('#btnRegister').click(function(){
    

 let data_serialize= {
    username:$('#id_reg_username').val(),
    email:$('#id_reg_email').val(),
    password:$('#id_reg_password').val(),
}   
 console.log(data_serialize)
 $.ajax({
    method: 'POST',
    crossDomain: true,
    dataType: 'json',
    crossOrigin: true,
    async: true,
    contentType: 'application/json',
    data: JSON.stringify(data_serialize),
    headers: {
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        'Content-Type': 'application/json'
    },
    url: '/auth/',
    success: function(response){
        console.log("Respond was: ", response);
        $('input').val('')
        alert(`user create successfully`)
    },
    error: function (request, status, error) {
        console.log("There was an error: ", request.responseText);
        if(error=="Bad Request"){
            alert("username already exist!!!")
        }
    }
  })
})
$('#btnLogin').click(function(){
    

 let data_serialize= {
    username:$('#id_login_username').val(),
    password:$('#id_login_password').val(),
}   
 console.log(data_serialize)
 $.ajax({
    method: 'POST',
    crossDomain: true,
    dataType: 'json',
    crossOrigin: true,
    async: true,
    contentType: 'application/json',
    data: JSON.stringify(data_serialize),
    headers: {
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        'Content-Type': 'application/json'
    },
    
    url: '/auth/login',
    beforeSend: function() {
        // setting a timeout
        localStorage.setItem('user',[])
    },
    success: function(response){
        console.log("Respond was: ", response);
        if(!response.user.error){
            alert(`login successfully`)
            $('input').val('')
        localStorage.setItem('sessionUser',[response.user.sessionUser])
        get_user_data()
        }
        else{
            alert(response.user.error)
        }
    },
    error: function (request, status, error) {
        console.log("There was an error: ", request.responseText);
    }
  })
})
$( document ).ready(function() {
    get_user_data()
});


function get_user_data(){
    let sessionId=localStorage.getItem('sessionUser')
    if(sessionId){
        $('#auth_section').addClass('hidden')
        $('#user_profile').removeClass('hidden')

        $.ajax({
            method: 'GET',
            crossDomain: true,
            dataType: 'json',
            crossOrigin: true,
            async: true,
            contentType: 'application/json',
            data: {"sessiontoken":sessionId},
            headers: {
                'Access-Control-Allow-Methods': '*',
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Origin": "*",
                "Control-Allow-Origin": "*",
                "cache-control": "no-cache",
                'Content-Type': 'application/json'
            },
            
            url: '/auth/user',
            beforeSend: function() {

            },
            success: function(response){
                console.log("Respond was: ", response);
                if(!response.user.error){
                    localStorage.setItem('user',[response.user.id])
                    let div=`
                    <h2>User-Profile</h2>
                    <h4>username:</h4><h5>${response.user.username}</h5>
                    <h4>email: <h5>${response.user.email}</h5></h4>
                    <button type="button" onclick="logout()" class="btn">Logout</button>
                    `
                    let order_div=response.order.map(e=>{
                        
                        return `        
                          <tr>
                            <th scope="row">1</th>
                            <td>${e.product_title}</td>
                            <td>${e.total_price}</td>
                            <td>${e.address}</td>
                            <td><button onclick=OrderDelete(${e.id}) class="btn mt-0 pt-0" style="background:white !important"><img src="../static/images/trash.png" style="width:20px !important;height:20px !important;"></button></td>
                          </tr>
                        
                      `
                    })
                    $('#id_order_data').html(order_div)
                    $('#user_data').html(div)
                }
                else{
                    alert(response.user.error)
                }
            },
            error: function (request, status, error) {
                console.log("There was an error: ", request.responseText);
            }
          })
    }
    else{
        $('#auth_section').removeClass('hidden')
        $('#user_profile').addClass('hidden')
    }

}

function logout(){
    localStorage.removeItem('sessionUser')
    localStorage.removeItem('user')
    get_user_data()  
}
function OrderDelete(id){
    console.log(id)
    if(confirm("are you want to delete this order???")){
        $.ajax({
            method: 'PUT',
            crossDomain: true,
            dataType: 'json',
            crossOrigin: true,
            async: true,
            contentType: 'application/json',
            headers: {
                'Access-Control-Allow-Methods': '*',
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Origin": "*",
                "Control-Allow-Origin": "*",
                "cache-control": "no-cache",
                'Content-Type': 'application/json'
            },
            
            url: '/auth/orderDelete/'+id,
            beforeSend: function() {
    
            },
            success: function(response){
                if(response.success){
                    alert(response.success)
                    get_user_data()
                }
            },
            error: function (request, status, error) {}
        })
    }
 
}