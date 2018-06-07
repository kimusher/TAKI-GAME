import React from "react";

export default class PopUpScore extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            player1AvgMove: '00:00:00',
            player1Move: 0,
            player1LastCard: 0,
            player2AvgMove: '00:00:00',
            player2Move: 0,
            player2LastCard: 0,
            player3AvgMove: '00:00:00',
            player3Move: 0,
            player3LastCard: 0,
            player4AvgMove: '00:00:00',
            player4Move: 0,
            player4LastCard: 0,
        };
    }

    componentWillReceiveProps(nextProps){
        let playersStats = nextProps.getPlayerStats();
        let newState = {};
        for (var i = 0; i < playersStats.length; i++){
            newState['player'+(i+1)+'AvgMove'] = playersStats[i].avgTurnTime.min + ":" + playersStats[i].avgTurnTime.sec + ":" + playersStats[i].avgTurnTime.ms;
            newState['player'+(i+1)+'Move'] = playersStats[i].numOfTurnsPlayed; 
            newState['player'+(i+1)+'LastCard'] = playersStats[i].numOfLastCard;
        }
        this.setState(newState);
    }

    render() {
        let text, imgUrl, newStyle;
        if (this.props.winner == 1){
            text = "YOU ARE THE WINNER!";
            imgUrl = "./images/mortyWin.gif";
            newStyle = {backgroundColor: "green"}
        } else {
            text = "YOU LOSE!";
            imgUrl = "./images/mortyCry_burned.png";
            newStyle = {backgroundColor: "red"}
        }

        return (
            <div id="popupContainer" style={{display: this.props.scoreContainerDisplay}}>
                <div id="scorePopup" style={{display: this.props.popupScoreDisplay}}>
                    <div className="grid-container" style = {newStyle}>
                        <div className="gridHeader" id="score-popup-header">
                            <div id="winning-popup-text">
                                {text}
                            </div>
                            <div id="winning-popup-img">
                                <img src={imgUrl} alt="winning-img" id="scorePopupImg"></img>
                            </div>
                            <div id="scoreBoard-buttons"> 
                                <button className="button-NewGame" id="newGameButton" onClick={this.props.resetGame}>New Game</button>
                                <button className="button-NewGame" id="replayButton" onClick={this.props.showReplay}>Replay</button>
                             </div>
                        </div>
                        <div className="item1 score-first-row">score</div>
                        <div className="item2 score-first-row">Player 1 </div>
                        <div className="item3 score-first-row">Player 2</div>
                        <div className="item4">
                            <div> Reached last card</div>
                            <div>Moves</div>
                            <div> Average move time</div>
                        </div>
                        <div className="item5">
                            <div id="player1LastCard"> {this.state.player1LastCard}</div>
                            <div id="player1Move"> {this.state.player1Move}</div>
                            <div id="player1AvgMove"> {this.state.player1AvgMove}</div>
                        </div>
                        <div className="item6">
                            <div id="player2LastCard"> {this.state.player2LastCard}</div>
                            <div id="player2Move"> {this.state.player2Move}</div>
                            <div id="player2AvgMove"> {this.state.player2AvgMove}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}