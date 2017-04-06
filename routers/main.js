var express = require('express');
var router = express.Router();

var Student = require('../index');


// var responseData;
// router.use(function(req,res,next){
//     responseData = {
//         code:0,
//         message:''
//     }
//     next();
// })


router.get('/',function(req,res){

    res.render('main',{});
});

router.get('/addStudent',function(req,res){

    res.render('addStudent',{});
});

router.get('/selectStudents',function(req,res){

    res.render('selectStudents',{});
});

router.post('/addStudent/add',function (req,res) {
    var student = req.body.stu;
    Student.addStudentsInfo(student);
    // responseData.code = 0;
    // responseData.message = '添加成功';
    // res.json(responseData);
    res.render('main',{});
    // return;
})

module.exports = router;