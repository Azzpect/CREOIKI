async function getUserDetails(token) {
    return await fetch("http://127.0.0.1:8800/user/get-user-details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth_token": token
        }
    }).then(res => {
        return res.json()
    })
}