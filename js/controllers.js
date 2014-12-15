/**
 * Created by Christoffer on 20-10-2014.
 */

joomlaapp.controller('AppCtrl',['$scope', 'translationService', function ($scope, translationService){
    var language = window.localStorage.getItem("language");

    $scope.pageTitle = "";

    $scope.translate = function(lang){
        translationService.getTranslation($scope, lang);
        window.localStorage.setItem("language", lang);
    };

    $scope.translateReload = function (lang){
        $scope.translate(lang);
        location.reload();
    };

    //Init
    if(!language){
        $scope.translate('da');
    }else{
        $scope.translate(language);
    }

    $scope.cancel = function() {
        $scope.navigator.popPage();
    };
}]);

joomlaapp.controller('MenuCtrl', [ '$scope', '$http', 'getPageData', function($scope, $http, getPageData){
    var encSql = encode_sql(MENUCTRLSQL);
    $http({url   : 'http://' + API_URL + API_REQUEST,
        method   : 'GET',
        params   : {'sql':encSql}
    })
        .success(function(data, status, headers, config) {
            $scope.result = data.result;
        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
}]);

joomlaapp.controller('GetUsersCtrl', function($scope, $http){
    $scope.pageTitle = $scope.translation.userPage;
    var encSql = encode_sql(GETUSERSCTRLSQL);
    $http({url      : 'http://' + API_URL + API_REQUEST,
           method   : 'GET',
           params   : {'sql':encSql}
    })
        .success(function(data, status, headers, config) {
            $scope.result = data.result;

        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
});



joomlaapp.controller('GetArticlesCtrl', ['getArticleByIdSrvc', '$scope', '$http', function(getArticleByIdSrvc, $scope, $http){
    $scope.pageTitle = $scope.translation.articlePage;
        console.log("getArticles");

        $scope.GetOneArticle = function (id) {
            getArticleByIdSrvc.setId(id);
            navigation.pushPage('template_view/_viewArticle.html', {animation: 'slide'});
        };

        //$scope.getResults = function (num) {
            var encSql = encode_sql(GETALLARTICLESSQL);
            $http({url      : 'http://' + API_URL + API_REQUEST,
                   method   : 'GET',
                   params   : {'sql':encSql}
            })
                .success(function(data, status, headers, config){
                    var unsorted = [];
                    $scope.images = [];
                    angular.forEach(data.result, function (value) {
                        var url     = value.link.replace(REGEX_LINK, "");
                        var option  = getUrlParameter(url, 'option');
                        var id      = getUrlParameter(url, 'id');

                        getArticleFromMenu($scope, $http, id, unsorted);
                    });
                })
                .error(function(data, status, headers, config) {

                })
                .finally(function(){

                });
        //}
}]);

function getArticleFromMenu ($scope, $http, id, unsorted) {
    var encSql = encode_sql(GETARTICLEBYIDSQL + id);
    $http({url: 'http://' + API_URL + API_REQUEST,
        method: 'GET',
        params: {'sql':encSql}
    })
        .success(function(data, status, headers, config){
            var img = 'http://' + API_URL + '/' + JSON.parse(data.result[0].images).image_intro;
            if(!JSON.parse(data.result[0].images).image_intro) {
                $scope.images.push({
                    'id'     : id,
                    'image'  : ""
                });
            }else {
                $scope.images.push({
                    'id'     : id,
                    'image'  : img
                });
            }

            unsorted.push(data.result[0]);
            unsorted.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            });
            $scope.result = unsorted;
        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
}

joomlaapp.controller('GetOneArticleCtrl', ['getArticleByIdSrvc', '$scope', '$http', function(getArticlebyIdSrvc, $scope, $http){
    console.log("Get one");
    var aid = getArticlebyIdSrvc.getId();
    var encSql = encode_sql(GETARTICLEBYIDSQL + aid);
    $http({url: 'http://' + API_URL + API_REQUEST,
        method: 'GET',
        params: {'sql':encSql}
    })
        .success(function(data, status, headers, config){
            $scope.result = data.result;
            $scope.images = [];
            /* Date and images (if not from external servers) */
            $scope.date = new Date(data.result[0].publish_up);
            $scope.introtext = data.result[0].introtext.replace(/images/g, API_IMG_URL);

            var img = 'http://' + API_URL + '/' + JSON.parse(data.result[0].images).image_intro;
            if(!JSON.parse(data.result[0].images).image_intro) {
                $scope.images.push({
                    'id'     : aid,
                    'image'  : ""
                });
            }else {
                $scope.images.push({
                    'id'     : aid,
                    'image'  : img
                });
            }

        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
}]);


joomlaapp.controller('GetContactsCtrl', ['getContactByIdSrvc', '$http', '$scope', function(getContactByIdSrvc, $http, $scope){
    $scope.pageTitle = $scope.translation.contactPage;

    $scope.GetOneContact = function (id) {
        getContactByIdSrvc.setId(id);
        navigation.pushPage('template_view/_viewContact.html', {animation: 'slide'});
    };

    var encSql = encode_sql(GETCONTACTSCTRLSQL);
    $http({url      : 'http://' + API_URL + API_REQUEST,
        method   : 'GET',
        params   : {'sql':encSql}
    })
        .success(function(data, status, headers, config) {
            $scope.result = data.result;
        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){
        });
}]);

joomlaapp.controller('GetOneContactCtrl', ['getContactByIdSrvc', '$http', '$scope', function(getContactByIdSrvc, $http, $scope){
    console.log("Get one");

    var cid = getContactByIdSrvc.getId();
    var encSql = encode_sql(GETCONTACTSQL + cid);
    $http({url: 'http://' + API_URL + API_REQUEST,
        method: 'GET',
        params: {'sql':encSql}
    })
        .success(function(data, status, headers, config){
            $scope.result = data.result;
            $scope.images = [];
            $scope.pageTitle = data.result[0].name;
            var img = 'http://' + API_URL + '/' + data.result[0].image;
            console.log(img);
            if(!data.result[0].image) {
                $scope.images.push({
                    'id'     : cid,
                    'image'  : ""
                });
            }else {
                $scope.images.push({
                    'id'     : cid,
                    'image'  : img
                });
            }
        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
}]);

joomlaapp.controller('IndexCtrl', function ($scope) {
    $scope.pageTitle = $scope.translation.indexPage;
});

joomlaapp.controller('LanguageCtrl', function ($scope) {
    $scope.pageTitle = $scope.translation.languageMenu;
});