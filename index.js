var readline = require('readline');

var r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const MAIN_INFO = '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1～3）\n';
const ADD_STUDENT = '请输入学生信息(格式：姓名，学号，名族，班级，学科：成绩，...)';
const INPUT_STUDENT_NUM = '请输入要打印的学生的学号（格式：学号，学号,...）';
const CHOOSE_FIRST = 'CHOOSE_FIRST';
const CHOOSE_SECOND = 'CHOOSE_SECOND';
const CHOOSE_THIRD = 'CHOOSE_THIRD';

let inputChoose = CHOOSE_FIRST;
var stuArr = [];
var classArr = [];



function main() {
    entry(MAIN_INFO);
}
main();

function entry(str) {
    r1.question(str, function (answer) {
        if (answer == 1) {
            inputChoose = CHOOSE_FIRST;
            statusOperate(inputChoose);
        }
        if (answer == 2) {
            inputChoose = CHOOSE_SECOND;
            statusOperate(inputChoose);
        }
        if (answer == 3) {
            inputChoose = CHOOSE_THIRD;
            statusOperate(inputChoose);
        }
        if (answer == 'w') {
            entry(MAIN_INFO);
        }
    })
}
function statusOperate(inputChoose) {
    if (inputChoose === CHOOSE_FIRST) {
        r1.question(ADD_STUDENT, function (answer) {
            addStudentsInfo(answer);
            entry(MAIN_INFO);
        });
    }
    if (inputChoose === CHOOSE_SECOND) {
        r1.question(INPUT_STUDENT_NUM, function (answer) {
            printStudentsInfo(answer);
            entry(MAIN_INFO);
        });
    }
    if (inputChoose === CHOOSE_THIRD) {
        r1.close();
    }
}


function addStudentsInfo(stuInfoStr){
    var stu = getStuInfo(stuInfoStr);
    var countScore = countStuScore(stu);
    addStudent(countScore);
    classGrouping();
    calculateClass();
}

function printStudentsInfo(stuNumStr){
    var stuNum = getStuNum(stuNumStr);
    var classInfo = getStuClassInfo(stuNum);
    toPrintString(classInfo);
}




function addStudent(stu) {
    stuArr.push(stu);
    // return stuArr;
}

function getStuInfo(str) {
    var inputInfo = str.split(',');
    let [name,stuNo,nation,className,Math,Chinese,English,program] = [inputInfo[0],inputInfo[1],inputInfo[2],Number(inputInfo[3])
    ,Number(inputInfo[4].split(':')[1]),Number(inputInfo[5].split(':')[1]),Number(inputInfo[6].split(':')[1]),Number(inputInfo[7].split(':')[1])];
    // var stu = {
    //     name: inputInfo[0],
    //     stuNo: inputInfo[1],
    //     nation: inputInfo[2],
    //     className: Number(inputInfo[3]),
    //     subject: {
    //         Math: Number(inputInfo[4].split(':')[1]),
    //         Chinese: Number(inputInfo[5].split(':')[1]),
    //         English: Number(inputInfo[6].split(':')[1]),
    //         program: Number(inputInfo[7].split(':')[1])
    //     }
    // }
    var stu = {
      name,stuNo,nation,className,
        subject:{
          Math,Chinese,English,program
        }
    };
    return stu;
}
function countStuScore(stuInfo) {
    stuInfo.stuScore = {};
    stuInfo.stuScore.totalScore = (stuInfo.subject.Math + stuInfo.subject.Chinese + stuInfo.subject.English + stuInfo.subject.program);
    stuInfo.stuScore.aveScore = stuInfo.stuScore.totalScore / 4;
    return stuInfo;
}

function classGrouping() {
    stuArr.forEach(function (sVal) {
        var ifStu = false;
        classArr.forEach(function (cVal) {
            if (sVal.className === cVal.classNum) {
                ifStu = true;
                if (cVal.stuInfo.indexOf(sVal) === -1) {
                    cVal.stuInfo.push(sVal);
                }
            }
            else {
                ifStu = false;
            }
        });
        if (!ifStu) {
            classArr.push({
                stuInfo: [sVal],
                classAveScore: 0,
                classNum: sVal.className
            })
        }
    });
    return classArr;
}
function calculateClass() {
    var totalScores = [];
    var total = 0;
    classArr.forEach(function (val) {
        val.stuInfo.forEach(function (sVal) {
            total += sVal.stuScore.totalScore;
            totalScores.push(sVal.stuScore.totalScore);
            totalScores.sort(function (a, b) {
                return a - b
            });
            val.classAveScore = total / totalScores.length;
            val.classMiddleScore = totalScores[Math.floor(totalScores.length / 2)];
        });
    })
    return classArr;
}
function getStuNum(numStr) {
    return numStr.split(',');
}
function getStuClassInfo(stuNumArr) {
    var stuInfo = [];
    stuNumArr.forEach(function (nVal) {
        classArr.forEach(function (val) {
            val.stuInfo.forEach(function (sVal) {
                if (nVal === sVal.stuNo) {
                    stuInfo.push(val);
                }
            })
        })
    })
    return stuInfo;
}
function toPrintString(inputStuArr) {
    var str = '';
    inputStuArr.forEach(function (val) {
        str = '\n成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n============================\n';
        val.stuInfo.forEach(function (stuVal) {
            str += stuVal.name + '|' + stuVal.subject.Math + '|' + stuVal.subject.Chinese + '|' +
                stuVal.subject.English + '|' + stuVal.subject.program + '|' + stuVal.stuScore.aveScore + '|' + stuVal.stuScore.totalScore + '\n';
        });
        str += '============================\n' +
            '全班平均分为：' + val.classAveScore + '\n' +
            '全班中位分为：' + val.classMiddleScore + '\n';
        console.log(str);
    });
    return str;
}
module.exports = {
    stuArr,
    classArr,
    getStuInfo,
    countStuScore,
    addStudent,
    classGrouping,
    calculateClass,
    getStuNum,
    getStuClassInfo,
    toPrintString
};



