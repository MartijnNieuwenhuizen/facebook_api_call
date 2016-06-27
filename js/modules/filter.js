'use strict';

var template = require('./template');
var filter = {};
var unknown = "Onbekend";
var monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

// devide events in pased and comming up
// shorten title? --> No do it with css! :)
// calculate date

filter.events = function(data) {

    var _data = filter.parse(data);
    var events = _data.events.data;
    var d = new Date();
    var currentMonth = d.getMonth()+1;
    var currentDay = d.getFullYear() + "" + currentMonth + "" + d.getDate();

    var comingEvents = [];
    var pastEvents = [];

    events.forEach(function(event) {

        var gig = {};

        // ToDo: Butify this with the checkExistance function
        if ( event.name) {
            gig.title = event.name;
        } else {
            gig.title = unknown;
        }
        if ( event.place && event.place.location && event.place.location.city ) {
            gig.city = event.place.location.city;
        } else {
            gig.city = unknown;
        }
        if ( event.place && event.place.name ) {
            gig.locationName = event.place.name;
        } else {
            gig.locationName = unknown;
        }
        if ( event.id ) {
            gig.link = "https://www.facebook.com/events/" + event.id;
        } else {
            gig.link = "https://www.facebook.com/";
        }
        if ( event.start_time ) {
            gig.date = filter.parseDate(event.start_time);
        } else {
            gig.date = unknown;
        }

        if ( gig.date.calculateDate >= currentDay ) {
            comingEvents.push(gig);
        } else {
            gig.done = "true";
            pastEvents.push(gig);
        }

    });

    if ( pastEvents.length > 3 ) {
        pastEvents = pastEvents.slice(0, 3);
    }

    var eventsCombined = comingEvents.concat(pastEvents);

    template.render(eventsCombined);

}

// Parsed the data
filter.parse = function(data) {

    return JSON.parse(data);

}

filter.checkExistance = function(event, arg1, arg2, arg3) {

    if ( event[arg1]) {
        return event[arg1][arg2][arg3]
    } else {
        return unknown;
    }

}

filter.parseDate = function(fbDate) {

    var _fbDate = fbDate;

    // Date Calculations
    var date = _fbDate.slice(0, 10);
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    if ( month.slice(0, 1) == "0" ) {
        month = month.slice(1, 2);
    }
    var day = date.slice(8, 10);

    // Time Calculations
    var time = _fbDate.slice(11, 16);
    var hour = time.slice(0, 2);
    var minute = time.slice(3, 5);

    return {
        fullDate: date,
        calculateDate: year + month + day,
        year: year,
        month: month,
        monthName: monthNames[month-1],
        day: day,
        time: time,
        hour: hour,
        minute: minute
    };

}

module.exports = filter;
