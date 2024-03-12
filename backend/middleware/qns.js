const fh = require("./fileHandling")




async function getQNS(req, res, next) {
    const {index} = req.body
    try {
        const qns = await fh.read_file(process.env.QNSFILENAME)
        q = qns.fileData.data[index]
        delete qns.fileData
        qns["qns"] = q
        req.body.msg = qns
    }
    catch(err) {
        req.body.msg = JSON.parse(err.message)
    }
    next()
}


async function getQNSArray() {
    const qns = await fh.read_file(process.env.QNSFILENAME)
    let array = [...qns.fileData.data.keys()]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i

        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {getQNS, getQNSArray}