// 问卷提交处理
document.getElementById('questionnaire').addEventListener('submit', function(e) {
    e.preventDefault();

    // 检查是否所有问题都已回答
    const totalQuestions = 10;
    let answeredCount = 0;
    let yesCount = 0; // 回答"是"的数量

    for (let i = 1; i <= totalQuestions; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            answeredCount++;
            yesCount += parseInt(answer.value); // value为1表示"是"，0表示"否"
        }
    }

    // 如果有未回答的问题
    if (answeredCount < totalQuestions) {
        alert(`请回答所有问题！您还有 ${totalQuestions - answeredCount} 个问题未回答。`);
        return;
    }

    // 计算风险等级
    const result = calculateRisk(yesCount);

    // 显示结果
    displayResult(result);
});

// 计算风险等级
function calculateRisk(yesCount) {
    let riskLevel, riskClass, description;

    // 根据回答"是"的数量判断风险等级
    if (yesCount === 0) {
        // 全部回答"否"
        riskLevel = '低风险';
        riskClass = 'risk-low';
        description = `
            <p><strong>您对所有问题都回答"否"</strong></p>
            <p>从目前来看，您的生活习惯或病史中似乎没有明显的肠癌高风险因素。</p>
            <p><strong>建议：</strong></p>
            <ul style="text-align: left; margin: 15px 0;">
                <li>继续保持健康的生活方式</li>
                <li>由于患肠道疾病的风险会随时间变化，如出现任何症状，建议咨询医生</li>
                <li>按时进行复诊和常规检查</li>
            </ul>
        `;
    } else if (yesCount >= 1 && yesCount <= 5) {
        // 1-5个问题回答"是"
        riskLevel = '中等风险';
        riskClass = 'risk-medium';
        description = `
            <p><strong>您对 ${yesCount} 个问题回答"是"</strong></p>
            <p>这提示您存在一些症状和习惯，可能与肠道疾病（包括肠癌）相关。</p>
            <p><strong>重要建议：</strong></p>
            <ul style="text-align: left; margin: 15px 0;">
                <li><strong>建议您预约医生，讨论您的症状并进行必要检查</strong></li>
                <li>这样可以排除肠道疾病或尽快获得准确诊断</li>
                <li>早发现可能会对后续治疗产生关键影响</li>
            </ul>
            <p style="color: #c25100; font-weight: bold; margin-top: 15px;">
                ⚠️ 请注意：本评估仅供参考，不能替代专业医疗诊断。建议尽快咨询专业医生。
            </p>
        `;
    } else {
        // 6个或以上问题回答"是"
        riskLevel = '高风险';
        riskClass = 'risk-high';
        description = `
            <p><strong>您对 ${yesCount} 个问题回答"是"</strong></p>
            <p>这提示您存在多个症状和习惯，可能与肠道疾病（包括肠癌）相关。</p>
            <p><strong>紧急建议：</strong></p>
            <ul style="text-align: left; margin: 15px 0;">
                <li><strong>强烈建议您立即预约医生</strong></li>
                <li>与医生详细讨论您的所有症状</li>
                <li>进行必要的医学检查，以排除肠道疾病或尽快获得准确诊断</li>
                <li>早发现会对后续治疗产生关键影响</li>
            </ul>
            <p style="color: #c92a2a; font-weight: bold; margin-top: 15px;">
                ⚠️ 重要提示：本评估仅供参考，不能替代专业医疗诊断。请尽快就医进行专业检查。
            </p>
        `;
    }

    return {
        level: riskLevel,
        class: riskClass,
        description: description,
        yesCount: yesCount
    };
}

