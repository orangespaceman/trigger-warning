(function () {

    var rootUrl = window.rootUrl || '';
    var isTriggering = false;

    if (!window.io) {
        loadScript(rootUrl + '/js/socket.io.js', init);
    } else {
        init();
    }

    loadStyle(rootUrl + '/css/host.css');

    function init () {
        var socket = io(rootUrl + '/host');
        socket.on('trigger', trigger);
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

    function loadStyle (src) {
        var s = document.createElement('link');
        s.href = src;
        s.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    function trigger (data) {
        if (isTriggering) { return; }
        isTriggering = true;

        var trigger = addTrigger();
        var snowflake = addSnowflake(data);

        var audio = addAudio();
        audio.addEventListener('ended', function () {
            snowflake.parentNode.removeChild(snowflake);
            trigger.parentNode.removeChild(trigger);
            audio.parentNode.removeChild(audio);

            isTriggering = false;
        });

        audio.load();
        audio.play();
    }

    function addTrigger () {
        trigger = document.createElement('div');
        trigger.classList.add('trigger');

        var triggerText = document.createElement('div');
        triggerText.classList.add('trigger-text');
        trigger.appendChild(triggerText);

        var triggerTextContent = document.createTextNode('TRIGGER WARNING');
        triggerText.appendChild(triggerTextContent);

        document.body.appendChild(trigger);

        return trigger;
    }

    function addSnowflake (data) {
        snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        var snowflakeText = document.createElement('div');
        snowflakeText.classList.add('snowflake-text');
        snowflake.appendChild(snowflakeText);

        var snowflakeTextContent = document.createTextNode('Triggered by ' + data.name);
        snowflakeText.appendChild(snowflakeTextContent);

        document.body.appendChild(snowflake);

        return snowflake;
    }

    function addAudio () {
        var audio = document.createElement('audio');
        audio.setAttribute('preload', 'auto');
        audio.setAttribute('src', rootUrl + '/mp3/klaxon.mp3');
        audio.classList.add('audio');
        document.body.appendChild(audio);

        return audio;
    }
})();
