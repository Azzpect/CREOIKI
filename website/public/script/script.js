const auth_token = sessionStorage.getItem("auth-token") || localStorage.getItem("auth-token")
if(auth_token) {
    getUserDetails(auth_token).then(data => {
        const user_section = document.querySelector("header>.navbar>.user")
        user_section.innerHTML = `<div class="profile">Welcome, ${data.data.username}<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: red;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg></div>`
    }).catch(err => {
        console.log(err)
    })
}