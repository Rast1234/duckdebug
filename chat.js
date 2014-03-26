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
    message.html(text);
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
        if(localStorage.length == 0) {
            showHelp();
            return;
        }
        for(var i=0; i<localStorage.length; i++) {
            var item = JSON.parse(localStorage.getItem(i));
            var message = Message(item.text, item.isHuman);
            appendMessage(message);
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
        appendMessage(message);
        input.val('');
        storeHistory(text, true);

        var reply = duck.TryQuack();
        if(reply) {
            var replic = Message(reply, false);
            appendMessage(replic);
            storeHistory(reply, false);
        }
    }

    function showHelp() {
        var text = "Hello, nice to see you!\n" +
            "I will try to help you in difficult situations like debugging.\n" +
            "Share your thoughts<i>*</i> with <b>Ctrl+Enter</b>.\n" +
            "Read more about rubber ducks on wiki:\n" +
            "<a href='http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D1%83%D1%82%D1%91%D0%BD%D0%BA%D0%B0'>Метод Утёнка</a>\n" +
            "<a href='http://en.wikipedia.org/wiki/Rubber_duck_debugging\n\n'>Rubber duck debugging</a>\n\n" +
            "<i>*Don't hesitate, history is in your Local Storage.\n" +
            "If you want, check <a herf='https://github.com/Rast1234/duckdebug/tree/gh-pages'>source code!</a> ;)</i>";
        var replic = Message(text, false);
        appendMessage(replic);
        storeHistory(text, false);

    }

    function appendMessage(message) {
        log.append(message);
        var l = log.get(0);
        l.scrollTop = l.scrollHeight;
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