describe('',function(){
    var main = require('../index');
    it('should return a string',function(){
        expect().toEqual();
    })

    it('should return an array with student information',function(){
        expect(main.getStuInfo(
            '张三,001,汉,2,Math:75,Chinese:95,English:80,program:80'
        )).toEqual(
            {
                name:'张三',
                stuNo:'001',
                nation:'汉',
                className:2,
                subject:{
                    Math:75,
                    Chinese:95,
                    English:80,
                    program:80
                }
            }
        )
    })
    it('should return an array with aveScore and totalScore of student',function(){
        
        var stuInfo = main.getStuInfo('李四,002,汉,2,Math:85,Chinese:80,English:70,program:90');
        var stuInfoAndScore = main.countStuScore(stuInfo);
        expect(stuInfoAndScore).toEqual(
            {
                name:'李四',
                stuNo:'002',
                nation:'汉',
                className:2,
                subject:{
                    Math:85,
                    Chinese:80,
                    English:70,
                    program:90
                },
                stuScore:{
                    totalScore:325,
                    aveScore:81.25
                }
            }
        );
        
    })
    it('should return an object that grouped by className ',function(){
        var stuInfo1 = main.getStuInfo('王五,003,汉,1,Math:75,Chinese:95,English:80,program:80');
        var stuInfo2 = main.getStuInfo('baobao,004,汉,2,Math:75,Chinese:95,English:80,program:80');
        var stuInfoAndScore1 = main.countStuScore(stuInfo1);
        var stuInfoAndScore2 = main.countStuScore(stuInfo2);
        main.stuArr = main.addStudent(stuInfoAndScore1);
        main.stuArr = main.addStudent(stuInfoAndScore2);
        expect(main.classGrouping()).toEqual(
            [{
                stuInfo:[
                    {   name:'王五',
                        stuNo:'003',
                        nation:'汉',
                        className:1,
                        subject:{
                            Math:75,
                            Chinese:95,
                            English:80,
                            program:80
                        },
                        stuScore:{
                            totalScore:330,
                            aveScore:82.5
                        }
                }],
                classAveScore:0,
                classNum:1
            },
                {
                    stuInfo:[
                        {   name:'baobao',
                            stuNo:'004',
                            nation:'汉',
                            className:2,
                            subject:{
                                Math:75,
                                Chinese:95,
                                English:80,
                                program:80
                            },
                            stuScore:{
                                totalScore:330,
                                aveScore:82.5
                            }
                        }],
                    classAveScore:0,
                    classNum:2
                },
            ]
        );
    })
    it('should return an array that included diffenect class witch have counted',function(){
        var expected =
            [{
                stuInfo:[
                    {   name:'王五',
                        stuNo:'003',
                        nation:'汉',
                        className:1,
                        subject:{
                            Math:75,
                            Chinese:95,
                            English:80,
                            program:80
                        },
                        stuScore:{
                            totalScore:330,
                            aveScore:82.5
                        }
                    }],
                classAveScore:330,
                classNum:1,
                classMiddleScore:330
            },
                {
                    stuInfo:[
                        {   name:'baobao',
                            stuNo:'004',
                            nation:'汉',
                            className:2,
                            subject:{
                                Math:75,
                                Chinese:95,
                                English:80,
                                program:80
                            },
                            stuScore:{
                                totalScore:330,
                                aveScore:82.5
                            }
                        }],
                    classAveScore:330,
                    classNum:2,
                    classMiddleScore:330
                },
            ]
        expect(main.calculateClass(main.classArr)).toEqual(expected)
    })
    it('should return an array with student number',function(){
        expect(main.getStuNum('1,2,3,4,5')).toEqual(['1','2','3','4','5']);
    })
    it('should return an array that included the students class information',function(){
        var stu = main.getStuNum('003');
        var expected = 
                [
                    {
                        stuInfo:
                            [{   name:'王五',
                                stuNo:'003',
                                nation:'汉',
                                className:1,
                                subject:{
                                    Math:75,
                                    Chinese:95,
                                    English:80,
                                    program:80
                                },
                                stuScore:{
                                    totalScore:330,
                                    aveScore:82.5
                                }
                            }]
                            ,
                        classAveScore:330,
                        classMiddleScore:330,
                        classNum:1
                    }
                ];
        expect(main.getStuClassInfo(stu)).toEqual(expected);
    });
    it('should return a string witch has the student info and class info that inputed',function(){
        var stu = main.getStuNum('003');
        var inputArr = main.getStuClassInfo(stu);
        expect(main.toPrintString(inputArr)).toEqual(
            '\n成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n============================\n'+
            '王五|75|95|80|80|82.5|330'+
            '\n'+'============================'+'\n'+
            '全班平均分为：330'+'\n'+
            '全班中位分为：330'+'\n'
        );
    })
})