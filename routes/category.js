var express = require('express');
var router = express.Router();

var categories = [
        'Groceries',
        'Appliances' ,
        'Hardwares'
    ];

router.get('/list' , function(req , res , next){

    
    res.json({
        success:true,
        categories:categories
    });
});

router.get('/list/:id' , function(req , res , next){

    const id = req.params.id;
    
    res.json({
        success:true,
        categories:categories[id]
    });
});

router.post('/list' , function(req, res, next){
    

});

router.put('/list/:id' , function(req , res , next){

    const id = req.params.id;

    const value = req.body.value;

    categories[id] = value;

    res.json({
        updatedCategories:categories
    });
});

router.delete('/list/:id' , function(req, res, next){

    const id = req.params.id;

    categories.pop(categories[id]);

    res.json({
        updatedCategories:categories
    })
});

module.exports = router;