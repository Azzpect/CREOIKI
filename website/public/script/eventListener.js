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