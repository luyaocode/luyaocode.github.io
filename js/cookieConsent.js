(function() {
  // 动态加载外部 CSS 文件
  var scriptPath = document.currentScript.src;  // 获取当前脚本的完整路径
  var basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
  var cssPath = basePath + '/../css/cookieConsent.css';
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssPath;
  document.head.appendChild(link);  // 将 CSS 文件添加到 <head> 部分

  // 创建并设置 Cookie 同意弹窗的 HTML
  function createCookieConsentBanner() {
    // 检查是否已有同意的 Cookie
    if (getCookie('cookieConsent') === 'true') {
      return; // 如果已经同意，直接返回，不显示弹窗
    }

    // 创建 Cookie 同意弹窗的 div
    const banner = document.createElement('div');
    banner.id = 'cookieConsentBanner'; // 设置 ID，用于 CSS 样式
    banner.innerHTML = `
      我们使用 cookies 来确保您在我们的网站上获得最佳体验。<br>
      <button id="acceptCookieBtn">同意</button>
      <button id="rejectCookieBtn">拒绝</button>
    `;

    // 将弹窗添加到页面
    document.body.appendChild(banner);

    // 设置按钮的点击事件
    document.getElementById('acceptCookieBtn').addEventListener('click', function() {
      // 设置 cookie，记录用户同意
      document.cookie = 'cookieConsent=true; path=/; max-age=' + 60 * 60 * 24 * 365 + '; Secure; SameSite=None'; // 有效期1年，确保跨域时使用 Secure 和 SameSite=None
      console.log('同意cookie:', document.cookie); // 输出当前 cookie 内容进行调试
      banner.style.display = 'none'; // 隐藏弹窗
    });

    document.getElementById('rejectCookieBtn').addEventListener('click', function() {
      // 设置 cookie，记录用户拒绝
      document.cookie = 'cookieConsent=false; path=/; max-age=' + 60 * 60 * 24 * 365 + '; Secure; SameSite=None'; // 有效期1年
      console.log('拒绝cookie:', document.cookie); // 输出当前 cookie 内容进行调试
      banner.style.display = 'none'; // 隐藏弹窗
    });
  }

  // 在页面加载完成后初始化弹窗
  window.addEventListener('load', createCookieConsentBanner);
})();

// 获取 Cookie 值的辅助函数
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}


// 震动效果函数
function shakeCookieBanner() {
  showCookieBanner();
  // 获取 Cookie 弹窗元素
  const cookieBanner = document.getElementById('cookieConsentBanner');
  if (cookieBanner) {
      cookieBanner.classList.add('shake');
      setTimeout(() => {
        cookieBanner.classList.remove('shake');
      }, 500);
  }
}

function showCookieBanner() {
  const cookieBanner = document.getElementById('cookieConsentBanner');
  cookieBanner.style.display = "block";
}
