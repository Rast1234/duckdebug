var css = {};
css.message = '.message';
css.human = '.message-human';
css.duck = '.message-duck';
css.messageBox = '#message-box';
css.log = '#log';

function Message(text, isHuman) {
    var message = $('<div></div>').addClass(css.message.substring(1));
    if(isHuman)
        message.addClass(css.human.substring(1));
    else
        message.addClass(css.duck.substring(1));
    message.text(text);
    return message;
}

function Duck(noisiness) {
    var phrases = [
        "Quack?",
        "Wat.",
        "Oh, quack.",
        "And?",
        ":)",
        "I'm still here!",
        "So?",
        "Oh."
    ];

    var noiseLevel = !!noisiness ? noisiness : 0.1;

    this.TryQuack = function() {
        var random = Math.random();
        if(random <= noiseLevel)
            return phrases[randomIntFromInterval(0, phrases.length)];
        return null;
    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

function Chat(input, log) {
    input.keydown(sendHandler);
    var duck = new Duck();
    loadHistory();

    function loadHistory() {
        for(var i=0; i<localStorage.length; i++) {
            var item = JSON.parse(localStorage.getItem(i));
            var message = Message(item.text, item.isHuman);
            log.append(message);
        }
    }

    function storeHistory(text, isHuman) {
        var item = JSON.stringify({
            'text': text,
            'isHuman': isHuman
        });
        localStorage.setItem(localStorage.length, item);
    }

    function sendMessage() {
        var text = input.val();
        if(text == "")
            return;
        var message = Message(text, true);
        log.append(message);
        input.val('');
        storeHistory(text, true);

        var reply = duck.TryQuack();
        if(reply) {
            var replic = Message(reply, false);
            log.append(replic);
            storeHistory(reply, false);
        }
    }

    function sendHandler(evt) {
        if(evt.ctrlKey && evt.which == 13) {
            sendMessage();
        }
    }
};

$(document).ready(function(){
    var chat = new Chat($(css.messageBox), $(css.log));
});

function takeControl() {

}