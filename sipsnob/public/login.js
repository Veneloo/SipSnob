
alert("username is username and password is password :)");
//temp form completion
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username-id")
    const passwordInput = document.getElementById("password-id")

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value
        const password = passwordInput.value

        if (username === "username" && password === "password"){
            alert("Successfully Logged In!")
            window.location.href = "/home.html"
        }else{
            alert("Invalid Log In.")
        }
       
    })
//future form implementation
    
    
