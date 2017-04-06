/**
 * Created by zjy on 17-4-6.
 */
var express = require('express');
let app = express();
app.use(express.static(__dirname + '/public'));

//指定模板引擎
app.set("view engine", 'ejs');
app.set('views','./views');

app.use('/',require('./routers/main'));
//利用模板文件home.ejs渲染为html

app.listen(3006,function(){
    console.log('running on port 3002');
})