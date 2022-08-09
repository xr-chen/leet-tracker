console.log("background ran");
let dev = true;
let domain = dev ? "http://localhost:8000/" : "https://myleetcodetracker.com/";


// let key = 'user';
// let value = 0;
// chrome.storage.local.set({[key]:value}, function() {
//     console.log('Value is set to ' + 0);
// });
//
// chrome.storage.local.get([key], function(result) {
//     console.log('Value currently is ' + result[key]);
// });

ajaxCall("GET", "user/me", {}, getStorageItem('user') ? getStorageItem('user').token : "", function (response) {
    console.log("response from server is: ", response);
    console.log("token is: ", getStorageItem('user'));
});

function ajaxCall(method, path, data, token, callback){
    fetch(domain+path, {
        method: method,
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        ...(method!='GET') && {body: JSON.stringify(data)}

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

function getStorageItem(varName) {
    let res = {};
    chrome.storage.local.get([varName], function (result) {
        Object.assign(res, JSON.parse(result[varName]));
        console.log("data in storage api loaded: ", Object.keys(res));
    });
    console.log("Return vals are: ", Object.keys(res));
    return res;
}

function getStorageValuePromise(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], resolve);
    });
}
