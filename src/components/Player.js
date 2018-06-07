import Stats from "./Stats.js";
 
export default class Player{
    constructor(id){
        this.ID = id;
        this.cards = [];
        this.stats = new Stats();
        this.ColorEnum = Object.freeze({ 1: 'blue', 2: 'green', 3: 'yellow', 4: 'red' })
    }
    resetStats(){
        this.stats = new Stats();
    }
}
Player.prototype.randColor = function(){
    var num = Math.floor(Math.random() * Math.floor(4)) + 1;
    return this.ColorEnum[num];
}
Player.prototype.updateStats = function(time){
    this.stats.increaseTurns();
    this.stats.addTimetoTotalTime(time)
}
Player.prototype.updateStats = function (time) {
    this.stats.increaseTurns();
    this.stats.addTimetoTotalTime(time)
}
Player.prototype.isLastCard = function(){
    return this.cards.length == 1 ? true:false;
}
Player.prototype.isFinishedCards = function(){
    return this.cards.length == 0 ? true:false;
}
Player.prototype.increaseLastCardCounter = function(){
    this.stats.increaseLastCardTurns();
}
Player.prototype.getStat = function () {
    return this.stats;
}
Player.prototype.addCard = function(card){
    this.cards.push(card);
}
Player.prototype.removeCard =  function(card){
    var index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
}
Player.prototype.removeCards =  function(cards){
    var len = cards.length;
    for (var i = 0; i < len; i++){
        this.removeCard(cards[i]);
    }
}
Player.prototype.removeAllCards = function(){
    let returnValue = [];
    var len = this.cards.length;
    for (var i = 0; i < len; i++){
        returnValue.push(this.cards.pop());
    }
    return returnValue;
}
Player.prototype.getCard = function(cardToSearch){
    var foundCard = null;
    for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            if(card == cardToSearch)
            {
                foundCard = card;
                break;
            }
    }
    return foundCard;
}
Player.prototype.getCardFromPackByName = function(name){
    var foundCard = null;
    for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            if(card.name == name)
            {
                foundCard = card;
                break;
            }
    }
    return foundCard;
}
Player.prototype.getCardFromPackByColor = function(color){
    var foundCard = null;
    for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            if(card.color == color)
            {
                foundCard = card;
                break;
            }
    }
    return foundCard;
}
Player.prototype.getCardFromPackByNameAndColor = function(name, color){
    var foundCard = null;
    for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
        if ((card.name == name && card.color == color) || (card.name.includes('change') && color.includes('change')) )
            {
                foundCard = card;
                break;
            }
    }
    return foundCard;
}
Player.prototype.getAllCards = function(){
    return this.cards;
}
Player.prototype.getAllCardsByColor = function(color){
    var cards = []
    for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];
        if(card.color == color) {
            cards.push(card);
        }
    }
    return cards;
}