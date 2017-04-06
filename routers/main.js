var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){

    res.render('main',{
        // userInfo:req.userInfo
    });
});

router.get('/addStudent',function(req,res,next){

    res.render('addStudent',{
        // userInfo:req.userInfo
    });
});

router.get('/selectStudents',function(req,res,next){

    res.render('selectStudents',{
        // userInfo:req.userInfo
    });
});



module.exports = router;