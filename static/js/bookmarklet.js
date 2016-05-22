// Update to host path

var rootUrl = 'http://localhost:7005';

// Leave as-is

if (!window.io) {
    loadScript(rootUrl + '/js/socket.io.js', trigger);
} else {
    trigger();
}

function loadScript (src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}

function trigger () {
    var socket = io(rootUrl + '/client');
    socket.emit('trigger', { name: '[bookmarket]' });
}