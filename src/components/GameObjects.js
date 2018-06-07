import React from "react";
import CardCom from "./CardCom.js";

export default class GameObjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
    }

    render() {
        var url = "./images/player"+this.props.playerImgId+".png";
        let pile = this.props.pileOfCards.map((card) =>
        <CardCom key={card.color + card.name + Math.random()}
                 name={card.name}
                 color={card.color}
                 isSpecial={""+card.isSpecial}
                 ownerID={this.props.ownerID}
                 inPile={true}
                 inPileStyle={card.inPileStyle}
        />);
        return (
            <div className="playing-objects-container">
                <div id="endTurn-button" style={{ display: this.props.endTurnButton}} onClick={this.props.endTurnHandleClick}>
                    end turn
                </div>
                <div id="endReplay-button" style={{ display: this.props.endReplayButton}} onClick={this.props.endReplayHandleClick}>
                    end replay
                </div>
                <div id="currentPlayerImg">
                    <img src={url} alt="playerimg" id="currentPlayerImgNew" ></img>
                </div>   
                <div className="pile-of-cards-container" id="pileOfCards" style={{ background: this.props.pileOfCardsColor}}>
                    <div className="pile-cards" >
                        {pile}
                    </div>
                </div>
                <div className="deck-container" onClick={this.props.handleDeckClick}>
                    <img src="./images/cards/deckOfCards.png" alt="Deck" className="deck" id="deck"></img>
                </div>
            </div>
        );
    }

   





}


