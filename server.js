/* =================================================== */
/* ===== Section 1: Require all the dependencies ===== */
/* =================================================== */

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/'});
const hbs = require('hbs');
const logger = require('morgan');
let fs = require('fs');
// Define port for app to listen on
const port =  process.env.PORT || 8080;

/* ==================================================== */
/* ===== Section 2: Configure express middlewares ===== */
/* ==================================================== */

const app =  express();
app.use(bodyParser());  // to use bodyParser (for text/number data transfer between clientg and server)
app.set('view engine', 'hbs');  // setting hbs as the view engine
app.use(express.static(__dirname + '/public'));  // making ./public as the static directory
app.set('views', __dirname + '/views');  // making ./views as the views directory
app.use(logger('dev'));  // Creating a logger (using morgan)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* ==================================== */
/* ===== Section 3: Making Routes ===== */
/* ==================================== */

// GET / route for serving index.html file
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// To make the server live
app.listen(port, () => {
    console.log(`App is live on port ${port}`);
});


var mkdirp = require('mkdirp');

var getDirName = require('path').dirname;


//moves the $file to $dir2
var moveFile = (file, dir2)=>{
  //include the fs, path modules
  var fs = require('fs');
  var path = require('path');

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};


// POST /upload for single file upload
/* ===== Make sure that file name matches the name attribute in your html ===== */
app.post('/upload', upload.single('myFile'), (req, res) => {



if (req.file) {
        var filename = req.file.originalname ;
        console.log(req.body);
        var group_id = req.body.group_id;
        var asu_id = req.body.id;
        var dir = './'+group_id+'/'+asu_id + '/';
        var path = './uploads/'+filename;

        fs.mkdir(dir,{recursive: true}, err => {
               if (err) throw err;
                moveFile(path, dir);
            });

        var uploadStatus = 'File Uploaded Successfully';
        res.status(200).json({ fileStatus: filename });
        
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
        res.status(202).json({ fileStatus: filename });
    }
 
});
