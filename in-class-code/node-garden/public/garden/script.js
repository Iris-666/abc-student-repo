console.log('WELCOME TO GARDEN')

let lookButton = document.getElementById('look');
let giftInput = document.getElementById('gift');
let sendGift = document.getElementById('sendGift');
let garden = document.getElementById('garden')

sendGift.addEventListener('click', () => {
    let gift = giftInput.value;
    fetch("/gift?gift=" + gift);

    giftInput.value = "";
})

// function receivedGift(data) {
//     console.log(data)
// }
// function decode(data) {
//     return data.json();
// }
lookButton.addEventListener('click', () => {
    fetch("/getGifts")
        .then((data) => { return data.json() })
        .then(data => {
            console.log('decoded: ', data);
            let gifts = data.content;
            garden.innerHTML = "";
            for (let i = 0; i < gifts.length; i++) {
                let gift = gifts[i];
                let p = document.createElement('p');
                p.innerHTML = gift;
                p.style.position = 'absolute';
                p.style.left = Math.random() * window.innerWidth + 'px'
                p.style.top = Math.random() * window.innerHeight + 'px'
                garden.appendChild(p)
            }
        })
})