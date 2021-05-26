var intelliapp = (function(app) {
    return app;
})(intelliapp || {});

intelliapp.utils = (function() {
    var utils = {};

    utils.getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    utils.stringToBoolean = function(string) {
        switch (string.toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(string);
        }
    }

    utils.msToTime = function(s, displaytype) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        if (displaytype == "object") {
            return {
                "hour": hrs,
                "min": mins,
                "secs": secs
            }
        }
        return hrs + ':' + mins;
    }

    utils.isTouchDevice = function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    utils.scrollHeightAdjust = function() {
        if ($(".header_container").is(":visible")) {
            $("#scroller").css("height", ($("#maincontainer").height() - 50) + "px");
        } else {
            $("#scroller").css("height", ($("#maincontainer").height()) + "px");
        }
    }

    utils.expandTextarea = function(id) {
        $("#" + id).keyup(function() {
            var height = $(this)[0].scrollHeight;
            $(this).css({
                "overflow": "hidden",
                "height": height + "px"
            });
            return false;
        });
    }

    //http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
    utils.removeA = function(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    utils.getWeekDay = function(daynum) {
        var weekdays = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
        return weekdays[daynum];
    }

    utils.arrayToURL = function(array) {
        var pairs = [];
        for (var key in array)
            if (array.hasOwnProperty(key))
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
        return pairs.join('&');
    }

    utils.getFilename = function(url) {
        if (url) {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return m[1] + '.' + url.split('.').pop();
            }
        }
        return "";
    }

    utils.generateUDID = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
        };
    })();

    utils.getCurrentDateTime = function() {
        var now = new Date();
        var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        var current_datetime = Date.today().toString("yyyy-MM-dd") + " " + time;
        return current_datetime;
    }

    utils.getWeek = function(dt) {
        var calc = function(o) {
            if (o.dtmin.getDay() != 1) {
                if (o.dtmin.getDay() <= 4 && o.dtmin.getDay() != 0)
                    o.w += 1;
                o.dtmin.setDate((o.dtmin.getDay() == 0) ? 2 : 1 + (7 - o.dtmin.getDay()) + 1);
            }
            o.w += Math.ceil((((o.dtmax.getTime() - o.dtmin.getTime()) / (24 * 60 * 60 * 1000)) + 1) / 7);
        }, getNbDaysInAMonth = function(year, month) {
            var nbdays = 31;
            for (var i = 0; i <= 3; i++) {
                nbdays = nbdays - i;
                if ((dtInst = new Date(year, month - 1, nbdays)) && dtInst.getDate() == nbdays && (dtInst.getMonth() + 1) == month && dtInst.getFullYear() == year)
                    break;
            }
            return nbdays;
        };
        if (dt.getMonth() + 1 == 1 && dt.getDate() >= 1 && dt.getDate() <= 3 && (dt.getDay() >= 5 || dt.getDay() == 0)) {
            var pyData = {"dtmin": new Date(dt.getFullYear() - 1, 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear() - 1, 11, getNbDaysInAMonth(dt.getFullYear() - 1, 12), 0, 0, 0, 0), "w": 0};
            calc(pyData);
            return pyData.w;
        } else {
            var ayData = {"dtmin": new Date(dt.getFullYear(), 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0), "w": 0},
            nd12m = getNbDaysInAMonth(dt.getFullYear(), 12);
            if (dt.getMonth() == 12 && dt.getDay() != 0 && dt.getDay() <= 3 && nd12m - dt.getDate() <= 3 - dt.getDay())
                ayData.w = 1;
            else
                calc(ayData);
            return ayData.w;
        }
    }

    utils.toTitleCase = function(str) {
        return str.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

    return utils;
})();


