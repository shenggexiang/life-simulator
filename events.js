// 人生阶段定义
const LIFE_PHASES = [
    { name: '婴儿期', age: [0, 2], icon: '👶' },
    { name: '幼儿期', age: [3, 5], icon: '🧒' },
    { name: '童年期', age: [6, 11], icon: '🎒' },
    { name: '青春期', age: [12, 15], icon: '🧑' },
    { name: '高中期', age: [16, 18], icon: '📚' },
    { name: '青年期', age: [19, 25], icon: '👨' },
    { name: '壮年期', age: [26, 35], icon: '💼' },
    { name: '中年期', age: [36, 55], icon: '🏠' },
    { name: '中老年', age: [56, 65], icon: '🌴' },
    { name: '老年期', age: [66, 80], icon: '👴' },
    { name: '高龄期', age: [81, 100], icon: '🙏' }
];

// 每个阶段的事件池（数值调整：正面+3~+8，负面-3~-8，很难拉满）
const EVENTS = {
    // ===== 婴儿期 (0-2岁) =====
    baby: [
        { text: '你出生了，哭声嘹亮', icon: '👶', results: [
            { effects: { health: 3, mood: 3 }, result: '医生说你很健康，全家都很开心！' },
            { effects: { health: -2, mood: 2 }, result: '你有点体弱，需要多照顾。' }
        ]},
        { text: '妈妈给你喂母乳', icon: '🍼', results: [
            { effects: { health: 2, mood: 1 }, result: '你吃得饱饱的，长得很快。' }
        ]},
        { text: '你学会翻身了', icon: '🔄', results: [
            { effects: { health: 2 }, result: '你的身体越来越灵活了。' },
            { effects: { health: -2 }, result: '不小心从床上滚下来了，哇哇大哭。' }
        ]},
        { text: '你第一次叫"妈妈"', icon: '🗣️', results: [
            { effects: { mood: 5, charm: 2 }, result: '妈妈激动得录了视频发朋友圈！' }
        ]},
        { text: '爷爷奶奶来看你', icon: '👴', results: [
            { effects: { mood: 3, wealth: 2 }, result: '爷爷奶奶给了你一个大红包！' }
        ]},
        { text: '你学会走路了', icon: '🚶', results: [
            { effects: { health: 3, mood: 3 }, result: '你摇摇晃晃地迈出了第一步！' }
        ]}
    ],

    // ===== 幼儿期 (3-5岁) =====
    toddler: [
        { text: '你上幼儿园了', icon: '🏫', results: [
            { effects: { charm: 5, mood: 3 }, result: '你交到了好朋友，每天都想去上学。' },
            { effects: { mood: -2, charm: 3 }, result: '你哭了三天才适应，但后来很开心。' }
        ]},
        { text: '幼儿园有才艺表演', icon: '🎭', results: [
            { effects: { charm: 6, mood: 3 }, result: '你勇敢上台背了首古诗，全家人都来拍照！' },
            { effects: { mood: -2 }, result: '你有点害羞，躲在老师身后不肯上台。' }
        ]},
        { text: '妈妈给你报了兴趣班', icon: '🎨', results: [
            { effects: { intelligence: 3, mood: -2 }, result: '你学了画画，虽然不太喜欢但坚持下来了。' },
            { effects: { intelligence: 2, mood: 2 }, result: '你学了跳舞，觉得很好玩！' }
        ]},
        { text: '你和小朋友抢玩具', icon: '😤', results: [
            { effects: { charm: 3 }, result: '你学会了分享，和小朋友和好了。' },
            { effects: { mood: -3 }, result: '你被妈妈批评了，有点委屈。' }
        ]},
        { text: '你过生日了', icon: '🎂', results: [
            { effects: { mood: 5, wealth: 2 }, result: '收到了好多礼物，还吃了大蛋糕！' }
        ]},
        { text: '爸爸带你去游乐场', icon: '🎡', results: [
            { effects: { mood: 5, health: 2 }, result: '你玩了旋转木马和碰碰车，开心极了！' }
        ]}
    ],

    // ===== 童年期 (6-11岁) =====
    childhood: [
        { text: '你上小学了', icon: '🎒', results: [
            { effects: { intelligence: 5, mood: 2 }, result: '你很喜欢学习，第一次考试就拿了双百！' },
            { effects: { charm: 5, mood: 3 }, result: '你成了班里的开心果，人缘特别好。' }
        ]},
        { text: '期中考试成绩出来了', icon: '📝', results: [
            { effects: { intelligence: 5 }, result: '你考了班级前三名，妈妈奖励了你！' },
            { effects: { intelligence: 2, mood: 2 }, result: '成绩中等，但老师说你很努力。' },
            { effects: { mood: -4 }, result: '数学没考好，被妈妈念叨了一晚上。' }
        ]},
        { text: '你被选为班干部', icon: '⭐', results: [
            { effects: { charm: 6, intelligence: 2 }, result: '你当上了班长，责任感变强了！' },
            { effects: { charm: 3 }, result: '你当上了小组长，觉得很有面子。' }
        ]},
        { text: '你被同学欺负了', icon: '😢', results: [
            { effects: { mood: -4, intelligence: 2 }, result: '你告诉了老师，问题解决了。' },
            { effects: { charm: 3 }, result: '你勇敢地站出来反抗，再也没人敢欺负你。' }
        ]},
        { text: '妈妈给你报了补习班', icon: '📚', results: [
            { effects: { intelligence: 4, mood: -3 }, result: '虽然很累，但成绩确实提高了。' },
            { effects: { intelligence: 3, health: -2 }, result: '周末都要上课，你有点不开心。' }
        ]},
        { text: '暑假到了', icon: '☀️', results: [
            { effects: { health: 3, mood: 5 }, result: '你和小伙伴天天在外面疯玩！' },
            { effects: { wealth: 2, mood: 3 }, result: '爸妈带你去旅游了，看到了大海！' }
        ]},
        { text: '你迷上了看课外书', icon: '📖', results: [
            { effects: { intelligence: 4, mood: 2 }, result: '你爱上了阅读，知识面变广了。' }
        ]},
        { text: '你参加了学校运动会', icon: '🏃', results: [
            { effects: { health: 4, mood: 3 }, result: '你获得了跑步比赛第二名！' }
        ]},
        { text: '你开始换牙了', icon: '🦷', results: [
            { effects: { health: 1 }, result: '牙齿掉了又长出来，你觉得自己长大了。' }
        ]},
        { text: '你学会了骑自行车', icon: '🚲', results: [
            { effects: { health: 3, mood: 3 }, result: '你终于学会了！摔了好几跤但很开心。' }
        ]}
    ],

    // ===== 青春期 (12-15岁) =====
    teenage: [
        { text: '你升入初中', icon: '📚', results: [
            { effects: { intelligence: 5 }, result: '你适应了新的学习节奏，成绩稳步提升。' },
            { effects: { mood: -3 }, result: '科目变多了，你有点跟不上。' }
        ]},
        { text: '你偷偷喜欢上了同桌', icon: '💕', results: [
            { effects: { mood: 6, charm: 3 }, result: '你们传纸条、一起回家，青涩又美好。' },
            { effects: { mood: 3 }, result: '你把这份喜欢藏在心里，默默努力。' },
            { effects: { mood: -3, intelligence: 2 }, result: '被班主任发现了，谈话后你决定专心学习。' }
        ]},
        { text: '你沉迷手机游戏了', icon: '🎮', results: [
            { effects: { intelligence: -4, health: -3, mood: 3 }, result: '成绩下滑了，妈妈把手机没收了。' },
            { effects: { intelligence: -2, mood: 2 }, result: '你学会了控制时间，只在周末玩。' }
        ]},
        { text: '你和父母吵架了', icon: '😤', results: [
            { effects: { mood: -5 }, result: '你觉得他们不理解你，摔门进了房间。' },
            { effects: { charm: 3 }, result: '你冷静下来后主动道歉，关系缓和了。' }
        ]},
        { text: '你参加了中考', icon: '📝', results: [
            { effects: { intelligence: 6, mood: -3 }, result: '你考上了重点高中！全家都很骄傲。' },
            { effects: { intelligence: 4 }, result: '你考上了一所普通高中。' },
            { effects: { intelligence: 2, mood: -2 }, result: '成绩不太理想，但你没有放弃。' }
        ]},
        { text: '你开始长青春痘了', icon: '😤', results: [
            { effects: { charm: -2, mood: -2 }, result: '你很在意形象，开始研究护肤。' }
        ]}
    ],

    // ===== 高中期 (16-18岁) =====
    senior_high: [
        { text: '你进入高中', icon: '🏫', results: [
            { effects: { intelligence: 4, health: -2 }, result: '高中学习压力很大，你每天学到很晚。' },
            { effects: { charm: 3, mood: 2 }, result: '你加入了学生会，认识了很多朋友。' }
        ]},
        { text: '你参加了高考', icon: '🎓', results: [
            { effects: { intelligence: 6, health: -3, mood: -3 }, result: '你考上了一本大学！全家放鞭炮庆祝。' },
            { effects: { intelligence: 4, mood: -2 }, result: '你考上了一所二本大学。' },
            { effects: { intelligence: 2 }, result: '你决定去学一门技术。' }
        ]},
        { text: '你参加了毕业典礼', icon: '🎉', results: [
            { effects: { mood: 5, charm: 3 }, result: '你和同学们抱头痛哭，约定以后常联系。' }
        ]},
        { text: '你第一次独自坐火车', icon: '🚂', results: [
            { effects: { intelligence: 2, mood: 3 }, result: '你觉得自己长大了，很独立。' }
        ]},
        { text: '你暗恋了隔壁班的同学', icon: '💕', results: [
            { effects: { mood: 3 }, result: '你默默关注对方，高考后鼓起勇气表白了。' },
            { effects: { mood: -2, intelligence: 2 }, result: '你把这份心情化为学习动力。' }
        ]}
    ],

    // ===== 青年期 (19-25岁) =====
    young_adult: [
        { text: '你进入大学', icon: '🏛️', results: [
            { effects: { charm: 5, mood: 4 }, result: '军训时你认识了一群好兄弟！' },
            { effects: { intelligence: 5 }, result: '你第一次接触专业知识，觉得很有意思。' },
            { effects: { charm: 3, intelligence: 3 }, result: '你加入了社团，生活很充实。' }
        ]},
        { text: '大学恋爱了', icon: '❤️', results: [
            { effects: { mood: 6 }, result: '你们一起上课、吃饭、自习，很甜蜜。' },
            { effects: { mood: 3, intelligence: 3 }, result: '你选择专注学业，拿了奖学金。' }
        ]},
        { text: '你做了兼职', icon: '💼', results: [
            { effects: { wealth: 4, intelligence: 2 }, result: '你在奶茶店打工，赚到了第一桶金！' },
            { effects: { wealth: 3, charm: 2 }, result: '你做了家教，教小朋友很有成就感。' }
        ]},
        { text: '你失恋了', icon: '💔', results: [
            { effects: { mood: -6 }, result: '你伤心了很久，天天听伤感的歌。' },
            { effects: { mood: -3, intelligence: 3 }, result: '你把悲伤化为动力，成绩反而提高了。' }
        ]},
        { text: '你考了驾照', icon: '🚗', results: [
            { effects: { intelligence: 2, mood: 3 }, result: '科目二挂了两次，但终于拿到了！' }
        ]},
        { text: '大学毕业了', icon: '🎓', results: [
            { effects: { wealth: 5, intelligence: 3 }, result: '你找到了一份不错的工作，月薪5000。' },
            { effects: { intelligence: 5 }, result: '你选择考研，继续深造。' },
            { effects: { wealth: 4 }, result: '你决定创业，开了一家小店。' }
        ]},
        { text: '你开始租房住', icon: '🏠', results: [
            { effects: { wealth: -3, mood: 4 }, result: '你终于有了自己的小窝，虽然只有10平米。' },
            { effects: { wealth: 2 }, result: '你和同学合租，每人1500。' }
        ]},
        { text: '你被领导表扬了', icon: '⭐', results: [
            { effects: { wealth: 4, mood: 3 }, result: '你获得了季度优秀员工！' }
        ]},
        { text: '你加班到深夜', icon: '🌙', results: [
            { effects: { wealth: 3, health: -3 }, result: '996是常态，你有点疲惫。' },
            { effects: { mood: -2 }, result: '你开始思考工作的意义。' }
        ]},
        { text: '你回老家过年', icon: '🧧', results: [
            { effects: { mood: 4, wealth: -2 }, result: '给长辈包了红包，收了压岁钱。' },
            { effects: { mood: 2 }, result: '亲戚们问你工资多少、有没有对象。' }
        ]},
        { text: '你学会了做饭', icon: '🍳', results: [
            { effects: { health: 3, charm: 2 }, result: '你发现自己厨艺还不错！' }
        ]}
    ],

    // ===== 壮年期 (26-35岁) =====
    adult: [
        { text: '你跳槽了', icon: '💼', results: [
            { effects: { wealth: 5, mood: 3 }, result: '新公司工资涨了50%，你很开心！' },
            { effects: { wealth: 4, mood: -2 }, result: '工资涨了，但加班更多了。' }
        ]},
        { text: '你相亲了', icon: '💏', results: [
            { effects: { mood: 3, charm: 2 }, result: '对方条件不错，你们加了微信。' },
            { effects: { mood: -2 }, result: '没看对眼，各回各家。' }
        ]},
        { text: '你结婚了', icon: '💒', results: [
            { effects: { mood: 6, wealth: -5 }, result: '你们办了婚礼，亲朋好友都来祝福！' },
            { effects: { mood: 4, wealth: -3 }, result: '你们领了证，简单吃了顿饭。' }
        ]},
        { text: '你买了房子', icon: '🏡', results: [
            { effects: { wealth: -10, mood: 5 }, result: '你掏空了六个钱包，终于有了自己的房子。' },
            { effects: { wealth: -6, mood: 3 }, result: '你付了首付，开始了还贷生活。' },
            { effects: { mood: -3 }, result: '房价太高了，你决定继续租房。' }
        ]},
        { text: '你有了孩子', icon: '👶', results: [
            { effects: { mood: 6, wealth: -4 }, result: '你当爸爸/妈妈了！看着孩子觉得一切都值得。' },
            { effects: { mood: 4, wealth: -3 }, result: '孩子出生了，你开始学着换尿布。' }
        ]},
        { text: '你升职加薪了', icon: '💰', results: [
            { effects: { wealth: 5, mood: 3 }, result: '你成了部门主管！' },
            { effects: { wealth: 4, health: -2 }, result: '工资涨了，但责任也更重了。' }
        ]},
        { text: '你开始还房贷', icon: '🏦', results: [
            { effects: { wealth: -4, mood: -2 }, result: '每个月要还好几千，你开始省吃俭用。' }
        ]},
        { text: '你被裁员了', icon: '😢', results: [
            { effects: { wealth: -5, mood: -5 }, result: '公司裁员，你拿了赔偿金重新找工作。' },
            { effects: { wealth: -3, mood: -3 }, result: '你开始投简历，面试了好几家公司。' }
        ]},
        { text: '你开始健身了', icon: '💪', results: [
            { effects: { health: 4, mood: 3 }, result: '你办了健身卡，每周去三次。' }
        ]},
        { text: '你带孩子去打疫苗', icon: '🏥', results: [
            { effects: { health: 2, mood: -1 }, result: '孩子哭得稀里哗啦，你心疼极了。' }
        ]},
        { text: '你和伴侣吵架了', icon: '😤', results: [
            { effects: { mood: -5 }, result: '你们冷战了好几天。' },
            { effects: { mood: -2, charm: 2 }, result: '你们和好后感情更深了。' }
        ]}
    ],

    // ===== 中年期 (36-55岁) =====
    middle_age: [
        { text: '你遭遇中年危机', icon: '😔', results: [
            { effects: { mood: -3, intelligence: 3 }, result: '你开始反思人生，觉得时间过得太快了。' },
            { effects: { health: 3 }, result: '你开始注重养生，每天早起跑步。' }
        ]},
        { text: '孩子要上初中了', icon: '🎒', results: [
            { effects: { wealth: -4, intelligence: 3 }, result: '你花了三万块给孩子报了补习班。' },
            { effects: { wealth: -2 }, result: '你决定让孩子快乐成长，不报班。' }
        ]},
        { text: '父母生病住院了', icon: '🏥', results: [
            { effects: { wealth: -5, mood: -4 }, result: '你请假照顾父母，花了不少钱。' },
            { effects: { wealth: -3, mood: -3 }, result: '你请了护工，但还是很担心。' }
        ]},
        { text: '你被公司优化了', icon: '😢', results: [
            { effects: { wealth: -5, mood: -5 }, result: '35岁危机来了，你开始送外卖。' },
            { effects: { wealth: -3, mood: -3 }, result: '你拿了N+1赔偿，开始创业。' }
        ]},
        { text: '你考了职业证书', icon: '📜', results: [
            { effects: { intelligence: 4, wealth: 3 }, result: '你拿到了证书，竞争力提升了！' }
        ]},
        { text: '你开始投资理财', icon: '📈', results: [
            { effects: { wealth: 4 }, result: '你的基金赚了一些钱。' },
            { effects: { wealth: -4 }, result: '股市大跌，你亏了不少。' }
        ]},
        { text: '你送孩子出国留学', icon: '✈️', results: [
            { effects: { wealth: -6, mood: 3 }, result: '你卖了一套房供孩子出国。' },
            { effects: { wealth: -4 }, result: '你支持孩子的梦想。' }
        ]},
        { text: '你开始脱发了', icon: '😤', results: [
            { effects: { charm: -2, mood: -2 }, result: '你买了防脱洗发水，但没什么用。' }
        ]},
        { text: '你参加同学聚会', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 4, charm: 2 }, result: '你发现大家都老了，但情谊还在。' },
            { effects: { mood: 2 }, result: '你发现当年成绩差的同学现在混得最好。' }
        ]},
        { text: '你开始学炒股', icon: '📊', results: [
            { effects: { wealth: 3, intelligence: 2 }, result: '你赚了一笔小钱。' },
            { effects: { wealth: -3, mood: -2 }, result: '你被割韭菜了，亏了不少。' }
        ]}
    ],

    // ===== 中老年 (56-65岁) =====
    senior: [
        { text: '你退休了', icon: '🌴', results: [
            { effects: { mood: 5, wealth: 3 }, result: '你终于可以休息了，每天下棋钓鱼。' },
            { effects: { wealth: 4, health: -2 }, result: '你被返聘了，继续发光发热。' }
        ]},
        { text: '你当了爷爷/奶奶', icon: '👶', results: [
            { effects: { mood: 6 }, result: '你抱着孙子，觉得人生圆满了！' },
            { effects: { mood: 4 }, result: '你开始帮忙带孙子。' }
        ]},
        { text: '你开始跳广场舞', icon: '💃', results: [
            { effects: { health: 4, mood: 3, charm: 2 }, result: '你成了广场舞领队！' }
        ]},
        { text: '你体检发现了三高', icon: '💊', results: [
            { effects: { health: -3, wealth: -2 }, result: '医生让你少吃油腻，多运动。' },
            { effects: { health: -2 }, result: '你开始吃降压药。' }
        ]},
        { text: '你开始学智能手机', icon: '📱', results: [
            { effects: { intelligence: 3, mood: 2 }, result: '你学会了用微信视频聊天！' }
        ]},
        { text: '你去老年大学了', icon: '🎓', results: [
            { effects: { intelligence: 3, charm: 3 }, result: '你学了书法和摄影，生活丰富多彩。' }
        ]},
        { text: '你和老伴去旅游', icon: '✈️', results: [
            { effects: { mood: 5, wealth: -3 }, result: '你们去了三亚，看了大海！' }
        ]},
        { text: '你开始带孙子', icon: '👶', results: [
            { effects: { mood: 4, health: -2 }, result: '带孩子很累，但你很开心。' }
        ]}
    ],

    // ===== 老年期 (66-80岁) =====
    elderly: [
        { text: '你七十大寿', icon: '🎂', results: [
            { effects: { mood: 6 }, result: '全家四代同堂为你庆祝！' },
            { effects: { mood: 4 }, result: '儿女们给你买了新衣服。' }
        ]},
        { text: '老伴生病了', icon: '💑', results: [
            { effects: { mood: -4, wealth: -3 }, result: '你每天去医院照顾老伴。' },
            { effects: { mood: -3 }, result: '孩子们轮流照顾，你稍微放心了。' }
        ]},
        { text: '你开始写回忆录', icon: '📖', results: [
            { effects: { intelligence: 3, mood: 4 }, result: '你记录了自己的一生，很有成就感。' }
        ]},
        { text: '你学会了网购', icon: '🛒', results: [
            { effects: { mood: 3, wealth: -2 }, result: '你在网上买了很多东西，快递天天来。' }
        ]},
        { text: '你和老友通电话', icon: '📞', results: [
            { effects: { mood: 4 }, result: '你们聊了一个多小时，回忆了很多往事。' },
            { effects: { mood: 2 }, result: '你得知一位老友去世了，很难过。' }
        ]},
        { text: '你被授予社区荣誉', icon: '🏅', results: [
            { effects: { mood: 5, charm: 3 }, result: '你被评为优秀志愿者！' }
        ]}
    ],

    // ===== 高龄期 (81-100岁) =====
    very_old: [
        { text: '你迎来八十大寿', icon: '🎂', results: [
            { effects: { mood: 6 }, result: '五代同堂，全村人都来给你祝寿！' }
        ]},
        { text: '你回顾一生', icon: '🌅', results: [
            { effects: { mood: 5 }, result: '你觉得自己虽然平凡，但很幸福。' },
            { effects: { mood: 3 }, result: '你有很多故事想讲给后辈听。' }
        ]},
        { text: '你被家人环绕', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 5 }, result: '你感到很幸福，儿孙都很孝顺。' }
        ]},
        { text: '你写下遗嘱', icon: '📜', results: [
            { effects: { mood: 3 }, result: '你把一切都安排好了，很安心。' }
        ]},
        { text: '你收到子孙的礼物', icon: '🎁', results: [
            { effects: { mood: 4 }, result: '你感到很欣慰！' }
        ]}
    ]
};

