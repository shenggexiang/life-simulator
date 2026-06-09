// 人生阶段定义
const LIFE_PHASES = [
    { name: '婴儿期', age: [0, 2], icon: '👶' },
    { name: '幼儿期', age: [3, 5], icon: '🧒' },
    { name: '童年期', age: [6, 11], icon: '🎒' },
    { name: '青春期', age: [12, 17], icon: '🧑' },
    { name: '青年期', age: [18, 25], icon: '👨' },
    { name: '壮年期', age: [26, 35], icon: '💼' },
    { name: '中年期', age: [36, 55], icon: '🏠' },
    { name: '中老年', age: [56, 65], icon: '🌴' },
    { name: '老年期', age: [66, 80], icon: '👴' },
    { name: '高龄期', age: [81, 100], icon: '🙏' }
];

// 每个阶段的事件池
const EVENTS = {
    // ===== 婴儿期 (0-2岁) =====
    baby: [
        { text: '你出生了，哭声嘹亮', icon: '👶', results: [
            { effects: { health: 5, mood: 5 }, result: '医生说你很健康！' },
            { effects: { health: -3, mood: 3 }, result: '你有点体弱，但慢慢好起来了。' }
        ]},
        { text: '你学会了翻身', icon: '🔄', results: [
            { effects: { health: 3 }, result: '你的身体越来越灵活了。' },
            { effects: { health: -2 }, result: '不小心从床上滚下来了...' }
        ]},
        { text: '你第一次叫"妈妈"', icon: '🗣️', results: [
            { effects: { mood: 8, charm: 3 }, result: '妈妈激动得哭了！' },
            { effects: { mood: 5 }, result: '全家人都很开心。' }
        ]},
        { text: '你学会走路了', icon: '🚶', results: [
            { effects: { health: 5, mood: 5 }, result: '你摇摇晃晃地迈出了第一步！' },
            { effects: { health: 3, mood: 3 }, result: '虽然摔了几跤，但你学会了。' }
        ]},
        { text: '你长出了第一颗牙', icon: '🦷', results: [
            { effects: { health: 2 }, result: '妈妈给你买了磨牙棒。' }
        ]},
        { text: '你学会了自己吃饭', icon: '🍚', results: [
            { effects: { health: 2, intelligence: 2 }, result: '虽然弄得到处都是，但你很自豪！' }
        ]}
    ],

    // ===== 幼儿期 (3-5岁) =====
    toddler: [
        { text: '你上幼儿园了', icon: '🏫', results: [
            { effects: { charm: 8, mood: 5 }, result: '你交到了很多好朋友！' },
            { effects: { mood: -3, charm: 5 }, result: '你有点想妈妈，但慢慢适应了。' },
            { effects: { intelligence: 5 }, result: '你学会了认字和数数。' }
        ]},
        { text: '幼儿园有才艺表演', icon: '🎭', results: [
            { effects: { charm: 10, mood: 5 }, result: '你勇敢上台表演，获得满堂彩！' },
            { effects: { charm: 5 }, result: '你画了一幅画展示给大家。' },
            { effects: { mood: -2 }, result: '你有点害羞，没有参加。' }
        ]},
        { text: '你和小朋友吵架了', icon: '😤', results: [
            { effects: { charm: 5 }, result: '你主动道歉，和好了。' },
            { effects: { mood: -3 }, result: '你们冷战了好几天。' }
        ]},
        { text: '你过生日了', icon: '🎂', results: [
            { effects: { mood: 10, wealth: 3 }, result: '收到了好多礼物！' },
            { effects: { mood: 8 }, result: '和家人一起吃了蛋糕。' }
        ]},
        { text: '你学会了骑三轮车', icon: '🚲', results: [
            { effects: { health: 5, mood: 5 }, result: '你骑得越来越稳了！' }
        ]},
        { text: '你被幼儿园表扬了', icon: '⭐', results: [
            { effects: { mood: 8, charm: 3 }, result: '老师说你是好孩子！' }
        ]},
        { text: '你迷路了', icon: '😰', results: [
            { effects: { mood: -5 }, result: '你很害怕，但最后被找到了。' },
            { effects: { intelligence: 3 }, result: '你学会了记住家里的地址。' }
        ]}
    ],

    // ===== 童年期 (6-11岁) =====
    childhood: [
        { text: '你上小学了', icon: '🎒', results: [
            { effects: { intelligence: 10, mood: 3 }, result: '你很喜欢学习，成绩优异！' },
            { effects: { charm: 8, mood: 5 }, result: '你成了班里的开心果。' },
            { effects: { health: 5, mood: 5 }, result: '你参加了校运会。' }
        ]},
        { text: '期中考试', icon: '📝', results: [
            { effects: { intelligence: 8 }, result: '你考了班级前三名！' },
            { effects: { intelligence: 3, mood: 3 }, result: '成绩中等，还不错。' },
            { effects: { mood: -5 }, result: '成绩不太理想，有点沮丧。' }
        ]},
        { text: '你参加了兴趣班', icon: '🎨', results: [
            { effects: { intelligence: 5, charm: 5 }, result: '你学会了一门才艺！' },
            { effects: { intelligence: 8 }, result: '你在数学竞赛中获奖了！' },
            { effects: { health: 5 }, result: '你参加了足球队。' }
        ]},
        { text: '你被同学欺负了', icon: '😢', results: [
            { effects: { mood: -5, intelligence: 3 }, result: '你告诉了老师，问题解决了。' },
            { effects: { charm: 5 }, result: '你勇敢地站出来反抗。' },
            { effects: { mood: -8 }, result: '你忍气吞声，心里很难受。' }
        ]},
        { text: '暑假到了', icon: '☀️', results: [
            { effects: { health: 5, mood: 8 }, result: '你玩得很开心！' },
            { effects: { intelligence: 5 }, result: '你参加了一个夏令营。' },
            { effects: { wealth: 3, mood: 5 }, result: '你和家人去旅游了。' }
        ]},
        { text: '你养了一只小宠物', icon: '🐱', results: [
            { effects: { mood: 10 }, result: '你和宠物形影不离！' },
            { effects: { mood: 5, charm: 3 }, result: '你学会了照顾小动物。' }
        ]},
        { text: '你参加了学校的运动会', icon: '🏃', results: [
            { effects: { health: 8, mood: 5 }, result: '你获得了跑步比赛第一名！' },
            { effects: { health: 5 }, result: '你重在参与，玩得很开心。' }
        ]},
        { text: '你过生日收到零花钱', icon: '💵', results: [
            { effects: { wealth: 5, mood: 5 }, result: '你学会了攒钱。' },
            { effects: { wealth: 3, mood: 3 }, result: '你买了自己喜欢的零食。' }
        ]},
        { text: '你读了一本好书', icon: '📖', results: [
            { effects: { intelligence: 8, mood: 3 }, result: '你爱上了阅读！' },
            { effects: { intelligence: 5 }, result: '你增长了不少知识。' }
        ]},
        { text: '你参加了绘画比赛', icon: '🖼️', results: [
            { effects: { charm: 8, mood: 5 }, result: '你获得了二等奖！' },
            { effects: { charm: 3, mood: 3 }, result: '你的画被展出了。' }
        ]}
    ],

    // ===== 青春期 (12-17岁) =====
    teenage: [
        { text: '你升入中学', icon: '📚', results: [
            { effects: { intelligence: 10 }, result: '你适应了新的学习节奏。' },
            { effects: { charm: 8, mood: 3 }, result: '你加入了学生会。' },
            { effects: { mood: -3 }, result: '学业压力有点大。' }
        ]},
        { text: '你偷偷喜欢上了一个人', icon: '💕', results: [
            { effects: { mood: 10, charm: 5 }, result: '你们在一起了！' },
            { effects: { mood: 5 }, result: '这是一段美好的暗恋。' },
            { effects: { mood: -3, intelligence: 3 }, result: '你把精力放在了学习上。' }
        ]},
        { text: '你沉迷游戏了', icon: '🎮', results: [
            { effects: { intelligence: -5, health: -5, mood: 5 }, result: '成绩下滑了...' },
            { effects: { intelligence: -3, mood: 3 }, result: '你学会了适度娱乐。' },
            { effects: { intelligence: 5 }, result: '你通过游戏学到了编程！' }
        ]},
        { text: '青春期叛逆', icon: '😤', results: [
            { effects: { mood: -5, charm: -3 }, result: '你和父母大吵了一架。' },
            { effects: { charm: 5 }, result: '你学会了表达自己。' }
        ]},
        { text: '你参加了社团活动', icon: '🎪', results: [
            { effects: { charm: 10, mood: 5 }, result: '你成了社团的骨干！' },
            { effects: { intelligence: 5, charm: 5 }, result: '你学到了很多课外知识。' }
        ]},
        { text: '你参加了一次志愿者活动', icon: '🤝', results: [
            { effects: { charm: 8, mood: 8 }, result: '你感受到了帮助他人的快乐！' },
            { effects: { charm: 5 }, result: '你认识了很多志同道合的朋友。' }
        ]},
        { text: '你和好朋友闹翻了', icon: '💔', results: [
            { effects: { mood: -8 }, result: '你很难过，失去了一个好朋友。' },
            { effects: { mood: -3, intelligence: 3 }, result: '你学会了处理人际关系。' }
        ]},
        { text: '你参加了学科竞赛', icon: '🏆', results: [
            { effects: { intelligence: 12 }, result: '你获得了省级奖项！' },
            { effects: { intelligence: 8 }, result: '你获得了市级奖项。' },
            { effects: { intelligence: 3, mood: -3 }, result: '虽然没获奖，但你学到了很多。' }
        ]},
        { text: '你第一次独自出门旅行', icon: '🚂', results: [
            { effects: { intelligence: 5, charm: 5, mood: 8 }, result: '你增长了不少见识！' },
            { effects: { mood: 5 }, result: '你体验了独立的感觉。' }
        ]},
        { text: '高考来了', icon: '🎓', results: [
            { effects: { intelligence: 15, health: -5, mood: -5 }, result: '你考上了理想的大学！' },
            { effects: { intelligence: 10, mood: -3 }, result: '你考上了一所不错的大学。' },
            { effects: { intelligence: 5 }, result: '你决定学一门技术。' }
        ]},
        { text: '你参加了毕业典礼', icon: '🎉', results: [
            { effects: { mood: 10, charm: 5 }, result: '你和同学们依依惜别。' },
            { effects: { mood: 8 }, result: '你对未来充满期待。' }
        ]}
    ],

    // ===== 青年期 (18-25岁) =====
    young_adult: [
        { text: '你进入大学', icon: '🏛️', results: [
            { effects: { charm: 10, mood: 8 }, result: '你认识了很多新朋友！' },
            { effects: { intelligence: 12 }, result: '你获得了奖学金！' },
            { effects: { charm: 5, intelligence: 5 }, result: '你的大学生活很充实。' }
        ]},
        { text: '大学恋爱了', icon: '❤️', results: [
            { effects: { mood: 15 }, result: '你们度过了甜蜜的时光。' },
            { effects: { mood: 5, intelligence: 5 }, result: '你选择专注学业。' }
        ]},
        { text: '你参加了大学社团', icon: '🎭', results: [
            { effects: { charm: 10, mood: 5 }, result: '你成了社团的明星！' },
            { effects: { intelligence: 5, charm: 5 }, result: '你学到了很多技能。' }
        ]},
        { text: '你做了一次兼职', icon: '💼', results: [
            { effects: { wealth: 8, intelligence: 3 }, result: '你赚到了第一桶金！' },
            { effects: { wealth: 5, charm: 3 }, result: '你积累了社会经验。' }
        ]},
        { text: '你失恋了', icon: '💔', results: [
            { effects: { mood: -10 }, result: '你伤心了很久...' },
            { effects: { mood: -5, intelligence: 5 }, result: '你从中学到了很多。' }
        ]},
        { text: '大学毕业', icon: '🎓', results: [
            { effects: { wealth: 15, intelligence: 5 }, result: '你找到了一份好工作！' },
            { effects: { intelligence: 10 }, result: '你选择继续深造。' },
            { effects: { wealth: 10 }, result: '你开始了自己的创业之路。' }
        ]},
        { text: '第一次租房', icon: '🏠', results: [
            { effects: { wealth: -5, mood: 8 }, result: '你有了自己的小窝！' },
            { effects: { wealth: 3 }, result: '你和朋友合租，省了不少钱。' }
        ]},
        { text: '你被公司表扬了', icon: '⭐', results: [
            { effects: { wealth: 8, mood: 5 }, result: '你获得了晋升！' },
            { effects: { wealth: 5, charm: 3 }, result: '同事们都很佩服你。' }
        ]},
        { text: '你考了一个证书', icon: '📜', results: [
            { effects: { intelligence: 8, wealth: 5 }, result: '你的竞争力提升了！' },
            { effects: { intelligence: 5 }, result: '你学到了新知识。' }
        ]},
        { text: '你去了一次演唱会', icon: '🎤', results: [
            { effects: { mood: 10 }, result: '你玩得很开心！' }
        ]},
        { text: '你学会了做饭', icon: '🍳', results: [
            { effects: { health: 5, charm: 3 }, result: '你的厨艺越来越好！' }
        ]},
        { text: '你参加了一次同学聚会', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 8, charm: 3 }, result: '你见到了很多老同学！' },
            { effects: { mood: 5 }, result: '你回忆起了美好的校园时光。' }
        ]}
    ],

    // ===== 壮年期 (26-35岁) =====
    adult: [
        { text: '工作遇到瓶颈', icon: '😤', results: [
            { effects: { wealth: 10, mood: -3 }, result: '你跳槽到了更好的公司。' },
            { effects: { intelligence: 8 }, result: '你学习了新技能突破瓶颈。' },
            { effects: { mood: -5 }, result: '你感到很疲惫。' }
        ]},
        { text: '你考虑结婚了', icon: '💒', results: [
            { effects: { mood: 15, wealth: -10 }, result: '你步入了婚姻殿堂！' },
            { effects: { wealth: 5 }, result: '你决定先专注事业。' },
            { effects: { mood: 5 }, result: '你享受着单身生活。' }
        ]},
        { text: '你买了房子', icon: '🏡', results: [
            { effects: { wealth: -15, mood: 10 }, result: '你终于有了自己的家！' },
            { effects: { wealth: 5 }, result: '你决定继续租房。' }
        ]},
        { text: '你有了孩子', icon: '👶', results: [
            { effects: { mood: 15, wealth: -8 }, result: '你成为了父母！' },
            { effects: { wealth: 10 }, result: '你决定先不要孩子。' }
        ]},
        { text: '你升职加薪了', icon: '💰', results: [
            { effects: { wealth: 15, mood: 5 }, result: '你的收入翻了一倍！' },
            { effects: { wealth: 8, health: -3 }, result: '但工作也更忙了。' }
        ]},
        { text: '你创业了', icon: '🚀', results: [
            { effects: { wealth: 20, health: -5, mood: 5 }, result: '你的公司开始盈利了！' },
            { effects: { wealth: -10, mood: -5 }, result: '创业失败了，但你学到了很多。' }
        ]},
        { text: '你去了一次长途旅行', icon: '✈️', results: [
            { effects: { mood: 12, wealth: -5 }, result: '你看到了美丽的风景！' },
            { effects: { mood: 8 }, result: '你放松了身心。' }
        ]},
        { text: '你和伴侣吵架了', icon: '😤', results: [
            { effects: { mood: -8 }, result: '你们冷战了好几天。' },
            { effects: { mood: -3, charm: 3 }, result: '你们和好后感情更深了。' }
        ]},
        { text: '你投资理财了', icon: '📈', results: [
            { effects: { wealth: 10 }, result: '你的投资获得了回报！' },
            { effects: { wealth: -5 }, result: '投资失败了，你损失了一些钱。' }
        ]},
        { text: '你参加了一次同学婚礼', icon: '💍', results: [
            { effects: { mood: 5, charm: 3 }, result: '你送上了真挚的祝福。' }
        ]},
        { text: '你开始健身了', icon: '💪', results: [
            { effects: { health: 8, mood: 5 }, result: '你的身材越来越好！' },
            { effects: { health: 5 }, result: '你坚持了下来。' }
        ]}
    ],

    // ===== 中年期 (36-55岁) =====
    middle_age: [
        { text: '中年危机', icon: '😔', results: [
            { effects: { mood: -5, intelligence: 5 }, result: '你开始反思人生。' },
            { effects: { health: 5 }, result: '你开始注重养生。' }
        ]},
        { text: '孩子要上学了', icon: '🎒', results: [
            { effects: { wealth: -10, intelligence: 5 }, result: '你给孩子报了最好的学校。' },
            { effects: { wealth: -5 }, result: '你选择了普通学校。' }
        ]},
        { text: '父母生病了', icon: '🏥', results: [
            { effects: { wealth: -10, mood: -5 }, result: '你悉心照顾父母。' },
            { effects: { wealth: -5, mood: -3 }, result: '你请了护工帮忙。' }
        ]},
        { text: '你的事业达到了巅峰', icon: '🏆', results: [
            { effects: { wealth: 15, charm: 10 }, result: '你成为了行业翘楚！' },
            { effects: { wealth: 8 }, result: '你的收入很稳定。' }
        ]},
        { text: '你开始锻炼身体', icon: '🏃', results: [
            { effects: { health: 10, mood: 5 }, result: '你的身体越来越好！' },
            { effects: { health: 5 }, result: '你坚持了下来。' }
        ]},
        { text: '你被裁员了', icon: '😢', results: [
            { effects: { wealth: -10, mood: -10 }, result: '你失业了，开始重新找工作。' },
            { effects: { wealth: -5, mood: -5 }, result: '你拿到了赔偿金，开始创业。' }
        ]},
        { text: '你和老朋友重逢', icon: '🤝', results: [
            { effects: { mood: 10, charm: 5 }, result: '你们回忆了很多往事！' },
            { effects: { mood: 5 }, result: '你感慨时光飞逝。' }
        ]},
        { text: '你买了一辆车', icon: '🚗', results: [
            { effects: { wealth: -8, mood: 8 }, result: '你有了自己的座驾！' },
            { effects: { wealth: -5, mood: 5 }, result: '你买了一辆二手车。' }
        ]},
        { text: '你参加了一次同学聚会', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 8, charm: 3 }, result: '你发现大家都老了。' },
            { effects: { mood: 5 }, result: '你感慨万千。' }
        ]},
        { text: '你开始学习投资', icon: '📊', results: [
            { effects: { intelligence: 5, wealth: 8 }, result: '你的投资获得了回报！' },
            { effects: { intelligence: 3 }, result: '你学到了很多理财知识。' }
        ]},
        { text: '你送孩子出国留学', icon: '✈️', results: [
            { effects: { wealth: -15, mood: 5 }, result: '你为孩子的未来投资。' },
            { effects: { wealth: -10 }, result: '你支持孩子的梦想。' }
        ]}
    ],

    // ===== 中老年 (56-65岁) =====
    senior: [
        { text: '你要退休了', icon: '🌴', results: [
            { effects: { mood: 10, wealth: 5 }, result: '你享受着悠闲的退休生活。' },
            { effects: { wealth: 10, health: -3 }, result: '你决定再工作几年。' }
        ]},
        { text: '你当了爷爷/奶奶', icon: '👶', results: [
            { effects: { mood: 15 }, result: '你享受着天伦之乐！' },
            { effects: { mood: 8 }, result: '你偶尔帮忙带孙子。' }
        ]},
        { text: '老朋友聚会', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 12, charm: 5 }, result: '你们回忆了很多往事！' },
            { effects: { mood: 5 }, result: '你见到了多年不见的老友。' }
        ]},
        { text: '体检发现小毛病', icon: '💊', results: [
            { effects: { health: 5, wealth: -3 }, result: '你开始定期体检。' },
            { effects: { health: -5 }, result: '你没太在意。' }
        ]},
        { text: '你开始学习新技能', icon: '📚', results: [
            { effects: { intelligence: 5, mood: 5 }, result: '你活到老学到老！' },
            { effects: { intelligence: 3 }, result: '你学会了使用智能手机。' }
        ]},
        { text: '你参加了一次老年旅行团', icon: '🚌', results: [
            { effects: { mood: 10, wealth: -3 }, result: '你玩得很开心！' },
            { effects: { mood: 5 }, result: '你认识了很多同龄朋友。' }
        ]},
        { text: '你开始写回忆录', icon: '📝', results: [
            { effects: { intelligence: 5, mood: 8 }, result: '你记录了自己的一生！' },
            { effects: { mood: 5 }, result: '你回忆起了很多往事。' }
        ]},
        { text: '你参加了一次老年大学', icon: '🎓', results: [
            { effects: { intelligence: 8, charm: 5 }, result: '你学到了很多新知识！' },
            { effects: { intelligence: 5 }, result: '你交到了很多新朋友。' }
        ]}
    ],

    // ===== 老年期 (66-80岁) =====
    elderly: [
        { text: '你环游世界', icon: '✈️', results: [
            { effects: { mood: 15, wealth: -10 }, result: '你看到了世界各地的美景！' },
            { effects: { mood: 8, wealth: -5 }, result: '你去了几个想去的地方。' }
        ]},
        { text: '你开始写回忆录', icon: '📖', results: [
            { effects: { intelligence: 5, mood: 10 }, result: '你记录了精彩的一生！' },
            { effects: { mood: 5 }, result: '你只是想想而已。' }
        ]},
        { text: '老伴生病了', icon: '💑', results: [
            { effects: { mood: -8, wealth: -5 }, result: '你悉心照顾老伴。' },
            { effects: { mood: -5 }, result: '你请了护工帮忙。' }
        ]},
        { text: '你感到身体虚弱', icon: '🏥', results: [
            { effects: { health: -5, mood: -3 }, result: '你需要多休息了。' },
            { effects: { health: -3 }, result: '你保持乐观心态。' }
        ]},
        { text: '你和老伴一起庆祝金婚', icon: '💍', results: [
            { effects: { mood: 15 }, result: '你们相濡以沫五十年！' },
            { effects: { mood: 10 }, result: '你们回忆起了很多美好的时光。' }
        ]},
        { text: '你教孙子下棋', icon: '♟️', results: [
            { effects: { mood: 8, intelligence: 3 }, result: '你享受着天伦之乐！' },
            { effects: { mood: 5 }, result: '你发现孙子很有天赋。' }
        ]},
        { text: '你参加了一次老战友聚会', icon: '🎖️', results: [
            { effects: { mood: 12 }, result: '你们回忆起了峥嵘岁月！' },
            { effects: { mood: 8 }, result: '你感慨万千。' }
        ]},
        { text: '你被授予社区荣誉', icon: '🏅', results: [
            { effects: { mood: 10, charm: 5 }, result: '你为社区做出了贡献！' },
            { effects: { mood: 5 }, result: '你感到很自豪。' }
        ]}
    ],

    // ===== 高龄期 (81-100岁) =====
    very_old: [
        { text: '你迎来了大寿', icon: '🎂', results: [
            { effects: { mood: 15 }, result: '全家人为你庆祝！' },
            { effects: { mood: 10 }, result: '你度过了一个温馨的生日。' }
        ]},
        { text: '你回顾一生', icon: '🌅', results: [
            { effects: { mood: 10 }, result: '你觉得自己度过了美好的一生。' },
            { effects: { mood: 5, intelligence: 3 }, result: '你思考着人生的意义。' }
        ]},
        { text: '你和老友通电话', icon: '📞', results: [
            { effects: { mood: 8 }, result: '你们聊了很久，很开心。' },
            { effects: { mood: 3 }, result: '你得知一位老友去世了，很难过。' }
        ]},
        { text: '你被家人环绕', icon: '👨‍👩‍👧‍👦', results: [
            { effects: { mood: 12 }, result: '你感到很幸福！' },
            { effects: { mood: 8 }, result: '你享受着家庭的温暖。' }
        ]},
        { text: '你写下遗嘱', icon: '📜', results: [
            { effects: { mood: 5 }, result: '你安排好了一切。' }
        ]},
        { text: '你收到子孙的礼物', icon: '🎁', results: [
            { effects: { mood: 10 }, result: '你感到很欣慰！' }
        ]}
    ]
};

