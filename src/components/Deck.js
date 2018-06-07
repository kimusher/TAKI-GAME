import Card from './Card.js'
export default class Deck {
    constructor() {
        this.getAllCardsBack
        this.cards = [];
        this.setCardsRetrive = function (callback) {
            this.getAllCardsBack = callback;
        }
    }
    createDeck() {
        let names = ['1','2plus', '3', '4', '5', '6', '7', '8', '9', 'plus', 'stop', 'taki'];
        let colors = ['blue', 'green', 'yellow', 'red'];
        for (let s = 0; s < colors.length; s++) {
            for (let n = 0; n < names.length; n++) {
                if (names[n] == 'taki' || names[n] == 'stop' || names[n] == 'plus' || names[n] == '2plus') {
                    this.cards.push( new Card(names[n], colors[s], true) );
                    this.cards.push( new Card(names[n], colors[s], true) );
                } else {
                    this.cards.push( new Card(names[n], colors[s], false) );
                    this.cards.push( new Card(names[n], colors[s], false) );
                }
            }
        }
        for (let i = 0; i < 2; i++)
            this.cards.push(new Card('taki', 'colorful', true));
        for (let i = 0; i < 4; i++)
            this.cards.push(new Card('changecolor', 'colorful', true));
    }
    getStartingCards(numOfCards) {
        let cards = [];
        for (var i = 0; i < numOfCards; i++) {
            cards.push(this.getCard());
        }
        return cards;
    }

    getCard() {
        var card = this.cards.pop();
        if (this.cards.length <= 0) {
            this.cards = this.getAllCardsBack();
        }
        return card;
    }
    returnCard(card) {
        this.cards.push(card);
    }
    
    fillDeck(cards) {
        for (var i = 0; i < cards.length; i++){
            this.cards.push(cards[i]);
        }
        this.shuffle();
    }

    shuffle() {
        var i = this.cards.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = temp;
        }
    }

}
Array.prototype.getLast = function(){
    return this[this.length - 1];
}