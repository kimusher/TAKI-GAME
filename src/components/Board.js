import React from "react";

import TopBar from "./TopBar.js";
import GameObjects from "./GameObjects.js";
import PlayerCom from "./PlayerCom.js";
import StatisticsBar from "./StatisticsBar.js";
import PopUpColors from "./PopUpColors.js";
import PopUpScore from "./PopUpScore.js";
import Replay from "./Replay.js";


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <TopBar 
                    startButtonClickHandle={this.props.startGame}
                    endButtonClickHandle={this.props.endGame}
                />
                <PlayerCom id="playerContainer2" hideCard={true} cardsList={this.props.Players[1].cards} ownerID={2} ></PlayerCom>
                <GameObjects 
                    pileOfCards={this.props.pileOfCards}
                    pileOfCardsColor={this.props.pileOfCardsColor}
                    handleDeckClick={this.props.handleTakeCard}
                    endTurnButton={this.props.endTurnButton}
                    endTurnHandleClick={this.props.endTurnHandleClick}
                    endReplayButton={this.props.replayDisplay}
                    endReplayHandleClick={this.props.endReplayHandleClick}                    playerImgId={this.props.currentPlayer}
                    cardColorFilter={this.props.cardColorFilter}
                    cardActiveFilter={this.props.cardActiveFilter}
                />
                <PlayerCom id="playerContainer1" hideCard={false} cardsList={this.props.Players[0].cards} handleClickCard={this.props.handleClickCard} ownerID={1}/>
                <PopUpColors 
                    popupColorDisplay={this.props.colorPopupStyle}
                    colorContainerDisplay={this.props.colorContainerStyle}
                    buttonHandleClick={this.props.handleColorPopupClick} />
                <PopUpScore 
                    popupScoreDisplay={this.props.scoreBoardDisplay}
                    scoreContainerDisplay={this.props.scoreContainerDisplay}
                    getPlayerStats={this.props.getPlayerStats}
                    winner={this.props.winner}
                    resetGame={this.props.resetGame}
                    showReplay={this.props.showReplay}
                />
                <Replay
                    replayDisplay={this.props.replayDisplay}
                    prevClick={this.props.prevClick}
                    nextClick={this.props.nextClick}
                    numOfTurn={this.props.numOfTurn}
                />
                <StatisticsBar 
                    getPlayerStats={this.props.getPlayerStats}
                    stopTimerSignal={this.props.stopTimer}
                    restartTimerSignal={this.props.restartTimer}
                />
            </div>
        );
    }
}