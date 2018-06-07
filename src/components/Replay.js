
import React from "react";

export default class Replay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
         var prevUrl = "./images/prev.png";
          var nextUrl = "./images/next.png";
        return (
            <div id="replay-container" style={{ display: this.props.replayDisplay}}>
                <img className="replay-img" src={prevUrl} alt="prevImg" id="currentPlayerImgNew" onClick={this.props.prevClick} ></img>
                    <div id="replay-number"> {" "+this.props.numOfTurn+ " "} </div>
                <img className="replay-img" src={nextUrl} alt="nextImg" id="currentPlayerImgNew"onClick={this.props.nextClick} ></img>
            </div>
        );
    }
}
