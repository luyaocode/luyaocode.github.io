// 获取气泡容器
const bubbleContainer = document.getElementById('bubbles');

// 生成气泡
function createBubble() {
    // 创建气泡元素
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // 随机生成气泡的大小
    const size = Math.random() * 50 + 20; // 气泡大小在20到70之间
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // 随机生成气泡的横向偏移
    const randomX = (Math.random() - 0.5) * 2 * window.innerWidth; // 水平方向随机偏移
    bubble.style.setProperty('--random-x', `${randomX}px`);

    // 添加气泡到容器
    bubbleContainer.appendChild(bubble);

    // 移除气泡（为了清理不再需要的气泡）
    setTimeout(() => {
        bubble.remove();
    }, 5000); // 5秒后气泡消失
}

// 不断生成气泡
setInterval(createBubble, 200); // 每200毫秒生成一个气泡