/**
 * Created by Christoffer on 17-11-2014.
 */

/**
 * Created by Christoffer on 23-10-2014.
 */
/* URL */
var API_URL               = '192.168.0.51/joomlaapp';
var API_REQUEST           = '/index.php?option=com_webitall_app&task=api.request';

/* REGEX */
var REGEX_HTML            = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)?>/g;
var REGEX_LINK            = /^(.*)\?/;

/* SQL */
var GETARTICLEBYIDSQL     = 'SELECT * FROM #__content WHERE id = ';

var GET5ARTICLESCTRLSQL   = 'SELECT * FROM #__menu ' +
    'WHERE menutype = "app-menu" ' +
    'AND published = 1 ' +
    'AND component_id = 22 ' +
    'ORDER BY id ASC ' +
    'LIMIT ';

var GETALLARTICLESSQL     = 'SELECT * FROM #__menu ' +
    'WHERE menutype = "app-menu" ' +
    'AND published = 1 ' +
    'AND component_id = 22';

var GETUSERSCTRLSQL       = 'SELECT * FROM #__users';

var MENUCTRLSQL           = 'SELECT * FROM #__menu_types';

var GETCONTACTSCTRLSQL    = 'SELECT * FROM #__contact_details';

var GETCONTACTSQL         = 'SELECT * FROM #__contact_details ' +
    'WHERE id = ';

var app = angular.module('hovedopgave-app', ['ngMaterial']);

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