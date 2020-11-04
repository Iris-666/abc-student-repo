console.log("this is popup script");

let button = document.getElementById("bookmark");
button.onclick = () => {
    let status = document.getElementById("status");
    status.innerHTML = "Added!"
    button.style.boxShadow = "inset 5px 5px 10px #cccc96, inset -5px -5px 10px #ffffe0"
    chrome.runtime.sendMessage({type: "getScrollPosition"});
    // chrome.tabs.sendMessage(tabs[0].id, {type:"getScrollPosition"});
}
