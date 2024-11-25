// 线上环境
const backend_url = "https://api.chaosgomoku.fun:5001";
const ws_url=       "wss://api.chaosgomoku.fun:5001";
const backend_yingwu = "https://api.chaosgomoku.fun:8080";
// 本地测试时修改为
// const backend_url = "http://localhost:5001";
// const ws_url=       "ws://localhost:5001";
// const backend_yingwu = "http://localhost:8080";

// url
const Homepage = "/";//网站主界面
const NotFound = "404";//404界面
const Page_Blog_Home = "/blog/home";// 博客主界面
const Page_Blog_Blog = "/md/page/detail";// 博客阅读界面
const Page_Blog_Setting = "/blog/setting";// 设置界面
const Page_Blog_Update = "/md/page/update";// 更新界面
const Page_Blog_Write = "/md/page/write";//写作界面
const Page_Blog_Write_Through = "/md/page/write-through";// 笔记界面
const Page_Yingwu_Home = "/YingWuNetdisk/home";//云盘界面

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