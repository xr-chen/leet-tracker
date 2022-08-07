console.log("background ran");

function ajaxCall(method, url, data, token, callback){
    fetch(url, {
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
ajaxCall('POST',
    "http://localhost:8000/save-products",
    {test: "test data"},
    0,
    function(response) {return 0}
);

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "login":
                console.log("get data from login: ", message);
                return true;
                break;
            case "signup":
                console.log("get data from signup: ", message);
                return true;
                break;
            default:
                console.log("couldn't find matching case");
        }
    }
)

// ajaxCall({
//     url: "http://localhost:8000",
//     data: {test: "test data"},
//     type: 'POST',
//     success: function(response) {
//         console.log('reponse: ', response)
//     },
//     error: function(response) {
//         console.log('reponse: ', response)
//     },
// });
