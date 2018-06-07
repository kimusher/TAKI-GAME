import React from "react";

import Player from "./Player.js";
import Computer from "./Computer.js";
import Card from "./Card.js";
import Deck from "./Deck.js";
import Board from "./Board.js";
import Logic from './Logic.js';
import { ENGINE_METHOD_DIGESTS } from "constants";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.gameRules;
        this.logic = new Logic();
        this.cardsToTake = 1;
        this.turnsToMove = 1;
        this.needReset = false;
        this.isStarted = false;
        this.gameEnd = false;
        this.resetTimer = false;
        this.history=[];
      
        this.state = {
            numOfPlayers: 1,
            numOfBots: 1,
            numOfPlayerCards: 8,
            startTurnTime: 0,
            takiMode: false,
            takiModeColor: "none",
            activeFilter :false ,
            cardColorFilter: null,
            gamePaused: false,
            Players: [],
            currentPlayerIDTurn:1,
            deck: null,
            pileOfCards: [],
            colorPopupDisplay: "none",
            colorPopupContainerDisplay: "none",
            scoreBoardDisplay: "none",
            scorePopupContainerDisplay: "none",
            winnerId: null,
            endTurnButton: "none",

            replayDisplay: "none",
            turnToDisplay :0
        };
    }

    componentWillMount(){
        this.init();
    }

    init(){
        let newDeck = new Deck();
        newDeck.createDeck();
        newDeck.shuffle();
        let newPlayers = this.setPlayers();
        this.setDeckCallBack(newDeck);
        //this.setGameRules();
        this.setState({
            Players : newPlayers,
            deck: newDeck
        })
    }

    startGame(){
        if (!this.isStarted){
            this.dealFirstCards();
            this.drawFirstCard();
            this.isStarted = true;
            this.gameEnd = false;
            this.resetTimer = false;
            this.history.push(this.copyState());
        }
    }

    emptyPileResetAndReturnToDeck(){
        var newPile = [];
        var card = this.state.pileOfCards.getLast();
        newPile.push(card);
        var cards = this.state.pileOfCards;
        this.setState({pileOfCards: newPile});
        this.resetPileCards(cards);
        return cards;
    }

    resetPileCards(cards){
        var numOfGreen, numOfYellow, numOfBlue, numOfRed, numOfColorful;
        numOfGreen = numOfYellow = numOfBlue = numOfRed = numOfColorful = 2;
        
        for (var i = 0; i < cards.length; i++){
            if (cards[i].name == 'changecolor'){
                cards[i].color = 'colorful';
            }
			cards[i].isActive = true;
            if (cards[i].name == 'taki'){
                if (numOfBlue > 0){
                    cards[i].color == 'blue';
                    numOfBlue--;
                } else if (numOfGreen > 0){
                    cards[i].color == 'green';
                    numOfGreen--;
                } else if (numOfRed > 0){
                    cards[i].color == 'red';
                    numOfRed--;
                } else if (numOfYellow > 0){
                    cards[i].color == 'yellow';
                    numOfYellow--;
                }else if (numOfColorful > 0){
                    cards[i].color == 'colorful';
                    numOfColorful--;
                }
            }
        }
    }

    drawFirstCard(){
        var card = this.state.deck.getCard();
        card.isActive = false;
        while (card.color == 'colorful'){ // we dont start with a colorful card
            this.state.deck.returnCard(card);
            this.state.deck.shuffle();
            card = this.state.deck.getCard();
        }
        let pile = this.state.pileOfCards;
        pile.push(card);
        //TODO:: MAKE THE FUNCTION BELLOW WORK IN REACT
        this.setState({
            startTurnTime: Date.now(),
            pileOfCards: pile
        })
    }

    setGameRules(){
        this.gameRules = this.logic.cardPlayed.bind(this)
    }

    setDeckCallBack(deck) {
        deck.setCardsRetrive(this.emptyPileResetAndReturnToDeck.bind(this));
    }

    resetGame(){
        let cards = []
        let newPlayers = [];
        for (var i = 0; i < this.state.Players.length; i++){
            let player = this.state.Players[i];
            let playerCards = player.removeAllCards();
            let len = playerCards.length;
            for (var j = 0; j < len; j++){
                cards.push(playerCards.pop());
            }
            player.resetStats();
            newPlayers.push(player);
        }
    
        var pileCards = this.state.pileOfCards;
        this.resetPileCards(pileCards);
        let len = pileCards.length;
        for (var i = 0; i < len; i++){
            cards.push(pileCards.pop());
        }
        let newDeck = this.state.deck;
        newDeck.fillDeck(cards)
        this.isStarted = false;
        this.resetTimer = true;
        this.history = [];
        let newState = {
            Players: newPlayers,
            pileOfCards: [],
            scoreBoardDisplay: "none",
            scorePopupContainerDisplay: "none",
            gamePaused: false,
            currentPlayerIDTurn: 1,
            deck: newDeck,
        }
        return newState;
    }

    resetAndStartNewGame(){
        let newState = this.resetGame();
        this.setState(newState, this.startGame.bind(this))
    }

    setPlayers() {
        var playersCopy=[];
        for (var i = 0; i < this.state.numOfPlayers; i++) {
            playersCopy.push(new Player(i + 1));
        }
        for (var i = this.state.numOfPlayers; i < this.state.numOfPlayers+this.state.numOfBots; i++){
            playersCopy.push(new Computer(i + 1));
        }
        return playersCopy;
    }

    dealFirstCards() {
        var playersCopy = this.state.Players;
        for (var i = 0; i < this.state.numOfPlayers + this.state.numOfBots; i++) {
            var cards = this.state.deck.getStartingCards(this.state.numOfPlayerCards);
            for (var j = 0; j < this.state.numOfPlayerCards; j++) {
                playersCopy[i].addCard(cards[j]);
            }
        }
        this.setState({
            Players: playersCopy
        })
    }

    checkIfGameWasPaused(event){
        if (this.state.gamePaused){
            return true;
        } else if (event){
            if (event.target){
                if (event.target.id == 'colorPopup'){
                    return true;
                }
            } else{
                return false;
            }
        } else {
            return false;
        }
    }

    onTakeCard(event){
        if (!this.isStarted){
            return;
        }
        if (this.checkIfGameWasPaused(event)){
            return;
        }
        let playerId = this.state.currentPlayerIDTurn;
        let players = this.state.Players;
        if(this.isPlayerTurn(playerId)){
            var topCard = this.state.pileOfCards.getLast();
            var playerCards = players[playerId-1].getAllCards();
            if (!this.logic.canPlayerPlay(topCard, playerCards)){
                for(var i = 0; i < this.cardsToTake; i++){
                    players[playerId-1].addCard(this.state.deck.getCard());
                }
                let newState = {
                    Players : players,
                }
                this.needReset = true;
                if (!(players[playerId-1] instanceof Computer)){
                    this.setState(newState, () => {this.switchTurns()})
                } else {
                    this.setState(newState);
                }
            } else {
                alert("You Can Play !");
            }
        } else {
            alert("Not your turn...");
        }
    }

    onClickCard(event) {
        if (this.checkIfGameWasPaused(event)){
            return;
        }
        var color = event.target.getAttribute("color");
        var name = event.target.getAttribute("name");
        var playerId = parseInt(event.target.getAttribute("ownerid"));
        var card = this.state.Players[playerId - 1].getCardFromPackByNameAndColor(name, color);
        var cards;
        let playedTaki;
        if (this.isPlayerTurn(playerId)) {
            var topCard = this.state.pileOfCards.getLast();
            if (this.logic.isMoveValid(topCard, card)) {
                playedTaki = this.logic.cardPlayed(card, this);
                if (card.name == 'changecolor') {
                    return; //once color will be picked game will continue
                }
                this.moveCardFromPlayerToPile(playerId, card);
                if (this.state.takiMode || playedTaki) {
                    cards = this.state.Players[playerId - 1].getAllCards();
                    topCard = this.state.pileOfCards.getLast();
                    if (this.logic.canPlayerPlayTaki(cards, topCard.color)) {
                        this.resetTurn();
                        return; //let player continue taki...
                    } else {
                        let newState = this.getTakiModeState(false);
                        this.setState(newState);
                    }
                }
                this.switchTurns();
            } else {
                alert("Cant use that card...");
                //TODO :: show that you cant use that card.
            }
        } else {
            alert("Not your turn...");
        }
    }

    moveCardFromPlayerToPile(playerID, card){
        var filtering = this.state.activeFilter;
        if(this.state.activeFilter) {
            filtering = false;
        }
        if (playerID != null){
            if (!(this.state.Players[playerID-1] instanceof Computer)){ //computer remove cards on its own
                this.state.Players[this.state.currentPlayerIDTurn-1].removeCard(card);
            }
        }
        var pile = this.state.pileOfCards;
        pile.push(card);
        this.setState({
                pileOfCards: pile,
                activeFilter: filtering
        })
    }

    getTakiModeState(value, color){
        let display = 'flex';
        if (!value){
            color = "none";
            display = "none";
        }
        let newState = {
            takiMode: value,
            takiModeColor: color,
            endTurnButton: display
        };
        return newState;
    }

    endTurnHandleClick(){
        let newState = this.getTakiModeState(false);
        this.setState(newState, () => {this.switchTurns()});
    }

    isPlayerTurn(playerID) {
        return this.state.currentPlayerIDTurn == playerID;
    }
    
    newTurn() {
        var card = this.state.pileOfCards.pop();
        this.state.pileOfCards.push(card);
        this.playerFinishedTurn();
        let newState = this.getTakiModeState(false);
        newState['startTurnTime'] = Date.now();
        this.setState(newState);
    }

    playerFinishedTurn(){
        this.state.Players[this.state.currentPlayerIDTurn-1].updateStats(Date.now() - this.state.startTurnTime)
        if (this.state.Players[this.state.currentPlayerIDTurn-1].isLastCard())
            this.state.Players[this.state.currentPlayerIDTurn-1].increaseLastCardCounter();
    }

    resetTurn() {
        this.cardsToTake = 1;
        this.turnsToMove = 1;
        this.state.pileOfCards.getLast().isActive = false;
        this.needReset = false;
    }

    playerSurrender(){
        if (this.gameEnd){
            return;
        }
        this.gameEnd = true;
        this.setState({
            winnerId: 2,
            gamePaused: true,
            scoreBoardDisplay: 'inline-block',
            scorePopupContainerDisplay: 'block',
        })
    }
    copyState(){
        var turn={};
        turn.numOfPlayers= this.state.numOfPlayers;
        turn.numOfBots = this.state.numOfBots;
        turn.startTurnTime= this.state.startTurnTime;
        turn.Players =this.setPlayers();
        for (let i = 0; i < this.state.numOfPlayers + this.state.numOfBots; i++) {
            for (let j = 0; j < this.state.Players[i].cards.length; j++) {
                turn.Players[i].cards.push(this.state.Players[i].cards[j]);
            }
        }
        
        turn.currentPlayerIDTurn= this.state.currentPlayerIDTurn;
        turn.deck= this.state.deck;
        turn.pileOfCards=[];
        for (let index = 0; index < this.state.pileOfCards.length; index++) {
            turn.pileOfCards.push(this.state.pileOfCards[index]);
        }
        //turn.resetTimer = this.resetTimer;
        return turn;
    } 

    switchTurns() {
        this.history.push(this.copyState());
        if (this.state.gamePaused){
            return;
        }
        var winnerId = this.checkIfAnyWinners();
        if (winnerId != 0) {
            this.gameEnd = true;
            this.setState({
                winnerId: winnerId,
                gamePaused: true,
                scoreBoardDisplay: 'inline-block',
                scorePopupContainerDisplay: 'block',
            })
            return;
        } else {
            this.newTurn();
            if (this.needReset) {
                this.resetTurn();
            }
            var playerID = ((this.state.currentPlayerIDTurn - 1 + this.turnsToMove) % (this.state.numOfPlayers + this.state.numOfBots)) + 1;

            if (this.state.Players[playerID - 1] instanceof Computer) {
                this.setState({
                    currentPlayerIDTurn: playerID
                }, () => setTimeout(this.makeBotPlay.bind(this), 700))
            }else {
                this.setState({
                    currentPlayerIDTurn: playerID
                })
            }
        }
    }
    displayTurn(i){
        let turn = this.history[i];
        this.setState({
            numOfPlayers: turn.numOfPlayers,
            numOfBots: turn.numOfBots,
            startTurnTime: turn.startTurnTime,
            Players: turn.Players,
            currentPlayerIDTurn: turn.currentPlayerIDTurn,
            deck: turn.deck,
            pileOfCards: turn.pileOfCards,
            //resetTimer: turn.resetTimer
        })
    }

    makeBotPlay(){
        if (this.isStarted){
        var card = this.state.pileOfCards.getLast();
        var color = card.color;
        var resultArray = this.state.Players[this.state.currentPlayerIDTurn-1].play(card);
        if (resultArray == 'takeCard'){
            this.onTakeCard(this.state.currentPlayerIDTurn);
        } else {
            //process cards into pile
            if (Array.isArray(resultArray)){
                card = resultArray.pop()
                if (card.name == 'changecolor'){
                    this.moveCardFromPlayerToPile(this.state.currentPlayerIDTurn, card);
                    card = this.state.pileOfCards.getLast();
                    card.color = resultArray.pop();
                } else {
                    //card is taki
                    this.moveCardFromPlayerToPile(this.state.currentPlayerIDTurn, card);
                    let length = resultArray.length;
                    for (var i = 0; i < length; i++){
                        card = resultArray.pop();
                        this.moveCardFromPlayerToPile(this.state.currentPlayerIDTurn, card);
                    }
                    //make last card count
                    card = this.state.pileOfCards.getLast();
                    if (card.name != 'taki'){
                        this.logic.cardPlayed(card, this);
                    }
                }
            } else if (resultArray instanceof Card){
                //only one card
                card = resultArray;
                this.logic.cardPlayed(card, this);
                this.moveCardFromPlayerToPile(this.state.currentPlayerIDTurn, card);
            }
        }
        this.switchTurns();
    }
}

    checkIfAnyWinners() {
        for (var i = 0; i < this.state.Players.length; i++) {
            if (this.state.Players[i].isFinishedCards()) {
                return i + 1;
            }
        }
        return 0;
    }

    getPlayerStats(){
        let statsArray = [];
        for (var i = 0; i< this.state.Players.length; i++){
            statsArray.push(this.state.Players[i].getStat());
        }
        return statsArray;
    }

    colorButtonClick(event) {
        var color = event.target.id.slice(0,-7);
        var card = this.state.Players[this.state.currentPlayerIDTurn-1].getCardFromPackByNameAndColor('changecolor','colorful');
        card.color = color;
        this.moveCardFromPlayerToPile(this.state.currentPlayerIDTurn, card);
        this.setState({
            cardColorFilter: color,
            activeFilter: true,
            gamePaused: false,
            colorPopupDisplay: 'none',
            colorPopupContainerDisplay: 'none',
        }, () => {this.switchTurns()})
    }
    prevClick(){
        if (this.state.turnToDisplay>0){
            let numTurn = this.state.turnToDisplay - 1;
            this.setState({
                turnToDisplay: numTurn
            })
            this.displayTurn(numTurn);
        }else{
            alert("this is the first turn... cant go more back");
        }
    }
    nextClick() {
        if (this.state.turnToDisplay < this.history.length) {
            let numTurn = this.state.turnToDisplay +1;
            this.setState({
                turnToDisplay: numTurn
            })
            this.displayTurn(numTurn);
        } else {
            alert("this is the last turn... cant go furthermore");
        }
    }
    showReplay(){
        this.setState({
            replayDisplay:"flex",
            scorePopupContainerDisplay:"none",
            scoreBoardDisplay: "none", 
        }, () => {this.displayTurn(0)});
    }

    endReplayHandleClick(){
        this.isStarted = false;
        let newState = this.resetGame();
        newState['replayDisplay'] = 'none';
        this.setState(newState);
    }

    render() {
        return (
            <Board 
                Players = {this.state.Players}
                Deck = {this.state.Deck}
                startGame = {this.startGame.bind(this)}
                endGame = {this.playerSurrender.bind(this)}
                handleClickCard={this.onClickCard.bind(this)}
                handleTakeCard={this.onTakeCard.bind(this)}
                pileOfCards = {this.state.pileOfCards}
                pileOfCardsColor = {this.state.takiModeColor}
                currentPlayer = {this.state.currentPlayerIDTurn}
                endTurnButton = {this.state.endTurnButton}
                endTurnHandleClick = {this.endTurnHandleClick.bind(this)}
                scoreBoardDisplay = {this.state.scoreBoardDisplay}
                scoreContainerDisplay = {this.state.scorePopupContainerDisplay}
                showReplay={this.showReplay.bind(this)}
                resetGame = {this.resetAndStartNewGame.bind(this)}
                stopTimer = {this.gameEnd}
                restartTimer = {this.resetTimer}
                getPlayerStats = {this.getPlayerStats.bind(this)}
                winner = {this.state.winnerId}
                colorPopupStyle = {this.state.colorPopupDisplay}
                colorContainerStyle = {this.state.colorPopupContainerDisplay}
                handleColorPopupClick = {this.colorButtonClick.bind(this)}
                cardColorFilter = {this.state.cardColorFilter}
                cardActiveFilter = {this.state.activeFilter}
                replayDisplay={this.state.replayDisplay}
                prevClick={this.prevClick.bind(this)}
                nextClick={this.nextClick.bind(this)}
                endReplayHandleClick = {this.endReplayHandleClick.bind(this)}
                numOfTurn={this.state.turnToDisplay}
            />
        );
    }
}
