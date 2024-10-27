function enableUnloadWarning(message) {
    window.addEventListener("beforeunload", function (event) {
        event.preventDefault(); // 取消默认行为
        // 一些浏览器可能需要设置 returnValue
        event.returnValue = message; // 兼容性处理
        return message; // 旧版浏览器
    });
}
