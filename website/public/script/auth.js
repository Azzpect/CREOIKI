const form = document.getElementById("Form")
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
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
})