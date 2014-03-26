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

function Chat(input, log) {
    input.keydown(sendHandler);
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
        var message = Message(text, true);
        log.append(message);
        input.val('');
        storeHistory(text, true);
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