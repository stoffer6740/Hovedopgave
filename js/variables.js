/**
 * Created by Christoffer on 23-10-2014.
 */
/* URL */
var API_URL               = '192.168.0.52/joomlaapp';
var API_IMG_URL           = 'http://' + API_URL + '/images';
var API_REQUEST           = '/index.php?option=com_webitall_app&task=api.request';

/* REGEX */
var REGEX_HTML            = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)?>/g;
var REGEX_LINK            = /^(.*)\?/;
var REGEX_IMAGE           = /(<[a-zA-z]*\ [a-zA-z]*="[a-zA-Z]{6})/g;

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

//var GETALLARTICLESSQL = 'SELECT title, id, link FROM app_menu ' +
//                        'WHERE menutype = "app-menu"';

var GETUSERSCTRLSQL       = 'SELECT * FROM #__users';

var MENUCTRLSQL           = 'SELECT * FROM #__menu_types';

var GETCONTACTSCTRLSQL    = 'SELECT * FROM #__contact_details';

var GETCONTACTSQL         = 'SELECT * FROM #__contact_details ' +
                            'WHERE id = ';