// 随机事件（随时可能发生）
const RANDOM_EVENTS = [
    { text: '你中了彩票小奖', icon: '🎰', chance: 0.05, results: [
        { effects: { wealth: 10, mood: 5 }, result: '意外之财！' }
    ]},
    { text: '你生了一场病', icon: '🤒', chance: 0.08, results: [
        { effects: { health: -8, mood: -3 }, result: '你休养了一段时间。' },
        { effects: { health: -5 }, result: '吃了药很快就好了。' }
    ]},
    { text: '你捡到了钱', icon: '💵', chance: 0.06, results: [
        { effects: { wealth: 3, mood: 3 }, result: '小幸运！' }
    ]},
    { text: '你遭遇了意外', icon: '⚠️', chance: 0.04, results: [
        { effects: { health: -10, mood: -5 }, result: '你受了伤，需要休养。' },
        { effects: { health: -5 }, result: '幸好只是虚惊一场。' }
    ]},
    { text: '你遇到了贵人', icon: '🤝', chance: 0.06, results: [
        { effects: { wealth: 8, charm: 5 }, result: '对方给了你很多帮助！' }
    ]},
    { text: '你获得了意外的荣誉', icon: '🏅', chance: 0.05, results: [
        { effects: { charm: 8, mood: 8 }, result: '大家都为你骄傲！' }
    ]},
    { text: '你被偷了钱包', icon: '😿', chance: 0.04, results: [
        { effects: { wealth: -5, mood: -5 }, result: '你损失了一些钱。' }
    ]},
    { text: '你中了大奖', icon: '🎊', chance: 0.02, results: [
        { effects: { wealth: 20, mood: 10 }, result: '你一夜暴富！' }
    ]},
    { text: '你遇到了一个好老师', icon: '👨‍🏫', chance: 0.05, results: [
        { effects: { intelligence: 8, mood: 3 }, result: '你学到了很多！' }
    ]},
    { text: '你被人误解了', icon: '😤', chance: 0.05, results: [
        { effects: { mood: -5, charm: -3 }, result: '你很委屈。' }
    ]},
    { text: '你做了一个好梦', icon: '💭', chance: 0.08, results: [
        { effects: { mood: 3 }, result: '你心情很好。' }
    ]},
    { text: '你吃到了美食', icon: '🍜', chance: 0.07, results: [
        { effects: { mood: 5, health: 2 }, result: '你很满足！' }
    ]},
    { text: '你帮助了别人', icon: '🤝', chance: 0.06, results: [
        { effects: { charm: 5, mood: 5 }, result: '你感到很快乐。' }
    ]},
    { text: '你得到了一个好消息', icon: '📰', chance: 0.05, results: [
        { effects: { mood: 8 }, result: '你很开心！' }
    ]},
    { text: '你被人骗了', icon: '😡', chance: 0.03, results: [
        { effects: { wealth: -5, mood: -5, intelligence: 3 }, result: '你吸取了教训。' }
    ]}
];

