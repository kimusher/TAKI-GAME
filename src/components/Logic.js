export default class Logic {
    constructor(){
    }
    isMoveValid(topCard, playCard){
        if (topCard.name == '2plus' && topCard.isActive && playCard.name == '2plus'){
            return true;
        } else if (topCard.name == '2plus' && topCard.isActive && playCard.name != '2plus'){
            return false;
        }
        if (topCard.color == playCard.color){
            return true;
        } else if (topCard.name == playCard.name){
            return true
        } else if (playCard.name =='changecolor' || (playCard.name == 'taki' && playCard.color == 'colorful')){
            return true;
        } else {
            return false;
        }
    }
    canPlayerPlay(topCard, cards){
        var result = false;
        for (var i = 0; i < cards.length; i++) {
            result = this.isMoveValid(topCard, cards[i])
            //Supertaki can be play when player wants...
            if (cards[i].name == 'taki' && cards[i].color == 'colorful'){
                result = false;
            }
            if (result == true){
                break;
            }
        }
        return result;
    }
    canPlayerPlayTaki(cards, takiColor){
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].color == takiColor){
                return true;
            }
        }
        return false;
    }
    cardPlayed(card, gameManager){ 
        //this function is binded by the gameManager on init.
        let reset;
        let returnedValue;
        card.isActive = true;
        switch (card.name){
            case '2plus':
                if (gameManager.cardsToTake == 1)
                    gameManager.cardsToTake++;
                else 
                    gameManager.cardsToTake += 2;
                    
                gameManager.turnsToMove = 1;
                reset = false;
                break;
            case 'stop':
                if (gameManager.turnsToMove == 1){ // in Multiplayer (gameManager.turnsToMove != 0)
                    gameManager.turnsToMove++;
                }
                reset = false;
                break;
            case 'plus':
                gameManager.turnsToMove = 0;
                reset = false;
                break;
            case 'changecolor':
                gameManager.gamePaused = true;
                gameManager.setState({
                    colorPopupDisplay: 'flex',
                    colorPopupContainerDisplay: 'block',
                })
                reset = true;
                break;
            case 'taki':
                if (card.color == 'colorful'){
                    var topCard = gameManager.state.pileOfCards.getLast();
                    card.color = topCard.color;
                }
                let newState = gameManager.getTakiModeState(true, card.color);
                gameManager.setState(newState);
                reset = false;
                returnedValue = true;
                break;
            default:
                if (!gameManager.state.takiMode)
                    reset = true;
                break;
        }
        gameManager.needReset = reset;
        return returnedValue;
    }
}
