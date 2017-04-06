
var stuArr = [];
var classArr = [];

function addStudentsInfo(stuInfoStr){
    var stu = getStuInfo(stuInfoStr);
    var countScore = countStuScore(stu);
    addStudent(countScore);
    classGrouping();
    calculateClass();
}

function printStudentsInfo(stuNumStr){
    var stuNum = getStuNum(stuNumStr);
    return getStuClassInfo(stuNum);
    // return toPrintString(classInfo);
}

function addStudent(stu) {
    stuArr.push(stu);
    // return stuArr;
}

function getStuInfo(str) {
    var inputInfo = str.split(',');
    let [name,stuNo,nation,className,Math,Chinese,English,program] = [inputInfo[0],inputInfo[1],inputInfo[2],Number(inputInfo[3])
    ,Number(inputInfo[4].split(':')[1]),Number(inputInfo[5].split(':')[1]),Number(inputInfo[6].split(':')[1]),Number(inputInfo[7].split(':')[1])];
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
    toPrintString,
    addStudentsInfo,
    printStudentsInfo
};



