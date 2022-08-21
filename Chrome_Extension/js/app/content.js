console.log("content script ran");

let url = window.location.href;
console.log("current url is: ", url);
// if (url.includes("problems")) {
//     let questionTitle = document.querySelector("div.css-v3d350").textContent
//     console.log(questionTitle);
// }

window.addEventListener("load", function () {
    let selected = document.querySelector("div.css-10o4wqw");
    let questionName = document.querySelector("div.css-v3d350").textContent;
    let splited = questionName.split(". ");
    let ele = document.createElement("div");
    ele.innerHTML = `
    <button id="tag" class="btn__r7r7 css-1rdgofi">
        <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
            <path fill-rule="evenodd" d="M12 1c6.074 0 10.999 4.925 10.999 11 0 6.074-4.925 10.999-11 10.999-6.074 0-10.999-4.925-10.999-11C1 5.925 5.925 1 12 1zm0 18.173a7.174 7.174 0 10-.001-14.347 7.174 7.174 0 000 14.347zm0-3.653a3.52 3.52 0 110-7.04 3.52 3.52 0 010 7.04z">
            </path>
        </svg>
        <span>Track your progress</span>
    </button>`;
    selected.appendChild(ele);
    console.log(ele);
    document.getElementById("tag").addEventListener("click", sendRecord(splited));
});



function sendRecord(splited) {
    // definition of progress schema
    // _id: Number,
    //     name: String,
    //     category: String,
    //     subCate: String,
    //     url: String,
    //     records: [{type: Date, default: Date.now}]
    let dataObj = {}
    dataObj._id = parseInt(splited[0]);
    dataObj.name = splited[1];
    // TODO: fill cate and subcate
    dataObj.category = "";
    dataObj.subCate = "";
    dataObj.url = url;
    chrome.runtime.sendMessage({type: "tag", data: dataObj},
        function (response) {
            console.log("response from background is: ", response);
        }
    );
}
// console.log(`No. (questionTitle[0]), Name ($questionTitle[2])`)
