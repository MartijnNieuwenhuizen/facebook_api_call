'use strict';

// Or make this with placeholders, that's better!

var template = {};
var spinner = require('./spinner');
var Handlebars = require('handlebars');

template.render = function(events) {

    var _events = events;

    var eventsContainer = document.querySelector('#calendar-template').innerHTML;
	var template = Handlebars.compile(eventsContainer);
	var html = template(_events);
	document.querySelector('.eventList').innerHTML = html;

}

module.exports = template;
