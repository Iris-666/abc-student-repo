console.log('hello this is the script')
let button = document.getElementById('button')
let secretInput = document.getElementById('secret')

button.addEventListener('click', () => {
    let secret = secretInput.value;
    console.log(secret)
    window.location.href = "/secret?word=" + secret
})