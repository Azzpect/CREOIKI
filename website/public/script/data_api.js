async function getUserDetails(token) {
    return await fetch("http://127.0.0.1:8800/user/get-user-details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth_token": token
        }
    }).then(res => {
        return res.json()
    }).catch(err => {
        return err
    })
}
async function fetchingCreateUserAction({uemail, uname, pass}) {
    const data = {"uemail":uemail, "uname":uname, "pass":pass}
    return await fetch("http://127.0.0.1:8800/user/verify-credentials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(data => {
        return data
    }).catch(err => {
        return err
    })
}
async function verifyUserLogIn({uname, pass}) {
    const data = {"uname":uname, "pass":pass}
    return await fetch("http://127.0.0.1:8800/user/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(data => {
        return data
    }).catch(err => {
        return err
    })
}