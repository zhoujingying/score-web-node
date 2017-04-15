var express = require('express');
var router = express.Router();

var Server = require('../index');


var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    }
    next();
})


router.get('/',function(req,res){

    res.render('main',{});
});

router.get('/addStudent',function(req,res){

    res.render('addStudent',{});
});

router.get('/selectStudents',function(req,res){
    // res.send({
    //     stuInfo:Server.classArr
    // });
    res.render('selectStudents',{
        stuInfo:Server.classArr
    });
    console.log(Server.classArr);

});

router.post('/addStudent',function (req,res) {
    var student = req.body;
    Server.addStudentsInfo(student);
    responseData.code = 0;
    responseData.message = '添加成功';
    res.json(responseData);
})

router.post('/selectStudents',function (req,res) {

    var number = req.body.stuNum;
    var stuInfo = Server.printStudentsInfo(number);
    res.send({
        stuInfo:stuInfo
    });
})

module.exports = router;