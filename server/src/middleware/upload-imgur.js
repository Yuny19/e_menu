const multer = require('multer');
const FormData = require('form-data');
const imgur = require('imgur');

// // Setting
imgur.setClientId(process.env.CLIENTID_IMGUR);
// imgur.setAPIUrl(process.env.ENDPOINT_IMGUR);
// // Getting
// imgur.getClientId();
// imgur.getAPIUrl();

// const instance = axios.create({
//   baseURL: process.env.ENDPOINT_IMGUR,
//   // timeout: 1000,
//   headers: { Authorization: `Client-ID ${process.env.CLIENTID_IMGUR}`}
// });

function uploaded(req, res, next) {
  var storage = multer.memoryStorage()
  var upload = multer({
    storage: storage
  });
  const uploadImage = upload.single('link');

  uploadImage(req, res, function (err) {
    if (req.file != null || req.file != undefined) {
      if (err) {
        // console.log(err);
        return res.end('error: ', err);
      }
      else {
        // let fd = new FormData();
        // let stream = req.file.buffer.toString('base64');
        // fd.append('image', stream);

        //axios
        // instance.post('/upload', fd)
        //   .then((data) => {
        //     console.log('data');
        //     // next();
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   })

        // req.files.forEach(function (item) {
        //   img = item;
        //   // console.log(item);
        // });
        // console.log(req.file);

        imgur
          .uploadBase64(req.file.buffer.toString('base64'))
          .then(function (json) {
            // console.log(json.data.link);
            req.body.link = json.data.link;
            next();
          })
          .catch(function (err) {
            console.error(err.message);
          });

      };
    } else {
      next();
    }

  })
}
module.exports = uploaded;