const express = require('express');
const multer = require('multer');
const morganBody = require("morgan-body");
const bodyParser = require("body-parser");


var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, __dirname + '/public/uploads/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.substring(file.mimetype.indexOf("/")+1)}`)
    }
});
   
var upload = multer({ storage: storage });

// const upload = multer({dest: __dirname + '/public/uploads/images'});

const app = express();
app.use(bodyParser.json());
 
// hook morganBody to express app
morganBody(app)
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log("req", req.file);
    if(req.file) {
        res.json(
            {
                ...req.file, 
                friendlyUrl: `/uploads/images/${req.file.filename}`
            }
        );
    }
    else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});