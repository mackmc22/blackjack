function getRandomArbitrary(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}

//dealer and player classes - 1 instance of each player, accesses game functions, holds cards dealt, holds score total
class Dealer{
    constructor(game, player){
        this.hand = [];
        this.dealer_score = 0;
        this.game = game;
        this.player = player;

        let standButton = document.querySelector("#stand");
        standButton.onclick = () => this.stand();
    }

    stand(){

        //when stand is pushed by player, dealer plays
        //always start by dealing card (1 by 1)
        this.deal();


        let dealer_outcome = document.querySelector("#dealer_outcome");


        //continue until dealer score <16
        while (true){

            if (this.dealer_score > 21){
                dealer_outcome.innerHTML = "Dealer busts, you win!";
                break;
            }

            if (this.dealer_score < 16){
                this.deal();
                continue;
            }

            if (this.dealer_score >16){
                if (this.player.player_score <= this.dealer_score){
                    dealer_outcome.innerHTML = "Dealer wins!";
                    break;
                }

                else{
                    dealer_outcome.innerHTML = "You win!";
                    break;
                }


            }
        }

    }


    deal(){
        let new_card = this.game.deal();
        this.hand.push(new_card);

        let dealer_cards = document.querySelector("#dealer_cards");
        dealer_cards.innerHTML = this.hand;

        this.calculate_card_total();

    }

    calculate_card_total(score){
        this.dealer_score = this.game.calculate_card_total(this.hand);
        }

}

class Player{
    constructor(game){
    this.hand = [];
    this.player_score = 0;
    this.game = game;


    let hitButton = document.querySelector("#hit");
    hitButton.onclick = () => this.deal();
    }


    deal(){
        let new_card = this.game.deal();
        this.hand.push(new_card);

        let player_cards = document.querySelector("#player_cards");
        player_cards.innerHTML = this.hand;

        this.calculate_card_total();
        console.log('player', this.player_score);
    }

    calculate_card_total(score){
        this.player_score = this.game.calculate_card_total(this.hand);

        let player_outcome = document.querySelector("#player_outcome");

        if (this.player_score > 21){
            player_outcome.innerHTML = "Bust";
         }
         if (this.player_score == 21){
            player_outcome.innerHTML = "Blackjack, you win!";
         }
    }



}


//game handles deck and functions: dealing, hit, stand, sorting cards, calculate card total
class Game{

    constructor(player, dealer){
        //this.deck_cards = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6 ,6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K', 'A', 'A', 'A', 'A'];
        this.deck_cards = [10, 'J', 9, 8];
        this.player = player;
        this.dealer = dealer;
        // moved to classes - this.hand = [];

    }


    deal(){


      //let chosen_card_index = getRandomArbitrary(0,this.deck_cards.length);
      let chosen_card_index = 0;
      let chosen_card = this.deck_cards[chosen_card_index];

      let before = this.deck_cards.slice(0, chosen_card_index);
      let after = this.deck_cards.slice(chosen_card_index + 1);

      this.deck_cards = before.concat(after);

      return chosen_card
    }

    calculate_card_total(hand){
        this.score = 0;
        this.hand = [];

        this.sort_cards_save_to_cards();

        for (let i = 0; i < this.hand.length; i++){
            if (['J', 'Q', 'K'].includes(this.hand[i])){
                this.player_score += 10;
                continue;
            }

            if (this.hand[i]  == 'A'){
                if (this.score > 10){
                this.score += 1;
                }
                else{
                this.score += 11;
                }
                continue;
            }

            // handle non-jqka cards
            return this.score += this.hand[i];
        }
    }

    sort_cards_save_to_cards(){
        let non_aces = [];
        let all_aces = [];

        for (let i = 0; i < this.hand.length; i++){
          if (this.hand[i]  == 'A'){
            all_aces.push(this.hand[i]);
          }
          else{
            non_aces.push(this.hand[i]);
          }
        }

        this.hand = non_aces.concat(all_aces);
    }



}

let the_game = new Game();
let player = new Player(the_game);
let dealer = new Dealer(the_game, player);




