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

router.post('/students' , async (req , res ,next)=>{
    try{

        const { student_id , student_name , student_age } = req.body;
        const query = `
            INSERT INTO students VALUES ( $1 , $2 , $3) RETURNING student_name;
        `;

        const result = await sequelize.query(query , {
            bind:[student_id , student_name , student_age]
        });

        console.log(result[0]);

        res.json({ success:true , result});

    }catch(e){
        console.log(e);
        next(e);
    }
});

router.put('/students' , async (req , res ,next)=>{
    try{

        const { student_id , student_name } = req.body;
        const query = `
            UPDATE students SET student_name = :student_name WHERE student_id = :student_id RETURNING *;
        `;

        const result = await sequelize.query(query , {
            replacements : {
                student_id : student_id,
                student_name : student_name
            }
        });

        console.log(result[0]);

        res.json({ success:true , result});

    }catch(e){
        console.log(e);
        next(e);
    }
});

router.delete('/students' , async (req , res ,next)=>{
    try{

        const { student_id  } = req.body;
        const query = `
            DELETE FROM students WHERE student_id = :student_id RETURNING *;
        `;

        const result = await sequelize.query(query , {
            replacements : {
                student_id : student_id
            }
        });

        console.log(result[0]);

        res.json({ success:true , result});

    }catch(e){
        console.log(e);
        next(e);
    }
});



module.exports = router;