// 随机事件（随时可能发生）
const RANDOM_EVENTS = [
    { text: '你中了彩票500块', icon: '🎰', chance: 0.05, results: [
        { effects: { wealth: 3, mood: 3 }, result: '意外之财，请朋友吃了顿饭！' }
    ]},
    { text: '你感冒了', icon: '🤒', chance: 0.08, results: [
        { effects: { health: -3, mood: -2 }, result: '你吃了药，在家休息了几天。' }
    ]},
    { text: '你捡到了100块', icon: '💵', chance: 0.06, results: [
        { effects: { wealth: 2, mood: 2 }, result: '小幸运！' }
    ]},
    { text: '你被罚款了', icon: '😡', chance: 0.04, results: [
        { effects: { wealth: -3, mood: -3 }, result: '你闯红灯被拍了，罚了200。' }
    ]},
    { text: '你遇到了贵人', icon: '🤝', chance: 0.06, results: [
        { effects: { wealth: 4, charm: 3 }, result: '对方给了你一个好机会！' }
    ]},
    { text: '你被公司表彰了', icon: '🏅', chance: 0.05, results: [
        { effects: { charm: 3, mood: 4 }, result: '你获得了优秀员工奖！' }
    ]},
    { text: '你手机丢了', icon: '📱', chance: 0.04, results: [
        { effects: { wealth: -4, mood: -4 }, result: '你买了一部新手机。' }
    ]},
    { text: '你收到老同学的婚礼邀请', icon: '💍', chance: 0.05, results: [
        { effects: { wealth: -2, mood: 2 }, result: '你随了份子钱，吃了顿好的。' }
    ]},
    { text: '你堵车迟到了', icon: '🚗', chance: 0.07, results: [
        { effects: { mood: -2 }, result: '你被领导批评了。' }
    ]},
    { text: '你抢到了优惠券', icon: '🎫', chance: 0.06, results: [
        { effects: { wealth: 1, mood: 1 }, result: '省了一笔小钱！' }
    ]},
    { text: '你和邻居吵架了', icon: '😤', chance: 0.04, results: [
        { effects: { mood: -3, charm: -2 }, result: '因为噪音问题，你们闹得很不愉快。' }
    ]},
    { text: '你收到了一笔奖金', icon: '💰', chance: 0.05, results: [
        { effects: { wealth: 5, mood: 3 }, result: '年终奖发了，你很开心！' }
    ]},
    { text: '你失眠了', icon: '😴', chance: 0.06, results: [
        { effects: { health: -2, mood: -2 }, result: '你躺在床上翻来覆去睡不着。' }
    ]},
    { text: '你吃了顿大餐', icon: '🍜', chance: 0.07, results: [
        { effects: { mood: 3, health: 1 }, result: '你和朋友聚餐，吃得很满足！' }
    ]}
];

