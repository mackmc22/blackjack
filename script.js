


function deal() {
    axios.get("http://127.0.0.1:8000/api/game/234/deal")
        .then(d => d.data)
        .then(data => {
            let player_cards = document.querySelector("#player_cards");
            player_cards.innerHTML = data.hand;
            let player_score = document.querySelector("#player_score")
            player_score.innerHTML = data.score;
        })
}

let hitButton = document.querySelector("#hit");
hitButton.onclick = () => deal();


function restart_game(){
    axios.put("http://127.0.0.1:8000/api/game/234/restart")
    }
let restartButton = document.querySelector("#restart");
restartButton.onclick = () => restart_game();


