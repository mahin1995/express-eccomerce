console.log("hello")

$('#btnRegister').click(function(){
    

 let data_serialize= {
    user_name:$('#id_reg_username').val(),
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