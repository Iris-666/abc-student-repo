let toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
    let checked = toggle.checked;


    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let message = {
            toggle: checked,
        }
        chrome.tabs.sendMessage(tabs[0].id, message);
    });

})