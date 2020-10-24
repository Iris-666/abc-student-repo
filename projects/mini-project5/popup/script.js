// chrome.runtime.sendMessage({
//         type: "getCurrentValue"
//     },
//     function(response) {
//         console.log('response is', response)
//         currentValue = response.value;
//         counter.innerHTML = currentValue;
//     }
// );

let button = document.getElementById('button')

button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ key: "iris" })
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message)
})