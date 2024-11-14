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
    sessionStorage.setItem('blog_website_login', 'false');
    freshPage();
}

const freshPage = () => {
    const d_write_blog = document.getElementById("d-write-blog");
    const authBtn = document.getElementById("auth-btn");
    const setting_btn = document.getElementById("setting-btn");
    const status = sessionStorage.getItem('blog_website_login');

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
                    // window.location.href = `${Page_Blog_Home}`;
                }
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
            }
        });

    }
}