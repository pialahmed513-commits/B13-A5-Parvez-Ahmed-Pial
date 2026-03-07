
document.getElementById("login-btn").addEventListener("click",function(){
    
    const inputName=document.getElementById("input-name");
    const contactName = inputName.value;
    console.log(contactName);

    const inputPin = document.getElementById("input-pin");
    const pin = inputPin.value;
    console.log(pin);

    if (contactName == "admin" && pin == "admin123") {
        alert("Login Sucessful")

        window.location.assign("/home.html")
        
    }else{
        alert("Login Faild")
        return;
    }

})