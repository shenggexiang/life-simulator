// 游戏状态
let gameState = {
    age: 0,
    stats: { health: 50, intelligence: 50, charm: 50, wealth: 50, mood: 50 },
    talents: [],
    isRunning: false,
    isPaused: false,
    speed: 1,
    timer: null,
    conditionTriggered: new Set(),
    achievements: [],
    healthEverLow: false,
    wealthEverLow: false
};

// DOM元素
const el = {
    screens: {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen')
    },
    remainingPoints: document.getElementById('remaining-points'),
    sliders: {
        health: document.getElementById('init-health'),
        intelligence: document.getElementById('init-intelligence'),
        charm: document.getElementById('init-charm'),
        wealth: document.getElementById('init-wealth'),
        luck: document.getElementById('init-luck')
    },
    sliderVals: {
        health: document.getElementById('init-health-val'),
        intelligence: document.getElementById('init-intelligence-val'),
        charm: document.getElementById('init-charm-val'),
        wealth: document.getElementById('init-wealth-val'),
        luck: document.getElementById('init-luck-val')
    },
    talentGrid: document.getElementById('talent-grid'),
    talentCount: document.getElementById('talent-count'),
    displayAge: document.getElementById('display-age'),
    displayPhase: document.getElementById('display-phase'),
    bars: {
        health: document.getElementById('health-bar'),
        intelligence: document.getElementById('intelligence-bar'),
        charm: document.getElementById('charm-bar'),
        wealth: document.getElementById('wealth-bar'),
        mood: document.getElementById('mood-bar')
    },
    values: {
        health: document.getElementById('health-value'),
        intelligence: document.getElementById('intelligence-value'),
        charm: document.getElementById('charm-value'),
        wealth: document.getElementById('wealth-value'),
        mood: document.getElementById('mood-value')
    },
    eventLog: document.getElementById('event-log'),
    speedBtn: document.getElementById('speed-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    endIcon: document.getElementById('end-icon'),
    endSummary: document.getElementById('end-summary'),
    endStats: document.getElementById('end-stats'),
    endTalents: document.getElementById('end-talents'),
    endAchievements: document.getElementById('end-achievements')
};

// ============ 常量 ============
const BASE_POINTS = 50;
const BASE_STAT = 20;
const MAX_AGE = 90;
const STAT_ICONS = {
    health: '❤️',
    intelligence: '🧠',
    charm: '✨',
    wealth: '💰',
    mood: '😊'
};
const STAT_NAMES = {
    health: '健康',
    intelligence: '智力',
    charm: '魅力',
    wealth: '财富',
    mood: '心情'
};

function getTalent(type) {
    return gameState.talents.find(t => t.passive?.type === type);
}

function getTalents(type) {
    return gameState.talents.filter(t => t.passive?.type === type);
}

// ============ 属性分配 ============

function updatePoints() {
    const vals = getSliderValues();
    const total = vals.health + vals.intelligence + vals.charm + vals.wealth + vals.luck;
    const freeBonus = getFreePointsBonus();
    const remaining = BASE_POINTS + freeBonus - total;

    el.remainingPoints.textContent = remaining;
    el.remainingPoints.style.color = remaining < 0 ? '#e53e3e' : '#667eea';

    for (const key of Object.keys(vals)) {
        el.sliderVals[key].textContent = vals[key];
    }
}

function getSliderValues() {
    return {
        health: parseInt(el.sliders.health.value),
        intelligence: parseInt(el.sliders.intelligence.value),
        charm: parseInt(el.sliders.charm.value),
        wealth: parseInt(el.sliders.wealth.value),
        luck: parseInt(el.sliders.luck.value)
    };
}

function getFreePointsBonus() {
    let bonus = 0;
    selectedTalents.forEach(id => {
        const talent = TALENT_MAP[id];
        if (talent && talent.freePoints) {
            bonus += talent.freePoints;
        }
    });
    return bonus;
}

// ============ 天赋选择 ============
let selectedTalents = [];
const MAX_TALENTS = 3;

function renderTalents() {
    el.talentGrid.innerHTML = '';
    const categories = ['basic', 'points', 'condition', 'passive', 'special'];

    categories.forEach(cat => {
        const catTalents = TALENTS.filter(t => t.category === cat);
        if (catTalents.length === 0) return;

        const header = document.createElement('div');
        header.className = 'talent-category-header';
        header.textContent = getCategoryName(cat);
        header.style.gridColumn = '1 / -1';
        el.talentGrid.appendChild(header);

        catTalents.forEach(talent => {
            const card = document.createElement('div');
            card.className = 'talent-card';
            const isSelected = selectedTalents.includes(talent.id);
            const canSelect = isSelected || selectedTalents.length < MAX_TALENTS;
            if (isSelected) card.classList.add('selected');
            if (!canSelect) card.classList.add('disabled');
            card.setAttribute('aria-pressed', String(isSelected));

            card.innerHTML = `
                <div class="talent-icon">${talent.icon}</div>
                <div class="talent-name">${talent.name}</div>
                <div class="talent-desc">${talent.desc}</div>
            `;
            card.onclick = () => toggleTalent(talent.id, canSelect);
            el.talentGrid.appendChild(card);
        });
    });
}

function toggleTalent(id, canSelect) {
    const idx = selectedTalents.indexOf(id);
    if (idx >= 0) {
        selectedTalents.splice(idx, 1);
    } else {
        if (!canSelect) return;
        if (selectedTalents.length >= MAX_TALENTS) return;
        selectedTalents.push(id);
    }
    el.talentCount.textContent = selectedTalents.length;
    renderTalents();
    updatePoints();
}

// ============ 开始游戏 ============
function startGame() {
    const vals = getSliderValues();
    const total = vals.health + vals.intelligence + vals.charm + vals.wealth + vals.luck;
    const freeBonus = getFreePointsBonus();

    if (total > BASE_POINTS + freeBonus) {
        alert(`属性点数超出！你用了 ${total} 点，最多 ${BASE_POINTS + freeBonus} 点。`);
        return;
    }

    const base = BASE_STAT;
    gameState.stats = {
        health: base + vals.health,
        intelligence: base + vals.intelligence,
        charm: base + vals.charm,
        wealth: base + vals.wealth,
        mood: 50
    };
    gameState.luck = vals.luck;

    gameState.talents = selectedTalents.map(id => TALENT_MAP[id]).filter(Boolean);
    gameState.talents.forEach(t => {
        if (t.effects) {
            for (const [stat, val] of Object.entries(t.effects)) {
                if (gameState.stats[stat] !== undefined) {
                    gameState.stats[stat] += val;
                }
            }
        }
    });

    clampStats();

    gameState.age = 0;
    gameState.conditionTriggered = new Set();
    gameState.achievements = [];
    gameState.healthEverLow = false;
    gameState.wealthEverLow = false;
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.speed = 1;

    showScreen('game');
    el.eventLog.innerHTML = '';
    addLog(0, '👶', '你出生了！', '', '');

    if (gameState.talents.length > 0) {
        const talentNames = gameState.talents.map(t => `${t.icon}${t.name}`).join('、');
        addLog(0, '✨', `你的天赋：${talentNames}`, '', '');
    }

    updateDisplay();
    updateStatsDisplay();
    runSimulation();
}

// ============ 模拟运行 ============
function runSimulation() {
    if (gameState.timer) clearTimeout(gameState.timer);

    const tick = () => {
        if (!gameState.isRunning || gameState.isPaused) return;

        gameState.age++;

        // 记录属性历史
        if (gameState.stats.health < 20) gameState.healthEverLow = true;
        if (gameState.stats.wealth < 20) gameState.wealthEverLow = true;

        // 被动效果：稳扎稳打
        applyPassivePerAge();

        // 检查条件天赋
        checkConditionTalents();

        // 检查成就
        checkAchievements();

        // 检查死亡
        if (gameState.stats.health <= 0 || gameState.age >= MAX_AGE) {
            endGame();
            return;
        }

        // 随机事件
        const luckBoost = getTalent('luck_boost');
        const luckReduce = getTalent('luck_reduce');
        const luckFactor = 1 + (gameState.luck - 50) * 0.006;
        let randomEvent = null;
        for (const re of RANDOM_EVENTS) {
            let chance = re.chance;
            if (re.good) {
                if (luckBoost) chance *= luckBoost.passive.factor;
                chance *= luckFactor;
            } else {
                if (luckReduce) chance *= (1 / luckReduce.passive.factor);
                chance *= 1 / luckFactor;
            }

            if (Math.random() < chance) {
                randomEvent = re;
                break;
            }
        }

        let event, result;
        if (randomEvent) {
            event = randomEvent;
            result = event.results[Math.floor(Math.random() * event.results.length)];
        } else {
            const pool = getEventPool(gameState.age);
            event = pool[Math.floor(Math.random() * pool.length)];
            result = event.results[Math.floor(Math.random() * event.results.length)];
        }

        let modifiedEffects = { ...result.effects };

        // 赌徒天赋
        const randomizeTalent = getTalent('randomize');
        if (randomizeTalent) {
            for (const k of Object.keys(modifiedEffects)) {
                const randomFactor = 1 + (Math.random() - 0.5) * randomizeTalent.passive.factor;
                modifiedEffects[k] = Math.round(modifiedEffects[k] * randomFactor);
            }
        }

        // 玻璃大炮
        const glassCannon = getTalent('amplify_all');
        if (glassCannon) {
            for (const k of Object.keys(modifiedEffects)) {
                modifiedEffects[k] = Math.round(modifiedEffects[k] * glassCannon.passive.factor);
            }
        }

        // 大器晚成/神童
        getTalents('age_threshold').forEach(ageThreshold => {
            const isBefore = ageThreshold.passive.before;
            const meetsAge = isBefore ? gameState.age < ageThreshold.passive.age : gameState.age >= ageThreshold.passive.age;
            if (meetsAge) {
                for (const k of Object.keys(modifiedEffects)) {
                    if (modifiedEffects[k] > 0) {
                        modifiedEffects[k] = Math.round(modifiedEffects[k] * ageThreshold.passive.factor);
                    }
                }
            }
        });

        // 被动效果
        applyPassiveBonusPositive(modifiedEffects);
        applyPassiveReduceNegative(modifiedEffects);

        // 应用效果
        applyEffects(modifiedEffects);

        // 中庸之道
        const balanceTalent = getTalent('balance');
        if (balanceTalent) {
            const target = balanceTalent.passive.target;
            const factor = balanceTalent.passive.factor;
            for (const k of Object.keys(gameState.stats)) {
                if (gameState.stats[k] > target + 10) {
                    gameState.stats[k] -= factor;
                } else if (gameState.stats[k] < target - 10) {
                    gameState.stats[k] += factor;
                }
            }
        }

        clampStats();

        const effectText = formatEffects(modifiedEffects);
        addLog(gameState.age, event.icon, event.text, result.result, effectText);

        updateDisplay();
        updateStatsDisplay();

        el.eventLog.scrollTop = el.eventLog.scrollHeight;

        if (gameState.stats.health <= 0 || gameState.age >= MAX_AGE) {
            setTimeout(() => endGame(), 500);
            return;
        }

        const delay = gameState.speed === 2 ? 150 : 400;
        gameState.timer = setTimeout(tick, delay);
    };

    tick();
}

// 被动效果：稳扎稳打
function applyPassivePerAge() {
    const talent = getTalent('per_age');
    if (talent) {
        const randomStat = talent.passive.stats[Math.floor(Math.random() * talent.passive.stats.length)];
        gameState.stats[randomStat] += talent.passive.bonus;
        clampStats();
    }
}

// 检查条件天赋
function checkConditionTalents() {
    gameState.talents.forEach(talent => {
        if (!talent.condition || gameState.conditionTriggered.has(talent.id)) return;

        let triggered = false;
        const cond = talent.condition;

        if (cond.type === 'all_min') {
            triggered = Object.values(gameState.stats).every(v => v >= cond.threshold);
        } else if (cond.type === 'dual') {
            triggered = gameState.stats[cond.stat1] >= cond.threshold1 &&
                        gameState.stats[cond.stat2] >= cond.threshold2;
        } else {
            triggered = gameState.stats[cond.stat] >= cond.threshold;
        }

        if (triggered) {
            gameState.conditionTriggered.add(talent.id);
            for (const [stat, val] of Object.entries(talent.reward)) {
                if (gameState.stats[stat] !== undefined) {
                    gameState.stats[stat] += val;
                }
            }
            clampStats();
            const rewardText = formatEffects(talent.reward);
            addLog(gameState.age, talent.icon, `【天赋触发】${talent.name}`, talent.desc, rewardText);
        }
    });
}

// 检查成就
function checkAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
        if (gameState.achievements.find(a => a.id === achievement.id)) return;

        if (achievement.condition(gameState)) {
            gameState.achievements.push({
                id: achievement.id,
                name: achievement.name,
                icon: achievement.icon,
                age: gameState.age
            });
            addLog(gameState.age, achievement.icon, `【成就解锁】${achievement.name}`, achievement.desc, '');
        }
    });
}

