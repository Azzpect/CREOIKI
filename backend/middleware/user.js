const bcrypt = require("bcrypt")
const fh = require("./fileHandling")
const qns = require("./qns")
const jwt = require("jsonwebtoken")


async function create_user(req, res, next) {
    const {uname, pass} = req.body
    try {
        let userData = await fh.read_file(process.env.USERDATAFILENAME)
        const user_exist = verify_user(userData.fileData.data, uname, pass)
        if(user_exist[0]) {
            delete userData.fileData
            userData["code"] = 500
            userData["status"] = "error"
            userData["message"] = "Username already exists"
            throw new Error(JSON.stringify(userData))
        }
        const hashPassword = hash_password(pass)
        const userDetails = {"username": uname, "password": hashPassword, "hangman": {"qnsArray": await qns.getQNSArray(), "ansArray": []}}
        const token = generate_auth_token(userDetails)
        userDetails["AUTH_TOKEN"] = token
        userData.fileData.data.push(userDetails)
        let msg = await fh.write_file(process.env.USERDATAFILENAME, JSON.stringify(userData.fileData, null, 4))
        msg["message"] = "Account created successfully"
        msg["auth_token"] = token
        req.body.msg = msg
    }
    catch(err) {
        req.body.msg = JSON.parse(err.message)
    }
    next()
}
async function log_user(req, res, next) {
    const {uname, pass} = req.body
    try {
        let userData = await fh.read_file(process.env.USERDATAFILENAME)
        const user_exist = verify_user(userData.fileData.data, uname, pass)
        if(!user_exist[0]) {
            delete userData.fileData
            userData["code"] = 401
            userData["status"] = "error"
            userData["message"] = "Username or Password is incorrect"
            throw new Error(JSON.stringify(userData))
        }
        let msg = {"code": 200, "status": "success", "message": "Succussfully logged in", "auth_token": userData.fileData.data[user_exist[1]].AUTH_TOKEN}
        req.body.msg = msg
    }
    catch(err) {
        req.body.msg = JSON.parse(err.message)
    }
    next()
}
async function delete_user(req, res, next) {
    const {uname, pass} = req.body
    const token = req.headers.auth_token
    try {
        let userData = await fh.read_file(process.env.USERDATAFILENAME)
        const user_exist = verify_user(userData.fileData.data, uname, pass)
        if(user_exist[1] == null || token != userData.fileData.data[user_exist[1]].AUTH_TOKEN){
            delete userData.fileData
            userData["code"] = 401
            userData["status"] = "error"
            userData["message"] = "Username or Password is incorrect"
            throw new Error(JSON.stringify(userData))
        }
        userData.fileData.data.splice(user_exist[1], 1)
        let msg = await fh.write_file(process.env.USERDATAFILENAME, JSON.stringify(userData.fileData, null, 4))
        msg["message"] = "Account deleted successfully"
        msg["code"] = 204
        req.body.msg = msg
    }
    catch(err) {
        req.body.msg = JSON.parse(err.message)
    }
    next()
}






function verify_user(userData, uname, pass) {
    for(const user of userData) {
        if(pass == null) {
            if(user.username == uname) 
                return [true, userData.indexOf(user)]
        }
        else {
            if(user.username == uname && compare_hash(pass, user.password)) 
                return [true, userData.indexOf(user)]
        }
    }
    return [false, null]
}



function generate_auth_token(user) {
    return jwt.sign(user, process.env.AUTH_KEY)
}
function hash_password(password) {
    newPass = password + process.env.PEPPER
    return bcrypt.hashSync(newPass, 10)
}
function compare_hash(pass, hash) {
    newPassword = pass + process.env.PEPPER
    return bcrypt.compareSync(newPassword, hash)
}



module.exports = {create_user, log_user, delete_user}