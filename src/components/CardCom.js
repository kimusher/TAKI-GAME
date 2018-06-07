import React from "react";

export default class Replay extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let url; 
        if (this.props.hideCard){
            url = "url(./images/cards/card_back.png)";
        }else{
            url = "url(./images/cards/" + this.props.name + "_" + this.props.color + ".png)";
        }
        
        let newStyle = {backgroundImage: url};
        if (this.props.inPile){
            Object.assign(newStyle, this.props.inPileStyle);
        }
         
        return (
            <div className="card"
                style={newStyle}
                name={this.props.name}
                color={this.props.color}
                isspecial={this.props.isSpecial}
                ownerid={this.props.ownerID}
                onClick={this.props.handleClickCard} >
            </div>
        );
    }
}