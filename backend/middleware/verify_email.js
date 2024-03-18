const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { OAuth2Client } = require("google-auth-library")



async function sendVerificationEmail(data) {
  const encryptedData = encryptData(JSON.stringify(data))
  const EMAIL = process.env.EMAIL
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN

  const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const ACCESS_TOKEN = oAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN
    }
  })

  const mailOptions = {
    from: `CREOIKI User Verification ${EMAIL}`,
    to: data.uemail,
    subject: "Verify email account",
    text: "hello world!",
    html: `<h1>Verify your email account for creating account in CREOIKI.</h1>
    <a href="http://127.0.0.1:8800/user/create-user?iv=${encryptedData.iv}&data=${encryptedData.encryptedData}"><button>Click to Verify</button></a>`
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
}

//encryption decryption function
function encryptData(data) {
  const key = process.env.ENCRYPTION_KEY
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decryptData(encryptedData, iv) {
  const key = process.env.ENCRYPTION_KEY
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {sendVerificationEmail, decryptData}