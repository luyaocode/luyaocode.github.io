// 线上环境
const backend_url = "https://api.chaosgomoku.fun:5001";
const ws_url=       "wss://api.chaosgomoku.fun:5001";
const backend_yingwu = "https://api.chaosgomoku.fun:8080";
// 本地测试时修改为
// const backend_url = "http://localhost:5001";
// const ws_url=       "ws://localhost:5001";
// const backend_yingwu = "http://localhost:8080";

// url
const Homepage="/";
const Page_Blog_Home = "/blog/home";
const Page_Blog_Blog = "/md/page/detail";
const Page_Blog_Setting = "/blog/setting";
const Page_Blog_Update = "/md/page/update";
const Page_Blog_Write = "/md/page/write";

const Page_Yingwu_Home = "/YingWuNetdisk/home";

// 服务器状态码
const StatusCode = {
    Unauthorized:401,
}

// 样式
const SettingType = {
    StylePreference: 1

}

const CustomStyle = {
    WhiteMode: 1,
    NightMode: 2,
}

// 缓存字段
const ItemKey = {
    Preview_File_Info:"xiaoeyu_pre_file_info",
}