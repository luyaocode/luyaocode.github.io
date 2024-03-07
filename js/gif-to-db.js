(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // alert("您是手机登录");
        return ;
    } else {
        // alert("您是电脑登录");
        // if("indexedDB" in window) {
        //     // 支持
        //     console.log(" 支持indexedDB...");
        //     alert("支持");
        // } else {
        //     // 不支持
        //     console.log("不支持indexedDB...");
        //     alert("不支持");
        // }
    }
    // IndexedDB
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
    dbVersion = 1.0;

    // Create/open database
    var request = indexedDB.open("elephantFiles", dbVersion);
    var db;

    request.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };

    request.onsuccess = function (event) {
        // console.log("Success creating/accessing IndexedDB database");
        // 事务
        db=request.result;
        var query=db.transaction(["elephants"], "readwrite").objectStore("elephants").get("image");
        query.onsuccess=function(event){
            // 赋值
            if(event.target.result!==undefined){
                // console.log("太好了，找到一条记录");
                // alert("太好了，找到一条记录");
                var imgFile = event.target.result;
                // console.log("Got elephant!" + imgFile);
                var reader = new window.FileReader();
                // 为甚么入参写blob也行
                reader.readAsDataURL(imgFile);
                // 这段代码阻塞了一下
                reader.onloadend = function() {
                //   console.log("reader=="+reader.result);
                // alert("reader=="+reader.result)
                //   imgElephant.setAttribute("src", reader.result+'');
                    var url='url('+reader.result+')';
                    // alert("url=="+url);
                    document.querySelector(".body-css",null).style.backgroundImage=url;
                // console.log("backurl=="+window.getComputedStyle(document.querySelector('.body-css',null)).backgroundImage);
                // alert("backurl=="+window.getComputedStyle(document.querySelector('.body-css',null)).backgroundImage);
                }
            }else{
                // console.log("抱歉，没查到呢");
                // alert("抱歉，没查到呢");
                var blob=null;
                // createObjectStore = function (dataBase) {
                //     // Create an objectStore
                //     console.log("Creating objectStore")
                //     dataBase.createObjectStore("elephants");
                // },
                getImageFile(db,blob);
            }
        }
        db.onerror = function (event) {
            console.log("Error creating/accessing IndexedDB database");
        }
    }
        //     // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    //     if (db.setVersion) {
    //         if (db.version != dbVersion) {
    //             var setVersion = db.setVersion(dbVersion);
    //             setVersion.onsuccess = function () {
    //                 createObjectStore(db);
    //                 getImageFile();
    //             };
    //         }else {
    //             getImageFile();
    //         }
    //     }
    // }

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
        // console.log("Creating objectStore")
        event.target.result.createObjectStore("elephants");
    }
})();
function getImageFile(db,blob){
    // Create XHR
    var xhr = new XMLHttpRequest();
    // console.log("xhr");
    // alert("xhr")

    xhr.open("GET", "./img/back.gif", true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
        // console.log("Image retrieved");

        // Blob as response
        blob = xhr.response;
        // console.log("Blob:" + blob);

        // Put the received blob into IndexedDB
        putElephantInDb(db,blob);
    }
    }, false);
    // Send XHR
    xhr.send();
};

function putElephantInDb (db,blob) {
    // console.log("Putting elephants in IndexedDB");

    // Open a transaction to the database
    var transaction = db.transaction(["elephants"], "readwrite");

    // Put the blob into the dabase
    var put = transaction.objectStore("elephants").put(blob, "image");

    // Retrieve the file that was just stored
    transaction.objectStore("elephants").get("image").onsuccess = function (event) {
        var imgFile = event.target.result;
        // console.log("Got elephant!" + imgFile);
        // Set img src to ObjectURL
        var imgElephant = document.getElementById("body");
        var backurl=window.getComputedStyle(document.querySelector('.body-css',null)).backgroundImage;
        // console.log("初始的backurl=="+backurl);
        // console.log(imgElephant.getAttribute("src"));//null
        // Get window.URL object
        // var URL = window.URL || window.webkitURL;
        // console.log('URL=='+URL);

        // Create and revoke ObjectURL
        // var imgURL = URL.createObjectURL(imgFile);
        // console.log('imgURL=='+imgURL);

        var reader = new window.FileReader();
        // 为甚么入参写blob也行
        reader.readAsDataURL(imgFile);
        // 这段代码阻塞了一下
        reader.onloadend = function() {
        //   console.log("reader=="+reader.result);
        //   imgElephant.setAttribute("src", reader.result+'');
            var url='url('+reader.result+')'
            document.querySelector(".body-css",null).style.backgroundImage=url;
            // console.log("backurl=="+window.getComputedStyle(document.querySelector('.body-css',null)).backgroundImage);
        }
    }
};
