export default class Card {
    constructor(name, color, isSpecial){
	this.name = name;
    this.color = color;
    this.isSpecial = isSpecial;
    this.isActive = true;
    this.backImageURL = "url(images\\cards\\card_back.png)";
    this.frontImageURL = "url(images\\cards\\"+name+"_"+color+".png)";
    var rotateNum = Math.floor(Math.random() * Math.floor(360));
    var randomLeft = Math.floor(Math.random() * Math.floor(25)) + 20;
    var randomTop = Math.floor(Math.random() * Math.floor(25)) + 2;
    this.inPileStyle = {
        transform:'rotate('+rotateNum+'deg)',
        position: 'absolute',
        top: randomTop+'px',
        left: randomLeft+'%'}
    }
}

Card.prototype.equals = function(i_name, i_color){
    if (this.name == i_name && this.color == i_color)
        return true;
    else
        return false;
}
