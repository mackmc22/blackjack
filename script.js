


function deal() {
    axios.get("http://127.0.0.1:8000/api/game/234")
        .then(d => d.data)
        .then(data => {
            return data;
        })
}

let hitButton = document.querySelector("#hit");
hitButton.onclick = () => deal();

let player_cards = document.querySelector("#player_cards");
player_cards.innerHTML = deal();