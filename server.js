const express = require('express'); 
const multer = require('multer'); 
const cors = require('cors'); 
const path = require('path');
const upload = multer({ dest: 'uploads/' })

//Initialize Express App 
const app = express(); //app object conventionally denotes Express application

app.use(cors());

app.post('/upload', upload.single('myFile'), (req, res, next)=> {
    console.log(req.file);
    if(!req.file) {
        res.status(500);
        return next(err);
      }
      res.json({ fileUrl: `localhost:3000/expenses/${id}/` + req.file.filename });
})

//Set Storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename:function(req,file,callback){
        callback(null,file.fieldname + '-'+Date.now()+path.extname(file.originalname)); 
    }
})

//init upload - create upload instance and receive a single file
const uploadinit = multer({
    storage:storage,
    limits:{
        fileSize:100000
    },
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('myFile'); 


//check File Type
checkFileType=(file,cb)=>{
    //Allow ext 
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime 
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true); 
    }else{
        cb('Error: Images Only!')
    }
    
};

//public folder 
app.use(express.static('./public')); 

const port = 4000; 
app.listen(port,()=>console.log(`Server started on port ${port}`));