// 显示结果
function displayResult(result) {
    // 隐藏问卷表单
    document.getElementById('questionnaire').classList.add('hidden');

    // 显示结果区域
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    // 设置风险等级
    const riskLevelDiv = document.getElementById('riskLevel');
    riskLevelDiv.className = `risk-level ${result.class}`;

    // 添加图标到风险等级
    let icon = '';
    if (result.class === 'risk-low') {
        icon = '<i class="bi bi-emoji-smile-fill me-2"></i>';
    } else if (result.class === 'risk-medium') {
        icon = '<i class="bi bi-exclamation-triangle-fill me-2"></i>';
    } else {
        icon = '<i class="bi bi-exclamation-octagon-fill me-2"></i>';
    }
    riskLevelDiv.innerHTML = icon + result.level;

    // 设置描述
    document.getElementById('riskDescription').innerHTML = result.description;

    // 滚动到结果区域
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 重置问卷
function resetQuiz() {
    // 重置表单
    document.getElementById('questionnaire').reset();

    // 隐藏结果
    document.getElementById('result').classList.add('hidden');

    // 显示问卷
    document.getElementById('questionnaire').classList.remove('hidden');

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 移动端tooltip位置调整 - 确保不超出卡片且最大宽度300px
let activeTooltipTimer = null;
let activeTooltipIcon = null;

function adjustTooltipPosition() {
    if (window.innerWidth <= 768) {
        const tooltipIcons = document.querySelectorAll('.tooltip-icon');

        tooltipIcons.forEach(icon => {
            // 鼠标悬停时调整
            icon.addEventListener('mouseenter', function() {
                adjustSingleTooltip(this);
            });

            // 移动端触摸支持 - 点击切换显示/隐藏
            icon.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 如果当前tooltip已经激活，点击后立即关闭
                if (this.classList.contains('tooltip-active')) {
                    this.classList.remove('tooltip-active');
                    if (activeTooltipTimer) {
                        clearTimeout(activeTooltipTimer);
                        activeTooltipTimer = null;
                    }
                    activeTooltipIcon = null;
                    return;
                }

                // 关闭之前打开的tooltip
                if (activeTooltipIcon && activeTooltipIcon !== this) {
                    activeTooltipIcon.classList.remove('tooltip-active');
                    if (activeTooltipTimer) {
                        clearTimeout(activeTooltipTimer);
                    }
                }

                // 打开当前tooltip
                adjustSingleTooltip(this);
                this.classList.add('tooltip-active');
                activeTooltipIcon = this;

                // 3秒后自动关闭
                activeTooltipTimer = setTimeout(() => {
                    this.classList.remove('tooltip-active');
                    activeTooltipIcon = null;
                    activeTooltipTimer = null;
                }, 3000);
            });
        });

        // 点击页面其他地方关闭tooltip
        document.addEventListener('touchstart', function(e) {
            if (activeTooltipIcon && !e.target.closest('.tooltip-icon')) {
                activeTooltipIcon.classList.remove('tooltip-active');
                if (activeTooltipTimer) {
                    clearTimeout(activeTooltipTimer);
                    activeTooltipTimer = null;
                }
                activeTooltipIcon = null;
            }
        });
    }
}

function adjustSingleTooltip(icon) {
    const card = icon.closest('.card-body');
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    const cardWidth = cardRect.width;

    // 判断icon是靠近左边还是右边（以卡片中心线为界）
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const isNearLeft = iconCenterX < cardCenterX;

    // 计算tooltip宽度（最小200px，最大300px，且不超出卡片）
    const availableWidth = cardWidth - 20; // 左右各留10px
    const tooltipWidth = Math.max(200, Math.min(300, availableWidth));

    // 计算icon中心点相对于卡片左边的距离
    const iconCenterRelativeToCard = iconRect.left - cardRect.left + iconRect.width / 2;

    let leftValue, rightValue, arrowLeftValue, arrowRightValue;

    if (isNearLeft) {
        // icon靠近左边，tooltip左对齐，距离卡片左边20px
        leftValue = '20px';
        rightValue = 'auto';
        // 箭头位置 = icon中心相对于卡片 - tooltip左边距（40px）
        const arrowLeft = iconCenterRelativeToCard - 40;
        arrowLeftValue = arrowLeft + 'px';
        arrowRightValue = 'auto';
    } else {
        // icon靠近右边，tooltip右对齐，距离卡片右边40px
        leftValue = 'auto';
        rightValue = '20px';
        // 箭头位置 = 卡片宽度 - icon中心相对于卡片 - tooltip右边距（40px）
        const arrowRight = cardWidth - iconCenterRelativeToCard - 40;
        arrowLeftValue = 'auto';
        arrowRightValue = arrowRight + 'px';
    }

    // 设置CSS变量
    icon.style.setProperty('--tooltip-width', tooltipWidth + 'px');
    icon.style.setProperty('--tooltip-left', leftValue);
    icon.style.setProperty('--tooltip-right', rightValue);
    icon.style.setProperty('--tooltip-arrow-left', arrowLeftValue);
    icon.style.setProperty('--tooltip-arrow-right', arrowRightValue);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', adjustTooltipPosition);

// 窗口大小改变时重新调整
window.addEventListener('resize', adjustTooltipPosition);

// 提示信息
console.log('癌症风险评估问卷已加载');
console.log('注意：本评估结果仅供参考，不能替代专业医疗诊断');
