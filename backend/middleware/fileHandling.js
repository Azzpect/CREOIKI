const fs = require("fs")
const path = require("path")


async function read_file(fileLoc) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, fileLoc), (err, data) => {
            if(err) {
                reject(new Error(JSON.stringify({status: "error", code: 500, message: "Sorry! Some internal error occurred", err: err})))
            }
            try {
                data = JSON.parse(data)
                resolve({status: "success", code: 200, fileData: data})
            }
            catch(err) {
                reject(new Error(JSON.stringify({status: "error", code: 500, message: "Sorry! Some internal error occurred", err: err})))
            }
        })
    })
}
async function write_file(fileLoc, newData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, fileLoc), newData, err => {
            if(err) {
                reject(new Error(JSON.stringify({status: "error", code: 500, message: "Sorry! Some internal error occurred", err: err})))
            }
            resolve({status: "success", code: 201})
        })
    })
}

module.exports = {read_file, write_file}