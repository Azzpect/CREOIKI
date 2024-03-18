let navitem = Array.from(document.getElementsByClassName("navitem"))
for(const item of navitem) {
    item.addEventListener("mouseover", (e) => {
        item.classList.add("active-navitem")
        item.firstChild.classList.add("active-navitem-a")
        item.addEventListener("mouseout", (e) => {
            item.classList.remove("active-navitem")
            item.firstChild.classList.remove("active-navitem-a")
        })
    })
}

let authBut = Array.from(document.querySelectorAll(".user>.btn"))
for(const but of authBut) {
    but.addEventListener("click", (e) => {
        window.location.href = but.getAttribute("endpoint")
    })
}

let err_msg_but = document.querySelector(".message>button")
err_msg_but.addEventListener("click", e => {
    document.querySelector(".message").style.display = "none";
})


const form = document.getElementById("Form")
if(form) {
    form.addEventListener("submit",async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const formDataObj = {}
        formData.forEach((value, key) => {
            formDataObj[key] = value
        })
        form.reset()
        let res;
        if(form.getAttribute("endpoint")=="verify-credentials")
            res = await fetchingCreateUserAction(formDataObj);
        else if(form.getAttribute("endpoint") == "auth") {
            res = await verifyUserLogIn(formDataObj)
            if(formDataObj.remember == "on")
                localStorage.setItem("auth-token", res.auth_token)
            else
                sessionStorage.setItem("auth-token", res.auth_token)
            if(res.status == "success")
                window.location.href = "../../"
        }
        else
            res = {"status": "error", "message": "Server is not responding."}
            
        document.querySelector(".message").style.display = "flex";
        document.querySelector(".message>.msg-text").innerHTML=`${res.status.toUpperCase()}! ${res.message}`;
    })
}

