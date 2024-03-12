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


const form = document.getElementById("Form")
if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const formDataObj = {}
        formData.forEach((value, key) => {
            formDataObj[key] = value
        })
        fetch(`http://127.0.0.1:8800/user/${form.getAttribute("endpoint")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        }).then(res => {
            return res.json()
        }).then(data => {
            sessionStorage.setItem("auth-token", data.auth_token)
            window.location.href = "../../"
        }).catch(err => {
            console.log(err)
        })
    })
}

