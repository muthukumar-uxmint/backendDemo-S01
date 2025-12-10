var express = require('express');
var jwt = require('jsonwebtoken');

const SECRET = 'JULY932032';

function authenticateJWT(req , res, next){
    // header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzY0ODM5OTQwLCJleHAiOjE3NjQ4NDE3NDB9.lZo9khHIzMFxChnRZCi30c8KVVfMPZWH4h331mkdgUM'
    
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);

    if(!token){
        res.status(404).json({message:"Token not found"});
    }
    else{

        jwt.verify(token , SECRET , (err , user)=>{
            if(err){
                res.status(401).json({message:err.message});
            }else{
                req.user = user;
                next();
            }
        });
    }

}

function authenticateRole(req , res, next){
    // header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzY0ODM5OTQwLCJleHAiOjE3NjQ4NDE3NDB9.lZo9khHIzMFxChnRZCi30c8KVVfMPZWH4h331mkdgUM'
    
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);

    if(!token){
        res.status(404).json({message:"Token not found"});
    }
    else{

        jwt.verify(token , SECRET , (err , user)=>{
            if(err){
                res.status(401).json({message:err.message});
            }else{
                req.user = user;
                if(user.role == 'admin'){
                    next();
                }else{
                    res.status(401).json({message:"You are not authorized"});
                }
            }
        });
    }

}

module.exports = {authenticateJWT , authenticateRole};