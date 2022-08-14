console.log("background ran");
let dev = true;
let domain = dev ? "http://localhost:8000/" : "https://myleetcodetracker.com/";

getTokenAndCall('user');

function ajaxCall(method, path, data, token, callback){
    fetch(domain+path, {
        method: method,
        headers: {
            // Authorization: `token ${token}`,
            token: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        ...(method!='GET') && {body: JSON.stringify(data)}
        // body: JSON.stringify(data)

})
    .then(res => res.json())
    .then(response => {
        console.log('server response', response)
        callback(response);
    }).catch((error) => {
        console.log(error)
        callback(error)
    });
}



chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        let userCreds;
        switch(message.type) {
            case "login":
                console.log("get data from login: ", message);
                userCreds = message.data;
                userCreds.username = message.data.email.split("@")[0];
                ajaxCall('POST', "user/login", userCreds, "", function (response) {
                    console.log("response from the server: ", response);
                    setStorageItem('user', response);
                    sendResponse(response);
                });
            case "signup":
                console.log("get data from signup: ", message);
                userCreds = message.data;
                userCreds.username = message.data.email.split("@")[0];
                ajaxCall('POST', "user/signup", userCreds, "", function (response) {
                    console.log("response from the server: ", response);
                    sendResponse(response);
                });
                return true;
            case "tag":
                console.log("get question id and name: ", message.data);
                return true;
            default:
                console.log("couldn't find matching case");
        }
    }
)

function setStorageItem(varName, data) {
    console.log("varName: ", varName);
    if (varName != "searchPageData") {
        chrome.storage.local.set({[varName]: JSON.stringify(data)}, function() {
            console.log("data: ", {[varName]: data}, " stored");
        });
    }
}

function getTokenAndCall(varName, callback) {
    console.log(typeof callback);
    chrome.storage.local.get([varName], function (result) {
        userData = JSON.parse(result[varName]);

        // ajaxCall("GET", "user/me", {}, userData ? userData.token : "", function (response) {
        //     console.log("response from server is: ", response);
        // });
        ajaxCall("GET", "user/me", {}, userData ? userData.token : "", function (response) {
            console.log("response from server is: ", response);
        });
    });
}