// 成就系统
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
    { id: 'comeback', name: '东山再起', desc: '财富曾低于20但最终≥60', icon: '🔄', condition: (state) => state.wealthEverLow && state.stats.wealth >= 60 }
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
    if (age <= 17) return EVENTS.teenage;
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
        return { title: '完美人生', description: '你的人生堪称传奇！在各个领域都取得了卓越成就，家庭美满，长寿安康，成就满满。', icon: '👑', level: 6 };
    }
    if (total > 350 && age >= 70) {
        return { title: '传奇人生', description: '你的人生堪称完美！在各个领域都取得了令人瞩目的成就。', icon: '🌟', level: 5 };
    }
    if (total > 280) {
        return { title: '精彩人生', description: '你度过了充实而精彩的一生，在事业和家庭中都收获满满。', icon: '⭐', level: 4 };
    }
    if (total > 200) {
        return { title: '平凡人生', description: '你度过了平凡而真实的一生，虽有遗憾，但也有自己的小幸福。', icon: '🌈', level: 3 };
    }
    if (total > 120) {
        return { title: '坎坷人生', description: '你的人生充满波折，但你始终坚持着。', icon: '🌙', level: 2 };
    }
    return { title: '遗憾人生', description: '你的人生留下了许多遗憾，但每一天都是新的开始。', icon: '💫', level: 1 };
}