// 被动：正面事件加成
function applyPassiveBonusPositive(effects) {
    getTalents('bonus_positive').forEach(t => {
        if (effects[t.passive.stat] && effects[t.passive.stat] > 0) {
            effects[t.passive.stat] += t.passive.bonus;
        }
    });
}

// 被动：负面事件减半
function applyPassiveReduceNegative(effects) {
    getTalents('reduce_negative').forEach(t => {
        if (t.passive.stat === 'all') {
            for (const k of Object.keys(effects)) {
                if (effects[k] < 0) effects[k] = Math.round(effects[k] * t.passive.factor);
            }
        } else if (effects[t.passive.stat] && effects[t.passive.stat] < 0) {
            effects[t.passive.stat] = Math.round(effects[t.passive.stat] * t.passive.factor);
        }
    });
}

// 应用效果
function applyEffects(effects) {
    for (const [stat, value] of Object.entries(effects)) {
        if (gameState.stats[stat] !== undefined) {
            gameState.stats[stat] += value;
        }
    }
    clampStats();

    const floorTalent = getTalent('floor');
    if (floorTalent) {
        for (const key of Object.keys(gameState.stats)) {
            if (gameState.stats[key] < floorTalent.passive.value) {
                gameState.stats[key] = floorTalent.passive.value;
            }
        }
    }
}

