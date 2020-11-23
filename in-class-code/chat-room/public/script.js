let socket = io();
let namebox = document.getElementById('name');
let chatbox = document.getElementById('chat');
let messagebox = document.getElementById('message');
let sendbutton = document.getElementById('send');

sendbutton.addEventListener('click', () => {
    let name = namebox.value.trim();
    if (name == "") {
        name = "anonymous"
        namebox.value = ""
    }
    let message = messagebox.value.trim();
    if (messagebox != "") {
        //send name and message to server
        let data = { name: name, message: message }
        socket.emit('message', data)
        console.log(data)
    }
    messagebox.value = ""
})


socket.on("incoming", (data) => {
    console.log(data)
    let name = data.name;
    let message = data.message;
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerHTML = "<span class='sender'>" + name + ":</span>" + message;
    li.appendChild(p)
    chatbox.appendChild(li)
    chatbox.scrollTop = chatbox.scrollHeight
})


//from https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
var input = document.getElementById("message");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        // event.preventDefault();
        // Trigger the button element with a click
        sendbutton.click();
    }
});