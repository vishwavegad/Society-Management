// const e = require("cors");

window.onload = function() {
    const items = document.querySelectorAll('.animate-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`; // Stagger animations by 0.2 seconds
    });

    //-------------------code for login form validation--------------------
    const loginBtn = document.querySelector(".loginbutton button");
    const usernameInput = document.querySelector(".username input");
    const passwordInput = document.querySelector(".password input");

    loginBtn.addEventListener('click', (e)=>{
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if(!username || !password)
        {
            alert("Please enter both username and password");
            e.preventDefault();
        }
        else
        {
            alert("Login Successfull");
        }
    })
};
