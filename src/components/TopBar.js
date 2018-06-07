

import React from "react";

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

    render() {
        return (
            <div className="container">
                <header>
                    <img id="quit-button" src=".\images\quit.svg" alt="quit" onClick={this.props.endButtonClickHandle}></img>
                    <img id="takiImg" src=".\images\logo.png" alt="logo"></img>
                    <img id="start-button" src=".\images\start.svg" alt="start" onClick={this.props.startButtonClickHandle}></img>
               </header>
             </div>
        );
    }
}