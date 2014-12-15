/**
 * Created by Christoffer on 20-10-2014.
 */


var joomlaapp = angular.module('joomlaapp', ['onsen', 'ngSanitize',
                                                      'ngResource',
                                                      'ngTouch',
                                                      'ngAnimate']);


/* Encode sql string with JSON and URL encode for the Joomla! to be able to interpret it */
function encode_sql (sql){
    return JSON.stringify(encodeURIComponent(sql).replace(/%20/g, '+'));
}


function getUrlParameter(sPageURL, sParam)
{
//    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function sortById (a, b) {
    if (a.id > b.id) {
        return 1;
    }
    if (a.id < b.id) {
        return -1;
    }
    return 0;
}