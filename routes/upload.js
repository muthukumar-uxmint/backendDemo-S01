var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var upload = multer({
    storage : multer.diskStorage({
        destination:(req, file , cb)=>{
            cb(null , 'uploads/');
        },
        filename:(req, file, cb)=>{
            cb(null , file.originalname);
        }
    })
});

router.post('/' , upload.single("file"), (req , res, next)=>{

   res.json({
    success:true,
    data:req.file
   });

});

router.post('/multiple' , upload.array("files" , 2), (req , res, next)=>{

   res.json({
    success:true,
    data:req.files
   });

});

module.exports = router;