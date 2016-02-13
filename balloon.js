var HappyBirthday = function(name) {
    this.name = name;
    this.letters = name.split('');
    this.balloons = [];
    this.derpOn = false;
    this.pattern = [3, 4, 3, 1, 2, 4];
    this.initialize();
}

HappyBirthday.prototype.initialize = function() {
    this.pickColorTheme();
    this.createBalloons();
    this.colorBalloons();
    this.floatBalloons();
}

HappyBirthday.prototype.pickColorTheme = function() {
    var theme1 = ['#c0fedd', '#98ebe9', '#99d4ea', '#bdb7ff', '#dcbee9']
    var theme2 = ['#b571c7', '#947cfb', '#69c6ff', '#3cf2ee', '#48ff5d']
    var theme3 = ['#c98888', '#8df6ff', '#9dff5c', '#00d042', '#5f7185']
    var theme4 = ['#19f2cf', '#00c5ff', '#b2efe0', '#9999ff', '#dac3ec']
    var theme5 = ['#d6d5ba', '#628792', '#36a6a9', '#e3ac94', '#061d5a']
    var themes = [theme1, theme2, theme3, theme4, theme5];
    var randNum = (Math.floor(Math.random() * 5) + 1) - 1;
    this.theme = themes[randNum];
}

HappyBirthday.prototype.createBalloons = function() {
    var self = this;
    this.letters.forEach(function(letter) {
        self.balloons.push(new Balloon(letter));
    })
}

HappyBirthday.prototype.colorBalloons = function() {
    var colorCounter = 0;
    for (var i=0; i< this.balloons.length; i++) {
        this.balloons[i].color(this.theme[colorCounter]);
        colorCounter += 1;

        if (colorCounter == 5) {
            colorCounter = 0;
        }
    }
}

HappyBirthday.prototype.floatBalloons = function() {
    var pattern = this.pattern;
    this.balloons.forEach(function(balloon, index) {
        balloon.floatUp(pattern[index]);
    })
}

HappyBirthday.prototype.derpFace = function() {
    if (!this.derpOn) {
        $('.character').css('display', 'none');
        $('.mickey').css('display', 'block');
        this.derpOn = true;
    } else {
        $('.character').css('display', 'block');
        $('.mickey').css('display', 'none');
        this.derpOn = false;
    }
}

var Balloon = function(char, duration) {
  this.char = char;
  this.duration = duration;
  this.el = null;
  this.hexcode = null;
  this.createBalloon();
}

Balloon.prototype.createBalloon = function() {
  var parent = $("<div class='holder'></div>");
  var el =  $("<div class='balloon'><div class='arrow'></div><img class='mickey' src='mickey.gif'></img></div>");
  this.el = el;
  parent.append(el);
  $('.container').append(parent);
  this.insertCharacter();
}

Balloon.prototype.color = function(color) {
    this.hexcode = color;
    this.el.css('background-color', color);
    this.el.find('div').css('border-bottom-color', color);
}

Balloon.prototype.insertCharacter = function() {
    var el = $("<span class='character'></span>");
    el.html(this.char);
    this.el.append(el);
}

Balloon.prototype.floatUp = function(pattern) {
    var floatName = 'float' + pattern;
    this.el.addClass(floatName);
}