// 成就系统（调整阈值到85）
const ACHIEVEMENTS = [
    { id: 'age_50', name: '知天命', desc: '活到50岁', icon: '🎂', condition: (state) => state.age >= 50 },
    { id: 'age_70', name: '古稀之年', desc: '活到70岁', icon: '🏆', condition: (state) => state.age >= 70 },
    { id: 'age_80', name: '耄耋之年', desc: '活到80岁', icon: '👑', condition: (state) => state.age >= 80 },
    { id: 'age_90', name: '鲐背之年', desc: '活到90岁', icon: '🌟', condition: (state) => state.age >= 90 },
    { id: 'health_max', name: '身强体壮', desc: '健康达到100', icon: '💪', condition: (state) => state.stats.health >= 100 },
    { id: 'intelligence_max', name: '学富五车', desc: '智力达到100', icon: '🧠', condition: (state) => state.stats.intelligence >= 100 },
    { id: 'charm_max', name: '万人迷', desc: '魅力达到100', icon: '✨', condition: (state) => state.stats.charm >= 100 },
    { id: 'wealth_max', name: '富可敌国', desc: '财富达到100', icon: '💰', condition: (state) => state.stats.wealth >= 100 },
    { id: 'mood_max', name: '幸福美满', desc: '心情达到100', icon: '😊', condition: (state) => state.stats.mood >= 100 },
    { id: 'all_50', name: '全面发展', desc: '所有属性≥50', icon: '⚖️', condition: (state) => Object.values(state.stats).every(v => v >= 50) },
    { id: 'all_70', name: '精英人才', desc: '所有属性≥70', icon: '🌟', condition: (state) => Object.values(state.stats).every(v => v >= 70) },
    { id: 'total_300', name: '人生赢家', desc: '总属性≥300', icon: '🏆', condition: (state) => Object.values(state.stats).reduce((a, b) => a + b, 0) >= 300 },
    { id: 'total_400', name: '传奇人生', desc: '总属性≥400', icon: '👑', condition: (state) => Object.values(state.stats).reduce((a, b) => a + b, 0) >= 400 },
    { id: 'millionaire', name: '百万富翁', desc: '财富≥80且年龄≥40', icon: '💎', condition: (state) => state.stats.wealth >= 80 && state.age >= 40 },
    { id: 'scholar', name: '学者', desc: '智力≥80且年龄≥30', icon: '📚', condition: (state) => state.stats.intelligence >= 80 && state.age >= 30 },
    { id: 'socialite', name: '社交达人', desc: '魅力≥80且年龄≥25', icon: '🦋', condition: (state) => state.stats.charm >= 80 && state.age >= 25 },
    { id: 'survivor', name: '幸存者', desc: '健康曾低于20但活过60岁', icon: '🛡️', condition: (state) => state.healthEverLow && state.age >= 60 },
    { id: 'comeback', name: '东山再起', desc: '财富曾低于20但最终≥50', icon: '🔄', condition: (state) => state.wealthEverLow && state.stats.wealth >= 50 }
];