function clampStats() {
    for (const key of Object.keys(gameState.stats)) {
        gameState.stats[key] = Math.max(0, Math.min(100, Math.round(gameState.stats[key])));
    }
}

function formatEffects(effects) {
    const parts = [];
    for (const [stat, value] of Object.entries(effects)) {
        if (value !== 0) {
            const cls = value > 0 ? 'positive' : 'negative';
            parts.push(`<span class="${cls}">${STAT_ICONS[stat] || ''}${value > 0 ? '+' : ''}${value}</span>`);
        }
    }
    return parts.join(' ');
}

function addLog(age, icon, text, result, effectText) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span class="log-age">${age}岁</span>
        <span class="log-icon">${icon}</span>
        <div style="flex:1">
            <div class="log-text">${text}</div>
            ${effectText ? `<div class="log-effect">${effectText}</div>` : ''}
            ${result ? `<div class="log-result">${result}</div>` : ''}
        </div>
    `;
    el.eventLog.appendChild(entry);
}

// ============ 更新显示 ============
function updateDisplay() {
    const phase = getLifePhase(gameState.age);
    el.displayAge.textContent = `${gameState.age}岁`;
    el.displayPhase.textContent = phase.name;
}

function updateStatsDisplay() {
    const stats = gameState.stats;
    for (const key of Object.keys(stats)) {
        const val = Math.round(stats[key]);
        if (el.values[key]) el.values[key].textContent = val;
        if (el.bars[key]) el.bars[key].style.width = `${val}%`;
    }
}

// ============ 控制 ============
function toggleSpeed() {
    gameState.speed = gameState.speed === 1 ? 2 : 1;
    el.speedBtn.textContent = gameState.speed === 2 ? '⏩ 已加速' : '⏩ 加速';
    el.speedBtn.classList.toggle('active', gameState.speed === 2);
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    el.pauseBtn.textContent = gameState.isPaused ? '▶️ 继续' : '⏸️ 暂停';
    el.pauseBtn.classList.toggle('active', gameState.isPaused);
    if (!gameState.isPaused) runSimulation();
}

// ============ 结束 ============
function endGame() {
    gameState.isRunning = false;
    if (gameState.timer) clearTimeout(gameState.timer);

    const ending = getEnding(gameState.stats, gameState.age, gameState.achievements);

    el.endIcon.textContent = ending.icon;
    el.endSummary.innerHTML = `
        <h3>${ending.title}</h3>
        <p>${ending.description}</p>
        <p style="margin-top:10px;color:#667eea;font-weight:600">享年 ${gameState.age} 岁</p>
    `;

    const stats = gameState.stats;
    el.endStats.innerHTML = `<h4>最终属性</h4>` +
        Object.keys(stats).map(k =>
            `<div class="end-stat-row"><span>${STAT_ICONS[k]} ${STAT_NAMES[k]}</span><span style="font-weight:600">${Math.round(stats[k])}</span></div>`
        ).join('');

    if (gameState.talents.length > 0) {
        el.endTalents.innerHTML = `<h4>你的天赋</h4>` +
            gameState.talents.map(t => `<span class="talent-tag">${t.icon} ${t.name}</span>`).join('');
        el.endTalents.style.display = 'block';
    } else {
        el.endTalents.style.display = 'none';
    }

    if (gameState.achievements.length > 0) {
        el.endAchievements.innerHTML = `<h4>解锁成就 (${gameState.achievements.length})</h4>` +
            gameState.achievements.map(a => `<span class="talent-tag">${a.icon} ${a.name}</span>`).join('');
        el.endAchievements.style.display = 'block';
    } else {
        el.endAchievements.style.display = 'none';
    }

    showScreen('end');
}

// ============ 通用 ============
function showScreen(name) {
    Object.values(el.screens).forEach(s => s.classList.remove('active'));
    el.screens[name].classList.add('active');
}

function restartGame() {
    selectedTalents = [];
    el.talentCount.textContent = '0';
    renderTalents();
    for (const key of Object.keys(el.sliders)) {
        el.sliders[key].value = 10;
    }
    updatePoints();
    showScreen('start');
}

// ============ 初始化 ============
renderTalents();
updatePoints();
