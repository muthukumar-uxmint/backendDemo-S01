var express = require('express');
var router = express.Router();
var sequelize = require('../utils/db.utils');

router.get('/students' , async (req, res, next)=>{
    try{

        // First method
        // const query = `SELECT * FROM students WHERE student_id = ${2};`;
        
        // Second method
        // const query = `SELECT * FROM students WHERE student_id = :id;`;

        // const result = await sequelize.query(query , {
        //     replacements : {
        //         id : 1
        //     }
        // });

        // Third method
        const query = `SELECT * FROM students WHERE student_id = $1 AND age < $2;`;

        const result = await sequelize.query(query , {
            bind: [ 3 , 30]
        });


        res.json({data : result[0]});

    }catch(e){
        next(e);
    }
});

module.exports = router;