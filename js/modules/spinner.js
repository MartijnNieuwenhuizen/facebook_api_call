'use strict';

// Or make this with placeholders, that's better!

var spinner = {};
var Handlebars = require('handlebars');

spinner.start = function() {

    var eventsContainer = document.querySelector('#spinner').innerHTML;
	var template = Handlebars.compile(eventsContainer);
	var html = template();
	document.querySelector('.eventList').innerHTML = html;

}

module.exports = spinner;
