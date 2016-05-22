var rootUrl = window.rootUrl || '';

var socket = io(rootUrl + '/client');

var form = document.querySelector('.js-form');
var input = document.querySelector('.js-input');
var submit = document.querySelector('.js-submit');
var trigger = document.querySelector('.js-trigger');

var name = window.localStorage.getItem('name');
if (name !== 'null') {
    showTrigger();
} else {
    showForm();
}

input.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);
trigger.addEventListener('click', onTriggerClick);

function onInputChange (e) {
    if (input.value.length > 0) {
        submit.removeAttribute('disabled');
    } else {
        submit.setAttribute('disabled', 'disabled');
    }
}

function onFormSubmit (e) {
    e.preventDefault();
    if (input.value.length > 0) {
        window.localStorage.setItem('name', input.value);
        name = input.value;
        showTrigger();
    }
}

function showForm () {
    form.classList.add('show');
    input.focus();
}

function showTrigger () {
    form.classList.remove('show');
    trigger.classList.add('show');
}

function onTriggerClick (e) {
    socket.emit('trigger', { name: name });
    trigger.blur();
    shake();
}

function shake () {
    trigger.classList.add('shake');
    window.setTimeout(function () {
        trigger.classList.remove('shake');
    }, 1000);

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100, 50]);
    }
}