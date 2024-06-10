function formateDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
