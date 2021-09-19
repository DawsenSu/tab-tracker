const fs = require('fs')
const util = require('util')
const multer = require('multer')

const maxSize = 10 * 1024 * 1024
const baseUrl = "http://localhost:8081/files/"
const directoryPath = __dirname + "/../assets/"

//#region download file
const getListFiles = (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    if(err){
      res.status(500).send({
        message: "unable to scan files!",
      })
    }

    let fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      })
    })

    res.status(200).send(fileInfos)
  })
}


const download = (req, res) => {
  const fileName = req.params.name
  res.download(directoryPath + fileName, fileName, (err)=>{
    if(err){
      res.status(500).send({
        message: "Could not download the file" + err,
      })
    }
  })
}
//#endregion

//#region upload file
let storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, directoryPath)
  },
  filename: (req, file, cb) =>{
    console.log(file.originalname)
    cb(null,file.originalname)
  }
})


let uploadFile = multer({
  storage: storage,
  limits: {fileSize: maxSize}
}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)

const upload = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.fileName,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file}. ${err}`,
    });
  }
};
//#endregion

const getStatus = (req, res) => {
  res.send({
    message: 'Hello world!'
  })
}



// download_file : function (url)  {
//   // eslint-disable-next-line no-unused-vars
//   return new Promise((resolve, _) => {
//     let file = fs.createWriteStream('../assets/Questions.pdf');
//     http.get(url,function(response) {
//       response.on('data',function(chunk) {
//         file.write(chunk)
//       })
//       response.on('end', function () {
//         console.log('download file completed')
//         resolve('File download completed')
//       })
//     })
//   })
// }

module.exports = {
  getListFiles,
  download,
  getStatus,
  upload
}