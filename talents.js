// 天赋池（共50+条天赋）
const TALENTS_POOL = [
    // ===== 基础属性加成 =====
    { id: 'strong', icon: '💪', name: '天生强壮', desc: '健康+15', effects: { health: 15 }, category: 'basic' },
    { id: 'smart', icon: '🧠', name: '天资聪颖', desc: '智力+15', effects: { intelligence: 15 }, category: 'basic' },
    { id: 'beauty', icon: '👑', name: '倾国倾城', desc: '魅力+15', effects: { charm: 15 }, category: 'basic' },
    { id: 'rich', icon: '💎', name: '含着金钥匙', desc: '财富+20', effects: { wealth: 20 }, category: 'basic' },
    { id: 'lucky', icon: '🍀', name: '天选之子', desc: '心情+15', effects: { mood: 15 }, category: 'basic' },
    { id: 'balanced_basic', icon: '⚖️', name: '均衡发展', desc: '全属性+5', effects: { health: 5, intelligence: 5, charm: 5, wealth: 5, mood: 5 }, category: 'basic' },

    // ===== 自由属性点 =====
    { id: 'free_points_5', icon: '✨', name: '小有天赋', desc: '额外获得5自由属性点', freePoints: 5, category: 'points' },
    { id: 'free_points_10', icon: '⭐', name: '天赋异禀', desc: '额外获得10自由属性点', freePoints: 10, category: 'points' },
    { id: 'free_points_15', icon: '🌟', name: '天纵奇才', desc: '额外获得15自由属性点', freePoints: 15, category: 'points' },
    { id: 'free_points_20', icon: '💫', name: '万中无一', desc: '额外获得20自由属性点', freePoints: 20, category: 'points' },

    // ===== 条件触发型 =====
    { id: 'condition_smart_rich', icon: '📚', name: '学而优则仕', desc: '若智力≥60，则财富+20', condition: { stat: 'intelligence', threshold: 60 }, reward: { wealth: 20 }, category: 'condition' },
    { id: 'condition_charm_rich', icon: '🎭', name: '人脉即财脉', desc: '若魅力≥60，则财富+15', condition: { stat: 'charm', threshold: 60 }, reward: { wealth: 15 }, category: 'condition' },
    { id: 'condition_health_smart', icon: '🏃', name: '身心健康', desc: '若健康≥70，则智力+10', condition: { stat: 'health', threshold: 70 }, reward: { intelligence: 10 }, category: 'condition' },
    { id: 'condition_smart_charm', icon: '🎓', name: '腹有诗书气自华', desc: '若智力≥70，则魅力+12', condition: { stat: 'intelligence', threshold: 70 }, reward: { charm: 12 }, category: 'condition' },
    { id: 'condition_wealth_health', icon: '🏥', name: '富贵养生', desc: '若财富≥70，则健康+15', condition: { stat: 'wealth', threshold: 70 }, reward: { health: 15 }, category: 'condition' },
    { id: 'condition_mood_all', icon: '☀️', name: '人逢喜事精神爽', desc: '若心情≥80，则所有属性+5', condition: { stat: 'mood', threshold: 80 }, reward: { health: 5, intelligence: 5, charm: 5, wealth: 5, mood: 5 }, category: 'condition' },
    { id: 'condition_health_mood', icon: '😊', name: '身体是革命本钱', desc: '若健康≥80，则心情+15', condition: { stat: 'health', threshold: 80 }, reward: { mood: 15 }, category: 'condition' },
    { id: 'condition_rich_mood', icon: '💰', name: '财大气粗', desc: '若财富≥80，则心情+12', condition: { stat: 'wealth', threshold: 80 }, reward: { mood: 12 }, category: 'condition' },
    { id: 'condition_charm_smart', icon: '🦋', name: '近朱者赤', desc: '若魅力≥70，则智力+10', condition: { stat: 'charm', threshold: 70 }, reward: { intelligence: 10 }, category: 'condition' },
    { id: 'condition_smart_health', icon: '🧬', name: '科学养生', desc: '若智力≥80，则健康+10', condition: { stat: 'intelligence', threshold: 80 }, reward: { health: 10 }, category: 'condition' },
    { id: 'condition_all_high', icon: '🏆', name: '全面发展', desc: '若所有属性≥50，则所有属性+8', condition: { type: 'all_min', threshold: 50 }, reward: { health: 8, intelligence: 8, charm: 8, wealth: 8, mood: 8 }, category: 'condition' },
    { id: 'condition_dual_high', icon: '⚡', name: '双剑合璧', desc: '若智力≥60且魅力≥60，则财富+25', condition: { type: 'dual', stat1: 'intelligence', threshold1: 60, stat2: 'charm', threshold2: 60 }, reward: { wealth: 25 }, category: 'condition' },
    { id: 'condition_wealth_charm', icon: '🎩', name: '绅士风度', desc: '若财富≥60且魅力≥50，则心情+15', condition: { type: 'dual', stat1: 'wealth', threshold1: 60, stat2: 'charm', threshold2: 50 }, reward: { mood: 15 }, category: 'condition' },
    { id: 'condition_smart_wealth', icon: '🎓', name: '知识变现', desc: '若智力≥80且财富≥40，则财富+20', condition: { type: 'dual', stat1: 'intelligence', threshold1: 80, stat2: 'wealth', threshold2: 40 }, reward: { wealth: 20 }, category: 'condition' },

    // ===== 被动效果型 =====
    { id: 'optimist', icon: '🌈', name: '乐天派', desc: '负面心情事件影响减半', passive: { type: 'reduce_negative', stat: 'mood', factor: 0.5 }, category: 'passive' },
    { id: 'iron_will', icon: '🔥', name: '钢铁意志', desc: '所有属性最低不会低于15', passive: { type: 'floor', value: 15 }, category: 'passive' },
    { id: 'fast_learner', icon: '📖', name: '学习达人', desc: '所有正面智力事件额外+3', passive: { type: 'bonus_positive', stat: 'intelligence', bonus: 3 }, category: 'passive' },
    { id: 'social_butterfly', icon: '🦋', name: '社交蝴蝶', desc: '所有正面魅力事件额外+3', passive: { type: 'bonus_positive', stat: 'charm', bonus: 3 }, category: 'passive' },
    { id: 'tough_skin', icon: '🛡️', name: '皮糙肉厚', desc: '负面健康事件影响减半', passive: { type: 'reduce_negative', stat: 'health', factor: 0.5 }, category: 'passive' },
    { id: 'business_mind', icon: '💼', name: '商业头脑', desc: '所有正面财富事件额外+5', passive: { type: 'bonus_positive', stat: 'wealth', bonus: 5 }, category: 'passive' },
    { id: 'calm', icon: '🧘', name: '处变不惊', desc: '所有负面事件影响减半', passive: { type: 'reduce_negative', stat: 'all', factor: 0.5 }, category: 'passive' },
    { id: 'glass_cannon', icon: '⚔️', name: '玻璃大炮', desc: '正面事件+50%，负面事件也+50%', passive: { type: 'amplify_all', factor: 1.5 }, category: 'passive' },
    { id: 'steady_growth', icon: '🌱', name: '稳扎稳打', desc: '每次年龄增长，随机属性+2', passive: { type: 'per_age', stats: ['health', 'intelligence', 'charm', 'wealth', 'mood'], bonus: 2 }, category: 'passive' },
    { id: 'late_bloomer', icon: '🌙', name: '大器晚成', desc: '30岁后，正面事件效果翻倍', passive: { type: 'age_threshold', age: 30, factor: 2.0 }, category: 'passive' },
    { id: 'child_prodigy', icon: '⭐', name: '神童', desc: '18岁前，正面事件效果翻倍', passive: { type: 'age_threshold', age: 18, factor: 2.0, before: true }, category: 'passive' },
    { id: 'lucky_star', icon: '🌠', name: '福星高照', desc: '随机事件中好事概率翻倍', passive: { type: 'luck_boost', factor: 2.0 }, category: 'passive' },
    { id: 'unlucky', icon: '🌧️', name: '命运多舛', desc: '坏事概率翻倍，但+25自由属性点', freePoints: 25, passive: { type: 'luck_reduce', factor: 0.5 }, category: 'special' },
    { id: 'balanced', icon: '⚖️', name: '中庸之道', desc: '属性差距自动缩小', passive: { type: 'balance', target: 50, factor: 3 }, category: 'passive' },
    { id: 'risk_taker', icon: '🎲', name: '赌徒', desc: '事件效果随机波动±50%', passive: { type: 'randomize', factor: 0.5 }, category: 'passive' },

    // ===== 更多特殊天赋 =====
    { id: 'fragile', icon: '💔', name: '玻璃心', desc: '心情-10，但魅力+15', effects: { mood: -10, charm: 15 }, category: 'special' },
    { id: 'bookworm', icon: '📚', name: '书呆子', desc: '智力+10，魅力-5', effects: { intelligence: 10, charm: -5 }, category: 'special' },
    { id: 'socialite', icon: '🎉', name: '社交达人', desc: '魅力+10，智力-5', effects: { charm: 10, intelligence: -5 }, category: 'special' },
    { id: 'workaholic', icon: '💼', name: '工作狂', desc: '财富+15，健康-10', effects: { wealth: 15, health: -10 }, category: 'special' },
    { id: 'athlete', icon: '🏅', name: '运动健将', desc: '健康+10，智力-3', effects: { health: 10, intelligence: -3 }, category: 'special' },
    { id: 'lone_wolf', icon: '🐺', name: '独狼', desc: '智力+8，魅力-8', effects: { intelligence: 8, charm: -8 }, category: 'special' },
    { id: 'people_pleaser', icon: '🤝', name: '老好人', desc: '魅力+8，心情-5', effects: { charm: 8, mood: -5 }, category: 'special' },
    { id: 'night_owl', icon: '🦉', name: '夜猫子', desc: '智力+5，健康-5', effects: { intelligence: 5, health: -5 }, category: 'special' },
    { id: 'early_bird', icon: '🐦', name: '早起鸟', desc: '健康+5，心情+5', effects: { health: 5, mood: 5 }, category: 'special' },
    { id: 'dreamer', icon: '💭', name: '梦想家', desc: '智力+8，财富-5', effects: { intelligence: 8, wealth: -5 }, category: 'special' },
    { id: 'pragmatist', icon: '🔧', name: '实用主义者', desc: '财富+8，智力-3', effects: { wealth: 8, intelligence: -3 }, category: 'special' },
    { id: 'optimist2', icon: '😊', name: '乐观主义者', desc: '心情+10，智力-3', effects: { mood: 10, intelligence: -3 }, category: 'special' },
    { id: 'pessimist', icon: '😔', name: '悲观主义者', desc: '智力+5，心情-8', effects: { intelligence: 5, mood: -8 }, category: 'special' },
    { id: 'lucky_penny', icon: '🪙', name: '幸运硬币', desc: '财富+10，运气+5', effects: { wealth: 10, mood: 5 }, category: 'special' },
    { id: 'curious', icon: '🔍', name: '好奇心强', desc: '智力+8，心情+3', effects: { intelligence: 8, mood: 3 }, category: 'special' },
    { id: 'stubborn', icon: '🪨', name: '固执己见', desc: '健康+5，魅力-5', effects: { health: 5, charm: -5 }, category: 'special' },
    { id: 'creative', icon: '🎨', name: '创造力强', desc: '智力+5，魅力+5', effects: { intelligence: 5, charm: 5 }, category: 'special' },
    { id: 'empathetic', icon: '💝', name: '共情能力强', desc: '魅力+8，心情+3', effects: { charm: 8, mood: 3 }, category: 'special' },
    { id: 'competitive', icon: '🏆', name: '好胜心强', desc: '智力+5，财富+5', effects: { intelligence: 5, wealth: 5 }, category: 'special' },
    { id: 'lazy', icon: '😴', name: '懒散', desc: '心情+10，健康-5', effects: { mood: 10, health: -5 }, category: 'special' },
    { id: 'ambitious', icon: '🎯', name: '野心勃勃', desc: '财富+8，心情-3', effects: { wealth: 8, mood: -3 }, category: 'special' },
    { id: 'generous', icon: '🎁', name: '慷慨大方', desc: '魅力+10，财富-5', effects: { charm: 10, wealth: -5 }, category: 'special' },
    { id: 'frugal', icon: '🐖', name: '勤俭节约', desc: '财富+10，魅力-3', effects: { wealth: 10, charm: -3 }, category: 'special' },
    { id: 'adventurous', icon: '🧗', name: '冒险精神', desc: '心情+8，健康-3', effects: { mood: 8, health: -3 }, category: 'special' },
    { id: 'cautious', icon: '🐢', name: '谨小慎微', desc: '健康+5，心情+3', effects: { health: 5, mood: 3 }, category: 'special' },
    { id: 'charismatic', icon: '✨', name: '魅力四射', desc: '魅力+12', effects: { charm: 12 }, category: 'basic' },
    { id: 'wise', icon: '🦉', name: '老成持重', desc: '智力+10，心情+5', effects: { intelligence: 10, mood: 5 }, category: 'basic' },
    { id: 'resilient', icon: '🌱', name: '韧性十足', desc: '健康+8，心情+5', effects: { health: 8, mood: 5 }, category: 'basic' },
    { id: 'silver_tongue', icon: '🗣️', name: '能说会道', desc: '魅力+10，财富+3', effects: { charm: 10, wealth: 3 }, category: 'basic' },
    { id: 'quick_wit', icon: '⚡', name: '反应敏捷', desc: '智力+10，魅力+3', effects: { intelligence: 10, charm: 3 }, category: 'basic' },
    { id: 'iron_body', icon: '🦾', name: '铜皮铁骨', desc: '健康+12', effects: { health: 12 }, category: 'basic' }
];

// 获取天赋分类名称
function getCategoryName(category) {
    const names = {
        basic: '基础加成',
        points: '属性点',
        condition: '条件触发',
        passive: '被动效果',
        special: '特殊天赋'
    };
    return names[category] || '其他';
}
