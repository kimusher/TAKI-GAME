
import React from "react";
import CardCom from "./CardCom.js";
  
export default class PlayerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        const hand = this.props.cardsList.map((card) => {
            if (card == undefined){
                return;
            }
            return <CardCom key={card.color + card.name + Math.random()}
                    hideCard={this.props.hideCard}
                     name={card.name}
                     color={card.color}
                     isSpecial={""+card.isSpecial}
                     ownerID={this.props.ownerID}
                     handleClickCard={this.props.handleClickCard}
                     inPile={false}/>
            });
        return (
            <div className="player-container" >
                <div className="player-cards-container" id={this.props.id}>
                    <ul className="players-cards">
                        {hand}
                    </ul>
                </div>
            </div>
        );
    }
}
