import React from "react";

export default class PopUpColors extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="popupContainer" style={{display: this.props.colorContainerDisplay}}>
                <div id="colorPopup" style={{display: this.props.popupColorDisplay}}>
                    <h1 id="popup-text">
                        choose a color
                    </h1>
                    <button id="red-button" onClick={this.props.buttonHandleClick}></button>
                    <button id="green-button" onClick={this.props.buttonHandleClick}></button>
                    <button id="yellow-button" onClick={this.props.buttonHandleClick}></button>
                    <button id="blue-button" onClick={this.props.buttonHandleClick}></button>
                </div>
            </div>
        );
    }
}
