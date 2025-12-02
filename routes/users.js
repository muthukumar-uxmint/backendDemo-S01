var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login' , function(req, res, next) {
  // const data = req.body;

  // const username = req.body.username;
  // const password = req.body.password;

  try{

    const { username , password } = req.body;
  
    if(username == 'cherlin' && password == 'admin123'){
      res.json({success:true , message:"Login Successful"});
    }else{
      res.json({success:false , message:"Login Failed"});
    }
  }catch(e){
    res.json({success:false , message:"Login Failed! DB error"});
  }


});


module.exports = router;
