function formateDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function formatDateFull(isoString) {
    // 解析 ISO 字符串为 Date 对象
    const date = new Date(isoString);

    // 获取各个时间部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // 月份从 0 开始，所以要加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