// 根据年龄获取阶段
function getLifePhase(age) {
    for (let phase of LIFE_PHASES) {
        if (age >= phase.age[0] && age <= phase.age[1]) return phase;
    }
    return LIFE_PHASES[LIFE_PHASES.length - 1];
}

// 根据年龄获取事件池
function getEventPool(age) {
    if (age <= 2) return EVENTS.baby;
    if (age <= 5) return EVENTS.toddler;
    if (age <= 11) return EVENTS.childhood;
    if (age <= 15) return EVENTS.teenage;
    if (age <= 18) return EVENTS.senior_high;
    if (age <= 25) return EVENTS.young_adult;
    if (age <= 35) return EVENTS.adult;
    if (age <= 55) return EVENTS.middle_age;
    if (age <= 65) return EVENTS.senior;
    if (age <= 80) return EVENTS.elderly;
    return EVENTS.very_old;
}

// 获取结局
function getEnding(stats, age, achievements) {
    const { health, intelligence, charm, wealth, mood } = stats;
    const total = health + intelligence + charm + wealth + mood;
    const achievementCount = achievements.length;

    if (age < 30) {
        return { title: '英年早逝', description: '你的生命太短暂了，还有太多事情没有完成。', icon: '🕯️', level: 1 };
    }
    if (total > 400 && age >= 80 && achievementCount >= 5) {
        return { title: '完美人生', description: '你的人生堪称传奇！事业有成，家庭美满，长寿安康，是真正的人生赢家。', icon: '👑', level: 6 };
    }
    if (total > 350 && age >= 70) {
        return { title: '传奇人生', description: '你的人生令人羡慕！在各个领域都取得了不错的成就，安享晚年。', icon: '🌟', level: 5 };
    }
    if (total > 280) {
        return { title: '精彩人生', description: '你度过了充实的一生，有欢笑有泪水，但无怨无悔。', icon: '⭐', level: 4 };
    }
    if (total > 200) {
        return { title: '平凡人生', description: '你度过了平凡而真实的一生，虽有遗憾，但也有自己的小幸福。', icon: '🌈', level: 3 };
    }
    if (total > 100) {
        return { title: '坎坷人生', description: '你的人生充满波折，但你始终坚持着，没有放弃。', icon: '🌙', level: 2 };
    }
    return { title: '遗憾人生', description: '你的人生留下了许多遗憾，但每一天都是新的开始。', icon: '💫', level: 1 };
}
