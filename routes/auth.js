var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var sequelize = require('../utils/db.utils');
var jwt = require('jsonwebtoken');
var authenticateJWT = require('../middleware/authMiddleware');

const SECRET = 'JULY932032';

// AUTHENTICATION 

router.post('/register' , async (req, res, next)=>{
    try{
        const { id, username , password } = req.body;

        const hashedPassword = await bcrypt.hash(password , 10);

        await sequelize.query(
        `INSERT INTO users VALUES (:id , :username , :password_hash)`,
        {
            replacements:{
                id:id,
                username:username,
                password_hash:hashedPassword
            }
        }
        );

        res.json({success:true});
    }catch(e){
        next(e);
    }
});

// router.post('/login' , async(req, res, next)=>{
//     try{
//         const { username , password } = req.body;

//         const result = await sequelize.query(
//             'SELECT * FROM users WHERE username = :username',
//         {
//             replacements:{
//                 username:username
//             }
//         }
//         );

//         const user = result[0][0];

//         const compareResult = await bcrypt.compare(password , user.password_hash);

//         if(compareResult){
//             res.json({
//                 success:true , 
//                 message:"Login successful"
//             });
//         }else{
//             res.json({
//                 success:false , 
//                 message:"Login Failed"
//             })
//         }

//     }catch(e){
//         next(e);
//     }
// });


router.post('/login' , async(req, res, next)=>{
    try{
        const { username , password } = req.body;

        const result = await sequelize.query(
            'SELECT * FROM users WHERE username = :username',
        {
            replacements:{
                username:username
            }
        }
        );

        const user = result[0][0];

        const compareResult = await bcrypt.compare(password , user.password_hash);

        if(compareResult){

            const token = jwt.sign( { userId: user.id } , SECRET , { expiresIn : '8h' });

            res.json({
                success:true , 
                message:"Login successful",
                token: token
            });
        }else{
            res.json({
                success:false , 
                message:"Login Failed"
            })
        }

    }catch(e){
        next(e);
    }
});

// AUTHORIZATION - middleware

router.get('/courses' , authenticateJWT , (req ,res , next)=>{
    try{
        res.json({success:true , result: req.user });
    }catch(e){
        next(e);
    }
});


module.exports = router;