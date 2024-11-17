function openAuthPopup() {
    const state = Math.floor(Math.random() * Math.pow(10, 8));
    localStorage.setItem("state", state);
    let url;
    const currentUrl = window.location.href;
    const urlWithoutSlash = currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl;
    url = `https://github.com/login/oauth/authorize?client_id=Iv23liOH77T5kmvXYkx8&redirect_uri=${urlWithoutSlash}&allow_signup=true&scope=user:email&state=${state}`;
    window.location.href = url;
}

// 登录认证

function logout() {
    $.ajax({
        url: backend_url + '/logout',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function () {
            sessionStorage.setItem('blog_website_login', 'false');
            freshPage();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

}

const freshPage = () => {
    const d_write_blog = document.getElementById("d-write-blog");
    const authBtn = document.getElementById("auth-btn");
    const setting_btn = document.getElementById("setting-btn");
    const status = sessionStorage.getItem('blog_website_login');
    const btn_login_homepage = document.getElementById("auth-btn_homepage");
    const btn_logout = document.getElementById("btn_logout");

    if (status === 'true') { // 登录成功
        if (d_write_blog) {
            d_write_blog.style.opacity = 1;
            d_write_blog.style.pointerEvents = 'auto';
        }
        if (authBtn) {
            authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> 注销'; // 更改为退出登录
            authBtn.onclick = (event) => {
                event.preventDefault();
                logout();
            }
        }
        if (setting_btn) {
            setting_btn.style.display = 'block';
        }
        if (btn_login_homepage) {
            btn_login_homepage.style.display = "none";
        }
        if (btn_logout) {
            btn_logout.style.display = "block";
        }
    }
    else {
        if (d_write_blog) {
            d_write_blog.style.opacity = 0;
            d_write_blog.style.pointerEvents = 'none';
        }
        if (authBtn) {
            authBtn.innerHTML = '<i class="fab fa-github"></i> 登录';
            authBtn.onclick = () => {
                openAuthPopup();
            };
        }
        if (setting_btn) {
            setting_btn.style.display = 'none';
        }
        if (btn_login_homepage) {
            btn_login_homepage.style.display = "block";
        }
        if (btn_logout) {
            btn_logout.style.display = "none";
        }
    }
}

const authorize = () => {
    freshPage();
    // 获取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const prevState = localStorage.getItem("state");
    if (state && state !== prevState) {
        console.log("state changed.");
        window.location.href=window.location.origin
    }
    // 检查参数是否存在
    else if (code && state) {
        const status = sessionStorage.getItem('blog_website_login');
        if (status === 'true') return; // 如果已授权就返回
        // 显示加载弹窗
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) {
            loadingModal.style.display = 'block';
        }
        // 将参数发送给后端
        const currentUrl = window.location.href;
        const url = new URL(currentUrl); // 创建 URL 对象
        const tempUrl = url.origin + url.pathname;
        const baseUrl = tempUrl.endsWith('/') ? tempUrl.slice(0, -1) : tempUrl; // 如果末尾有 '/', 就去掉
        $.ajax({
            url: backend_url + '/auth',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: {
                code
            },
            success: function (data) {
                const res = data ? 'true' : 'false';
                sessionStorage.setItem('blog_website_login', res);
                console.log('授权结果：' + res);
                document.body.classList.add('disabled');
                freshPage();
                document.body.classList.remove('disabled');

                // 隐藏加载弹窗
                if (loadingModal) {
                    loadingModal.style.display = 'none';
                }
                if (!data) { // 授权失败
                    alert("您不在白名单当中，请联系网站管理员");
                }
                window.location.href = baseUrl.toString();
            },
            error: function (xhr, status, error) {
                if (loadingModal) {
                    loadingModal.style.display = 'none';
                }
                if (xhr.status === 500) {
                    console.error("服务器异常：", xhr.responseText);
                    alert(xhr.responseText);
                } else {
                    console.error("Error sending string:", error);
                }
                window.location.href = baseUrl.toString();
            }
        });

    }
}


// 创建并显示气泡提示（Toast）
function showToast(message, position = 'top-right', bgColor = 'bg-success', textColor = 'text-white', autoHideDelay = 3000) {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', 'align-items-center', bgColor, textColor, 'border-0');
    toastElement.style.position = 'fixed';
    toastElement.style.zIndex = 99999

    // 设置气泡的位置（可以是 top-left, top-right, bottom-left, bottom-right）
    switch (position) {
        case 'top-left':
            toastElement.style.top = '20px';
            toastElement.style.left = '20px';
            break;
        case 'top-right':
            toastElement.style.top = '20px';
            toastElement.style.right = '20px';
            break;
        case 'bottom-left':
            toastElement.style.bottom = '20px';
            toastElement.style.left = '20px';
            break;
        case 'bottom-right':
            toastElement.style.bottom = '20px';
            toastElement.style.right = '20px';
            break;
        default:
            toastElement.style.top = '20px';
            toastElement.style.right = '20px';
            break;
    }

    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    // 将 Toast 添加到页面中
    document.body.appendChild(toastElement);

    // 初始化并显示 Toast
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: autoHideDelay // 设置气泡显示时间
    });
    toast.show();

    // 删除气泡元素
    toastElement.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toastElement);
    });
}
