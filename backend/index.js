const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const user = require("./middleware/user")
const qns = require("./middleware/qns")
const { sendVerificationEmail } = require("./middleware/verify_email")


const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/public",express.static(path.join(__dirname, "../website/public")))
require("dotenv").config()




//routes to handle web pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../website/index.html"))
})
app.get("/auth/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../website/signup.html"))
})
app.get("/auth/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../website/login.html"))
})
app.get("/hangman", (req, res) => {
    res.sendFile(path.join(__dirname, "../website/hangman.html"))
})

//routes to handle user
app.post("/user/verify-credentials", user.verify_user_and_email, async (req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    if(statusCode == 409)
        res.status(409).send(msg)
    else {
        const data = msg.message
        msg.message = "Verification email has been sent."
        sendVerificationEmail(data).then(msgID => {
            res.status(statusCode).send(msg)
        }).catch(error => {
            msg.status = "error"
            msg.message = "Can't send verification email."
            res.status(500).send(msg)
        })
    }
})
app.get("/user/create-user", user.create_user,(req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    res.status(statusCode).send(msg)
})
app.post("/user/auth", user.log_user, (req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    res.status(statusCode).send(msg)
})
app.post("/user/delete-user", user.delete_user, (req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    res.status(statusCode).send(msg)
})
app.post("/user/get-user-details", user.get_user_details, (req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    res.status(statusCode).send(msg)
})


//routes to handle hangman qns queries
app.post("/hangman/get-qns", qns.getQNS, async (req, res) => {
    const {msg} = req.body
    const statusCode = msg.code
    delete msg.code
    res.status(statusCode).send(msg)
})



app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${process.env.PORT}`)
})